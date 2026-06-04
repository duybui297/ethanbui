'use client';

import * as React from 'react';
import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/lib/i18n/routing';
import { locales } from '@/lib/i18n/config';
import { useAlternateLinks } from './alternate-link-context';
import { cn } from '@/lib/utils';

export function LangSwitcher({ label }: { label: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const { links } = useAlternateLinks();
  const [pending, setPending] = React.useState(false);

  // Reset pending state when navigation completes (pathname/locale changes)
  React.useEffect(() => {
    setPending(false);
  }, [pathname, locale]);

  return (
    <div
      className={cn(
        'flex items-center gap-1 text-xs font-medium transition-opacity duration-200',
        pending && 'pointer-events-none opacity-40'
      )}
      aria-label={label}
    >
      {locales.map((l, i) => {
        const href = links[l] ?? pathname;
        return (
          <Link
            key={l}
            href={href}
            locale={l}
            replace
            onClick={() => {
              if (l !== locale) setPending(true);
            }}
            className={cn(
              'rounded px-1.5 py-1 uppercase transition-colors hover:bg-bg-muted',
              locale === l ? 'text-accent-500' : 'text-text-3'
            )}
            aria-current={locale === l ? 'true' : undefined}
          >
            {l}
            {i === 0 && <span className="ml-1 text-text-disabled">|</span>}
          </Link>
        );
      })}
    </div>
  );
}

