-- =====================================================================
-- 0003_comments.sql
-- Public comment system for articles.
-- Supports threaded replies (one level deep) and optional email for
-- reply notifications.
-- =====================================================================

-- =====================================================================
-- comments
-- =====================================================================
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.articles(id) on delete cascade,
  parent_id uuid references public.comments(id) on delete cascade,
  author_name text not null,
  author_email text,
  body text not null,
  is_admin_reply boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists comments_article_created_idx
  on public.comments (article_id, created_at asc);

create index if not exists comments_parent_idx
  on public.comments (parent_id)
  where parent_id is not null;

-- =====================================================================
-- RLS
-- =====================================================================
alter table public.comments enable row level security;

-- Anyone can read comments
drop policy if exists comments_public_read on public.comments;
create policy comments_public_read on public.comments
  for select using (true);

-- Public insert: only top-level fields, enforced via API validation.
-- We allow anon insert so visitors can comment without auth.
drop policy if exists comments_public_insert on public.comments;
create policy comments_public_insert on public.comments
  for insert with check (true);

-- Admin can do anything (update, delete, moderate)
drop policy if exists comments_admin_all on public.comments;
create policy comments_admin_all on public.comments
  for all using (public.is_admin()) with check (public.is_admin());
