import { NextResponse, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { createServerClient } from '@supabase/ssr';
import { routing } from './src/lib/i18n/routing';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 0. Geo-aware default locale for locale-less paths.
  //    Visitors located in Vietnam default to `vi`; everyone else to `en`.
  //    A user's explicit choice (the NEXT_LOCALE cookie set by the language
  //    switcher) always wins over geo, so switching language sticks.
  const hasLocalePrefix = /^\/(en|vi)(\/|$)/.test(pathname);
  if (!hasLocalePrefix) {
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
    const country = (request.headers.get('x-vercel-ip-country') || '').toUpperCase();
    const locale =
      cookieLocale === 'vi' || cookieLocale === 'en'
        ? cookieLocale
        : country === 'VN'
          ? 'vi'
          : 'en';

    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
    return NextResponse.redirect(redirectUrl);
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
  matcher: ['/((?!_next|api|products/nihongo|.*\\..*).*)']
};
