/* eslint-disable dot-notation */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchArticlesNotAuth, fetchArticlesWithAuth } from '../../store/slices/articles-slice';
import ErrorIndicator from '../error-indicator';
import ArticleList from '../articles-list';
import MyPagination from '../pagination';

const HomePage = () => {
  const { articles, currentPage, articleStatus } = useSelector((state) => state.articles);
  const { auth } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth) {
      dispatch(fetchArticlesWithAuth(currentPage));
    } else {
      dispatch(fetchArticlesNotAuth(currentPage));
    }

    console.debug('data', dispatch(fetchArticlesNotAuth(currentPage)));
    console.debug('dataW', dispatch(fetchArticlesWithAuth(currentPage)));
    window.scrollTo(0, 0);
  }, [currentPage, dispatch, auth]);

  const content = <ArticleList articles={articles} />;

  const pagination = <MyPagination />;

  const loading = articleStatus === 'loading';
  const error = articleStatus === 'rejected';
  const hasData = !(loading || error);

  const viewContent = hasData ? content : null;
  const viewPagination = hasData && articles.length ? pagination : null;
  const errorMassage = error ? ErrorIndicator : null;

  return (
    <>
      {viewContent}
      {viewPagination}
      {errorMassage}
    </>
  );
};

export default HomePage;
