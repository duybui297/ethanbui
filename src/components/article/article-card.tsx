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
    <Card className="overflow-hidden transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
      <Link href={`/articles/${article.slug}`} className="block">
        {article.og_image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.og_image_url}
            alt=""
            className="aspect-[16/9] w-full object-cover"
          />
        ) : null}
        <div className="p-6">
          <div className="mb-3 flex items-center gap-3 text-xs">
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
          <h3 className="text-xl font-semibold leading-snug tracking-tight text-text-1 group-hover:text-accent-500">
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="mt-2 text-sm leading-relaxed text-text-2 line-clamp-3">
              {article.excerpt}
            </p>
          )}
        </div>
      </Link>
    </Card>
  );
}
