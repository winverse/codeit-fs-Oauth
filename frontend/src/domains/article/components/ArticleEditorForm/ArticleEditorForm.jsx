'use client';

import { FormField } from '@/components/FormField';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import * as styles from './ArticleEditorForm.css';

export function ArticleEditorForm({
  isEditMode,
  title,
  setTitle,
  content,
  setContent,
  isLoading,
  isSubmitting,
  errorMessage,
  onSubmit,
}) {
  return (
    <>
      <div className={styles.titleRow}>
        <h1 className={styles.title}>
          {isEditMode ? '게시글 수정' : '게시글 쓰기'}
        </h1>
        <button
          type="button"
          className={styles.submitButton}
          disabled={!title.trim() || !content.trim() || isSubmitting}
          onClick={onSubmit}
        >
          {isEditMode ? '수정' : '등록'}
        </button>
      </div>

      <div className={styles.form}>
        <FormField
          id="title"
          label="*제목"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="제목을 입력해 주세요"
        />

        <FormField
          id="content"
          label="*내용"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="내용을 입력해 주세요"
          isTextArea={true}
        />

        {errorMessage ? <p className={styles.error}>{errorMessage}</p> : null}
      </div>

      <LoadingSpinner isVisible={isLoading || isSubmitting} />
    </>
  );
}
