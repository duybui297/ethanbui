import type { MetadataRoute } from 'next';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { locales } from '@/lib/i18n/config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const supabase = createSupabaseAdminClient();
  const { data: articles } = await supabase
    .from('articles')
    .select('slug, locale, updated_at')
    .eq('status', 'published');

  const staticPaths = ['', '/about', '/articles', '/contact'];

  const staticUrls: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticPaths.map((p) => ({
      url: `${base}/${locale}${p}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: p === '' ? 1 : 0.7
    }))
  );

  const articleUrls: MetadataRoute.Sitemap = (articles ?? []).map((a) => ({
    url: `${base}/${a.locale}/articles/${a.slug}`,
    lastModified: a.updated_at ? new Date(a.updated_at) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.6
  }));

  return [...staticUrls, ...articleUrls];
}
