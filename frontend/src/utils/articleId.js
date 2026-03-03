export function parseArticleId(value) {
  const articleId = Number(value);
  return Number.isFinite(articleId) && articleId > 0 ? articleId : null;
}
