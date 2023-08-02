import { createSlice } from '@reduxjs/toolkit';

const mainSlice = createSlice({
  name: 'settings',
  initialState: {
    submitted: false,
    offline: false,
  },
  reducers: {
    checkSubmitted(state, { payload }) {
      state.submitted = payload;
    },

    checkOfflineStatus(state, { payload }) {
      state.offline = payload;
    },
  },
});

export const submitted = (state) => state.submitted;

export const { checkSubmitted, checkOfflineStatus } = mainSlice.actions;
export default mainSlice.reducer;
