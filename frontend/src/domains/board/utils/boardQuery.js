function first(value) {
  if (Array.isArray(value)) {
    return value[0] ?? '';
  }
  return value ?? '';
}

export function parseBoardSearchParams(searchParams = {}) {
  const pageValue = Number(first(searchParams.page) || '1');
  const pageSizeValue = Number(first(searchParams.pageSize) || '10');
  const orderByValue = first(searchParams.orderBy);
  const keywordValue = first(searchParams.keyword).trim();

  return {
    page: Number.isFinite(pageValue) && pageValue > 0 ? pageValue : 1,
    pageSize:
      Number.isFinite(pageSizeValue) && pageSizeValue > 0 && pageSizeValue <= 50
        ? pageSizeValue
        : 10,
    orderBy: orderByValue === 'like' ? 'like' : 'recent',
    keyword: keywordValue,
  };
}

export function buildBoardHref({
  page = 1,
  pageSize = 10,
  orderBy = 'recent',
  keyword = '',
} = {}) {
  const params = new URLSearchParams();

  params.set('page', String(page));
  params.set('pageSize', String(pageSize));
  params.set('orderBy', orderBy === 'like' ? 'like' : 'recent');

  if (keyword.trim()) {
    params.set('keyword', keyword.trim());
  }

  const query = params.toString();
  return query ? `/board?${query}` : '/board';
}
