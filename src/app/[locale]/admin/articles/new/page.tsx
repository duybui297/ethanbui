import { setRequestLocale } from 'next-intl/server';
import { ArticleEditor } from '@/components/admin/article-editor';
import type { Locale } from '@/lib/supabase/types';

export const dynamic = 'force-dynamic';

export default async function NewArticlePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ArticleEditor mode="create" defaultLocale={locale as Locale} />;
}
