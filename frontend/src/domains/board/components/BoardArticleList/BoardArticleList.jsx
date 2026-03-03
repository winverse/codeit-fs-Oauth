import { EmptyState } from '@/components/EmptyState';
import * as styles from './BoardArticleList.css';
import { BoardArticleListItem } from './BoardArticleListItem';
import { BoardArticlePagination } from './BoardArticlePagination';

export function BoardArticleList({
  articles,
  page,
  pageSize,
  totalCount,
  orderBy,
  keyword,
}) {
  if (!articles.length) {
    return (
      <EmptyState
        text={
          keyword
            ? `'${keyword}'로 검색된 결과가 없어요.`
            : '게시글이 아직 없어요.'
        }
      />
    );
  }

  return (
    <>
      <div className={styles.list}>
        {articles.map((article) => (
          <BoardArticleListItem key={article.id} article={article} />
        ))}
      </div>

      <BoardArticlePagination
        page={page}
        pageSize={pageSize}
        totalCount={totalCount}
        orderBy={orderBy}
        keyword={keyword}
      />
    </>
  );
}
