export const toSafeList = (payload) =>
  Array.isArray(payload?.list) ? payload.list : [];

export const toSafeTotalCount = (payload) => Number(payload?.totalCount ?? 0);

export const toSafeNextCursor = (payload) => payload?.nextCursor ?? null;
