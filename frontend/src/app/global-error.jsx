'use client';

import { ErrorComponent } from '@/components/ErrorComponent';

export default function GlobalError({ error, reset }) {
  return (
    <html lang="ko">
      <body>
        <ErrorComponent
          error={error}
          onRetry={reset}
          title="서비스 오류가 발생했어요."
          description="전체 페이지 렌더링 중 문제가 발생했습니다. 아래 버튼으로 복구를 시도해 주세요."
          linkHref="/"
          linkLabel="홈으로 이동"
        />
      </body>
    </html>
  );
}
