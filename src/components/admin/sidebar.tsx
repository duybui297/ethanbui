'use client';

import { LogOut, LayoutDashboard, FileText, Image, Inbox, Users, ExternalLink } from 'lucide-react';
import { Link, usePathname } from '@/lib/i18n/routing';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';

type Labels = {
  dashboard: string;
  articles: string;
  media: string;
  leads: string;
  subscribers: string;
  viewSite: string;
  logout: string;
};

export function AdminSidebar({ labels }: { labels: Labels }) {
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();

  const items = [
    { href: '/admin/dashboard', label: labels.dashboard, icon: LayoutDashboard },
    { href: '/admin/articles', label: labels.articles, icon: FileText },
    { href: '/admin/media', label: labels.media, icon: Image },
    { href: '/admin/leads', label: labels.leads, icon: Inbox },
    { href: '/admin/subscribers', label: labels.subscribers, icon: Users }
  ];

  async function logout() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push(`/${locale}/admin/login`);
    router.refresh();
  }

  return (
    <aside className="bg-bg-subtle px-4 py-6 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)]">
      <nav className="flex flex-col gap-0.5">
        {items.map((it) => {
          const active = pathname === it.href || pathname.startsWith(`${it.href}/`);
          return (
            <Link
              key={it.href}
              href={it.href}
              className={cn(
                'flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors',
                active
                  ? 'bg-bg-muted font-semibold text-text-1'
                  : 'text-text-2 hover:bg-bg-muted hover:text-text-1'
              )}
            >
              <it.icon className="h-4 w-4" />
              {it.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-6 border-t border-border pt-4">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-text-2 hover:bg-bg-muted"
        >
          <ExternalLink className="h-4 w-4" />
          {labels.viewSite}
        </Link>
        <button
          onClick={logout}
          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-text-2 hover:bg-bg-muted"
        >
          <LogOut className="h-4 w-4" />
          {labels.logout}
        </button>
      </div>
    </aside>
  );
}
