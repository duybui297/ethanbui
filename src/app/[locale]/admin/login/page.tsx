import { setRequestLocale, getTranslations } from 'next-intl/server';
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
