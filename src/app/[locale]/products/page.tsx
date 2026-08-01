import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { SubscribeBlock } from '@/components/site/subscribe-block';
import { Bot, FileText, GraduationCap, Languages, Sparkles, Rocket, ArrowUpRight } from 'lucide-react';

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
  icon: 'bot' | 'fileText' | 'graduationCap' | 'languages';
  status: 'live' | 'upcoming';
  badgeKey?: string; // translation key for the badge (live products)
  badge?: string; // literal badge text (upcoming products)
  titleKey: string;
  descKey: string;
  url: string;
};

/* Part 1 — products that have gone live */
const liveProducts: Product[] = [
  {
    id: 'nihongo',
    icon: 'graduationCap',
    status: 'live',
    badgeKey: 'liveBadge',
    titleKey: 'nihongoTitle',
    descKey: 'nihongoDesc',
    url: 'https://www.ethanbui.net/en/products/access'
  },
  {
    id: 'kanji-radicals',
    icon: 'languages',
    status: 'live',
    badgeKey: 'freeBadge',
    titleKey: 'product3Title',
    descKey: 'product3Desc',
    url: '/hoc-bo-thu-kanji.html'
  }
];

/* Part 2 — products still on the way (unchanged) */
const upcomingProducts: Product[] = [
  {
    id: 'ai-chatbot',
    icon: 'bot',
    status: 'upcoming',
    badge: 'COMING APRIL 2026',
    titleKey: 'product1Title',
    descKey: 'product1Desc',
    url: 'https://aicorelabs.net/products'
  },
  {
    id: 'ai-translator',
    icon: 'fileText',
    status: 'upcoming',
    badge: 'COMING APRIL 2026',
    titleKey: 'product2Title',
    descKey: 'product2Desc',
    url: 'https://aicorelabs.net/products'
  }
];

const iconMap = {
  bot: Bot,
  fileText: FileText,
  graduationCap: GraduationCap,
  languages: Languages
} as const;

function ProductCard({
  product,
  t
}: {
  product: Product;
  t: Awaited<ReturnType<typeof getTranslations>>;
}) {
  const Icon = iconMap[product.icon];
  const isLive = product.status === 'live';
  const badgeText = product.badgeKey ? t(product.badgeKey) : product.badge;

  return (
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col rounded-[var(--radius-lg)] border border-border bg-surface p-8 transition-all duration-300 hover:border-accent-500/40 hover:shadow-lg hover:shadow-accent-500/5 hover:-translate-y-1"
    >
      {/* Badge + Icon row */}
      <div className="flex items-start justify-between mb-5">
        <span
          className={
            isLive
              ? 'inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-3 py-1 text-[11px] font-bold tracking-wider text-success'
              : 'inline-block rounded-full border border-accent-500/20 bg-accent-50 px-3 py-1 text-[11px] font-bold tracking-wider text-accent-500'
          }
        >
          {isLive && (
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
            </span>
          )}
          {badgeText}
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
        {isLive ? t('visitLiveProduct') : t('visitProduct')}
        <ArrowUpRight className="h-4 w-4" />
      </div>
    </a>
  );
}

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
      <section className="mx-auto max-w-[1200px] px-6 pt-16 pb-10 text-center lg:px-10 lg:pt-24 lg:pb-12">
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

      {/* Overview — what this Products section means */}
      <section className="mx-auto max-w-[1200px] px-6 pb-14 lg:px-10">
        <div className="mx-auto flex max-w-[820px] items-start gap-4 rounded-[var(--radius-lg)] border border-border bg-bg-subtle p-6 sm:p-8">
          <div className="hidden h-11 w-11 shrink-0 place-items-center rounded-full bg-accent-50 text-accent-500 sm:grid">
            <Rocket className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-text-1">{t('overviewTitle')}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-text-2">{t('overviewDesc')}</p>
          </div>
        </div>
      </section>

      {/* Part 1 — Live products */}
      <section className="mx-auto max-w-[1200px] px-6 pb-16 lg:px-10">
        <h2 className="mb-6 text-xs font-semibold uppercase tracking-wider text-text-3">
          {t('liveSectionTitle')}
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {liveProducts.map((product) => (
            <ProductCard key={product.id} product={product} t={t} />
          ))}
        </div>
      </section>

      {/* Part 2 — Upcoming products */}
      <section className="mx-auto max-w-[1200px] px-6 pb-20 lg:px-10">
        <h2 className="mb-6 text-xs font-semibold uppercase tracking-wider text-text-3">
          {t('upcomingSectionTitle')}
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {upcomingProducts.map((product) => (
            <ProductCard key={product.id} product={product} t={t} />
          ))}
        </div>
      </section>

      {/* Subscribe */}
      <section className="mx-auto max-w-[1200px] px-6 pb-24 lg:px-10">
        <SubscribeBlock />
      </section>
    </>
  );
}
