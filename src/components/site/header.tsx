'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { Link, usePathname } from '@/lib/i18n/routing';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './theme-toggle';
import { LangSwitcher } from './lang-switcher';
import { cn } from '@/lib/utils';

export function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 200);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => setOpen(false), [pathname]);

  const nav = [
    { href: '/about', label: t('nav.about') },
    { href: '/articles', label: t('nav.articles') },
    { href: '/contact', label: t('nav.contact') }
  ] as const;

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full border-b border-transparent transition-colors',
        scrolled && 'border-border bg-bg/90 backdrop-blur'
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:rounded focus:bg-accent-500 focus:px-3 focus:py-1.5 focus:text-white"
      >
        {t('nav.skipToContent')}
      </a>

      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-6 px-6 lg:px-10">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight"
        >
          <span className="grid h-7 w-7 place-items-center rounded-md bg-text-1 text-bg">
            E
          </span>
          <span className="hidden text-text-1 sm:block">
            {t('site.ownerName')}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm transition-colors',
                isActive(item.href)
                  ? 'font-semibold text-text-1'
                  : 'text-text-2 hover:text-text-1'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LangSwitcher label={t('site.switchLanguage')} />
          <ThemeToggle label={t('site.switchTheme')} />
          <Button asChild size="sm">
            <Link href="/contact">{t('nav.subscribe')}</Link>
          </Button>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-md hover:bg-bg-muted lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? t('nav.close') : t('nav.menu')}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="fixed inset-x-0 top-16 z-40 h-[calc(100vh-4rem)] overflow-y-auto border-t border-border bg-bg p-6 lg:hidden">
          <nav className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-md px-3 py-3 text-base',
                  isActive(item.href)
                    ? 'bg-bg-muted font-semibold text-text-1'
                    : 'text-text-2 hover:bg-bg-muted'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
            <LangSwitcher label={t('site.switchLanguage')} />
            <ThemeToggle label={t('site.switchTheme')} />
          </div>
          <div className="mt-4">
            <Button asChild className="w-full">
              <Link href="/contact">{t('nav.contact')}</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
