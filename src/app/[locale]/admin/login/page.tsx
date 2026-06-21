import { setRequestLocale, getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { LoginForm } from './login-form';

export const dynamic = 'force-dynamic';

export default async function LoginPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('admin.login');

  // Already signed in as an admin? Go straight to the dashboard instead of
  // showing the login form again. Non-admins stay on the form.
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    if (profile?.role === 'admin') {
      redirect(`/${locale}/admin/dashboard`);
    }
  }

  return (
    <section className="mx-auto flex min-h-[80vh] max-w-[420px] flex-col justify-center px-6 py-12">
      <h1 className="text-2xl font-semibold tracking-tight text-text-1">
        {t('title')}
      </h1>
      <p className="mt-2 text-sm text-text-2">{t('subtitle')}</p>
      <div className="mt-8">
        <LoginForm />
      </div>
    </section>
  );
}
