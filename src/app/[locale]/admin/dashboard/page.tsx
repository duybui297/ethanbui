import { getTranslations, setRequestLocale } from 'next-intl/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function DashboardPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('admin.dashboard');
  const supabase = await createSupabaseServerClient();

  const [{ count: total }, { count: published }, { count: drafts }, { count: subs }] = await Promise.all([
    supabase.from('articles').select('id', { count: 'exact', head: true }),
    supabase.from('articles').select('id', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('articles').select('id', { count: 'exact', head: true }).eq('status', 'draft'),
    supabase.from('subscribers').select('id', { count: 'exact', head: true })
  ]);

  const kpis = [
    { label: t('kpiTotal'), value: total ?? 0 },
    { label: t('kpiPublished'), value: published ?? 0 },
    { label: t('kpiDrafts'), value: drafts ?? 0 },
    { label: t('kpiSubs'), value: subs ?? 0 }
  ];

  return (
    <section>
      <h1 className="text-2xl font-semibold tracking-tight text-text-1">
        {t('welcome')}
      </h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="rounded-[var(--radius-md)] border border-border bg-surface p-5"
          >
            <p className="text-xs uppercase tracking-wider text-text-3">
              {k.label}
            </p>
            <p className="mt-2 text-3xl font-semibold text-text-1">{k.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
