'use client';

import * as React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Intent = 'workshop' | 'speaking' | 'advisory' | 'podcast' | 'other';

export function ContactForm() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [intent, setIntent] = React.useState<Intent>('workshop');
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          intent,
          name: form.get('name'),
          email: form.get('email'),
          company: form.get('company'),
          brief: form.get('brief'),
          locale,
          // Honeypot
          website: form.get('website')
        })
      });
      if (!res.ok) throw new Error(await res.text());
      setDone(true);
      toast.success(t('successTitle'));
    } catch (err) {
      console.error(err);
      toast.error(t('errorTitle'));
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-[var(--radius-lg)] border border-border bg-bg-subtle p-8">
        <h2 className="text-xl font-semibold text-text-1">{t('successTitle')}</h2>
        <p className="mt-2 text-sm text-text-2">{t('successBody')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-2">
        <Label>{t('intentLabel')}</Label>
        <Select value={intent} onValueChange={(v) => setIntent(v as Intent)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="workshop">{t('intentWorkshop')}</SelectItem>
            <SelectItem value="speaking">{t('intentSpeaking')}</SelectItem>
            <SelectItem value="advisory">{t('intentAdvisory')}</SelectItem>
            <SelectItem value="podcast">{t('intentPodcast')}</SelectItem>
            <SelectItem value="other">{t('intentOther')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="name">{t('nameLabel')}</Label>
        <Input id="name" name="name" required autoComplete="name" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">{t('emailLabel')}</Label>
        <Input id="email" name="email" type="email" required autoComplete="email" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="company">{t('companyLabel')}</Label>
        <Input id="company" name="company" autoComplete="organization" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="brief">{t('briefLabel')}</Label>
        <Textarea id="brief" name="brief" required rows={6} />
      </div>

      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div>
        <Button type="submit" size="lg" disabled={loading}>
          {loading ? t('sending') : t('submit')}
        </Button>
      </div>
    </form>
  );
}
