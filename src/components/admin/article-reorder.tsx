'use client';

import { useState, useTransition, useCallback, useRef } from 'react';
import { reorderArticles } from '@/app/[locale]/admin/articles/actions';

interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  status: string;
  published_at: string | null;
  display_order: number;
}

interface ArticleReorderProps {
  articles: ArticleItem[];
  labels: {
    title: string;
    saveOrder: string;
    saving: string;
    saved: string;
    dragHint: string;
    colOrder: string;
    colTitle: string;
    colStatus: string;
  };
}

export function ArticleReorder({ articles: initial, labels }: ArticleReorderProps) {
  const [items, setItems] = useState<ArticleItem[]>(initial);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);
  const dragNode = useRef<HTMLTableRowElement | null>(null);

  const hasChanges = items.some((item, i) => item.id !== initial[i]?.id);

  const handleDragStart = useCallback((e: React.DragEvent, idx: number) => {
    setDragIdx(idx);
    dragNode.current = e.currentTarget as HTMLTableRowElement;
    e.dataTransfer.effectAllowed = 'move';
    // Make the drag image slightly transparent
    setTimeout(() => {
      if (dragNode.current) {
        dragNode.current.style.opacity = '0.4';
      }
    }, 0);
  }, []);

  const handleDragEnd = useCallback(() => {
    if (dragNode.current) {
      dragNode.current.style.opacity = '1';
    }
    setDragIdx(null);
    setOverIdx(null);
    dragNode.current = null;
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, idx: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setOverIdx(idx);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, dropIdx: number) => {
    e.preventDefault();
    if (dragIdx === null || dragIdx === dropIdx) return;

    setItems((prev) => {
      const next = [...prev];
      const [moved] = next.splice(dragIdx, 1);
      next.splice(dropIdx, 0, moved);
      return next;
    });
    setSaved(false);
    setDragIdx(null);
    setOverIdx(null);
  }, [dragIdx]);

  // Move item up/down with buttons (accessible alternative to drag)
  const moveItem = useCallback((idx: number, direction: 'up' | 'down') => {
    setItems((prev) => {
      const next = [...prev];
      const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (swapIdx < 0 || swapIdx >= next.length) return prev;
      [next[idx], next[swapIdx]] = [next[swapIdx], next[idx]];
      return next;
    });
    setSaved(false);
  }, []);

  const handleSave = useCallback(() => {
    const orderedIds = items.map((a) => a.id);
    startTransition(async () => {
      try {
        await reorderArticles(orderedIds);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } catch (err) {
        console.error('Failed to reorder:', err);
      }
    });
  }, [items]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-text-3">{labels.dragHint}</p>
        <button
          onClick={handleSave}
          disabled={isPending || !hasChanges}
          className="inline-flex items-center gap-2 rounded-md bg-accent-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? (
            <>
              <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              {labels.saving}
            </>
          ) : saved ? (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {labels.saved}
            </>
          ) : (
            labels.saveOrder
          )}
        </button>
      </div>

      <div className="overflow-hidden rounded-md border border-border">
        <table className="w-full text-sm">
          <thead className="bg-bg-subtle text-left text-xs uppercase tracking-wider text-text-3">
            <tr>
              <th className="w-16 px-4 py-3 text-center">{labels.colOrder}</th>
              <th className="px-4 py-3">{labels.colTitle}</th>
              <th className="w-28 px-4 py-3">{labels.colStatus}</th>
              <th className="w-20 px-4 py-3 text-center"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((item, idx) => (
              <tr
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, idx)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => handleDragOver(e, idx)}
                onDrop={(e) => handleDrop(e, idx)}
                className={`
                  cursor-grab transition-colors active:cursor-grabbing
                  ${dragIdx === idx ? 'opacity-40' : ''}
                  ${overIdx === idx && dragIdx !== idx
                    ? 'border-t-2 !border-t-accent-500 bg-accent-500/5'
                    : 'hover:bg-bg-muted'}
                `}
              >
                <td className="px-4 py-3 text-center">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-bg-subtle text-xs font-semibold text-text-2">
                    {idx + 1}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {/* Drag handle icon */}
                    <svg
                      className="h-4 w-4 flex-shrink-0 text-text-3"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="9" cy="5" r="1.5" />
                      <circle cx="15" cy="5" r="1.5" />
                      <circle cx="9" cy="12" r="1.5" />
                      <circle cx="15" cy="12" r="1.5" />
                      <circle cx="9" cy="19" r="1.5" />
                      <circle cx="15" cy="19" r="1.5" />
                    </svg>
                    <div>
                      <span className="font-medium text-text-1">{item.title}</span>
                      <div className="text-xs text-text-3">/{item.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                      item.status === 'published'
                        ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                        : 'bg-bg-subtle text-text-3'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={() => moveItem(idx, 'up')}
                      disabled={idx === 0}
                      className="rounded p-1 text-text-3 transition-colors hover:bg-bg-subtle hover:text-text-1 disabled:opacity-30"
                      aria-label="Move up"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => moveItem(idx, 'down')}
                      disabled={idx === items.length - 1}
                      className="rounded p-1 text-text-3 transition-colors hover:bg-bg-subtle hover:text-text-1 disabled:opacity-30"
                      aria-label="Move down"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
