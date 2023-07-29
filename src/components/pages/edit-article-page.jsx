import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { checkSubmitted } from '../../store/slices/main-slice';
import ArticleForm from '../article-form';

const EditArticlePage = () => {
  const { article, articleStatus } = useSelector((state) => state.articles);
  const { submitted } = useSelector((state) => state.settings);
  const { auth } = useSelector((state) => state.user);
  const { slug } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  console.debug('EditArticlePage Slug:', slug);

  useEffect(() => {
    if (articleStatus === 'fulfilled' && submitted) {
      history.push(`/articles/${slug}`);
      dispatch(checkSubmitted(false));
    }

    if (!auth) {
      history.push('/articles');
    }
  }, [articleStatus, history, dispatch, submitted, slug, auth]);

  return <ArticleForm article={article} formTitle="Edit article" slug={slug} />;
};

export default EditArticlePage;
