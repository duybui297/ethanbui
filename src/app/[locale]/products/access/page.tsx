import { setRequestLocale, getTranslations } from 'next-intl/server';
import { GATED_PRODUCTS, getGatedProduct } from '@/lib/products';
import { ProductAuthForm } from './product-auth-form';

export const dynamic = 'force-dynamic';

export default async function ProductAccessPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ product?: string; next?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const sp = await searchParams;
  const t = await getTranslations('productAuth');

  // Resolve the product being unlocked. Fall back to the first gated product
  // so the page is never empty if the param is missing.
  const product =
    getGatedProduct(sp.product) ?? GATED_PRODUCTS[0] ?? null;

  // Only allow same-origin relative redirect targets (avoid open redirects).
  const rawNext = sp.next ?? product?.path ?? '/';
  const next = rawNext.startsWith('/') && !rawNext.startsWith('//')
    ? rawNext
    : (product?.path ?? '/');

  return (
    <section className="mx-auto flex min-h-[80vh] max-w-[440px] flex-col justify-center px-6 py-12">
      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-accent-500/30 bg-accent-50 px-3 py-1 text-[11px] font-semibold tracking-wider text-accent-500">
        {t('badge')}
      </div>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-text-1">
        {t('title', { product: product?.name ?? '' })}
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-text-2">
        {t('subtitle')}
      </p>

      <div className="mt-8">
        <ProductAuthForm productId={product?.id ?? ''} next={next} locale={locale} />
      </div>

      <p className="mt-6 text-xs leading-relaxed text-text-3">
        {t('legal')}
      </p>
    </section>
  );
}
