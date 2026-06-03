import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { ArticleEditor } from '@/components/admin/article-editor';
import type { Locale } from '@/lib/supabase/types';

export const dynamic = 'force-dynamic';

export default async function EditArticlePage({
  params
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const supabase = await createSupabaseServerClient();
  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .single();
  if (!article) notFound();

  return <ArticleEditor mode="edit" defaultLocale={locale as Locale} article={article} />;
}
