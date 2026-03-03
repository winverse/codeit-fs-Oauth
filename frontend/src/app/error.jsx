'use client';

import { ErrorComponent } from '@/components/ErrorComponent';

export default function Error({ error, reset }) {
  return (
    <ErrorComponent
      error={error}
      onRetry={reset}
      title="예상치 못한 오류가 발생했어요."
      description="잠시 후 다시 시도하거나, 문제가 계속되면 목록 페이지로 이동해 주세요."
      linkHref="/board"
      linkLabel="게시판으로 이동"
    />
  );
}
