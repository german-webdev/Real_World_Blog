/* eslint-disable react/no-unused-prop-types */
/* eslint-disable dot-notation */
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { fetchArticlesNotAuth, fetchArticlesWithAuth } from '../../store/slices/articles-slice';
import ErrorBoundary from '../error-boundary';
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
    window.scrollTo(0, 0);
  }, [currentPage, dispatch, auth]);

  const content = <ArticleList articles={articles} />;

  const pagination = <MyPagination />;

  const loading = articleStatus === 'loading';
  const error = articleStatus === 'rejected';
  const hasData = !(loading || error);

  const viewContent = hasData ? content : null;
  const viewPagination = hasData && articles.length ? pagination : null;
  const errorMassage = error ? <ErrorIndicator /> : null;

  return (
    <ErrorBoundary>
      {viewContent}
      {viewPagination}
      {errorMassage}
    </ErrorBoundary>
  );
};

HomePage.defaultProps = {
  articles: [],
};

HomePage.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      body: PropTypes.string,
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
      tagList: PropTypes.arrayOf(PropTypes.string),
      favorited: PropTypes.bool,
      favoritesCount: PropTypes.number,
      author: PropTypes.shape({
        username: PropTypes.string,
        image: PropTypes.string,
        following: PropTypes.bool,
      }),
    })
  ),
};

export default HomePage;
