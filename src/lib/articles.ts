import 'server-only';
import { cache } from 'react';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { Article, Locale } from '@/lib/supabase/types';

export type ArticleListItem = Pick<
  Article,
  'id' | 'slug' | 'title' | 'excerpt' | 'published_at' | 'reading_time' | 'locale' | 'og_image_url'
> & { categories: { slug: string; name_en: string; name_vi: string }[] };

export async function listPublishedArticles(
  locale: Locale,
  opts: { limit?: number; categorySlug?: string } = {}
): Promise<ArticleListItem[]> {
  const supabase = await createSupabaseServerClient();

  // For VI locale, we want to mirror the EN display order.
  // Strategy: fetch VI articles, then look up each one's EN counterpart's display_order.
  if (locale === 'vi') {
    return listViArticlesMirroringEnOrder(supabase, opts);
  }

  // EN locale: sort directly by display_order
  let q = supabase
    .from('articles')
    .select(
      `id, slug, title, excerpt, published_at, reading_time, locale, og_image_url, display_order,
       article_categories(categories(slug, name_en, name_vi))`
    )
    .eq('locale', locale)
    .eq('status', 'published')
    .order('display_order', { ascending: true })
    .order('published_at', { ascending: false });

  if (opts.limit) q = q.limit(opts.limit);

  const { data, error } = await q;
  if (error) {
    console.error('listPublishedArticles', error);
    return [];
  }

  return mapArticleRows(data ?? []).filter((a) =>
    opts.categorySlug ? a.categories.some((c) => c.slug === opts.categorySlug) : true
  );
}

/**
 * Fetch VI articles and sort them by their EN translation's display_order.
 * If a VI article has no EN translation, it gets pushed to the end.
 */
async function listViArticlesMirroringEnOrder(
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>,
  opts: { limit?: number; categorySlug?: string }
): Promise<ArticleListItem[]> {
  // 1. Fetch all published VI articles
  const { data: viArticles, error: viErr } = await supabase
    .from('articles')
    .select(
      `id, slug, title, excerpt, published_at, reading_time, locale, og_image_url, display_order, translation_of,
       article_categories(categories(slug, name_en, name_vi))`
    )
    .eq('locale', 'vi')
    .eq('status', 'published');

  if (viErr || !viArticles) {
    console.error('listViArticlesMirroringEnOrder', viErr);
    return [];
  }

  // 2. Collect EN article IDs referenced by translation_of
  const enIds = viArticles
    .map((a) => a.translation_of)
    .filter((id): id is string => Boolean(id));

  // Also check if any EN article has translation_of pointing to a VI article
  const viIds = viArticles.map((a) => a.id);

  let enOrderMap: Record<string, number> = {};

  if (enIds.length > 0 || viIds.length > 0) {
    // Fetch EN articles that are linked to VI articles
    const { data: enArticles } = await supabase
      .from('articles')
      .select('id, display_order, translation_of')
      .eq('locale', 'en')
      .eq('status', 'published');

    if (enArticles) {
      for (const en of enArticles) {
        // Map: EN article id -> display_order
        enOrderMap[en.id] = en.display_order ?? 9999;
        // Also map: EN article's translation_of -> display_order
        if (en.translation_of) {
          enOrderMap[en.translation_of] = en.display_order ?? 9999;
        }
      }
    }
  }

  // 3. Sort VI articles by the EN counterpart's display_order
  const sorted = [...viArticles].sort((a, b) => {
    const orderA = getEnOrder(a, enOrderMap);
    const orderB = getEnOrder(b, enOrderMap);
    if (orderA !== orderB) return orderA - orderB;
    // Fallback: published_at descending
    const dateA = a.published_at ? new Date(a.published_at).getTime() : 0;
    const dateB = b.published_at ? new Date(b.published_at).getTime() : 0;
    return dateB - dateA;
  });

  const limited = opts.limit ? sorted.slice(0, opts.limit) : sorted;

  return mapArticleRows(limited).filter((a) =>
    opts.categorySlug ? a.categories.some((c) => c.slug === opts.categorySlug) : true
  );
}

function getEnOrder(
  viArticle: { id: string; translation_of: string | null },
  enOrderMap: Record<string, number>
): number {
  // Case 1: VI article's translation_of points to an EN article
  if (viArticle.translation_of && enOrderMap[viArticle.translation_of] !== undefined) {
    return enOrderMap[viArticle.translation_of];
  }
  // Case 2: An EN article's translation_of points to this VI article
  if (enOrderMap[viArticle.id] !== undefined) {
    return enOrderMap[viArticle.id];
  }
  return 9999; // No EN counterpart found
}

function mapArticleRows(data: unknown[]): ArticleListItem[] {
  return data.map((row: unknown) => {
    const r = row as Record<string, unknown>;
    return {
      id: r.id as string,
      slug: r.slug as string,
      title: r.title as string,
      excerpt: r.excerpt as string | null,
      published_at: r.published_at as string | null,
      reading_time: r.reading_time as number | null,
      locale: r.locale as Locale,
      og_image_url: (r.og_image_url as string | null) ?? null,
      categories:
        ((r as Record<string, unknown>).article_categories as { categories: { slug: string; name_en: string; name_vi: string } | null }[] | undefined)
          ?.map((ac) => ac.categories)
          .filter((c): c is { slug: string; name_en: string; name_vi: string } => Boolean(c)) ?? []
    };
  });
}

/**
 * Fetch a single published article by (locale, slug).
 *
 * Wrapped in React `cache()` so that calling it multiple times within the same
 * request (e.g. once in `generateMetadata` and again in the page component)
 * only hits Supabase once. This removes a redundant round-trip on every
 * article-detail navigation.
 */
export const getArticleBySlug = cache(
  async (locale: Locale, slug: string): Promise<Article | null> => {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('locale', locale)
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle();
    if (error) {
      console.error('getArticleBySlug', error);
      return null;
    }
    return data;
  }
);

/**
 * Like {@link getArticleTranslationSlug}, but reuses an already-loaded article
 * (its `id` and `translation_of`) so we skip the extra "fetch current article"
 * query. Use this from the detail page, which already has the article in hand.
 */
export async function getTranslationSlugForArticle(
  article: Pick<Article, 'id' | 'slug' | 'translation_of' | 'locale'>,
  targetLocale: Locale
): Promise<string | null> {
  if (article.locale === targetLocale) return article.slug;
  const supabase = await createSupabaseServerClient();

  const { data: translation } = await supabase
    .from('articles')
    .select('slug')
    .eq('locale', targetLocale)
    .eq('status', 'published')
    .or(`id.eq.${article.translation_of},translation_of.eq.${article.id}`)
    .maybeSingle();

  return translation?.slug ?? null;
}

/**
 * Given an article identified by (locale, slug), return the slug of its
 * translation in `targetLocale`, or null if no translation exists.
 *
 * translation_of is bidirectional: both the EN and VI rows point at each other.
 */
export async function getArticleTranslationSlug(
  locale: Locale,
  slug: string,
  targetLocale: Locale
): Promise<string | null> {
  if (locale === targetLocale) return slug;
  const supabase = await createSupabaseServerClient();

  // 1. Fetch the current article's id and translation_of
  const { data: current } = await supabase
    .from('articles')
    .select('id, translation_of')
    .eq('locale', locale)
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();
  if (!current) return null;

  // 2. The translation is either:
  //    a) the article pointed to by translation_of (if it matches targetLocale)
  //    b) another article whose translation_of points to current.id
  const { data: translation } = await supabase
    .from('articles')
    .select('slug')
    .eq('locale', targetLocale)
    .eq('status', 'published')
    .or(`id.eq.${current.translation_of},translation_of.eq.${current.id}`)
    .maybeSingle();

  return translation?.slug ?? null;
}

export async function getRelatedArticles(
  locale: Locale,
  articleId: string,
  limit = 3
): Promise<ArticleListItem[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('articles')
    .select('id, slug, title, excerpt, published_at, reading_time, locale, og_image_url, article_categories(categories(slug, name_en, name_vi))')
    .eq('locale', locale)
    .eq('status', 'published')
    .neq('id', articleId)
    .order('display_order', { ascending: true })
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('getRelatedArticles', error);
    return [];
  }
  return mapArticleRows(data ?? []);
}
