import { getTranslations, setRequestLocale } from 'next-intl/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { Subscriber } from '@/lib/supabase/types';
import { GATED_PRODUCTS } from '@/lib/products';

export const dynamic = 'force-dynamic';

const productName = (id: string | null) =>
  GATED_PRODUCTS.find((p) => p.id === id)?.name ?? id;

export default async function SubscribersPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('admin.subscribers');
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase
    .from('subscribers')
    .select(
      'id, email, locale, source, source_product, auth_provider, created_at, product_first_seen_at'
    )
    .order('created_at', { ascending: false });

  const rows = (data ?? []) as Subscriber[];
  const fromProducts = rows.filter((r) => r.source_product).length;

  const fmt = (d: string | null) =>
    d ? new Date(d).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US') : '—';

  return (
    <section>
      <div className="flex items-end justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-text-1">
          {t('title')}
        </h1>
        <div className="flex gap-4 text-sm text-text-2">
          <span>
            {t('countTotal')}: <strong className="text-text-1">{rows.length}</strong>
          </span>
          <span>
            {t('countFromProducts')}:{' '}
            <strong className="text-text-1">{fromProducts}</strong>
          </span>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-[var(--radius-md)] border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-bg-subtle text-left text-xs uppercase tracking-wider text-text-3">
              <th className="px-4 py-3 font-medium">{t('colEmail')}</th>
              <th className="px-4 py-3 font-medium">{t('colProduct')}</th>
              <th className="px-4 py-3 font-medium">{t('colProvider')}</th>
              <th className="px-4 py-3 font-medium">{t('colSource')}</th>
              <th className="px-4 py-3 font-medium">{t('colLocale')}</th>
              <th className="px-4 py-3 font-medium">{t('colJoined')}</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-text-3">
                  {t('empty')}
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 text-text-1">{r.email}</td>
                  <td className="px-4 py-3">
                    {r.source_product ? (
                      <span className="inline-flex items-center rounded-full border border-accent-500/30 bg-accent-50 px-2.5 py-0.5 text-xs font-medium text-accent-500">
                        {productName(r.source_product)}
                      </span>
                    ) : (
                      <span className="text-text-3">{t('noProduct')}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 capitalize text-text-2">
                    {r.auth_provider ?? '—'}
                  </td>
                  <td className="px-4 py-3 text-text-2">{r.source ?? '—'}</td>
                  <td className="px-4 py-3 uppercase text-text-2">{r.locale}</td>
                  <td className="px-4 py-3 text-text-2">
                    {fmt(r.product_first_seen_at ?? r.created_at)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
