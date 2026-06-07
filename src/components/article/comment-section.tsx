'use client';

import { useState, useEffect, useCallback, useRef, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';

// ---- Types ----

interface CommentData {
  id: string;
  article_id: string;
  parent_id: string | null;
  author_name: string;
  body: string;
  is_admin_reply: boolean;
  created_at: string;
}

interface CommentTree extends CommentData {
  replies: CommentData[];
}

// ---- Helpers ----

function buildCommentTree(flat: CommentData[]): CommentTree[] {
  const roots: CommentTree[] = [];
  const replyMap = new Map<string, CommentData[]>();

  for (const c of flat) {
    if (c.parent_id) {
      const arr = replyMap.get(c.parent_id) ?? [];
      arr.push(c);
      replyMap.set(c.parent_id, arr);
    } else {
      roots.push({ ...c, replies: [] });
    }
  }

  for (const root of roots) {
    root.replies = replyMap.get(root.id) ?? [];
  }

  return roots;
}

function timeAgo(dateStr: string, t: ReturnType<typeof useTranslations>): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return t('justNow');
  if (minutes < 60) return t('minutesAgo', { count: minutes });
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return t('hoursAgo', { count: hours });
  const days = Math.floor(hours / 24);
  return t('daysAgo', { count: days });
}

// ---- Single comment ----

function CommentBubble({
  comment,
  isReply,
  onReply,
  t
}: {
  comment: CommentData;
  isReply?: boolean;
  onReply?: (id: string, name: string) => void;
  t: ReturnType<typeof useTranslations>;
}) {
  const initials = comment.author_name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={`group relative rounded-[var(--radius-md)] border transition-colors duration-200 ${
        comment.is_admin_reply
          ? 'border-l-[3px] border-l-accent-500 border-t-border border-r-border border-b-border bg-accent-50/40'
          : 'border-border bg-bg-subtle hover:border-border-hi'
      } ${isReply ? 'ml-10 sm:ml-14' : ''}`}
    >
      <div className="p-4 sm:p-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
              comment.is_admin_reply
                ? 'bg-accent-500 text-white'
                : 'bg-bg-muted text-text-2'
            }`}
          >
            {initials}
          </div>
          <div className="flex flex-1 items-center gap-2 text-sm">
            <span className="font-semibold text-text-1">{comment.author_name}</span>
            {comment.is_admin_reply && (
              <span className="inline-flex items-center rounded-full bg-accent-500/10 px-2 py-0.5 text-[11px] font-semibold text-accent-500">
                {t('adminBadge')}
              </span>
            )}
            <span className="text-text-3">·</span>
            <time className="text-text-3" dateTime={comment.created_at}>
              {timeAgo(comment.created_at, t)}
            </time>
          </div>
        </div>

        {/* Body */}
        <div className="mt-3 whitespace-pre-wrap text-[15px] leading-relaxed text-text-2">
          {comment.body}
        </div>

        {/* Actions */}
        {!isReply && onReply && (
          <div className="mt-3 flex items-center">
            <button
              type="button"
              onClick={() => onReply(comment.id, comment.author_name)}
              className="text-xs font-medium text-text-3 transition-colors hover:text-accent-500"
            >
              {t('replyTo')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ---- Comment form ----

function CommentForm({
  articleId,
  parentId,
  replyToName,
  onCancel,
  onSuccess,
  t
}: {
  articleId: string;
  parentId?: string | null;
  replyToName?: string | null;
  onCancel?: () => void;
  onSuccess: (comment: CommentData) => void;
  t: ReturnType<typeof useTranslations>;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [showEmailHint, setShowEmailHint] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!name.trim() || !body.trim()) return;

      setStatus('submitting');
      try {
        const res = await fetch('/api/comments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            article_id: articleId,
            parent_id: parentId ?? null,
            author_name: name.trim(),
            author_email: email.trim() || null,
            body: body.trim()
          })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? 'Failed');
        setStatus('success');
        setName('');
        setEmail('');
        setBody('');
        if (data.comment) onSuccess(data.comment);
        setTimeout(() => setStatus('idle'), 3000);
      } catch {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    },
    [articleId, parentId, name, email, body, onSuccess]
  );

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={`rounded-[var(--radius-lg)] border border-border bg-surface p-5 sm:p-6 ${
        parentId ? 'ml-10 sm:ml-14' : ''
      }`}
    >
      {replyToName && (
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-text-2">
            {t('replyTo')}{' '}
            <span className="font-semibold text-text-1">{replyToName}</span>
          </p>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="text-xs font-medium text-text-3 hover:text-accent-500"
            >
              {t('cancelReply')}
            </button>
          )}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Name */}
        <div>
          <label htmlFor="comment-name" className="mb-1.5 block text-sm font-medium text-text-1">
            {t('nameLabel')} <span className="text-accent-500">*</span>
          </label>
          <input
            id="comment-name"
            type="text"
            required
            maxLength={100}
            placeholder={t('namePlaceholder')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-[var(--radius-sm)] border border-border bg-bg px-3 py-2 text-sm text-text-1 placeholder:text-text-disabled outline-none transition-colors focus:border-accent-500 focus:ring-1 focus:ring-accent-500/30"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="comment-email" className="mb-1.5 block text-sm font-medium text-text-1">
            {t('emailLabel')}
          </label>
          <div className="relative">
            <input
              id="comment-email"
              type="email"
              placeholder={t('emailPlaceholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setShowEmailHint(true)}
              className="w-full rounded-[var(--radius-sm)] border border-border bg-bg px-3 py-2 text-sm text-text-1 placeholder:text-text-disabled outline-none transition-colors focus:border-accent-500 focus:ring-1 focus:ring-accent-500/30"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-text-3 hover:text-text-2"
              onClick={() => setShowEmailHint(!showEmailHint)}
              aria-label="Email info"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4m0-4h.01" />
              </svg>
            </button>
          </div>
          {showEmailHint && (
            <p className="mt-1.5 text-xs leading-relaxed text-text-3 animate-page-in">
              {t('emailHint')}
            </p>
          )}
        </div>
      </div>

      {/* Honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Content */}
      <div className="mt-4">
        <label htmlFor="comment-body" className="mb-1.5 block text-sm font-medium text-text-1">
          {t('contentLabel')} <span className="text-accent-500">*</span>
        </label>
        <textarea
          id="comment-body"
          required
          maxLength={5000}
          rows={4}
          placeholder={t('contentPlaceholder')}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full resize-y rounded-[var(--radius-sm)] border border-border bg-bg px-3 py-2 text-sm leading-relaxed text-text-1 placeholder:text-text-disabled outline-none transition-colors focus:border-accent-500 focus:ring-1 focus:ring-accent-500/30"
        />
      </div>

      {/* Submit */}
      <div className="mt-4 flex items-center gap-3">
        <button
          type="submit"
          disabled={status === 'submitting' || !name.trim() || !body.trim()}
          className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] bg-accent-500 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-accent-600 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
        >
          {status === 'submitting' ? (
            <>
              <span className="inline-block h-3.5 w-3.5 animate-spinner rounded-full border-2 border-white/30 border-t-white" />
              {t('submitting')}
            </>
          ) : (
            t('submit')
          )}
        </button>

        {status === 'success' && (
          <span className="text-sm font-medium text-success animate-page-in">
            ✓ {t('success')}
          </span>
        )}
        {status === 'error' && (
          <span className="text-sm font-medium text-danger animate-page-in">
            {t('error')}
          </span>
        )}
      </div>
    </form>
  );
}

// ---- Main section ----

export function CommentSection({ articleId }: { articleId: string }) {
  const t = useTranslations('comments');
  const [comments, setComments] = useState<CommentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyTarget, setReplyTarget] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchComments() {
      try {
        const res = await fetch(`/api/comments?article_id=${articleId}`);
        const data = await res.json();
        if (!cancelled && data.comments) {
          setComments(data.comments);
        }
      } catch (e) {
        console.error('fetch comments', e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchComments();
    return () => { cancelled = true; };
  }, [articleId]);

  const handleNewComment = useCallback((comment: CommentData) => {
    setComments((prev) => [...prev, comment]);
    setReplyTarget(null);
  }, []);

  const tree = buildCommentTree(comments);
  const totalCount = comments.length;

  return (
    <section id="comments" className="mt-16">
      {/* Section header */}
      <div className="mb-6 flex items-center gap-3">
        <h2 className="text-lg font-semibold text-text-1">
          {t('commentCount', { count: totalCount })}
        </h2>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Comment form (top-level) */}
      {!replyTarget && (
        <div className="mb-8">
          <CommentForm
            articleId={articleId}
            onSuccess={handleNewComment}
            t={t}
          />
        </div>
      )}

      {/* Comments list */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-24 animate-pulse-loading rounded-[var(--radius-md)] bg-bg-subtle" />
          ))}
        </div>
      ) : tree.length === 0 ? (
        <p className="py-8 text-center text-sm text-text-3">{t('empty')}</p>
      ) : (
        <div className="space-y-4">
          {tree.map((comment) => (
            <div key={comment.id} className="animate-page-in">
              <CommentBubble
                comment={comment}
                onReply={(id, name) => setReplyTarget({ id, name })}
                t={t}
              />

              {/* Replies */}
              {comment.replies.length > 0 && (
                <div className="mt-3 space-y-3">
                  {comment.replies.map((reply) => (
                    <CommentBubble key={reply.id} comment={reply} isReply t={t} />
                  ))}
                </div>
              )}

              {/* Reply form */}
              {replyTarget?.id === comment.id && (
                <div className="mt-3 animate-page-in">
                  <CommentForm
                    articleId={articleId}
                    parentId={comment.id}
                    replyToName={replyTarget.name}
                    onCancel={() => setReplyTarget(null)}
                    onSuccess={handleNewComment}
                    t={t}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
