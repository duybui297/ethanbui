import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' }
    ]
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
    // Keep navigated pages in the client-side Router Cache for a while so that
    // pressing "Back" (e.g. detail -> list) restores instantly from cache
    // instead of re-running the server render. Next 15 defaults dynamic to 0s,
    // which is why Back felt as slow as the forward navigation.
    staleTimes: {
      dynamic: 60,
      static: 180
    }
  },
  // Force the locale-less /products entry to the default-locale (en) version.
  // next.config redirects run BEFORE middleware, and the source is an exact
  // match, so /products/nihongo (the live app) is untouched.
  async redirects() {
    return [
      { source: '/products', destination: '/en/products', permanent: false }
    ];
  },
  // Standalone Japanese learning app (static files in public/products/nihongo).
  // Serve its index.html at the clean entry path /products/nihongo.
  // Sub-assets (css/js/data) are served directly from public by filename.
  async rewrites() {
    return [
      { source: '/products/nihongo', destination: '/products/nihongo/index.html' },
      { source: '/products/nihongo/', destination: '/products/nihongo/index.html' }
    ];
  }
};

export default withNextIntl(nextConfig);
