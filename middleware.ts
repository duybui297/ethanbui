import { NextResponse, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { createServerClient } from '@supabase/ssr';
import { routing } from './src/lib/i18n/routing';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
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
  const url = new URL(request.url);
  const pathname = url.pathname;
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
  // Match all paths except static files and Next internals.
  matcher: ['/((?!_next|api|.*\\..*).*)']
};
