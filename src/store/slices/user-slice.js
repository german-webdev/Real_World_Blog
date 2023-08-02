/* eslint-disable guard-for-in */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { UserService } from '../../services';

const userService = new UserService();

export const registrationUser = createAsyncThunk('user/registrationUser', async (data, { rejectWithValue }) => {
  try {
    const response = await userService.registration(data);
    const { user } = response.data;
    const { token, ...otherProps } = user;
    localStorage.setItem('token', token);
    return otherProps;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const loginUser = createAsyncThunk('user/loginUser', async (data, { rejectWithValue }) => {
  try {
    const response = await userService.login(data);
    const { user } = response.data;
    const { token, ...otherProps } = user;
    localStorage.setItem('token', token);
    return otherProps;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateProfile = createAsyncThunk('user/updateProfile', async (data, { rejectWithValue }) => {
  try {
    const response = await userService.updateProfileValues(data);
    const { user } = response.data;
    const { token, ...otherProps } = user;
    localStorage.setItem('token', token);
    return otherProps;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      username: null,
      email: null,
      image: null,
    },
    auth: false,
    redirect: true,
    errors: {},
    userStatus: null,
  },
  reducers: {
    restoreUser(state, { payload }) {
      state.user = payload;
      state.auth = true;
    },

    removeUser(state) {
      state.user = {};
      state.auth = false;
    },

    offRedirect(state, { payload }) {
      state.redirect = payload;
    },

    setErrors(state, { payload }) {
      if (!payload) {
        state.errors = {};
      } else {
        state.errors = payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      /* registrationUser */
      .addCase(registrationUser.pending, (state) => {
        state.userStatus = 'loading';
        state.redirect = false;
      })
      .addCase(registrationUser.fulfilled, (state, { payload }) => {
        state.userStatus = 'fulfilled';
        state.redirect = true;
        state.user = payload;
      })
      .addCase(registrationUser.rejected, (state, { payload }) => {
        state.redirect = false;
        state.userStatus = 'rejected';
        state.errors = payload.errors;
        localStorage.removeItem('token');
      })

      /* loginUser */
      .addCase(loginUser.pending, (state) => {
        state.userStatus = 'loading';
        state.redirect = false;
        state.auth = false;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.userStatus = 'fulfilled';
        state.redirect = true;
        state.auth = true;
        state.user = payload;
        state.user.image = payload.image || 'https://api.realworld.io/images/smiley-cyrus.jpeg';
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.userStatus = 'rejected';
        state.redirect = false;
        state.auth = false;
        state.errors = payload.errors;
      })
      /* updateProfile */
      .addCase(updateProfile.pending, (state) => {
        state.userStatus = 'loading';
        state.redirect = false;
      })
      .addCase(updateProfile.fulfilled, (state, { payload }) => {
        const { username, email, image } = payload;
        state.userStatus = 'fulfilled';
        state.redirect = true;
        state.auth = true;
        state.user = {
          username,
          email,
          image: image || 'https://api.realworld.io/images/smiley-cyrus.jpeg',
        };
      })
      .addCase(updateProfile.rejected, (state, { payload }) => {
        state.userStatus = 'rejected';
        state.redirect = false;
        state.errors = payload.errors;
      });
  },
});

export const loginErrorMessage = (state) => state.errors;

export const { setErrors, offRedirect, restoreUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
