import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { ArticleService } from '../../services';

import { checkSubmitted } from './main-slice';

const articleService = new ArticleService();

export const fetchArticlesNotAuth = createAsyncThunk(
  'articles/fetchArticlesNotAuth',
  async (page, { rejectWithValue }) => {
    try {
      const response = await articleService.getArticlesWithoutAuth(page);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchArticlesWithAuth = createAsyncThunk(
  'articles/fetchArticlesWithAuth',
  async (page, { rejectWithValue }) => {
    try {
      const response = await articleService.getArticlesWithAuth(page);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCurrentArticleNotAuth = createAsyncThunk(
  'articles/fetchCurrentArticleNotAuth',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await articleService.getArticleWithoutAuth(slug);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCurrentArticleWithAuth = createAsyncThunk(
  'articles/fetchCurrentArticleWithAuth',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await articleService.getCurrentArticleWithAuth(slug);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createNewArticle = createAsyncThunk('articles/createNewArticle', async (data, { rejectWithValue }) => {
  try {
    const response = await articleService.sendArticle(data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteArticle = createAsyncThunk('articles/deleteArticle', async (slug, { dispatch, rejectWithValue }) => {
  try {
    const response = await articleService.deleteArticle(slug);
    dispatch(checkSubmitted(true));
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const editArticle = createAsyncThunk('articles/editArticle', async ({ data, slug }, { rejectWithValue }) => {
  try {
    const response = await articleService.editArticle(data, slug);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const setLike = createAsyncThunk('articles/setLike', async (slug, { rejectWithValue }) => {
  try {
    const response = await articleService.addLike(slug);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const setUnlike = createAsyncThunk('articles/setUnlike', async (slug, { rejectWithValue }) => {
  try {
    const response = await articleService.deleteLike(slug);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const setLoading = (state) => {
  state.articleStatus = 'loading';
  state.errorMessage = null;
};

const setError = (state, { payload }) => {
  state.articleStatus = 'rejected';
  state.errorMessage = payload.message;
};

const articleSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    article: {},
    editArticle: false,
    currentPage: 1,
    articlesCount: null,
    articleStatus: null,
    errorMessage: null,
  },
  reducers: {
    setPageNumber(state, { payload }) {
      state.currentPage = payload;
    },
    setEditArticleStatus(state, { payload }) {
      state.editArticle = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      /* fetchArticlesNotAuth */
      .addCase(fetchArticlesNotAuth.pending, setLoading)
      .addCase(fetchArticlesNotAuth.fulfilled, (state, { payload }) => {
        state.articleStatus = 'fulfilled';
        state.articles = payload.articles;
        state.articlesCount = payload.articlesCount;
      })
      .addCase(fetchArticlesNotAuth.rejected, setError)

      /* getArticlesWithAuth */
      .addCase(fetchArticlesWithAuth.pending, setLoading)
      .addCase(fetchArticlesWithAuth.fulfilled, (state, { payload }) => {
        state.articleStatus = 'fulfilled';
        state.articles = payload.articles;
        state.articlesCount = payload.articlesCount;
      })
      .addCase(fetchArticlesWithAuth.rejected, setError)

      /* getArticleWithoutAuth */
      .addCase(fetchCurrentArticleNotAuth.pending, setLoading)
      .addCase(fetchCurrentArticleNotAuth.fulfilled, (state, { payload }) => {
        state.articleStatus = 'fulfilled';
        state.article = payload.article;
      })
      .addCase(fetchCurrentArticleNotAuth.rejected, setError)

      /* getCurrentArticleWithAuth */
      .addCase(fetchCurrentArticleWithAuth.pending, setLoading)
      .addCase(fetchCurrentArticleWithAuth.fulfilled, (state, { payload }) => {
        state.articleStatus = 'fulfilled';
        state.article = payload.article;
      })
      .addCase(fetchCurrentArticleWithAuth.rejected, setError)

      /* createArticle */
      .addCase(createNewArticle.pending, setLoading)
      .addCase(createNewArticle.fulfilled, (state) => {
        state.articleStatus = 'fulfilled';
      })
      .addCase(createNewArticle.rejected, setError)

      /* deleteArticle */
      .addCase(deleteArticle.pending, setLoading)
      .addCase(deleteArticle.fulfilled, (state) => {
        state.articleStatus = 'fulfilled';
        state.article = {};
      })
      .addCase(deleteArticle.rejected, setError)

      /* editArticle */
      .addCase(editArticle.pending, setLoading)
      .addCase(editArticle.fulfilled, (state, { payload }) => {
        state.articleStatus = 'fulfilled';
        state.article = payload.article;
      })
      .addCase(editArticle.rejected, (state, { error }) => {
        state.articleStatus = 'rejected';
        state.errorMessage = error.message;
      })
      /* setLike */
      .addCase(setLike.fulfilled, (state, { payload }) => {
        state.articles = state.articles.map((article) => {
          if (article.slug === payload.article.slug) {
            return {
              ...article,
              favorited: payload.article.favorited,
              favoritesCount: payload.article.favoritesCount,
            };
          }
          return article;
        });
        state.articleStatus = 'fulfilled';
      })
      .addCase(setLike.rejected, (state, { error }) => {
        state.articleStatus = 'rejected';
        state.errorMessage = error.message;
      })
      /* setUnlike */
      .addCase(setUnlike.fulfilled, (state, { payload }) => {
        state.articles = state.articles.map((article) => {
          if (article.slug === payload.article.slug) {
            return {
              ...article,
              favorited: payload.article.favorited,
              favoritesCount: payload.article.favoritesCount,
            };
          }
          return article;
        });
        state.articleStatus = 'fulfilled';
      })
      .addCase(setUnlike.rejected, (state, { error }) => {
        state.articleStatus = 'rejected';
        state.errorMessage = error.message;
      });
  },
});

export const { setPageNumber, setEditArticleStatus } = articleSlice.actions;
export default articleSlice.reducer;
