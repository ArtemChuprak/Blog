import { configureStore } from '@reduxjs/toolkit';
import articlesSlice from './articlesSlice';
import articleSlice from './articleSlice';
import userSlice from './userSlice';

export default configureStore({
  reducer: {
    articles: articlesSlice,
    article: articleSlice,
    user: userSlice,
  },
});