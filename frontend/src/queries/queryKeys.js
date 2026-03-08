export const queryKeys = {
  articles: {
    detail: (articleId) => ['articles', 'detail', articleId],
  },
  comments: {
    list: (articleId) => ['articles', articleId, 'comments'],
  },
};
