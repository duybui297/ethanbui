'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Mail, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

type Props = {
  productId: string;
  next: string;
  locale: string;
};

/**
 * Google / Facebook sign-in. Off until the OAuth apps are configured in
 * Supabase (see PRODUCT_AUTH_SETUP.md, steps B & C). Flip to `true` to show
 * the buttons again — the handlers below are already wired.
 */
const SHOW_SSO = false;

/** Build the OAuth return URL that our /api/auth/callback handler reads. */
function callbackUrl(productId: string, next: string, locale: string) {
  const origin = window.location.origin;
  const qs = new URLSearchParams({ next, product: productId, locale });
  return `${origin}/api/auth/callback?${qs.toString()}`;
}

export function ProductAuthForm({ productId, next, locale }: Props) {
  const t = useTranslations('productAuth');
  const supabase = React.useMemo(() => createSupabaseBrowserClient(), []);

  const [busy, setBusy] = React.useState<null | 'google' | 'facebook' | 'email'>(null);
  const [stage, setStage] = React.useState<'email' | 'code'>('email');
  const [email, setEmail] = React.useState('');
  const [code, setCode] = React.useState('');

  async function oauth(provider: 'google' | 'facebook') {
    setBusy(provider);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: callbackUrl(productId, next, locale) }
      });
      if (error) {
        toast.error(t('errorOAuth'));
        setBusy(null);
      }
      // On success the browser is redirected away; no further work here.
    } catch {
      toast.error(t('errorOAuth'));
      setBusy(null);
    }
  }

  async function sendCode(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setBusy('email');
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: { shouldCreateUser: true }
      });
      if (error) {
        toast.error(t('errorSendCode'));
        return;
      }
      setStage('code');
      toast.success(t('codeSent'));
    } finally {
      setBusy(null);
    }
  }

  async function verifyCode(e: React.FormEvent) {
    e.preventDefault();
    if (code.trim().length < 6) return;
    setBusy('email');
    try {
      const { error } = await supabase.auth.verifyOtp({
        email: email.trim(),
        token: code.trim(),
        type: 'email'
      });
      if (error) {
        toast.error(t('errorBadCode'));
        return;
      }
      // Session cookie is now set. Record the product, then enter it.
      await fetch('/api/product-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: productId, provider: 'email', locale })
      }).catch(() => {});
      window.location.assign(next);
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="grid gap-5">
      {/* SSO — hidden until Google/Facebook OAuth apps are configured */}
      {SHOW_SSO && (
        <>
          <div className="grid gap-3">
            <Button
              type="button"
              variant="secondary"
              size="lg"
              disabled={busy !== null}
              onClick={() => oauth('google')}
            >
              <GoogleIcon />
              {busy === 'google' ? t('redirecting') : t('continueGoogle')}
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="lg"
              disabled={busy !== null}
              onClick={() => oauth('facebook')}
            >
              <FacebookIcon />
              {busy === 'facebook' ? t('redirecting') : t('continueFacebook')}
            </Button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 text-xs text-text-3">
            <span className="h-px flex-1 bg-border" />
            {t('or')}
            <span className="h-px flex-1 bg-border" />
          </div>
        </>
      )}

      {/* Email + code */}
      {stage === 'email' ? (
        <form onSubmit={sendCode} className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="email">{t('emailLabel')}</Label>
            <Input
              id="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button type="submit" size="lg" disabled={busy !== null}>
            <Mail className="h-4 w-4" />
            {busy === 'email' ? t('sending') : t('sendCode')}
          </Button>
        </form>
      ) : (
        <form onSubmit={verifyCode} className="grid gap-3">
          <button
            type="button"
            onClick={() => {
              setStage('email');
              setCode('');
            }}
            className="flex w-fit items-center gap-1.5 text-xs text-text-2 hover:text-text-1"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {t('changeEmail')}
          </button>
          <div className="grid gap-2">
            <Label htmlFor="code">{t('codeLabel', { email })}</Label>
            <Input
              id="code"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              required
              placeholder="••••••"
              className="text-center text-lg tracking-[0.5em]"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
            />
          </div>
          <Button type="submit" size="lg" disabled={busy !== null || code.length < 6}>
            {busy === 'email' ? t('verifying') : t('verify')}
          </Button>
          <button
            type="button"
            onClick={sendCode}
            disabled={busy !== null}
            className="text-xs text-accent-500 hover:underline disabled:opacity-50"
          >
            {t('resend')}
          </button>
        </form>
      )}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="#1877F2"
        d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z"
      />
    </svg>
  );
}
