import { NextResponse, type NextRequest } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { recordProductAccess } from '@/lib/product-access';

/**
 * OAuth (Google / Facebook) return handler.
 *
 * Supabase redirects here with `?code=...`. We exchange it for a session
 * (sets the auth cookies), tag the user with the product they came from,
 * then send them into the product. `next` and `product` are carried through
 * the OAuth `redirectTo` set in the login form.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get('code');
  const productId = searchParams.get('product') ?? '';
  const locale = (searchParams.get('locale') as 'en' | 'vi') || 'en';

  // Same-origin relative redirect only (avoid open redirects).
  const rawNext = searchParams.get('next') ?? '/';
  const next = rawNext.startsWith('/') && !rawNext.startsWith('//') ? rawNext : '/';

  if (!code) {
    return NextResponse.redirect(`${origin}/${locale}/products/access?product=${productId}`);
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(
      `${origin}/${locale}/products/access?product=${productId}&error=oauth`
    );
  }

  // Record which product this user came from.
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (user?.email) {
    const provider = user.app_metadata?.provider === 'facebook' ? 'facebook' : 'google';
    await recordProductAccess({
      email: user.email,
      productId,
      provider,
      locale
    });
  }

  return NextResponse.redirect(`${origin}${next}`);
}
