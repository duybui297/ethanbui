import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

// Catch-all root not-found. This fires for locale-less paths the middleware
// didn't already redirect; keep it geo-aware so the fallback matches the same
// rule (Vietnam -> vi, everyone else -> en) instead of pinning to /en.
export default async function NotFound() {
  const h = await headers();
  const country = (h.get('x-vercel-ip-country') || '').toUpperCase();
  redirect(country === 'VN' ? '/vi' : '/en');
}
