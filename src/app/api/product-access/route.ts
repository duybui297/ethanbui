import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { recordProductAccess } from '@/lib/product-access';

const Schema = z.object({
  product: z.string().max(50),
  provider: z.enum(['email', 'google', 'facebook']).default('email'),
  locale: z.enum(['en', 'vi']).default('en')
});

/**
 * Called by the email-code flow after `verifyOtp` succeeds (the session
 * cookie is already set). Tags the authenticated user with the product they
 * signed up from. OAuth users are handled in /api/auth/callback instead.
 */
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  await recordProductAccess({
    email: user.email,
    productId: parsed.data.product,
    provider: parsed.data.provider,
    locale: parsed.data.locale
  });

  return NextResponse.json({ ok: true });
}
