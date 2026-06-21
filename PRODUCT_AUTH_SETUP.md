# Product authentication — setup & how it works

Go-live products (starting with **Nihongo**, at `/products/nihongo`) are now
**hard-gated**: a visitor must sign in before the product loads. Three sign-in
methods are supported:

- **Google** (SSO)
- **Facebook** (SSO)
- **Email + 6-digit code** (no password; a one-time code is emailed)

Every person who passes the gate is recorded in the `subscribers` table, tagged
with the **product they came from**, and shown in **Admin → Subscribers**.

---

## 1. Run the database migration

Apply `supabase/migrations/0004_product_access.sql` (adds `source_product`,
`auth_provider`, `product_first_seen_at` to `subscribers`):

```bash
npm run db:push        # or paste the file into the Supabase SQL editor
```

## 2. Configure Supabase Auth (one-time, in the Supabase dashboard)

**Redirect URLs** — Authentication → URL Configuration → *Redirect URLs*, add:

```
http://localhost:3000/api/auth/callback
https://www.ethanbui.net/api/auth/callback
```

**Site URL** — set to `https://www.ethanbui.net`.

**Google** — Authentication → Providers → Google → enable, paste the Client ID
and Client Secret from a Google Cloud OAuth 2.0 Web client. In Google Cloud,
add this authorized redirect URI (Supabase shows it):
`https://<your-project-ref>.supabase.co/auth/v1/callback`.

**Facebook** — Authentication → Providers → Facebook → enable, paste the App ID
and App Secret from a Facebook app (Facebook Login product). Use the same
Supabase callback URL as the OAuth redirect.

**Email 6-digit code** — Authentication → Providers → Email → make sure Email is
enabled. Then Authentication → Email Templates → **Magic Link**: the template
must include the token, e.g.

```
Your sign-in code is: {{ .Token }}
```

`signInWithOtp` reuses the Magic Link template; including `{{ .Token }}` is what
turns the email into a 6-digit code instead of (or in addition to) a link.
For real sending volume, configure custom SMTP under Project Settings → Auth.

## 3. Environment variables

No new variables are needed — it reuses the existing Supabase keys in
`.env.local` (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
`SUPABASE_SERVICE_ROLE_KEY`).

---

## How the pieces fit

| Piece | File |
|---|---|
| Product registry (which products are gated) | `src/lib/products.ts` |
| Records the user + source product | `src/lib/product-access.ts` |
| Login screen | `src/app/[locale]/products/access/page.tsx` + `product-auth-form.tsx` |
| OAuth return handler | `src/app/api/auth/callback/route.ts` |
| Email-code record handler | `src/app/api/product-access/route.ts` |
| The gate itself | `middleware.ts` |
| Admin list with source product | `src/app/[locale]/admin/subscribers/page.tsx` |

**Flow:** visit `/products/nihongo` → middleware sees no session → redirect to
`/{locale}/products/access?product=nihongo&next=/products/nihongo` → user signs
in → user is recorded with `source_product = 'nihongo'` → redirected into the
product.

---

## Adding the next gated product later

The system is reusable. For a new in-repo product:

1. Put the static app under `public/products/<id>/`.
2. Add an entry to `GATED_PRODUCTS` in `src/lib/products.ts`.
3. Add its entry path to the `matcher` array in `middleware.ts`.

Login UI, OAuth callback, and subscriber tracking are shared automatically — no
other changes needed.

> Note on scope: only products that live in **this** repo can be gated here.
> The product cards pointing to `aicorelabs.net` are a separate codebase; the
> same pattern can be ported there, but not wired from this project.
