-- =====================================================================
-- 0004_product_access.sql
-- Product authentication: track which product a user signed up from.
--
-- The "go-live" products (e.g. Nihongo) are hard-gated behind Supabase
-- Auth (Google SSO, Facebook SSO, or email + 6-digit code). Every person
-- who authenticates into a product is recorded in public.subscribers with
-- the product they came from, so the admin Subscribers list can show it.
-- =====================================================================

-- The product the subscriber first authenticated from (null = newsletter only).
alter table public.subscribers
  add column if not exists source_product text;

-- Which auth method created the row: 'google' | 'facebook' | 'email' | null.
alter table public.subscribers
  add column if not exists auth_provider text;

-- First time this email passed a product auth gate.
alter table public.subscribers
  add column if not exists product_first_seen_at timestamptz;

create index if not exists subscribers_source_product_idx
  on public.subscribers (source_product);

-- subscribers RLS already restricts reads to admins and writes to the
-- service-role server client (see 0001_initial.sql). No new policy needed.
