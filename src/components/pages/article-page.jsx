import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import ErrorBoundary from '../error-boundary';
import ErrorIndicator from '../error-indicator';
import { fetchCurrentArticleNotAuth, fetchCurrentArticleWithAuth } from '../../store/slices/articles-slice';
import { checkSubmitted } from '../../store/slices/main-slice';
import Article from '../article';

const ArticlePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { slug } = useParams();
  const { article, articleStatus } = useSelector((state) => state.articles);
  const { auth } = useSelector((state) => state.user);
  const { submitted } = useSelector((state) => state.settings);

  useEffect(() => {
    if (auth) {
      dispatch(fetchCurrentArticleWithAuth(slug));
    } else {
      dispatch(fetchCurrentArticleNotAuth(slug));
    }
    window.scrollTo(0, 0);
  }, [slug, auth]);

  useEffect(() => {
    if (articleStatus === 'fulfilled' && submitted) {
      history.push('/articles');
      dispatch(checkSubmitted(false));
    }
  }, [articleStatus, history, dispatch, submitted]);

  const content = <Article {...article} />;
  const loading = articleStatus === 'loading';
  const error = articleStatus === 'rejected';
  const hasData = !(loading || error);

  const viewContent = hasData ? content : null;
  const errorMassage = error ? <ErrorIndicator /> : null;
  return (
    <ErrorBoundary>
      {viewContent}
      {errorMassage}
    </ErrorBoundary>
  );
};

export default ArticlePage;
