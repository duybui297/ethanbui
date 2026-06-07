import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';

const PostSchema = z.object({
  article_id: z.string().uuid(),
  parent_id: z.string().uuid().optional().nullable(),
  author_name: z.string().min(1).max(100).trim(),
  author_email: z.string().email().optional().nullable().or(z.literal('')),
  body: z.string().min(1).max(5000).trim(),
  website: z.string().optional() // honeypot
});

export async function GET(req: NextRequest) {
  const articleId = req.nextUrl.searchParams.get('article_id');
  if (!articleId) {
    return NextResponse.json({ error: 'article_id required' }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from('comments')
    .select('id, article_id, parent_id, author_name, body, is_admin_reply, created_at')
    .eq('article_id', articleId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('fetch comments', error);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }

  return NextResponse.json({ comments: data ?? [] });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const parsed = PostSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid input', details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { website, author_email, ...input } = parsed.data;

  // Honeypot tripped — silently succeed
  if (website && website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const supabase = createSupabaseAdminClient();

  // Verify article exists
  const { data: article } = await supabase
    .from('articles')
    .select('id')
    .eq('id', input.article_id)
    .eq('status', 'published')
    .maybeSingle();

  if (!article) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  }

  // If replying, verify parent comment exists and belongs to same article
  if (input.parent_id) {
    const { data: parent } = await supabase
      .from('comments')
      .select('id, article_id')
      .eq('id', input.parent_id)
      .maybeSingle();

    if (!parent || parent.article_id !== input.article_id) {
      return NextResponse.json({ error: 'Parent comment not found' }, { status: 404 });
    }
  }

  const { data: comment, error } = await supabase
    .from('comments')
    .insert({
      article_id: input.article_id,
      parent_id: input.parent_id ?? null,
      author_name: input.author_name,
      author_email: author_email && author_email.length > 0 ? author_email : null,
      body: input.body,
      is_admin_reply: false
    })
    .select('id, article_id, parent_id, author_name, body, is_admin_reply, created_at')
    .single();

  if (error) {
    console.error('insert comment', error);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }

  return NextResponse.json({ ok: true, comment });
}
