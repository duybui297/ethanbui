/**
 * Global loading fallback for all pages under [locale].
 * Shown immediately when navigating between routes (including locale switches),
 * so the user gets instant visual feedback instead of staring at the old page.
 */
export default function LocaleLoading() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-[1200px] flex-col items-center justify-center px-6">
      {/* Spinner */}
      <div
        className="animate-spinner h-8 w-8 rounded-full border-[2.5px] border-border border-t-accent-500"
        role="status"
        aria-label="Loading"
      />

      {/* Skeleton content blocks */}
      <div className="mt-12 w-full max-w-[680px] space-y-4">
        <div className="animate-pulse-loading h-8 w-3/4 rounded-[var(--radius-sm)] bg-bg-muted" />
        <div className="animate-pulse-loading h-4 w-full rounded-[var(--radius-sm)] bg-bg-muted" style={{ animationDelay: '0.1s' }} />
        <div className="animate-pulse-loading h-4 w-5/6 rounded-[var(--radius-sm)] bg-bg-muted" style={{ animationDelay: '0.2s' }} />
        <div className="animate-pulse-loading h-4 w-2/3 rounded-[var(--radius-sm)] bg-bg-muted" style={{ animationDelay: '0.3s' }} />
      </div>
    </div>
  );
}
