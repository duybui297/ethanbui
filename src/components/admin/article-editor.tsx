'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { saveArticle, deleteArticle, uploadImage } from '@/app/[locale]/admin/articles/actions';
import type { Article, ArticleStatus, Locale } from '@/lib/supabase/types';
import { slugify } from '@/lib/utils';

type Props =
  | { mode: 'create'; defaultLocale: Locale; article?: never }
  | { mode: 'edit'; defaultLocale: Locale; article: Article };

export function ArticleEditor(props: Props) {
  const { mode, defaultLocale } = props;
  const t = useTranslations('admin.articles');
  const router = useRouter();
  const [saving, setSaving] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  const a = props.article;
  const [title, setTitle] = React.useState(a?.title ?? '');
  const [slug, setSlug] = React.useState(a?.slug ?? '');
  const [excerpt, setExcerpt] = React.useState(a?.excerpt ?? '');
  const [body, setBody] = React.useState(a?.body_md ?? '');
  const [status, setStatus] = React.useState<ArticleStatus>(a?.status ?? 'draft');
  const [locale, setLocale] = React.useState<Locale>(a?.locale ?? defaultLocale);
  const [metaTitle, setMetaTitle] = React.useState(a?.meta_title ?? '');
  const [metaDesc, setMetaDesc] = React.useState(a?.meta_description ?? '');
  const [canonical, setCanonical] = React.useState(a?.canonical_url ?? '');
  const [featured, setFeatured] = React.useState(a?.og_image_url ?? '');

  const [uploadingCover, setUploadingCover] = React.useState(false);
  const [uploadingBody, setUploadingBody] = React.useState(false);
  const bodyRef = React.useRef<HTMLTextAreaElement>(null);
  const coverInputRef = React.useRef<HTMLInputElement>(null);
  const bodyInputRef = React.useRef<HTMLInputElement>(null);

  // Auto-slug while creating
  React.useEffect(() => {
    if (mode === 'create' && title && !slug) setSlug(slugify(title));
  }, [title, slug, mode]);

  async function uploadFile(file: File): Promise<string> {
    const fd = new FormData();
    fd.set('file', file);
    const res = await uploadImage(fd);
    return res.url;
  }

  async function onCoverFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setUploadingCover(true);
    try {
      const url = await uploadFile(file);
      setFeatured(url);
    } catch (err) {
      console.error(err);
      toast.error(t('uploadError'));
    } finally {
      setUploadingCover(false);
    }
  }

  function insertIntoBody(snippet: string) {
    const el = bodyRef.current;
    if (!el) {
      setBody((b) => (b ? `${b}\n\n${snippet}\n` : `${snippet}\n`));
      return;
    }
    const start = el.selectionStart ?? body.length;
    const end = el.selectionEnd ?? body.length;
    const next = body.slice(0, start) + snippet + body.slice(end);
    setBody(next);
    requestAnimationFrame(() => {
      el.focus();
      const pos = start + snippet.length;
      el.setSelectionRange(pos, pos);
    });
  }

  async function onBodyFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setUploadingBody(true);
    try {
      const url = await uploadFile(file);
      const alt = window.prompt(t('altPrompt'), '') ?? '';
      insertIntoBody(`\n![${alt}](${url})\n`);
    } catch (err) {
      console.error(err);
      toast.error(t('uploadError'));
    } finally {
      setUploadingBody(false);
    }
  }

  async function onSave(nextStatus?: ArticleStatus) {
    setSaving(true);
    try {
      const fd = new FormData();
      if (a?.id) fd.set('id', a.id);
      fd.set('locale', locale);
      fd.set('slug', slug);
      fd.set('title', title);
      fd.set('excerpt', excerpt ?? '');
      fd.set('body_md', body);
      fd.set('status', nextStatus ?? status);
      fd.set('meta_title', metaTitle ?? '');
      fd.set('meta_description', metaDesc ?? '');
      fd.set('canonical_url', canonical ?? '');
      fd.set('featured_image_url', featured ?? '');
      const res = await saveArticle(fd);
      toast.success(t('saved'));
      if (mode === 'create') router.push(`/${locale}/admin/articles/${res.id}`);
      else router.refresh();
    } catch (err) {
      console.error(err);
      toast.error('Save failed.');
    } finally {
      setSaving(false);
    }
  }

  async function onDelete() {
    if (!a?.id) return;
    if (!confirm(t('deleteConfirm'))) return;
    setDeleting(true);
    try {
      await deleteArticle(a.id, locale);
      toast.success(t('deleted'));
    } catch (err) {
      console.error(err);
      toast.error('Delete failed.');
    } finally {
      setDeleting(false);
    }
  }

  return (
    <section>
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight text-text-1">
          {mode === 'create' ? t('newArticle') : t('editorTitle')}
        </h1>
        <div className="flex gap-2">
          {mode === 'edit' && (
            <Button variant="ghost" onClick={onDelete} disabled={deleting}>
              {t('delete')}
            </Button>
          )}
          <Button variant="secondary" onClick={() => onSave('draft')} disabled={saving}>
            {saving ? t('saving') : t('save')}
          </Button>
          <Button onClick={() => onSave('published')} disabled={saving}>
            {t('publish')}
          </Button>
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="title">{t('fieldTitle')}</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="slug">{t('fieldSlug')}</Label>
            <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="excerpt">{t('fieldExcerpt')}</Label>
            <Textarea
              id="excerpt"
              rows={2}
              value={excerpt ?? ''}
              onChange={(e) => setExcerpt(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="body">{t('fieldBody')}</Label>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => bodyInputRef.current?.click()}
                disabled={uploadingBody}
              >
                {uploadingBody ? t('uploading') : t('insertImage')}
              </Button>
              <input
                ref={bodyInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onBodyFile}
              />
            </div>
            <Textarea
              id="body"
              ref={bodyRef}
              rows={28}
              className="font-mono text-[14px]"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            <p className="text-xs text-text-3">
              Markdown supported. Headings, code, lists, tables (GFM). Use the
              button above to upload an image at the cursor.
            </p>
          </div>
        </div>

        <aside className="grid h-fit gap-5 rounded-[var(--radius-md)] border border-border bg-bg-subtle p-5">
          <div className="grid gap-2">
            <Label>{t('fieldLocale')}</Label>
            <Select value={locale} onValueChange={(v) => setLocale(v as Locale)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">EN</SelectItem>
                <SelectItem value="vi">VI</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>{t('fieldStatus')}</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as ArticleStatus)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">{t('statusDraft')}</SelectItem>
                <SelectItem value="published">{t('statusPublished')}</SelectItem>
                <SelectItem value="scheduled">{t('statusScheduled')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="featured">{t('coverImage')}</Label>
            {featured ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={featured}
                alt=""
                className="aspect-[16/9] w-full rounded-[var(--radius-sm)] border border-border object-cover"
              />
            ) : null}
            <div className="flex gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => coverInputRef.current?.click()}
                disabled={uploadingCover}
              >
                {uploadingCover ? t('uploading') : t('upload')}
              </Button>
              {featured ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setFeatured('')}
                  disabled={uploadingCover}
                >
                  {t('removeCover')}
                </Button>
              ) : null}
            </div>
            <input
              ref={coverInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onCoverFile}
            />
            <Input
              id="featured"
              type="url"
              placeholder="https://..."
              value={featured ?? ''}
              onChange={(e) => setFeatured(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="metaTitle">{t('fieldSeoTitle')}</Label>
            <Input
              id="metaTitle"
              value={metaTitle ?? ''}
              onChange={(e) => setMetaTitle(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="metaDesc">{t('fieldSeoDescription')}</Label>
            <Textarea
              id="metaDesc"
              rows={3}
              value={metaDesc ?? ''}
              onChange={(e) => setMetaDesc(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="canonical">{t('fieldCanonical')}</Label>
            <Input
              id="canonical"
              type="url"
              placeholder="https://..."
              value={canonical ?? ''}
              onChange={(e) => setCanonical(e.target.value)}
            />
          </div>
        </aside>
      </div>
    </section>
  );
}
