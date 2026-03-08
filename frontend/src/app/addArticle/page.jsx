import { use } from 'react';
import { ArticleEditorContainer } from '@/domains/article/containers/ArticleEditorContainer';
import { parseArticleId } from '@/utils';

export default function AddArticlePage({ searchParams }) {
  const resolvedSearchParams = use(Promise.resolve(searchParams));
  const articleId = parseArticleId(resolvedSearchParams?.id);

  return <ArticleEditorContainer articleId={articleId} />;
}
