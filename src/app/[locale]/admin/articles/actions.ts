'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { estimateReadingTime, slugify } from '@/lib/utils';

const ArticleSchema = z.object({
  id: z.string().uuid().optional(),
  locale: z.enum(['en', 'vi']),
  slug: z.string().min(1).max(200),
  title: z.string().min(1).max(300),
  excerpt: z.string().max(500).optional().nullable(),
  body_md: z.string().default(''),
  status: z.enum(['draft', 'published', 'scheduled']).default('draft'),
  published_at: z.string().optional().nullable(),
  meta_title: z.string().max(70).optional().nullable(),
  meta_description: z.string().max(180).optional().nullable(),
  canonical_url: z.string().url().optional().nullable().or(z.literal('')),
  featured_image_url: z.string().url().optional().nullable().or(z.literal(''))
});

export type ArticleInput = z.infer<typeof ArticleSchema>;

async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  if (profile?.role !== 'admin') throw new Error('Not admin');
  return { supabase, userId: user.id };
}

export async function saveArticle(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = ArticleSchema.parse({
    ...raw,
    excerpt: raw.excerpt || null,
    published_at: raw.published_at || null,
    meta_title: raw.meta_title || null,
    meta_description: raw.meta_description || null,
    canonical_url: raw.canonical_url || null,
    featured_image_url: raw.featured_image_url || null
  });

  const { supabase, userId } = await requireAdmin();
  const reading = estimateReadingTime(parsed.body_md);
  const slug = parsed.slug || slugify(parsed.title);

  const upsertPayload = {
    locale: parsed.locale,
    slug,
    title: parsed.title,
    excerpt: parsed.excerpt ?? null,
    body_md: parsed.body_md,
    status: parsed.status,
    published_at:
      parsed.status === 'published'
        ? parsed.published_at ?? new Date().toISOString()
        : parsed.published_at,
    reading_time: reading,
    meta_title: parsed.meta_title ?? null,
    meta_description: parsed.meta_description ?? null,
    canonical_url: parsed.canonical_url || null,
    og_image_url: parsed.featured_image_url || null,
    author_id: userId
  };

  let id = parsed.id;
  if (id) {
    const { error } = await supabase
      .from('articles')
      .update(upsertPayload)
      .eq('id', id);
    if (error) throw error;
  } else {
    const { data, error } = await supabase
      .from('articles')
      .insert(upsertPayload)
      .select('id')
      .single();
    if (error) throw error;
    id = data.id;
  }

  revalidatePath(`/${parsed.locale}/articles`);
  revalidatePath(`/${parsed.locale}/articles/${slug}`);
  revalidatePath(`/${parsed.locale}`);
  return { id };
}

export async function deleteArticle(id: string, locale: 'en' | 'vi') {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from('articles').delete().eq('id', id);
  if (error) throw error;
  revalidatePath(`/${locale}/articles`);
  revalidatePath(`/${locale}`);
  redirect(`/${locale}/admin/articles`);
}

const ALLOWED_IMAGE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/gif',
  'image/avif',
  'image/svg+xml'
];
const MAX_IMAGE_BYTES = 8 * 1024 * 1024; // 8 MB

/**
 * Upload an image to the public `media` storage bucket and record it in the
 * media table. Admin-gated. Returns the public URL to drop into markdown or
 * use as a cover image. Uses the service-role client for the storage write so
 * we don't depend on storage RLS policies.
 */
export async function uploadImage(
  formData: FormData
): Promise<{ url: string; path: string }> {
  const { userId } = await requireAdmin();

  const file = formData.get('file');
  if (!(file instanceof File) || file.size === 0) {
    throw new Error('No file provided');
  }
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error(`Unsupported file type: ${file.type || 'unknown'}`);
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error('File too large (max 8 MB)');
  }

  const ext = (file.name.split('.').pop() || 'bin').toLowerCase().replace(/[^a-z0-9]/g, '');
  const base = slugify(file.name.replace(/\.[^.]+$/, '')) || 'image';
  const path = `articles/${Date.now()}-${base}.${ext}`;

  const bytes = new Uint8Array(await file.arrayBuffer());
  const admin = createSupabaseAdminClient();

  const { error: uploadError } = await admin.storage
    .from('media')
    .upload(path, bytes, { contentType: file.type, upsert: false });
  if (uploadError) throw uploadError;

  const { data: pub } = admin.storage.from('media').getPublicUrl(path);

  await admin
    .from('media')
    .insert({ bucket_path: path, mime: file.type, uploaded_by: userId });

  return { url: pub.publicUrl, path };
}
