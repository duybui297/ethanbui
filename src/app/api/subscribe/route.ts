import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { subscribeToBeehiiv } from '@/lib/beehiiv';

const Schema = z.object({
  email: z.string().email(),
  locale: z.enum(['en', 'vi']).default('en'),
  source: z.string().max(50).optional(),
  // Honeypot. Real users never see or fill this. Bots auto-fill every field.
  website: z.string().optional()
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }
  const input = parsed.data;

  // Honeypot tripped: pretend success, but don't subscribe anyone. Keeps the
  // bot from retrying and keeps junk out of Beehiiv and the subscribers table.
  if (input.website && input.website.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  let beehiivId: string | undefined;
  try {
    const r = await subscribeToBeehiiv(input);
    if ('id' in r) beehiivId = r.id;
  } catch (e) {
    console.error('beehiiv error', e);
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from('subscribers')
    .upsert(
      {
        email: input.email,
        locale: input.locale,
        source: input.source ?? 'site',
        beehiiv_id: beehiivId ?? null
      },
      { onConflict: 'email' }
    );
  if (error) {
    console.error('subscribers upsert', error);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
