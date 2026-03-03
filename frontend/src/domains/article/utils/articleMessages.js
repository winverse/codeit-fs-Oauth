export function toErrorMessage(
  error,
  fallback = '요청 처리 중 오류가 발생했어요.',
) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}
