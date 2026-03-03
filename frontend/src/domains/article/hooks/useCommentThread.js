'use client';

import { useState } from 'react';
import {
  createArticleComment,
  deleteComment,
  fetchArticleCommentList,
  updateComment,
} from '@/apis';
import { toErrorMessage } from '@/domains/article/utils/articleMessages';

export function useCommentThread({
  articleId,
  initialComments,
  initialNextCursor,
}) {
  const [comments, setComments] = useState(initialComments ?? []);
  const [nextCursor, setNextCursor] = useState(initialNextCursor ?? null);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const hasMore = nextCursor !== null;

  const fetchMore = async () => {
    if (!hasMore || isFetchingMore) {
      return;
    }

    setIsFetchingMore(true);
    setErrorMessage('');

    try {
      const response = await fetchArticleCommentList({
        articleId,
        limit: 10,
        cursor: nextCursor,
      });

      setComments((prev) => {
        const existingIds = new Set(prev.map((comment) => comment.id));
        const incoming = response.list.filter(
          (comment) => !existingIds.has(comment.id),
        );
        return [...prev, ...incoming];
      });
      setNextCursor(response.nextCursor ?? null);
    } catch (error) {
      setErrorMessage(toErrorMessage(error, '댓글을 더 불러오지 못했어요.'));
    } finally {
      setIsFetchingMore(false);
    }
  };

  const create = async (content) => {
    if (!content.trim()) {
      return false;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const created = await createArticleComment({ articleId, content });
      setComments((prev) => [created, ...prev]);
      return true;
    } catch (error) {
      setErrorMessage(toErrorMessage(error, '댓글을 등록하지 못했어요.'));
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const update = async ({ commentId, content }) => {
    try {
      const updated = await updateComment({ commentId, content });
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId
            ? { ...comment, content: updated.content }
            : comment,
        ),
      );
      return true;
    } catch (error) {
      setErrorMessage(toErrorMessage(error, '댓글을 수정하지 못했어요.'));
      return false;
    }
  };

  const remove = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
      return true;
    } catch (error) {
      setErrorMessage(toErrorMessage(error, '댓글을 삭제하지 못했어요.'));
      return false;
    }
  };

  return {
    comments,
    hasMore,
    isFetchingMore,
    isSubmitting,
    errorMessage,
    fetchMore,
    create,
    update,
    remove,
  };
}
