import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { sendLeadAck, sendLeadNotification } from '@/lib/resend';

const Schema = z.object({
  intent: z.enum(['workshop', 'speaking', 'advisory', 'podcast', 'other']),
  name: z.string().min(1).max(200),
  email: z.string().email(),
  company: z.string().max(200).optional().nullable(),
  brief: z.string().min(1).max(5000),
  locale: z.enum(['en', 'vi']).default('en'),
  website: z.string().optional() // honeypot
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }
  const { website, ...input } = parsed.data;
  if (website && website.length > 0) {
    // Honeypot tripped, silently succeed.
    return NextResponse.json({ ok: true });
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from('leads').insert({
    intent: input.intent,
    name: input.name,
    email: input.email,
    company: input.company ?? null,
    brief: input.brief,
    locale: input.locale
  });
  if (error) {
    console.error('insert lead', error);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }

  // Best-effort notifications.
  try {
    await Promise.all([
      sendLeadNotification(input),
      sendLeadAck({ to: input.email, locale: input.locale })
    ]);
  } catch (e) {
    console.error('email error', e);
  }

  return NextResponse.json({ ok: true });
}
