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
  }
};

export default withNextIntl(nextConfig);
