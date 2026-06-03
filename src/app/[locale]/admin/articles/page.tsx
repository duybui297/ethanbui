import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/lib/i18n/routing';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { formatDate } from '@/lib/utils';
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
  const { data: articles } = await supabase
    .from('articles')
    .select('id, title, slug, locale, status, updated_at')
    .order('updated_at', { ascending: false });

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

      {!articles || articles.length === 0 ? (
        <p className="rounded-md border border-dashed border-border p-8 text-center text-sm text-text-3">
          {t('empty')}
        </p>
      ) : (
        <div className="overflow-hidden rounded-md border border-border">
          <table className="w-full text-sm">
            <thead className="bg-bg-subtle text-left text-xs uppercase tracking-wider text-text-3">
              <tr>
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
