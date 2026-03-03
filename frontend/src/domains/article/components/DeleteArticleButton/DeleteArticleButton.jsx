'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { deleteArticle } from '@/apis';
import * as styles from './DeleteArticleButton.css';

export function DeleteArticleButton({ articleId, className = '' }) {
  const router = useRouter();

  const handleDelete = async () => {
    const isConfirmed = window.confirm('정말 삭제하시겠어요?');
    if (!isConfirmed) {
      return;
    }

    try {
      await deleteArticle(articleId);
      router.push('/board');
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : '게시글을 삭제하지 못했어요.';
      window.alert(message);
    }
  };

  return (
    <button
      type="button"
      className={clsx(styles.button, className)}
      onClick={handleDelete}
    >
      삭제
    </button>
  );
}
