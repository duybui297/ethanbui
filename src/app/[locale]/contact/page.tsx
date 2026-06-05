import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { ContactForm } from './contact-form';

export const revalidate = 3600;

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return { title: t('title'), description: t('subtitle') };
}

export default async function ContactPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-16 lg:px-10 lg:py-24">
      <header className="mx-auto max-w-[820px]">
        <h1 className="text-4xl font-semibold tracking-tight text-text-1 md:text-5xl">
          {t('title')}
        </h1>
        <p className="mt-4 text-lg text-text-2">{t('subtitle')}</p>
      </header>

      <div className="mx-auto mt-12 grid max-w-[1100px] gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <ContactForm />

        <aside className="lg:pl-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-text-3">
            {t('sideTitle')}
          </h2>
          <ul className="mt-4 space-y-3 text-sm">

            <li>
              <span className="text-text-3">{t('sideLinkedinLabel')}:</span>{' '}
              <a className="text-accent-500 hover:underline" href="https://www.linkedin.com/in/ethanbui92" target="_blank" rel="noreferrer">
                linkedin.com/in/ethanbui92
              </a>
            </li>
            <li>
              <span className="text-text-3">{t('sideMediumLabel')}:</span>{' '}
              <a className="text-accent-500 hover:underline" href="https://medium.com/@ethanbui92" target="_blank" rel="noreferrer">
                medium.com/@ethanbui92
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
