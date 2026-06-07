'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';

interface ShareBarProps {
  title: string;
  url: string;
  variant?: 'sidebar' | 'inline';
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  );
}

export function ShareBar({ title, url, variant = 'sidebar' }: ShareBarProps) {
  const t = useTranslations('share');
  const [copied, setCopied] = useState(false);

  const fullUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${url}`
    : url;

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const input = document.createElement('input');
      input.value = fullUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [fullUrl]);

  const handleNativeShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url: fullUrl });
      } catch {
        // User cancelled
      }
    }
  }, [title, fullUrl]);

  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: LinkedInIcon,
      hoverClass: 'hover:text-[#0A66C2] hover:border-[#0A66C2]/20 hover:bg-[#0A66C2]/5'
    },
    {
      id: 'x',
      label: 'X',
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      icon: XIcon,
      hoverClass: 'hover:text-text-1 hover:border-text-1/20 hover:bg-text-1/5'
    },
    {
      id: 'facebook',
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: FacebookIcon,
      hoverClass: 'hover:text-[#1877F2] hover:border-[#1877F2]/20 hover:bg-[#1877F2]/5'
    }
  ];

  const isSidebar = variant === 'sidebar';

  return (
    <div className={isSidebar ? '' : 'mt-8'}>
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-3">
        {t('title')}
      </h2>

      <div className={`flex ${isSidebar ? 'flex-col gap-1.5' : 'flex-wrap gap-2'}`}>
        {/* Copy link */}
        <button
          type="button"
          onClick={handleCopy}
          className={`group flex items-center gap-2.5 rounded-[var(--radius-sm)] border border-transparent px-3 py-2 text-sm transition-all duration-200 ${
            copied
              ? 'border-success/20 bg-success/5 text-success'
              : 'text-text-3 hover:border-accent-500/20 hover:bg-accent-500/5 hover:text-accent-500'
          }`}
          aria-label={copied ? t('copied') : t('copyLink')}
        >
          {copied ? (
            <CheckIcon className="h-4 w-4" />
          ) : (
            <LinkIcon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
          )}
          <span className="text-xs font-medium">
            {copied ? t('copied') : t('copyLink')}
          </span>
        </button>

        {/* Social links */}
        {shareLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center gap-2.5 rounded-[var(--radius-sm)] border border-transparent px-3 py-2 text-sm text-text-3 transition-all duration-200 ${link.hoverClass}`}
            aria-label={`${t('shareOn')} ${link.label}`}
          >
            <link.icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
            <span className="text-xs font-medium">{link.label}</span>
          </a>
        ))}

        {/* Native share (mobile) */}
        {'share' in (typeof navigator !== 'undefined' ? navigator : {}) && (
          <button
            type="button"
            onClick={handleNativeShare}
            className="flex items-center gap-2.5 rounded-[var(--radius-sm)] border border-transparent px-3 py-2 text-sm text-text-3 transition-all duration-200 hover:border-accent-500/20 hover:bg-accent-500/5 hover:text-accent-500 lg:hidden"
            aria-label={t('shareNative')}
          >
            <ShareIcon className="h-4 w-4" />
            <span className="text-xs font-medium">{t('shareNative')}</span>
          </button>
        )}
      </div>
    </div>
  );
}
