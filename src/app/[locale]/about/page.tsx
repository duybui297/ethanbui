import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/lib/i18n/routing';
import { Button } from '@/components/ui/button';

export const revalidate = 3600;

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return { title: t('title') };
}

export default async function AboutPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');

  const pillars = [
    { title: t('pillarsP1Title'), body: t('pillarsP1Body') },
    { title: t('pillarsP2Title'), body: t('pillarsP2Body') },
    { title: t('pillarsP3Title'), body: t('pillarsP3Body') },
    { title: t('pillarsP4Title'), body: t('pillarsP4Body') }
  ];

  const beliefs = [
    t('belief1'),
    t('belief2'),
    t('belief3'),
    t('belief4'),
    t('belief5'),
    t('belief6')
  ];

  return (
    <article className="mx-auto max-w-[820px] px-6 py-20 lg:px-10 lg:py-28">
      <h1 className="text-5xl font-semibold tracking-tight text-text-1 md:text-6xl">
        {t('title')}
      </h1>
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-text-2">
        {t('intro')
          .split('\n\n')
          .map((p, i) => (
            <p key={i}>{p}</p>
          ))}
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight text-text-1">
          {t('pillarsTitle')}
        </h2>
        <div className="mt-6 space-y-8">
          {pillars.map((p) => (
            <div key={p.title}>
              <h3 className="text-lg font-semibold text-text-1">{p.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-text-2">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight text-text-1">
          {t('methodTitle')}
        </h2>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-text-2">
          {t('methodBody')
            .split('\n\n')
            .map((p, i) => (
              <p key={i}>{p}</p>
            ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight text-text-1">
          {t('beliefsTitle')}
        </h2>
        <ul className="mt-5 space-y-2 text-base text-text-2">
          {beliefs.map((b) => (
            <li key={b} className="flex gap-3">
              <span className="text-accent-500">•</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20 rounded-[var(--radius-lg)] border border-border p-8 text-center">
        <h2 className="text-xl font-semibold tracking-tight text-text-1">
          {t('ctaTitle')}
        </h2>
        <div className="mt-5">
          <Button asChild>
            <Link href="/contact">{t('ctaButton')} →</Link>
          </Button>
        </div>
      </section>
    </article>
  );
}
