'use client';

import { useState } from 'react';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {
  createArticleComment,
  deleteComment,
  fetchArticleCommentList,
  updateComment,
} from '@/apis';
import { toErrorMessage } from '@/domains/article/utils/articleMessages';
import { queryKeys } from '@/queries/queryKeys';

const COMMENT_PAGE_LIMIT = 10;

const toUniqueComments = (pages = []) => {
  const uniqueComments = [];
  const seenCommentIds = new Set();

  pages.forEach((page) => {
    page?.list?.forEach((comment) => {
      if (seenCommentIds.has(comment.id)) {
        return;
      }

      seenCommentIds.add(comment.id);
      uniqueComments.push(comment);
    });
  });

  return uniqueComments;
};

export function useCommentThread({
  articleId,
  initialComments,
  initialNextCursor,
}) {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState('');
  const commentListQueryKey = queryKeys.comments.list(articleId);

  const commentListQuery = useInfiniteQuery({
    queryKey: commentListQueryKey,
    queryFn: ({ pageParam }) =>
      fetchArticleCommentList({
        articleId,
        limit: COMMENT_PAGE_LIMIT,
        cursor: pageParam,
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialData: {
      pages: [
        {
          list: initialComments ?? [],
          nextCursor: initialNextCursor ?? null,
        },
      ],
      pageParams: [undefined],
    },
  });

  const createCommentMutation = useMutation({
    mutationFn: (content) => createArticleComment({ articleId, content }),
    onSuccess: (createdComment) => {
      queryClient.setQueryData(commentListQueryKey, (previous) => {
        if (!previous?.pages?.length) {
          return previous;
        }

        const [firstPage, ...restPages] = previous.pages;
        return {
          ...previous,
          pages: [
            {
              ...firstPage,
              list: [
                createdComment,
                ...firstPage.list.filter(
                  (comment) => comment.id !== createdComment.id,
                ),
              ],
            },
            ...restPages,
          ],
        };
      });
    },
  });

  const updateCommentMutation = useMutation({
    mutationFn: ({ commentId, content }) =>
      updateComment({ commentId, content }),
    onSuccess: (updatedComment, variables) => {
      queryClient.setQueryData(commentListQueryKey, (previous) => {
        if (!previous?.pages?.length) {
          return previous;
        }

        return {
          ...previous,
          pages: previous.pages.map((page) => ({
            ...page,
            list: page.list.map((comment) =>
              comment.id === variables.commentId
                ? { ...comment, content: updatedComment.content }
                : comment,
            ),
          })),
        };
      });
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId) => deleteComment(commentId),
    onSuccess: (_, deletedCommentId) => {
      queryClient.setQueryData(commentListQueryKey, (previous) => {
        if (!previous?.pages?.length) {
          return previous;
        }

        return {
          ...previous,
          pages: previous.pages.map((page) => ({
            ...page,
            list: page.list.filter(
              (comment) => comment.id !== deletedCommentId,
            ),
          })),
        };
      });
    },
  });

  const comments = toUniqueComments(commentListQuery.data?.pages);
  const hasMore = commentListQuery.hasNextPage;
  const isFetchingMore = commentListQuery.isFetchingNextPage;
  const isSubmitting = createCommentMutation.isPending;

  const fetchMore = async () => {
    if (!hasMore || isFetchingMore) {
      return;
    }

    setErrorMessage('');

    try {
      await commentListQuery.fetchNextPage();
    } catch (error) {
      setErrorMessage(toErrorMessage(error, '댓글을 더 불러오지 못했어요.'));
    }
  };

  const create = async (content) => {
    if (!content.trim()) {
      return false;
    }

    setErrorMessage('');

    try {
      await createCommentMutation.mutateAsync(content.trim());
      return true;
    } catch (error) {
      setErrorMessage(toErrorMessage(error, '댓글을 등록하지 못했어요.'));
      return false;
    }
  };

  const update = async ({ commentId, content }) => {
    setErrorMessage('');

    try {
      await updateCommentMutation.mutateAsync({ commentId, content });
      return true;
    } catch (error) {
      setErrorMessage(toErrorMessage(error, '댓글을 수정하지 못했어요.'));
      return false;
    }
  };

  const remove = async (commentId) => {
    setErrorMessage('');

    try {
      await deleteCommentMutation.mutateAsync(commentId);
      return true;
    } catch (error) {
      setErrorMessage(toErrorMessage(error, '댓글을 삭제하지 못했어요.'));
      return false;
    }
  };

  const resolvedErrorMessage =
    errorMessage ||
    (commentListQuery.error
      ? toErrorMessage(commentListQuery.error, '댓글을 불러오지 못했어요.')
      : '');

  return {
    comments,
    hasMore,
    isFetchingMore,
    isSubmitting,
    errorMessage: resolvedErrorMessage,
    fetchMore,
    create,
    update,
    remove,
  };
}
