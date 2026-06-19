import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import type { ArticleListItem } from '@/lib/articles';
import type { Locale } from '@/lib/supabase/types';

export function ArticleCard({ article, locale }: { article: ArticleListItem; locale: Locale }) {
  const t = useTranslations('articles');
  const category = article.categories[0];
  const categoryName = category
    ? locale === 'vi'
      ? category.name_vi
      : category.name_en
    : null;

  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
      <Link href={`/articles/${article.slug}`} className="flex items-start gap-4 p-5 sm:gap-5 sm:p-6">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
            {categoryName && <Badge variant="category">{categoryName}</Badge>}
            {article.reading_time && (
              <span className="text-text-3">
                {t('minRead', { minutes: article.reading_time })}
              </span>
            )}
            {article.published_at && (
              <span className="text-text-3">
                · {formatDate(article.published_at, locale)}
              </span>
            )}
          </div>
          <h3 className="text-lg font-semibold leading-snug tracking-tight text-text-1 line-clamp-2 group-hover:text-accent-500">
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="mt-2 text-sm leading-relaxed text-text-2 line-clamp-2">
              {article.excerpt}
            </p>
          )}
        </div>
        {article.og_image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.og_image_url}
            alt=""
            className="aspect-[4/3] w-24 shrink-0 rounded-[var(--radius-md)] object-cover sm:w-32"
          />
        ) : null}
      </Link>
    </Card>
  );
}
