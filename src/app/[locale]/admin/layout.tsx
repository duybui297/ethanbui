import { setRequestLocale, getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { Link } from '@/lib/i18n/routing';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { AdminSidebar } from '@/components/admin/sidebar';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  // The login page is also rendered via this layout; only gate non-login routes.
  // Middleware already redirects unauthenticated users, but we double-check here
  // and also reject non-admin users.
  let isLoggedIn = false;
  let isAdmin = false;
  if (user) {
    isLoggedIn = true;
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    isAdmin = profile?.role === 'admin';
  }

  const t = await getTranslations('admin.nav');

  // For /admin/login, render bare layout.
  // We can't distinguish from layout — children render the page,
  // which itself doesn't require auth. Sidebar appears only when logged in.

  if (!isLoggedIn) {
    return <>{children}</>;
  }

  if (!isAdmin) {
    redirect(`/${locale}/admin/login`);
  }

  return (
    <div className="grid min-h-[80vh] lg:grid-cols-[240px_minmax(0,1fr)]">
      <AdminSidebar
        labels={{
          dashboard: t('dashboard'),
          articles: t('articles'),
          media: t('media'),
          leads: t('leads'),
          subscribers: t('subscribers'),
          viewSite: t('viewSite'),
          logout: t('logout')
        }}
      />
      <div className="border-l border-border px-6 py-8 lg:px-10">
        {children}
      </div>
    </div>
  );
}
