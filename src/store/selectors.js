export const selectArticles = (state) => state.articles.articles;

export const selectArticle = (state) => state.article.article;

export const selectArticleError = (state) => state.article.error;

export const selectOffset = (state) => state.articles.offset;

export const selectIsRemove = (state) => state.articles.isRemove;

export const selectFetchStop = (state) => state.article.fetchStop;

export const selectFavorited = (state) => state.article.favorited;

export const selectIsCreateArticle = (state) => state.article.isCreateArticle;

export const selectCurrentPage = (state) => state.articles.currentPage;

export const selectArticlesError = (state) => state.articles.error;

export const selectArticlesCount = (state) => state.articles.articlesCount;

export const selectIsloading = (state) => state.articles.isloading;

export const selectisLogin = (state) => state.user.isLogin;

export const selectUser = (state) => state.user.user;

export const selectProfile = (state) => state.user.profile;

export const selectErrorUser = (state) => state.user.error;

export const selectErrorLogin = (state) => state.user.errorLogin;

export const selectErrorMessage = (state) => state.user.errorMessage;

export const selectCreatefulfilled = (state) => state.user.createfulfilled;