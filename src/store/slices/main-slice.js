import { createSlice } from '@reduxjs/toolkit';

const mainSlice = createSlice({
  name: 'settings',
  initialState: {
    submitted: false,
  },
  reducers: {
    checkSubmitted(state, { payload }) {
      state.submitted = payload;
    },
  },
});

export const { checkSubmitted } = mainSlice.actions;
export default mainSlice.reducer;
