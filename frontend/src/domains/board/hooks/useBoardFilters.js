'use client';

import { useSearchParams } from 'next/navigation';
import { parseBoardSearchParams } from '@/domains/board/utils/boardQuery';

export function useBoardFilters() {
  const searchParams = useSearchParams();

  return parseBoardSearchParams({
    page: searchParams.get('page'),
    pageSize: searchParams.get('pageSize'),
    orderBy: searchParams.get('orderBy'),
    keyword: searchParams.get('keyword'),
  });
}
