import { NextResponse, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { createServerClient } from '@supabase/ssr';
import { routing } from './src/lib/i18n/routing';
import { gatedProductForPath } from './src/lib/products';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // -1. Hard-gate go-live products. These static apps live OUTSIDE i18n
  //     routing (e.g. /products/nihongo), so we handle them before the geo
  //     block to avoid wrongly prefixing them with a locale. Unauthenticated
  //     visitors are sent to the product login page.
  const gatedProduct = gatedProductForPath(pathname);
  if (gatedProduct) {
    const response = NextResponse.next();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookies) {
            cookies.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          }
        }
      }
    );
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      const country = (request.headers.get('x-vercel-ip-country') || '').toUpperCase();
      const locale = country === 'VN' ? 'vi' : 'en';
      const redirectUrl = new URL(`/${locale}/products/access`, request.url);
      redirectUrl.searchParams.set('product', gatedProduct.id);
      redirectUrl.searchParams.set('next', pathname);
      const res = NextResponse.redirect(redirectUrl);
      res.headers.set('Cache-Control', 'no-store');
      return res;
    }
    return response;
  }

  // 0. Geo-aware default locale for locale-less paths.
  //    Visitors located in Vietnam get `vi`; everyone else gets `en`.
  //    We intentionally do NOT honour the NEXT_LOCALE cookie here: next-intl
  //    auto-writes that cookie on every prefixed visit, so respecting it would
  //    permanently pin a VN user to `en` after a single /en page view. Manual
  //    language switching still works because the switcher navigates straight
  //    to a prefixed URL (/en/... or /vi/...), which this block leaves alone.
  const hasLocalePrefix = /^\/(en|vi)(\/|$)/.test(pathname);
  if (!hasLocalePrefix) {
    const country = (request.headers.get('x-vercel-ip-country') || '').toUpperCase();
    const locale = country === 'VN' ? 'vi' : 'en';

    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
    const res = NextResponse.redirect(redirectUrl);
    // Never let a CDN cache this geo redirect and serve one region's result to
    // everyone — that would pin all visitors to whichever locale was cached first.
    res.headers.set('Cache-Control', 'no-store');
    res.headers.set('Vary', 'x-vercel-ip-country');
    // TEMP DEBUG: inspect in DevTools -> Network -> the redirect request ->
    // Response Headers. Shows exactly what country Vercel reported.
    res.headers.set('x-debug-geo-country', country || 'none');
    return res;
  }

  // 1. Refresh Supabase auth cookies on every request.
  const response = intlMiddleware(request);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookies) {
          cookies.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        }
      }
    }
  );

  const {
    data: { user }
  } = await supabase.auth.getUser();

  // 2. Gate /admin routes (except /admin/login) behind auth.
  const isAdminRoute = /^\/(en|vi)\/admin(\/|$)/.test(pathname);
  const isLoginRoute = /^\/(en|vi)\/admin\/login(\/|$)/.test(pathname);

  if (isAdminRoute && !isLoginRoute && !user) {
    const locale = pathname.split('/')[1] || 'en';
    const redirectUrl = new URL(`/${locale}/admin/login`, request.url);
    redirectUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  // Match all paths except static files, Next internals, and the standalone
  // Japanese learning app mounted at /products/nihongo (must bypass i18n routing).
  matcher: [
    // The bare root must be listed explicitly — the catch-all pattern below
    // does NOT match '/', which otherwise 404s (there is no app/page.tsx, only
    // app/[locale]). Without this, the geo redirect never runs for the root.
    '/',
    // Gated product entry pages. Middleware must run here to enforce the auth
    // gate. The product's own assets (css/js, which carry file extensions) are
    // excluded by the catch-all below and load normally once the gate passes.
    // When you add a new gated product, add its entry path here too.
    '/products/nihongo',
    '/((?!_next|api|products/nihongo|.*\\..*).*)'
  ]
};
