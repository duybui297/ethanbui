'use client';

import { createBrowserClient } from '@supabase/ssr';

/**
 * Browser-side Supabase client.
 *
 * Note: we intentionally don't pass <Database> as a generic here. With
 * hand-typed schemas, postgrest-js v2.106+ inference for `.select()` is
 * unstable in strict mode (resolves to `never`). When you set up Supabase,
 * generate proper types with:
 *   npx supabase gen types typescript --linked --schema public > src/lib/supabase/types.gen.ts
 * Then re-introduce <Database> imported from that file.
 *
 * Until then: data from `.select()` is typed as `any`. Use Row types from
 * `./types` at usage sites to keep app code type-safe.
 */
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
