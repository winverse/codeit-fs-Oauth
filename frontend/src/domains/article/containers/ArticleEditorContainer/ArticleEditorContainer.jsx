'use client';

import { ContentContainer } from '@/components/ContentContainer';
import { ArticleEditorForm } from '@/domains/article/components/ArticleEditorForm';
import { useArticleEditor } from '@/domains/article/hooks/useArticleEditor';
import * as styles from './ArticleEditorContainer.css';

export function ArticleEditorContainer({ articleId }) {
  const editor = useArticleEditor(articleId);

  return (
    <ContentContainer className={styles.wrapper}>
      <ArticleEditorForm
        isEditMode={editor.isEditMode}
        title={editor.title}
        setTitle={editor.setTitle}
        content={editor.content}
        setContent={editor.setContent}
        isLoading={editor.isLoading}
        isSubmitting={editor.isSubmitting}
        errorMessage={editor.errorMessage}
        onSubmit={editor.submit}
      />
    </ContentContainer>
  );
}
