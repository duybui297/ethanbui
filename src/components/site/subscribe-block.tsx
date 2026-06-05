'use client';

import * as React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function SubscribeBlock({ variant = 'card' }: { variant?: 'card' | 'inline' }) {
  const t = useTranslations('home');
  const locale = useLocale();
  const [email, setEmail] = React.useState('');
  // Honeypot. Hidden from real users; only bots fill it.
  const [website, setWebsite] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale, source: 'site', website })
      });
      if (!res.ok) throw new Error(await res.text());
      setSubmitted(true);
      setEmail('');
    } catch (err) {
      console.error(err);
      toast.error(t('subscribeError'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      className={
        variant === 'card'
          ? 'rounded-[var(--radius-lg)] border border-border bg-bg-subtle p-8'
          : 'border-y border-border bg-bg-subtle py-6'
      }
    >
      <div className="mx-auto max-w-[680px]">
        {submitted ? (
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-text-1">
              {t('subscribeCheckTitle')}
            </h2>
            <p className="mt-1 text-sm text-text-2">{t('subscribeCheckBody')}</p>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-semibold tracking-tight text-text-1">
              {t('subscribeTitle')}
            </h2>
            <p className="mt-1 text-sm text-text-2">{t('subscribeBody')}</p>
            <form className="mt-4 flex flex-col gap-3 sm:flex-row" onSubmit={onSubmit}>
              {/* Honeypot field: visually hidden, off-tab, never autofilled for humans. */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
              />
              <Input
                type="email"
                required
                placeholder={t('subscribePlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="sm:flex-1"
              />
              <Button type="submit" disabled={loading}>
                {loading ? '...' : t('subscribeButton')}
              </Button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
