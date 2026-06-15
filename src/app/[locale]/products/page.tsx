import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { SubscribeBlock } from '@/components/site/subscribe-block';
import { Bot, FileText, Sparkles, ArrowUpRight } from 'lucide-react';

export const revalidate = 60;

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'products' });
  return { title: t('title'), description: t('subtitle') };
}

/* ── Product data (hardcoded) ── */
type Product = {
  id: string;
  icon: 'bot' | 'fileText';
  badge: string;
  titleKey: string;
  descKey: string;
  url: string;
};

const products: Product[] = [
  {
    id: 'ai-chatbot',
    icon: 'bot',
    badge: 'COMING APRIL 2026',
    titleKey: 'product1Title',
    descKey: 'product1Desc',
    url: 'https://aicorelabs.net/products'
  },
  {
    id: 'ai-translator',
    icon: 'fileText',
    badge: 'COMING APRIL 2026',
    titleKey: 'product2Title',
    descKey: 'product2Desc',
    url: 'https://aicorelabs.net/products'
  }
];

const iconMap = {
  bot: Bot,
  fileText: FileText
} as const;

export default async function ProductsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('products');

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-[1200px] px-6 pt-16 pb-12 text-center lg:px-10 lg:pt-24 lg:pb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent-500/30 bg-accent-50 px-4 py-1.5 text-xs font-semibold text-accent-500 mb-6">
          <Sparkles className="h-3.5 w-3.5" />
          {t('badge')}
        </div>
        <h1 className="text-4xl font-semibold tracking-tight text-text-1 md:text-5xl lg:text-6xl">
          {t('title')}
        </h1>
        <p className="mx-auto mt-4 max-w-[640px] text-lg leading-relaxed text-text-2">
          {t('subtitle')}
        </p>
      </section>

      {/* Products grid */}
      <section className="mx-auto max-w-[1200px] px-6 pb-20 lg:px-10">
        <div className="grid gap-6 md:grid-cols-2">
          {products.map((product) => {
            const Icon = iconMap[product.icon];
            return (
              <a
                key={product.id}
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col rounded-[var(--radius-lg)] border border-border bg-surface p-8 transition-all duration-300 hover:border-accent-500/40 hover:shadow-lg hover:shadow-accent-500/5 hover:-translate-y-1"
              >
                {/* Badge + Icon row */}
                <div className="flex items-start justify-between mb-5">
                  <span className="inline-block rounded-full border border-accent-500/20 bg-accent-50 px-3 py-1 text-[11px] font-bold tracking-wider text-accent-500">
                    {product.badge}
                  </span>
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-accent-50 text-accent-500 transition-colors group-hover:bg-accent-500 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-xl font-semibold text-text-1 group-hover:text-accent-500 transition-colors">
                  {t(product.titleKey)}
                </h2>

                {/* Description */}
                <p className="mt-3 text-sm leading-relaxed text-text-2 flex-1">
                  {t(product.descKey)}
                </p>

                {/* Arrow indicator */}
                <div className="mt-6 flex items-center gap-1.5 text-sm font-medium text-accent-500 opacity-0 translate-x-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                  {t('visitProduct')}
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* Subscribe */}
      <section className="mx-auto max-w-[1200px] px-6 pb-24 lg:px-10">
        <SubscribeBlock />
      </section>
    </>
  );
}
