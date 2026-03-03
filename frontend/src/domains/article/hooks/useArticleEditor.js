'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createArticle, fetchArticleDetail, updateArticle } from '@/apis';
import { toErrorMessage } from '@/domains/article/utils/articleMessages';
import { parseArticleId } from '@/utils';

export function useArticleEditor(articleId) {
  const router = useRouter();
  const parsedArticleId = parseArticleId(articleId);
  const isEditMode = parsedArticleId !== null;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!isEditMode) {
      return;
    }

    let shouldIgnore = false;

    async function loadArticle() {
      setIsLoading(true);
      setErrorMessage('');

      try {
        const article = await fetchArticleDetail(parsedArticleId);
        if (shouldIgnore) {
          return;
        }

        setTitle(article?.title ?? '');
        setContent(article?.content ?? '');
      } catch (error) {
        if (!shouldIgnore) {
          setErrorMessage(
            toErrorMessage(error, '게시글 정보를 불러오지 못했어요.'),
          );
        }
      } finally {
        if (!shouldIgnore) {
          setIsLoading(false);
        }
      }
    }

    loadArticle();

    return () => {
      shouldIgnore = true;
    };
  }, [isEditMode, parsedArticleId]);

  const submit = async () => {
    if (!title.trim() || !content.trim() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      if (isEditMode) {
        const updated = await updateArticle({
          articleId: parsedArticleId,
          title: title.trim(),
          content: content.trim(),
        });
        router.push(`/board/${updated.id ?? parsedArticleId}`);
      } else {
        const created = await createArticle({
          title: title.trim(),
          content: content.trim(),
        });
        router.push(`/board/${created.id}`);
      }
      router.refresh();
    } catch (error) {
      setErrorMessage(toErrorMessage(error, '게시글을 저장하지 못했어요.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isEditMode,
    title,
    setTitle,
    content,
    setContent,
    isLoading,
    isSubmitting,
    errorMessage,
    submit,
  };
}
