import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setLocalStorage, removeLocalStorage } from '../services/localstorage';

export const fetchUser = createAsyncThunk('user/fetchUser', async (user, { rejectWithValue }) => {
  try {
    const response = await fetch('https://blog.kata.academy/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchLoginIn = createAsyncThunk(
  'user/fetchLoginIn',
  async (user, { rejectWithValue }) => {
    try {
      const response = await fetch('https://blog.kata.academy/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(user),
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

export const fetchUpdateUser = createAsyncThunk(
  'user/fetchUpdateUser',
  async (user, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('https://blog.kata.academy/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(user),
      });
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('https://blog.kata.academy/api/user', {
        method: 'GET',
        headers: {
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

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: '',
    isloading: false,
    error: false,
    isLogin: false,
    errorLogin: false,
    errorMessage: {
      username: '',
      email: '',
    },
    createfulfilled: false,
  },
  reducers: {
    onLogOut(state, action) {
      state.isLogin = action.payload;
      state.token = '';
      removeLocalStorage('username', '');
      removeLocalStorage('token', '');
    },
    onReset(state) {
      state.error = false;
      state.errorLogin = false;
      state.fetchStop = false;
      state.createfulfilled = false;
      state.errorMessage = {
        username: '',
        email: '',
      };
    },
    onLogin(state) {
      state.isLogin = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.isloading = true;
      state.error = false;
      state.errorMessage = {
        username: '',
        email: '',
      };
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isloading = false;
      state.errorMessage = action.payload.errors
        ? action.payload.errors
        : { username: '', email: '' };
      state.createfulfilled = true;
      if (action.payload.errors) {
        state.createfulfilled = false;
      }
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.error = true;
      state.isloading = false;
    });
    builder.addCase(fetchLoginIn.pending, (state) => {
      state.isloading = true;
      state.errorLogin = false;
      state.error = false;
      state.errorMessage = {
        username: '',
        email: '',
      };
    });
    builder.addCase(fetchLoginIn.fulfilled, (state, action) => {
      state.isloading = false;
      setLocalStorage('username', action.payload.user.username);
      setLocalStorage('token', action.payload.user.token);
      state.user = action.payload.user;
      state.isLogin = true;
    });
    builder.addCase(fetchLoginIn.rejected, (state, action) => {
      if (action.payload === '422') {
        state.errorLogin = true;
        state.isloading = false;
      } else {
        state.error = true;
        state.isloading = false;
      }
    });
    builder.addCase(fetchProfile.pending, (state) => {
      state.isloading = true;
      state.error = false;
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.isloading = false;
      state.user = action.payload.user;
    });
    builder.addCase(fetchProfile.rejected, (state) => {
      state.error = true;
      state.isloading = false;
    });
    builder.addCase(fetchUpdateUser.pending, (state) => {
      state.isloading = true;
      state.error = false;
      state.errorMessage = {
        username: '',
        email: '',
      };
    });
    builder.addCase(fetchUpdateUser.fulfilled, (state, action) => {
      state.isloading = false;
      state.errorMessage = action.payload.errors
        ? action.payload.errors
        : { username: '', email: '' };
      state.createfulfilled = true;
      if (action.payload.errors) {
        state.createfulfilled = false;
      } else {
        state.user = action.payload.user;
      }
    });
    builder.addCase(fetchUpdateUser.rejected, (state) => {
      state.error = true;
      state.isloading = false;
    });
  },
});

export const { onLogOut, onReset, onLogin } = userSlice.actions;

export default userSlice.reducer;