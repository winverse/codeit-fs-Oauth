import clsx from 'clsx';
import Link from 'next/link';
import * as styles from '../BoardArticleList.css';
import { buildBoardHref } from '@/domains/board/utils/boardQuery';

export function BoardArticlePagination({
  page,
  pageSize,
  totalCount,
  orderBy,
  keyword,
}) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  return (
    <div className={styles.pager}>
      <Link
        className={clsx(styles.pagerLink, !hasPrev && styles.pagerDisabled)}
        href={buildBoardHref({
          page: Math.max(1, page - 1),
          pageSize,
          orderBy,
          keyword,
        })}
      >
        이전
      </Link>

      <span className={styles.pagerCurrent}>
        {page} / {totalPages}
      </span>

      <Link
        className={clsx(styles.pagerLink, !hasNext && styles.pagerDisabled)}
        href={buildBoardHref({
          page: Math.min(totalPages, page + 1),
          pageSize,
          orderBy,
          keyword,
        })}
      >
        다음
      </Link>
    </div>
  );
}
