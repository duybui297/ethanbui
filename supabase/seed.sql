-- Seed data. Run after 0001_initial.sql.
-- Replace owner email at the bottom with Ethan's email before promoting to admin.

-- Categories
insert into public.categories (slug, name_en, name_vi) values
  ('ai-sops', 'AI SOPs', 'AI SOPs'),
  ('dev-workflow', 'Dev workflow', 'Workflow dev'),
  ('delivery-mgmt', 'Delivery management', 'Delivery management'),
  ('adoption', 'Adoption & change', 'Adoption & change'),
  ('scale-notes', 'Scale notes', 'Ghi chú về scale'),
  ('field-reports', 'Field reports', 'Field reports')
on conflict (slug) do nothing;

-- Tags
insert into public.tags (slug, name_en, name_vi) values
  ('claude', 'Claude', 'Claude'),
  ('code-review', 'Code review', 'Code review'),
  ('standups', 'Standups', 'Standup'),
  ('rollout', 'Rollout', 'Rollout'),
  ('solo', 'Solo', 'Solo'),
  ('small-team', 'Small team', 'Team nhỏ')
on conflict (slug) do nothing;

-- Articles: one EN + one VI, linked
with cat as (select id from public.categories where slug = 'ai-sops')
insert into public.articles (locale, slug, title, excerpt, body_md, status, published_at, reading_time, meta_title, meta_description)
values
  ('en', 'weekly-sop-ai-code-review',
   'A weekly SOP for AI-assisted code review',
   'What changed after running it for 6 weeks on a small team. With the prompts.',
   E'## Context\n\nMost code review with AI is ad-hoc. A reviewer pastes a diff into Claude, asks "any issues?", reads the answer, moves on. It works once. It does not scale.\n\nThis is the SOP we run weekly. It''s boring. That''s the point.\n\n## The SOP\n\n1. Author opens the PR with a 3-line description: what changed, why, and what to look for.\n2. Author runs the **self-review prompt** (below) and pastes the output into the PR description under a `## AI self-review` heading.\n3. Reviewer runs the **reviewer prompt** against the diff, reads the output, and uses it as a starting point for their own pass.\n4. Reviewer leaves human comments. The AI output is never the final word.\n\n## The prompts\n\n```\nYou are reviewing a pull request. The diff is below.\nReport in this format:\n- Correctness risks (concrete, by file/line)\n- Test coverage gaps\n- Style or naming notes (only if non-trivial)\n- Questions for the author\nIf the diff is small or low-risk, say so and stop.\n```\n\n## What changed after 6 weeks\n\n- Author self-review caught 30% of issues before reviewer saw the PR.\n- Reviewer time dropped from 25 min average to 14 min.\n- We killed the "Style or naming notes" section after week 3 because it generated noise. Now we omit it.\n\n## Pitfalls\n\n- Don''t skip the human pass. AI misses business logic.\n- Don''t paste secrets into the prompt. Use a local model or scrub first.\n\n## Variations by scale\n\n- **Solo**: skip the reviewer step, run the self-review prompt before every commit.\n- **Small team (2–10)**: as written.\n- **Mid (10–50)**: add a per-language prompt variant, store in a shared repo.\n- **Enterprise**: route through an internal proxy, log prompts for compliance.\n',
   'published', now() - interval '3 days', 5,
   'A weekly SOP for AI-assisted code review',
   'The boring playbook for AI code review that scales. Prompts included.')
on conflict (locale, slug) do nothing;

with cat as (select id from public.categories where slug = 'ai-sops')
insert into public.articles (locale, slug, title, excerpt, body_md, status, published_at, reading_time, meta_title, meta_description, translation_of)
values
  ('vi', 'sop-hang-tuan-cho-code-review-co-ai',
   'SOP hằng tuần cho code review có AI',
   'Cái gì đổi sau 6 tuần chạy trên một team nhỏ. Kèm prompt.',
   E'## Bối cảnh\n\nPhần lớn code review với AI là tuỳ hứng. Reviewer paste diff vào Claude, hỏi "có vấn đề gì không?", đọc câu trả lời, đi tiếp. Cách này chạy 1 lần được. Không scale được.\n\nĐây là SOP team chúng tôi chạy hằng tuần. Nó nhàm. Đó là điểm.\n\n## SOP\n\n1. Author mở PR với 3 dòng mô tả: thay đổi gì, vì sao, cần để ý gì.\n2. Author chạy **prompt self-review** (bên dưới), paste output vào PR description dưới heading `## AI self-review`.\n3. Reviewer chạy **prompt reviewer** trên diff, đọc output, dùng nó làm điểm khởi đầu cho pass của mình.\n4. Reviewer để lại comment người. Output AI không bao giờ là lời cuối.\n\n## Prompts\n\n```\nBạn đang review một pull request. Diff ở dưới.\nBáo cáo theo format:\n- Rủi ro correctness (cụ thể, theo file/line)\n- Gap về test coverage\n- Style hoặc naming (chỉ khi không tầm thường)\n- Câu hỏi cho author\nNếu diff nhỏ hoặc rủi ro thấp, nói vậy và dừng.\n```\n\n## Sau 6 tuần đổi gì\n\n- Author self-review bắt được 30% issue trước khi reviewer thấy PR.\n- Thời gian reviewer giảm từ 25 phút trung bình xuống 14 phút.\n- Chúng tôi bỏ phần "Style hoặc naming" sau tuần 3 vì sinh noise. Bây giờ bỏ luôn.\n\n## Pitfalls\n\n- Đừng bỏ pass người. AI bỏ qua business logic.\n- Đừng paste secrets vào prompt. Dùng model local hoặc scrub trước.\n\n## Biến thể theo scale\n\n- **Solo**: bỏ bước reviewer, chạy self-review trước mỗi commit.\n- **Team nhỏ (2–10)**: như viết ở trên.\n- **Mid (10–50)**: thêm biến thể prompt theo ngôn ngữ, lưu trong repo chung.\n- **Enterprise**: route qua proxy nội bộ, log prompt cho compliance.\n',
   'published', now() - interval '3 days', 5,
   'SOP hằng tuần cho code review có AI',
   'Playbook nhàm chán cho AI code review có scale. Kèm prompt.',
   (select id from public.articles where locale='en' and slug='weekly-sop-ai-code-review'))
on conflict (locale, slug) do nothing;

-- Link translation_of both ways
update public.articles e
set translation_of = v.id
from public.articles v
where e.locale = 'en' and e.slug = 'weekly-sop-ai-code-review'
  and v.locale = 'vi' and v.slug = 'sop-hang-tuan-cho-code-review-co-ai'
  and e.translation_of is null;

-- Attach categories
insert into public.article_categories (article_id, category_id)
select a.id, c.id
from public.articles a
join public.categories c on c.slug = 'ai-sops'
where a.slug in ('weekly-sop-ai-code-review', 'sop-hang-tuan-cho-code-review-co-ai')
on conflict do nothing;

-- Attach tags
insert into public.article_tags (article_id, tag_id)
select a.id, t.id
from public.articles a
join public.tags t on t.slug in ('claude', 'code-review', 'small-team')
where a.slug in ('weekly-sop-ai-code-review', 'sop-hang-tuan-cho-code-review-co-ai')
on conflict do nothing;

-- =====================================================================
-- Promote a user to admin (run after creating the user in Supabase Auth)
-- Replace 'you@your-domain.com' first.
-- =====================================================================
-- insert into public.profiles (id, display_name, role)
-- select id, 'Ethan (Duy) Bui', 'admin'
-- from auth.users where email = 'you@your-domain.com'
-- on conflict (id) do update set role = excluded.role;
