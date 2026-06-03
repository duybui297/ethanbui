import 'server-only';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { Article, Locale } from '@/lib/supabase/types';

export type ArticleListItem = Pick<
  Article,
  'id' | 'slug' | 'title' | 'excerpt' | 'published_at' | 'reading_time' | 'locale'
> & { categories: { slug: string; name_en: string; name_vi: string }[] };

export async function listPublishedArticles(
  locale: Locale,
  opts: { limit?: number; categorySlug?: string } = {}
): Promise<ArticleListItem[]> {
  const supabase = await createSupabaseServerClient();
  let q = supabase
    .from('articles')
    .select(
      `id, slug, title, excerpt, published_at, reading_time, locale,
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

export async function getRelatedArticles(
  locale: Locale,
  articleId: string,
  limit = 3
): Promise<ArticleListItem[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('articles')
    .select('id, slug, title, excerpt, published_at, reading_time, locale, article_categories(categories(slug, name_en, name_vi))')
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
    categories:
      (row as unknown as { article_categories: { categories: { slug: string; name_en: string; name_vi: string } | null }[] }).article_categories
        ?.map((ac) => ac.categories)
        .filter((c): c is { slug: string; name_en: string; name_vi: string } => Boolean(c)) ?? []
  }));
}
