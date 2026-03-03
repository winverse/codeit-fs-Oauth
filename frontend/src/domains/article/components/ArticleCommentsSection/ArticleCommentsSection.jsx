'use client';

import { useState } from 'react';
import { EmptyState } from '@/components/EmptyState';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { CommentItem } from '@/domains/article/components/CommentItem';
import * as styles from './ArticleCommentsSection.css';
import { useCommentThread } from '@/domains/article/hooks/useCommentThread';

export function ArticleCommentsSection({
  articleId,
  initialComments,
  initialNextCursor,
}) {
  const [commentText, setCommentText] = useState('');
  const {
    comments,
    hasMore,
    isFetchingMore,
    isSubmitting,
    errorMessage,
    fetchMore,
    create,
    update,
    remove,
  } = useCommentThread({
    articleId,
    initialComments,
    initialNextCursor,
  });

  const handleCreate = async () => {
    const isCreated = await create(commentText);
    if (isCreated) {
      setCommentText('');
    }
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>댓글 달기</h2>

      <textarea
        className={styles.textarea}
        placeholder="댓글을 입력해 주세요."
        value={commentText}
        onChange={(event) => setCommentText(event.target.value)}
      />

      <button
        type="button"
        className={styles.postButton}
        disabled={!commentText.trim() || isSubmitting}
        onClick={handleCreate}
      >
        등록
      </button>

      {errorMessage ? <p className={styles.error}>{errorMessage}</p> : null}

      {comments.length ? (
        <div className={styles.commentList}>
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              item={comment}
              onDelete={remove}
              onUpdate={update}
            />
          ))}
        </div>
      ) : (
        <EmptyState text={`아직 댓글이 없어요,\n지금 댓글을 달아 보세요!`} />
      )}

      {hasMore ? (
        <button
          type="button"
          className={styles.moreButton}
          onClick={fetchMore}
          disabled={isFetchingMore}
        >
          {isFetchingMore ? '불러오는 중...' : '댓글 더 보기'}
        </button>
      ) : null}

      <LoadingSpinner isVisible={isSubmitting || isFetchingMore} />
    </section>
  );
}
