-- =====================================================================
-- 0002_add_display_order.sql
-- Add display_order column to articles for manual sorting.
-- Only EN articles need to be ordered; VI articles inherit the order
-- from their EN translation via the translation_of link.
-- =====================================================================

alter table public.articles
  add column if not exists display_order int default 0;

-- Index for efficient ordering
create index if not exists articles_display_order_idx
  on public.articles (locale, status, display_order asc, published_at desc);

-- Backfill: set display_order based on published_at (newest = 0, then 1, 2, …)
-- so existing articles have a sensible default order.
with ranked as (
  select id, row_number() over (partition by locale order by published_at desc nulls last) - 1 as rn
  from public.articles
  where status = 'published'
)
update public.articles a
set display_order = r.rn
from ranked r
where a.id = r.id;
