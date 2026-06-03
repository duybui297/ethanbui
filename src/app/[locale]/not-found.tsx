import { getTranslations } from 'next-intl/server';
import { Link } from '@/lib/i18n/routing';
import { Button } from '@/components/ui/button';

export default async function NotFound() {
  const t = await getTranslations('notFound');
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-[680px] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-semibold tracking-tight text-text-1 md:text-5xl">
        {t('title')}
      </h1>
      <p className="mt-4 text-lg text-text-2">{t('body')}</p>
      <div className="mt-8 flex gap-3">
        <Button asChild>
          <Link href="/">{t('ctaHome')} →</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/articles">{t('ctaLatest')}</Link>
        </Button>
      </div>
    </section>
  );
}
