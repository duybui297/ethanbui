/**
 * Reusable registry of "go-live" products that live inside this repo and are
 * hard-gated behind product authentication (Google / Facebook / email code).
 *
 * Edge-safe: this file is imported by `middleware.ts`, so it must NOT import
 * anything Node-only (no `server-only`, no Supabase admin client, etc.).
 *
 * ── To add a NEW gated product later ──
 * 1. Drop the static app under `public/products/<id>/`.
 * 2. Add an entry to GATED_PRODUCTS below.
 * 3. Add its entry path to the middleware matcher in `middleware.ts`.
 * Everything else (login UI, callback, subscriber tracking) is shared.
 */

export type GatedProduct = {
  /** Stable id, also stored as `source_product` on subscribers. */
  id: string;
  /** Human label shown on the login screen. */
  name: string;
  /** Path of the product entry page (the page the gate protects). */
  path: string;
};

export const GATED_PRODUCTS: GatedProduct[] = [
  {
    id: 'nihongo',
    name: 'Nihongo Sprint',
    path: '/products/nihongo'
  }
];

/** Find the gated product whose entry page matches this pathname (if any). */
export function gatedProductForPath(pathname: string): GatedProduct | null {
  // Normalise a single trailing slash so '/products/nihongo' and
  // '/products/nihongo/' both match the registered entry path.
  const normalized =
    pathname.length > 1 && pathname.endsWith('/')
      ? pathname.slice(0, -1)
      : pathname;
  return (
    GATED_PRODUCTS.find((p) => p.path === normalized) ?? null
  );
}

/** Look a product up by id. */
export function getGatedProduct(id: string | null | undefined): GatedProduct | null {
  if (!id) return null;
  return GATED_PRODUCTS.find((p) => p.id === id) ?? null;
}
