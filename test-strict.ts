import { createBrowserClient } from '@supabase/ssr';

async function t() {
  const c = createBrowserClient('u', 'k');
  const r = await c.from('profiles').select('*').single();
  return r;
}
export type R = Awaited<ReturnType<typeof t>>;
