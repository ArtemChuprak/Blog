/* eslint-disable no-use-before-define */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (offset, rejectWithValue) => {
    try {
      const response = await fetch(
        `https://blog.kata.academy/api/articles?limit=5&offset=${offset}`,
      );
      if (!response.ok) {
        throw new Error(response.status);
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchRemoveArticle = createAsyncThunk(
  'user/fetchRemoveArticle',
  async (slug, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(response.status);
      }
      return dispatch(onIsRemove(true));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    isloading: false,
    error: false,
    limit: 5,
    offset: 0,
    currentPage: 1,
    articlesCount: 0,
    isRemove: false,
  },
  reducers: {
    onOffset(state, action) {
      state.offset = action.payload.page * 5 - 5;
      state.currentPage = action.payload.page;
    },
    onIsRemove(state, action) {
      state.isRemove = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.isloading = false;
      state.articles = action.payload.articles;
      state.articlesCount = action.payload.articlesCount;
    });
    builder.addCase(fetchArticles.rejected, (state) => {
      state.error = true;
      state.isloading = false;
    });
    builder.addCase(fetchRemoveArticle.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(fetchRemoveArticle.fulfilled, (state) => {
      state.isloading = false;
    });
    builder.addCase(fetchRemoveArticle.rejected, (state) => {
      state.error = true;
      state.isloading = false;
    });
  },
});

export const { onOffset, onIsRemove } = articlesSlice.actions;

export default articlesSlice.reducer;