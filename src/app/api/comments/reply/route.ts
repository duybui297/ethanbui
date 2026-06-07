import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { sendCommentReplyNotification } from '@/lib/resend';

const Schema = z.object({
  parent_id: z.string().uuid(),
  body: z.string().min(1).max(5000).trim()
});

export async function POST(req: Request) {
  // Verify admin session
  const supabaseUser = await createSupabaseServerClient();
  const { data: { user } } = await supabaseUser.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const adminClient = createSupabaseAdminClient();
  const { data: profile } = await adminClient
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle();

  if (!profile || profile.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await req.json().catch(() => ({}));
  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const { parent_id, body: replyBody } = parsed.data;

  // Fetch parent comment
  const { data: parent } = await adminClient
    .from('comments')
    .select('id, article_id, author_name, author_email, body')
    .eq('id', parent_id)
    .maybeSingle();

  if (!parent) {
    return NextResponse.json({ error: 'Parent comment not found' }, { status: 404 });
  }

  // Fetch article for context (title, slug, locale)
  const { data: article } = await adminClient
    .from('articles')
    .select('id, title, slug, locale')
    .eq('id', parent.article_id)
    .maybeSingle();

  if (!article) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  }

  // Insert admin reply
  const { data: reply, error } = await adminClient
    .from('comments')
    .insert({
      article_id: parent.article_id,
      parent_id: parent.id,
      author_name: 'Ethan',
      body: replyBody,
      is_admin_reply: true
    })
    .select('id, article_id, parent_id, author_name, body, is_admin_reply, created_at')
    .single();

  if (error) {
    console.error('insert admin reply', error);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }

  // Send notification email if parent commenter provided email
  if (parent.author_email) {
    try {
      await sendCommentReplyNotification({
        to: parent.author_email,
        commenterName: parent.author_name,
        originalComment: parent.body,
        replyBody,
        articleTitle: article.title,
        articleUrl: `/${article.locale}/articles/${article.slug}`,
        locale: article.locale
      });
    } catch (e) {
      console.error('comment reply email error', e);
    }
  }

  return NextResponse.json({ ok: true, comment: reply });
}
