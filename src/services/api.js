import { createAsyncThunk } from '@reduxjs/toolkit';

const baseURL = 'https://blog.kata.academy/api';

export const fetchArticle = createAsyncThunk(
  'article/fetchArticle',
  async (slug, rejectWithValue) => {
    try {
      const response = await fetch(`${baseURL}/articles/${slug}`);
      if (!response.ok) {
        throw new Error(response.status);
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchEditArticle = createAsyncThunk(
  'user/fetchEditArticle',
  async (data, { rejectWithValue }) => {
    const { result, slug } = data;
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${baseURL}/articles/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(result),
      });
      if (!response.ok) {
        throw new Error(response.status);
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchCreateArticle = createAsyncThunk(
  'user/fetchCreateArticle',
  async (data, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${baseURL}/articles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(response.status);
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchLikePlus = createAsyncThunk(
  'user/fetchLikePlus',
  async (slug, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${baseURL}/articles/${slug}/favorite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(response.status);
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchLikeMinus = createAsyncThunk(
  'user/fetchLikeMinus',
  async (slug, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${baseURL}/articles/${slug}/favorite`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(response.status);
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);