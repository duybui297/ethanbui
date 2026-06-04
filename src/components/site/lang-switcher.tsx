'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/lib/i18n/routing';
import { locales } from '@/lib/i18n/config';
import { cn } from '@/lib/utils';

export function LangSwitcher({ label }: { label: string }) {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 text-xs font-medium" aria-label={label}>
      {locales.map((l, i) => (
        <Link
          key={l}
          href={pathname}
          locale={l}
          replace
          className={cn(
            'rounded px-1.5 py-1 uppercase transition-colors hover:bg-bg-muted',
            locale === l ? 'text-accent-500' : 'text-text-3'
          )}
          aria-current={locale === l ? 'true' : undefined}
        >
          {l}
          {i === 0 && <span className="ml-1 text-text-disabled">|</span>}
        </Link>
      ))}
    </div>
  );
}
