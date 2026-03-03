import { BoardPageContainer } from '@/domains/board/containers/BoardPageContainer';
import { parseBoardSearchParams } from '@/domains/board/utils/boardQuery';
import { fetchArticleList } from '@/apis';

export default async function BoardPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const filters = parseBoardSearchParams(resolvedSearchParams);

  const [articleResponse, bestArticleResponse] = await Promise.all([
    fetchArticleList({
      page: filters.page,
      pageSize: filters.pageSize,
      orderBy: filters.orderBy,
      keyword: filters.keyword,
    }),
    fetchArticleList({
      page: 1,
      pageSize: 3,
      orderBy: 'like',
    }),
  ]);

  return (
    <BoardPageContainer
      articles={articleResponse.list}
      bestArticles={bestArticleResponse.list}
      totalCount={articleResponse.totalCount}
      page={filters.page}
      pageSize={filters.pageSize}
      orderBy={filters.orderBy}
      keyword={filters.keyword}
    />
  );
}
