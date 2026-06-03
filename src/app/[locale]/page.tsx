import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/lib/i18n/routing';
import { Button } from '@/components/ui/button';
import { ArticleCard } from '@/components/article/article-card';
import { SubscribeBlock } from '@/components/site/subscribe-block';
import { listPublishedArticles } from '@/lib/articles';
import type { Locale } from '@/lib/supabase/types';

export const revalidate = 60;

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');

  const articles = await listPublishedArticles(locale as Locale, { limit: 3 });

  const pillars = [
    { title: t('pillar1Title'), body: t('pillar1Body') },
    { title: t('pillar2Title'), body: t('pillar2Body') },
    { title: t('pillar3Title'), body: t('pillar3Body') },
    { title: t('pillar4Title'), body: t('pillar4Body') }
  ];

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-[1200px] px-6 pt-20 pb-24 lg:px-10 lg:pt-32 lg:pb-32">
        <p className="mb-4 text-sm font-medium text-text-3">
          {t('heroSubtitle')}
        </p>
        <h1 className="max-w-[820px] text-balance text-5xl font-semibold tracking-tight text-text-1 md:text-6xl lg:text-7xl">
          {t('heroTitle')}
        </h1>
        <p className="mt-6 max-w-[640px] text-lg leading-relaxed text-text-2">
          {t('heroBody')}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/articles">{t('ctaPrimary')}</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/about">{t('ctaSecondary')}</Link>
          </Button>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-y border-border bg-bg-subtle">
        <div className="mx-auto max-w-[1200px] px-6 py-16 lg:px-10 lg:py-20">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-text-3">
            {t('pillarsTitle')}
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="rounded-[var(--radius-md)] border border-border bg-surface p-6"
              >
                <h3 className="text-base font-semibold text-text-1">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-2">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest */}
      <section className="mx-auto max-w-[1200px] px-6 py-20 lg:px-10 lg:py-24">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="text-2xl font-semibold tracking-tight text-text-1">
            {t('latestTitle')}
          </h2>
          <Link
            href="/articles"
            className="text-sm font-medium text-accent-500 hover:underline"
          >
            {t('latestAll')} →
          </Link>
        </div>
        {articles.length === 0 ? (
          <p className="text-sm text-text-3">No articles yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <ArticleCard key={a.id} article={a} locale={locale as Locale} />
            ))}
          </div>
        )}
      </section>

      {/* Subscribe */}
      <section className="mx-auto max-w-[1200px] px-6 pb-16 lg:px-10 lg:pb-24">
        <SubscribeBlock />
      </section>

      {/* Contact CTA */}
      <section className="mx-auto max-w-[1200px] px-6 pb-24 lg:px-10 lg:pb-32">
        <div className="rounded-[var(--radius-lg)] border border-border p-10 text-center">
          <h2 className="text-xl font-semibold tracking-tight text-text-1">
            {t('contactCtaTitle')}
          </h2>
          <div className="mt-5">
            <Button asChild>
              <Link href="/contact">{t('contactCtaButton')} →</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
