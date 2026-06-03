'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

type Heading = { id: string; text: string; level: 2 | 3 };

export function ArticleToc({ source, title }: { source: string; title: string }) {
  const headings = React.useMemo<Heading[]>(() => extractHeadings(source), [source]);
  const [active, setActive] = React.useState<string | null>(null);

  React.useEffect(() => {
    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '0px 0px -70% 0px', threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label={title} className="text-sm">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-3">
        {title}
      </h2>
      <ul className="space-y-2 border-l border-border">
        {headings.map((h) => (
          <li key={h.id} className={cn(h.level === 3 && 'pl-4')}>
            <a
              href={`#${h.id}`}
              className={cn(
                '-ml-px block border-l-2 pl-3 py-0.5 transition-colors',
                active === h.id
                  ? 'border-accent-500 text-text-1'
                  : 'border-transparent text-text-3 hover:text-text-1'
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function extractHeadings(md: string): Heading[] {
  const lines = md.split('\n');
  const heads: Heading[] = [];
  for (const line of lines) {
    const m = /^(#{2,3})\s+(.+)$/.exec(line);
    if (!m) continue;
    const level = m[1].length as 2 | 3;
    const text = m[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
    heads.push({ id, text, level });
  }
  return heads;
}
