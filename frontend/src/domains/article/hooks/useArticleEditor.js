'use client';

import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { createArticle, fetchArticleDetail, updateArticle } from '@/apis';
import { toErrorMessage } from '@/domains/article/utils/articleMessages';
import { queryKeys } from '@/queries/queryKeys';
import { parseArticleId } from '@/utils';

export function useArticleEditor(articleId) {
  const router = useRouter();
  const parsedArticleId = parseArticleId(articleId);
  const isEditMode = parsedArticleId !== null;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isTitleDirty, setIsTitleDirty] = useState(false);
  const [isContentDirty, setIsContentDirty] = useState(false);
  const [submissionErrorMessage, setSubmissionErrorMessage] = useState('');

  const articleDetailQuery = useQuery({
    queryKey: queryKeys.articles.detail(parsedArticleId),
    queryFn: () => fetchArticleDetail(parsedArticleId),
    enabled: isEditMode,
  });

  const saveArticleMutation = useMutation({
    mutationFn: async ({ title, content }) => {
      if (isEditMode) {
        return updateArticle({
          articleId: parsedArticleId,
          title,
          content,
        });
      }

      return createArticle({
        title,
        content,
      });
    },
  });

  const resolvedTitle =
    isEditMode && !isTitleDirty
      ? (articleDetailQuery.data?.title ?? '')
      : title;
  const resolvedContent =
    isEditMode && !isContentDirty
      ? (articleDetailQuery.data?.content ?? '')
      : content;

  const updateTitle = (nextTitle) => {
    setIsTitleDirty(true);
    setTitle(nextTitle);
  };

  const updateContent = (nextContent) => {
    setIsContentDirty(true);
    setContent(nextContent);
  };

  const submit = async () => {
    if (
      !resolvedTitle.trim() ||
      !resolvedContent.trim() ||
      saveArticleMutation.isPending
    ) {
      return;
    }

    setSubmissionErrorMessage('');

    try {
      const savedArticle = await saveArticleMutation.mutateAsync({
        title: resolvedTitle.trim(),
        content: resolvedContent.trim(),
      });

      const nextArticleId = savedArticle.id ?? parsedArticleId;
      router.push(nextArticleId ? `/addArticle?id=${nextArticleId}` : '/');
      router.refresh();
    } catch (error) {
      setSubmissionErrorMessage(
        toErrorMessage(error, '게시글을 저장하지 못했어요.'),
      );
    }
  };

  const queryErrorMessage =
    isEditMode && articleDetailQuery.error
      ? toErrorMessage(
          articleDetailQuery.error,
          '게시글 정보를 불러오지 못했어요.',
        )
      : '';

  const errorMessage = submissionErrorMessage || queryErrorMessage;

  return {
    isEditMode,
    title: resolvedTitle,
    setTitle: updateTitle,
    content: resolvedContent,
    setContent: updateContent,
    isLoading: isEditMode && articleDetailQuery.isLoading,
    isSubmitting: saveArticleMutation.isPending,
    errorMessage,
    submit,
  };
}
