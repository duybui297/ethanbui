-- =====================================================================
-- 0001_initial.sql
-- Schema for Ethan (Duy) Bui personal branding site.
-- Run in Supabase SQL editor. Idempotent enough for first apply.
-- =====================================================================

-- Extensions
create extension if not exists "uuid-ossp";
create extension if not exists pg_trgm;

-- =====================================================================
-- profiles: admin user metadata, linked to auth.users
-- =====================================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role text not null default 'reader' check (role in ('reader', 'admin')),
  created_at timestamptz not null default now()
);

-- =====================================================================
-- categories
-- =====================================================================
create table if not exists public.categories (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  name_en text not null,
  name_vi text not null,
  created_at timestamptz not null default now()
);

-- =====================================================================
-- tags
-- =====================================================================
create table if not exists public.tags (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  name_en text not null,
  name_vi text not null,
  created_at timestamptz not null default now()
);

-- =====================================================================
-- media
-- =====================================================================
create table if not exists public.media (
  id uuid primary key default uuid_generate_v4(),
  bucket_path text not null,
  alt text,
  width int,
  height int,
  mime text,
  uploaded_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

-- =====================================================================
-- articles
-- one row per (locale, slug). translation_of links the EN and VI rows.
-- =====================================================================
create table if not exists public.articles (
  id uuid primary key default uuid_generate_v4(),
  locale text not null check (locale in ('en', 'vi')),
  slug text not null,
  title text not null,
  excerpt text,
  body_md text not null default '',
  status text not null default 'draft' check (status in ('draft', 'published', 'scheduled')),
  published_at timestamptz,
  reading_time int,
  featured_image_id uuid references public.media(id) on delete set null,
  meta_title text,
  meta_description text,
  canonical_url text,
  og_image_url text,
  translation_of uuid references public.articles(id) on delete set null,
  author_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (locale, slug)
);

create index if not exists articles_status_published_at_idx
  on public.articles (status, published_at desc);

create index if not exists articles_locale_status_idx
  on public.articles (locale, status);

create index if not exists articles_title_trgm_idx
  on public.articles using gin (title gin_trgm_ops);

-- Auto-update updated_at
create or replace function public.touch_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_articles_touch on public.articles;
create trigger trg_articles_touch
  before update on public.articles
  for each row execute function public.touch_updated_at();

-- =====================================================================
-- m:n
-- =====================================================================
create table if not exists public.article_categories (
  article_id uuid not null references public.articles(id) on delete cascade,
  category_id uuid not null references public.categories(id) on delete cascade,
  primary key (article_id, category_id)
);

create table if not exists public.article_tags (
  article_id uuid not null references public.articles(id) on delete cascade,
  tag_id uuid not null references public.tags(id) on delete cascade,
  primary key (article_id, tag_id)
);

-- =====================================================================
-- subscribers (mirror of Beehiiv; source of truth is Beehiiv)
-- =====================================================================
create table if not exists public.subscribers (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  locale text not null default 'en' check (locale in ('en', 'vi')),
  source text,
  beehiiv_id text,
  created_at timestamptz not null default now()
);

-- =====================================================================
-- leads (contact form submissions)
-- =====================================================================
create table if not exists public.leads (
  id uuid primary key default uuid_generate_v4(),
  intent text not null check (intent in ('workshop', 'speaking', 'advisory', 'podcast', 'other')),
  name text not null,
  email text not null,
  company text,
  brief text not null,
  locale text not null default 'en',
  status text not null default 'new' check (status in ('new', 'replied', 'archived')),
  created_at timestamptz not null default now()
);

create index if not exists leads_status_created_idx
  on public.leads (status, created_at desc);

-- =====================================================================
-- Helper: is_admin()
-- =====================================================================
create or replace function public.is_admin() returns boolean
language sql security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- =====================================================================
-- RLS
-- =====================================================================
alter table public.profiles enable row level security;
alter table public.articles enable row level security;
alter table public.categories enable row level security;
alter table public.tags enable row level security;
alter table public.article_categories enable row level security;
alter table public.article_tags enable row level security;
alter table public.media enable row level security;
alter table public.subscribers enable row level security;
alter table public.leads enable row level security;

-- profiles: a user can read their own row
drop policy if exists profiles_self_read on public.profiles;
create policy profiles_self_read on public.profiles
  for select using (auth.uid() = id);

drop policy if exists profiles_admin_all on public.profiles;
create policy profiles_admin_all on public.profiles
  for all using (public.is_admin()) with check (public.is_admin());

-- articles: public can read published; admin can do anything
drop policy if exists articles_public_read on public.articles;
create policy articles_public_read on public.articles
  for select using (status = 'published');

drop policy if exists articles_admin_all on public.articles;
create policy articles_admin_all on public.articles
  for all using (public.is_admin()) with check (public.is_admin());

-- categories + tags: public read, admin write
drop policy if exists categories_public_read on public.categories;
create policy categories_public_read on public.categories for select using (true);
drop policy if exists categories_admin_write on public.categories;
create policy categories_admin_write on public.categories for all
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists tags_public_read on public.tags;
create policy tags_public_read on public.tags for select using (true);
drop policy if exists tags_admin_write on public.tags;
create policy tags_admin_write on public.tags for all
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists ac_public_read on public.article_categories;
create policy ac_public_read on public.article_categories for select using (true);
drop policy if exists ac_admin_write on public.article_categories;
create policy ac_admin_write on public.article_categories for all
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists at_public_read on public.article_tags;
create policy at_public_read on public.article_tags for select using (true);
drop policy if exists at_admin_write on public.article_tags;
create policy at_admin_write on public.article_tags for all
  using (public.is_admin()) with check (public.is_admin());

-- media: admin only via app; public-read happens via Storage bucket policy
drop policy if exists media_admin_all on public.media;
create policy media_admin_all on public.media
  for all using (public.is_admin()) with check (public.is_admin());

-- subscribers + leads: writes happen from server actions using service-role.
-- No public policies = blocked from anon client. Admin can read.
drop policy if exists subscribers_admin_read on public.subscribers;
create policy subscribers_admin_read on public.subscribers
  for select using (public.is_admin());

drop policy if exists leads_admin_all on public.leads;
create policy leads_admin_all on public.leads
  for all using (public.is_admin()) with check (public.is_admin());

-- =====================================================================
-- Storage bucket for media (run once in Supabase Dashboard or via CLI):
--   insert into storage.buckets (id, name, public) values ('media', 'media', true)
--     on conflict do nothing;
-- Public read policy on the bucket lets <img> tags work.
-- =====================================================================
