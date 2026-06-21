import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/lib/i18n/routing';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { formatDate } from '@/lib/utils';
import { ArticleReorder } from '@/components/admin/article-reorder';
import type { Locale } from '@/lib/supabase/types';

export const dynamic = 'force-dynamic';

export default async function AdminArticlesPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('admin.articles');
  const supabase = await createSupabaseServerClient();

  // Fetch all articles for the listing table
  const { data: articles } = await supabase
    .from('articles')
    .select('id, title, slug, locale, status, updated_at, og_image_url')
    .order('updated_at', { ascending: false });

  // Fetch EN published articles for the reorder section
  const { data: enPublished } = await supabase
    .from('articles')
    .select('*')
    .eq('locale', 'en')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  return (
    <section>
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-text-1">
          {t('title')}
        </h1>
        <Button asChild>
          <Link href="/admin/articles/new">+ {t('newArticle')}</Link>
        </Button>
      </header>

      {/* Reorder section — EN published articles */}
      {enPublished && enPublished.length >= 1 && (
        <div className="mb-10">
          <h2 className="mb-4 text-lg font-semibold tracking-tight text-text-1">
            {t('displayOrder')}
          </h2>
          <ArticleReorder
            articles={enPublished.map((a) => ({
              id: a.id,
              title: a.title,
              slug: a.slug,
              status: a.status,
              published_at: a.published_at,
              display_order: (a as Record<string, unknown>).display_order as number ?? 0
            }))}
            labels={{
              title: t('displayOrder'),
              saveOrder: t('saveOrder'),
              saving: t('saving'),
              saved: t('saved'),
              dragHint: t('dragHint'),
              colOrder: t('colOrder'),
              colTitle: t('colTitle'),
              colStatus: t('colStatus')
            }}
          />
        </div>
      )}

      {/* All articles table */}
      <h2 className="mb-4 text-lg font-semibold tracking-tight text-text-1">
        {t('allArticles')}
      </h2>

      {!articles || articles.length === 0 ? (
        <p className="rounded-md border border-dashed border-border p-8 text-center text-sm text-text-3">
          {t('empty')}
        </p>
      ) : (
        <div className="overflow-hidden rounded-md border border-border">
          <table className="w-full text-sm">
            <thead className="bg-bg-subtle text-left text-xs uppercase tracking-wider text-text-3">
              <tr>
                <th className="px-4 py-3 w-20">Cover</th>
                <th className="px-4 py-3">{t('colTitle')}</th>
                <th className="px-4 py-3">{t('colLocale')}</th>
                <th className="px-4 py-3">{t('colStatus')}</th>
                <th className="px-4 py-3">{t('colUpdated')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {articles.map((a) => (
                <tr key={a.id} className="hover:bg-bg-muted">
                  <td className="px-4 py-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={
                        a.og_image_url ??
                        `/api/og?variant=thumb&slug=${encodeURIComponent(
                          a.slug
                        )}&title=${encodeURIComponent(a.title)}`
                      }
                      alt=""
                      className="aspect-[4/3] w-16 rounded-[var(--radius-sm)] border border-border object-cover"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/articles/${a.id}`}
                      className="font-medium text-text-1 hover:text-accent-500"
                    >
                      {a.title}
                    </Link>
                    <div className="text-xs text-text-3">/{a.slug}</div>
                  </td>
                  <td className="px-4 py-3 text-text-2 uppercase">{a.locale}</td>
                  <td className="px-4 py-3">
                    <Badge variant={a.status === 'published' ? 'success' : 'muted'}>
                      {a.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-text-3">
                    {formatDate(a.updated_at, locale as Locale)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
