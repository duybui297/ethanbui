import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { ArticleCard } from '@/components/article/article-card';
import { SubscribeBlock } from '@/components/site/subscribe-block';
import { listPublishedArticles } from '@/lib/articles';
import type { Locale } from '@/lib/supabase/types';

export const revalidate = 60;

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'articles' });
  return { title: t('title'), description: t('subtitle') };
}

export default async function ArticlesPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('articles');
  const articles = await listPublishedArticles(locale as Locale);

  return (
    <>
      <header className="mx-auto max-w-[1200px] px-6 pb-12 pt-16 lg:px-10 lg:pt-24">
        <h1 className="text-4xl font-semibold tracking-tight text-text-1 md:text-5xl">
          {t('title')}
        </h1>
        <p className="mt-3 max-w-[640px] text-lg text-text-2">{t('subtitle')}</p>
      </header>

      <section className="mx-auto max-w-[1200px] px-6 pb-20 lg:px-10">
        {articles.length === 0 ? (
          <p className="text-sm text-text-3">{t('empty')}</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {articles.map((a) => (
              <ArticleCard key={a.id} article={a} locale={locale as Locale} />
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pb-24 lg:px-10">
        <SubscribeBlock />
      </section>
    </>
  );
}
