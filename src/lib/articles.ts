import 'server-only';
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
  let q = supabase
    .from('articles')
    .select(
      `id, slug, title, excerpt, published_at, reading_time, locale, og_image_url,
       article_categories(categories(slug, name_en, name_vi))`
    )
    .eq('locale', locale)
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (opts.limit) q = q.limit(opts.limit);

  const { data, error } = await q;
  if (error) {
    console.error('listPublishedArticles', error);
    return [];
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    published_at: row.published_at,
    reading_time: row.reading_time,
    locale: row.locale as Locale,
    og_image_url: (row as unknown as { og_image_url: string | null }).og_image_url ?? null,
    categories:
      (row as unknown as { article_categories: { categories: { slug: string; name_en: string; name_vi: string } | null }[] }).article_categories
        ?.map((ac) => ac.categories)
        .filter((c): c is { slug: string; name_en: string; name_vi: string } => Boolean(c)) ?? []
  })).filter((a) =>
    opts.categorySlug ? a.categories.some((c) => c.slug === opts.categorySlug) : true
  );
}

export async function getArticleBySlug(locale: Locale, slug: string): Promise<Article | null> {
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
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('getRelatedArticles', error);
    return [];
  }
  return (data ?? []).map((row) => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    published_at: row.published_at,
    reading_time: row.reading_time,
    locale: row.locale as Locale,
    og_image_url: (row as unknown as { og_image_url: string | null }).og_image_url ?? null,
    categories:
      (row as unknown as { article_categories: { categories: { slug: string; name_en: string; name_vi: string } | null }[] }).article_categories
        ?.map((ac) => ac.categories)
        .filter((c): c is { slug: string; name_en: string; name_vi: string } => Boolean(c)) ?? []
  }));
}
