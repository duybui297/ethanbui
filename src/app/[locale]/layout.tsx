import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Toaster } from 'sonner';

import '@/app/globals.css';

import { Header } from '@/components/site/header';
import { Footer } from '@/components/site/footer';
import { ThemeProvider } from '@/components/site/theme-provider';
import { AlternateLinkProvider } from '@/components/site/alternate-link-context';
import { Analytics } from '@vercel/analytics/react';
import { locales, type Locale } from '@/lib/i18n/config';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: 'Ethan (Duy) Bui — AI in software delivery',
    template: '%s — Ethan (Duy) Bui'
  },
  description:
    'Practical writing on how engineering and delivery teams use AI day to day. SOPs, playbooks, field notes.',
  openGraph: {
    type: 'website',
    siteName: 'Ethan (Duy) Bui',
    images: ['/api/og']
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true }
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fdfcf9' },
    { media: '(prefers-color-scheme: dark)', color: '#171411' }
  ]
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(locales as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen bg-bg text-text-1">
        <NextIntlClientProvider locale={locale as Locale} messages={messages}>
          <ThemeProvider>
            <AlternateLinkProvider>
              <Header />
              <main id="main" className="min-h-[60vh]">
                {children}
              </main>
              <Footer />
              <Toaster richColors closeButton />
            </AlternateLinkProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
