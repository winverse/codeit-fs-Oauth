import { notFound } from 'next/navigation';
import { ArticleDetailContainer } from '@/domains/article/containers/ArticleDetailContainer';
import {
  fetchArticleCommentList,
  fetchArticleDetail,
  fetchArticleList,
} from '@/apis';
import { parseArticleId } from '@/utils';

const STATIC_ARTICLE_COUNT = 6;
const STATIC_REVALIDATE_SECONDS = 300;
const staticRequestOptions = {
  cache: 'force-cache',
  next: { revalidate: STATIC_REVALIDATE_SECONDS },
};

// generateStaticParams에 없는 id도 런타임에 접근 가능하게 유지합니다.
// 해당 경로는 첫 요청 시 서버에서 생성되고, revalidate 정책에 따라 캐시/갱신됩니다.
export const dynamicParams = true;

// build 시점에 미리 생성할 /board/[id] 경로 목록을 반환합니다.
// 반환 형태: [{ id: '531' }, { id: '529' }, ...]
export async function generateStaticParams() {
  try {
    const { list } = await fetchArticleList(
      {
        page: 1,
        pageSize: STATIC_ARTICLE_COUNT,
        orderBy: 'recent',
      },
      staticRequestOptions,
    );

    // list -> 유효한 articleId만 추출 -> App Router가 요구하는 params 객체로 변환
    return list
      .map((article) => parseArticleId(article?.id))
      .filter((articleId) => articleId !== null)
      .map((articleId) => ({ id: String(articleId) }));
  } catch {
    // 목록 조회 실패 시에도 빌드를 실패시키지 않고 동적 렌더링으로 fallback
    return [];
  }
}

// pnpm build 시 사전 생성된 id와, 런타임에 온디맨드로 생성된 id를 모두 처리합니다.
export default async function BoardDetailPage({ params }) {
  const { id } = await params;
  const articleId = parseArticleId(id);

  if (articleId === null) {
    notFound();
  }

  const article = await fetchArticleDetail(
    articleId,
    staticRequestOptions,
  ).catch((error) => {
    if (error?.status === 404) return null;
    throw error;
  });

  if (!article) {
    notFound();
  }

  const commentResponse = await fetchArticleCommentList(
    { articleId, limit: 10 },
    staticRequestOptions,
  );

  return (
    <ArticleDetailContainer
      article={article}
      initialComments={commentResponse.list}
      initialNextCursor={commentResponse.nextCursor}
    />
  );
}
