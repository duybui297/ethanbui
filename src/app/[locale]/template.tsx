'use client';

/**
 * template.tsx re-mounts on every navigation (unlike layout.tsx which persists).
 * This triggers the fade-in animation on every page/locale change, making
 * transitions feel smooth instead of jarring.
 */
export default function LocaleTemplate({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
