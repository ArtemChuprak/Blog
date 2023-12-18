import { createSlice } from '@reduxjs/toolkit';
import {
  fetchArticle,
  fetchCreateArticle,
  fetchEditArticle,
  fetchLikePlus,
  fetchLikeMinus,
} from '../services/api';

const articleSlice = createSlice({
  name: 'article',
  initialState: {
    article: '',
    isloading: false,
    error: false,
    fetchStop: false,
    isCreateArticle: false,
  },
  reducers: {
    onIsArticle(state, action) {
      state.isCreateArticle = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticle.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(fetchArticle.fulfilled, (state, action) => {
      state.isloading = false;
      state.article = action.payload.article;
      state.fetchStop = true;
    });
    builder.addCase(fetchArticle.rejected, (state) => {
      state.error = true;
      state.isloading = false;
    });
    builder.addCase(fetchCreateArticle.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(fetchCreateArticle.fulfilled, (state) => {
      state.isloading = false;
      state.isCreateArticle = true;
    });
    builder.addCase(fetchCreateArticle.rejected, (state) => {
      state.error = true;
      state.isloading = false;
    });
    builder.addCase(fetchEditArticle.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(fetchEditArticle.fulfilled, (state) => {
      state.isloading = false;
      state.isCreateArticle = true;
    });
    builder.addCase(fetchEditArticle.rejected, (state) => {
      state.error = true;
      state.isloading = false;
    });
    builder.addCase(fetchLikePlus.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(fetchLikePlus.fulfilled, (state) => {
      state.isloading = false;
    });
    builder.addCase(fetchLikePlus.rejected, (state) => {
      state.error = true;
      state.isloading = false;
    });
    builder.addCase(fetchLikeMinus.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(fetchLikeMinus.fulfilled, (state) => {
      state.isloading = false;
      state.favorited = !state.favorited;
    });
    builder.addCase(fetchLikeMinus.rejected, (state) => {
      state.error = true;
      state.isloading = false;
    });
  },
});

export const { onIsArticle } = articleSlice.actions;

export default articleSlice.reducer;