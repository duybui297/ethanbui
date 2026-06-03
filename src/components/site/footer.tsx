import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border bg-bg-subtle">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-5 lg:px-10">
        <div className="lg:col-span-2">
          <p className="text-sm text-text-2 leading-relaxed">
            {t('site.footerBio')}
          </p>
        </div>

        <FooterColumn title={t('site.explore')}>
          <FooterLink href="/about">{t('nav.about')}</FooterLink>
          <FooterLink href="/articles">{t('nav.articles')}</FooterLink>
        </FooterColumn>

        <FooterColumn title={t('site.read')}>
          <FooterLink href="/articles">{t('nav.articles')}</FooterLink>
          <FooterLink href="/contact">{t('site.newsletter')}</FooterLink>
        </FooterColumn>

        <FooterColumn title={t('site.legal')}>
          <FooterLink href="/legal/privacy">{t('site.privacy')}</FooterLink>
          <FooterLink href="/legal/terms">{t('site.terms')}</FooterLink>
        </FooterColumn>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-2 px-6 py-5 text-xs text-text-3 sm:flex-row sm:items-center lg:px-10">
          <p>
            © {year} {t('site.ownerName')}. {t('site.builtIn')}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-3">
        {title}
      </h2>
      <ul className="flex flex-col gap-2 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-text-2 hover:text-text-1">
        {children}
      </Link>
    </li>
  );
}
