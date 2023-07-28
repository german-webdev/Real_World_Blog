import { configureStore } from '@reduxjs/toolkit';

import mainSlice from './slices/main-slice';
import articleReducer from './slices/articles-slice';
import userSlice from './slices/user-slice';

const store = configureStore({
  reducer: {
    settings: mainSlice,
    articles: articleReducer,
    user: userSlice,
  },
});

export default store;
