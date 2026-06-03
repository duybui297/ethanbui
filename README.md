# Ethan (Duy) Bui — personal branding site

Next.js 15.5 App Router · TypeScript strict · TailwindCSS v4 · shadcn-style primitives · Supabase (Postgres + Auth + Storage) · Beehiiv · Resend · Vercel.

Bilingual EN + VI, `/en/...` and `/vi/...` routed.

**Status:** TypeScript passes clean (`tsc --noEmit` = 0 errors). Verified with Node 22 + npm 10 against pinned versions in `package.json`.

---

## Quick start (local)

Prereqs: Node 20+, pnpm or npm, a Supabase project, Resend account (optional for local), Beehiiv account (optional).

```bash
# 1. Install
cd app
npm install

# 2. Env
cp .env.example .env.local
# Fill in: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY,
# SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY (optional), BEEHIIV_API_KEY (optional)

# 3. Database
# Open Supabase Studio -> SQL editor and run:
#   - supabase/migrations/0001_initial.sql
#   - supabase/seed.sql (optional — adds 1 EN + 1 VI sample article)
# Then in Supabase Storage: create a public bucket named "media".

# 4. Create an admin user
# In Supabase Auth -> Users, "Add user" with your email + password (email confirm off for local).
# Then in the SQL editor:
#   insert into public.profiles (id, display_name, role)
#   select id, 'Ethan (Duy) Bui', 'admin' from auth.users where email = 'you@example.com'
#   on conflict (id) do update set role = excluded.role;

# 5. Run
npm run dev
# http://localhost:3000  (redirects to /en)
# http://localhost:3000/en/admin/login
```

---

## File layout

```
app/
├── src/
│   ├── app/[locale]/        ← all locale-routed pages (public + admin)
│   ├── app/api/             ← contact, subscribe, og
│   ├── components/
│   │   ├── ui/              ← design-system primitives
│   │   ├── site/            ← header, footer, theme, lang switcher, subscribe block
│   │   ├── article/         ← cards, TOC, markdown body
│   │   └── admin/           ← sidebar, article editor
│   ├── lib/
│   │   ├── supabase/        ← browser/server/admin clients + types
│   │   ├── i18n/            ← next-intl config + routing
│   │   ├── articles.ts      ← read helpers for public site
│   │   ├── beehiiv.ts       ← newsletter subscribe
│   │   ├── resend.ts        ← lead notification + ack
│   │   └── utils.ts
│   └── messages/{en,vi}.json
├── supabase/
│   ├── migrations/0001_initial.sql
│   └── seed.sql
├── middleware.ts            ← i18n routing + auth guard for /admin
├── tailwind.config.ts
├── postcss.config.mjs
└── next.config.mjs
```

---

## Pages built in this v1

Public:
- `/en` and `/vi` — Home (hero, pillars, latest articles, subscribe, contact CTA)
- `/{locale}/about` — About page (intro, pillars, method, beliefs, CTA)
- `/{locale}/articles` — articles list
- `/{locale}/articles/[slug]` — article detail with TOC, related, inline subscribe
- `/{locale}/contact` — contact form (5 intents, honeypot, Resend + Supabase insert)
- `/{locale}/not-found` — 404

Admin (gated):
- `/{locale}/admin/login`
- `/{locale}/admin/dashboard` — KPI cards
- `/{locale}/admin/articles` — list
- `/{locale}/admin/articles/new` — editor
- `/{locale}/admin/articles/[id]` — editor

API:
- `POST /api/contact` — lead intake + email
- `POST /api/subscribe` — Beehiiv + mirror in Supabase
- `GET  /api/og` — dynamic OG image

SEO:
- `/sitemap.xml` — generated from Supabase
- `/robots.txt` — generated
- Per-page metadata + OG
- `hreflang`: handled implicitly by next-intl alternates (extend in `generateMetadata` once translations are linked)

---

## Stack decisions in 1 line each

- **Next.js 15 App Router.** Server components by default, native SEO, edge OG.
- **next-intl.** Type-safe i18n with locale routing.
- **TailwindCSS v4.** Tokens in `globals.css` via `@theme`, mirrored from Phase 3.
- **shadcn/ui pattern.** Copy-in primitives styled to our tokens. No vendor lock.
- **Supabase.** Postgres + Auth + Storage. RLS enforces admin-only writes.
- **Beehiiv.** Newsletter API, mirror in `subscribers` table for queries.
- **Resend.** Transactional email (lead notification + ack).
- **Vercel.** Hosting + preview deploys + edge functions for OG.

---

## Deploy (Vercel)

1. Push the repo to GitHub.
2. Vercel → New Project → import.
3. Set env vars (all from `.env.example`).
4. Deploy.
5. Add custom domain, point DNS, enable HTTPS.
6. Set `NEXT_PUBLIC_SITE_URL` to the final domain and redeploy.

Smoke test after deploy:
- `/` redirects to `/en`
- `/en/articles` lists seeded article
- `/en/articles/weekly-sop-ai-code-review` renders with TOC
- `/vi/articles/sop-hang-tuan-cho-code-review-co-ai` renders
- `/en/admin/login` works
- `/sitemap.xml` includes both locales and the seeded article
- `/api/og?title=Test` returns a 1200×630 PNG

---

## Adding a new article (admin flow)

1. Sign in at `/en/admin/login`.
2. Articles → New article.
3. Fill title (slug auto-generates), excerpt, body in Markdown.
4. Pick locale and category later (categories CRUD is the next admin page to add).
5. Save (draft) or Publish.

To add the VI translation: create a new article with locale=vi, same intent. Linking via `translation_of` is a column you can wire into the editor later (or set via SQL for now).

---

## Supabase type generation (recommended after first deploy)

The clients in `src/lib/supabase/` don't pass `<Database>` as a generic. With hand-typed schemas, `postgrest-js` v2.106+ inference for `.select()` collapses to `never` in strict mode (a known limitation). To get full end-to-end typing:

```bash
# After linking your Supabase project:
npx supabase login
npx supabase link --project-ref <your-project-ref>
npx supabase gen types typescript --linked --schema public > src/lib/supabase/types.gen.ts
```

Then in `src/lib/supabase/{client,server,admin}.ts`, add:

```ts
import type { Database } from './types.gen';
// ...
createBrowserClient<Database>(...)
createServerClient<Database>(...)
createClient<Database>(...)
```

The generated types are exactly the shape postgrest-js expects, so `.select()` returns properly typed rows. Until then, query results are `any` at the call site — use the `Row` types exported from `src/lib/supabase/types.ts` to type variables explicitly where needed.

---

## Known follow-ups (not in this v1)

- Categories / Tags admin pages (schema is ready; UI not built yet).
- Media library UI (Supabase Storage bucket is created; upload component to add).
- Playbooks, Case studies, Talks, Tools pages (schema can extend the `articles` table with a `type` column, or live in separate tables).
- Article scheduling cron (use Vercel Cron + `scheduled` status).
- `translation_of` picker in the editor (currently set via SQL).
- Rich text WYSIWYG (using plain Markdown textarea right now; Tiptap deps installed for future swap).
- Search across articles (Postgres `pg_trgm` index is ready; add a `/search` page).
- Analytics: Plausible or Vercel Analytics script.
- Privacy / Terms content.

---

## Voice and copy

All UI copy lives in `src/messages/{en,vi}.json`. Voice rules:

- Sentence case headings.
- No em dashes, no banned vocabulary (see `ABOUT ME/anti-ai-writing-style.md`).
- Contractions, specific details, plain.

When adding new strings, run the same checks before shipping.
