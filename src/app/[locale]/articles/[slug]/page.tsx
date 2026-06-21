import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Link } from '@/lib/i18n/routing';
import { Badge } from '@/components/ui/badge';
import { ArticleToc } from '@/components/article/toc';
import { MarkdownBody } from '@/components/article/markdown-body';
import { ArticleCard } from '@/components/article/article-card';
import { SubscribeBlock } from '@/components/site/subscribe-block';
import { CommentSection } from '@/components/article/comment-section';
import { ShareBar } from '@/components/article/share-bar';
import { SetAlternateLinks } from '@/components/site/alternate-link-context';
import { getArticleBySlug, getRelatedArticles, getTranslationSlugForArticle } from '@/lib/articles';
import { formatDate, absoluteUrl } from '@/lib/utils';
import type { Locale } from '@/lib/supabase/types';
import { locales } from '@/lib/i18n/config';

export const revalidate = 60;

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await getArticleBySlug(locale as Locale, slug);
  if (!article) return {};
  return {
    title: article.meta_title ?? article.title,
    description: article.meta_description ?? article.excerpt ?? undefined,
    alternates: {
      canonical: article.canonical_url ?? absoluteUrl(`/${locale}/articles/${article.slug}`)
    },
    openGraph: {
      title: article.title,
      description: article.excerpt ?? undefined,
      type: 'article',
      publishedTime: article.published_at ?? undefined,
      images: [
        article.og_image_url ??
          `/api/og?slug=${encodeURIComponent(article.slug)}&title=${encodeURIComponent(
            article.title
          )}`
      ]
    }
  };
}

export default async function ArticlePage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const article = await getArticleBySlug(locale as Locale, slug);
  if (!article) notFound();

  // Fetch related articles and the per-locale alternate links in parallel.
  // They all depend only on `article`, so there's no reason to await them
  // sequentially — doing so was a big part of the navigation lag.
  const otherLocales = locales.filter((l) => l !== locale);
  const [related, translatedSlugs] = await Promise.all([
    getRelatedArticles(locale as Locale, article.id, 3),
    Promise.all(
      otherLocales.map((l) => getTranslationSlugForArticle(article, l as Locale))
    )
  ]);

  // Build alternate locale links for the LangSwitcher
  const alternateLinks: Partial<Record<string, string>> = {
    [locale]: `/articles/${slug}`
  };
  otherLocales.forEach((l, i) => {
    const translatedSlug = translatedSlugs[i];
    alternateLinks[l] = translatedSlug ? `/articles/${translatedSlug}` : '/articles';
  });

  return (
    <>
      <SetAlternateLinks links={alternateLinks} />
      <article className="mx-auto max-w-[1200px] px-6 pb-24 pt-12 lg:px-10 lg:pt-20">
      <header className="mx-auto max-w-[820px]">
        <div className="mb-4 flex items-center gap-3 text-xs text-text-3">
          {article.published_at && (
            <span>{formatDate(article.published_at, locale as Locale)}</span>
          )}
          {article.reading_time && (
            <>
              <span>·</span>
              <span>{t('articles.minRead', { minutes: article.reading_time })}</span>
            </>
          )}
        </div>
        <h1 className="text-4xl font-semibold leading-tight tracking-tight text-text-1 md:text-5xl">
          {article.title}
        </h1>
        {article.excerpt && (
          <p className="mt-5 text-xl leading-relaxed text-text-2">{article.excerpt}</p>
        )}
      </header>

      {article.og_image_url && (
        <div className="mx-auto mt-10 max-w-[1000px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.og_image_url}
            alt={article.title}
            className="aspect-[16/9] w-full rounded-[var(--radius-lg)] border border-border object-cover"
          />
        </div>
      )}

      <div className="mt-12 grid gap-10 lg:grid-cols-[240px_minmax(0,680px)] lg:gap-16">
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-8">
            <ArticleToc source={article.body_md} title={t('article.tocTitle')} />
            <ShareBar
              title={article.title}
              url={`/${locale}/articles/${article.slug}`}
              variant="sidebar"
            />
          </div>
        </aside>

        <div>
          <MarkdownBody source={article.body_md} />

          {/* Share bar — inline for mobile, hidden on desktop (shown in sidebar) */}
          <div className="lg:hidden">
            <ShareBar
              title={article.title}
              url={`/${locale}/articles/${article.slug}`}
              variant="inline"
            />
          </div>

          <div className="mt-16 rounded-[var(--radius-lg)] border border-border bg-bg-subtle p-6">
            <h2 className="text-base font-semibold text-text-1">
              {t('article.subscribeInlineTitle')}
            </h2>
            <p className="mt-1 text-sm text-text-2">{t('article.subscribeInlineBody')}</p>
            <div className="mt-4">
              <SubscribeBlock variant="inline" />
            </div>
          </div>

          <CommentSection articleId={article.id} />
        </div>
      </div>

      {related.length > 0 && (
        <section className="mx-auto mt-20 max-w-[1100px]">
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-wider text-text-3">
            {t('article.relatedTitle')}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.id} article={a} locale={locale as Locale} />
            ))}
          </div>
        </section>
      )}

      <p className="mt-16 text-center">
        <Link
          href="/articles"
          className="text-sm font-medium text-accent-500 hover:underline"
        >
          ← {t('articles.title')}
        </Link>
      </p>
    </article>
    </>
  );
}
