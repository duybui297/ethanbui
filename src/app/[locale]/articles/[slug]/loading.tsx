/**
 * Route-specific loading fallback for the article detail page.
 *
 * Next renders this instantly when navigating from the list into an article,
 * while the server fetches the article + related posts. Mirroring the real
 * article layout (title, meta, hero, body) makes the transition feel immediate
 * instead of a blank 3s wait.
 */
export default function ArticleLoading() {
  return (
    <article className="mx-auto max-w-[1200px] px-6 pb-24 pt-12 lg:px-10 lg:pt-20">
      <header className="mx-auto max-w-[820px]">
        {/* meta row */}
        <div className="mb-4 flex items-center gap-3">
          <div className="animate-pulse-loading h-3 w-24 rounded-[var(--radius-sm)] bg-bg-muted" />
          <div className="animate-pulse-loading h-3 w-16 rounded-[var(--radius-sm)] bg-bg-muted" />
        </div>
        {/* title */}
        <div className="space-y-3">
          <div className="animate-pulse-loading h-10 w-11/12 rounded-[var(--radius-sm)] bg-bg-muted" />
          <div className="animate-pulse-loading h-10 w-3/5 rounded-[var(--radius-sm)] bg-bg-muted" style={{ animationDelay: '0.1s' }} />
        </div>
        {/* excerpt */}
        <div className="mt-5 space-y-2">
          <div className="animate-pulse-loading h-5 w-full rounded-[var(--radius-sm)] bg-bg-muted" style={{ animationDelay: '0.15s' }} />
          <div className="animate-pulse-loading h-5 w-4/5 rounded-[var(--radius-sm)] bg-bg-muted" style={{ animationDelay: '0.2s' }} />
        </div>
      </header>

      {/* hero image */}
      <div className="mx-auto mt-10 max-w-[1000px]">
        <div className="animate-pulse-loading aspect-[16/9] w-full rounded-[var(--radius-lg)] bg-bg-muted" />
      </div>

      {/* body */}
      <div className="mt-12 grid gap-10 lg:grid-cols-[240px_minmax(0,680px)] lg:gap-16">
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-3">
            <div className="animate-pulse-loading h-3 w-20 rounded-[var(--radius-sm)] bg-bg-muted" />
            <div className="animate-pulse-loading h-3 w-32 rounded-[var(--radius-sm)] bg-bg-muted" />
            <div className="animate-pulse-loading h-3 w-28 rounded-[var(--radius-sm)] bg-bg-muted" />
            <div className="animate-pulse-loading h-3 w-24 rounded-[var(--radius-sm)] bg-bg-muted" />
          </div>
        </aside>

        <div className="space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse-loading h-4 rounded-[var(--radius-sm)] bg-bg-muted"
              style={{
                width: ['100%', '96%', '92%', '88%'][i % 4],
                animationDelay: `${0.05 * i}s`
              }}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
