import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { checkSubmitted } from '../../store/slices/main-slice';
import ArticleForm from '../article-form';

const NewArticlePage = () => {
  const { articleStatus } = useSelector((state) => state.articles);
  const { submitted } = useSelector((state) => state.settings);
  const { auth } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (articleStatus !== 'rejected' && submitted) {
      history.push('/articles');
      dispatch(checkSubmitted(false));
    }
    if (!auth) {
      history.push('/articles');
    }
  }, [articleStatus, history, dispatch, submitted]);

  return <ArticleForm formTitle="Create new article" />;
};

export default NewArticlePage;
