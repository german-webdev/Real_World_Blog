import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { checkSubmitted } from '../../store/slices/main-slice';
import WithArticleFormData from '../hoc-components/with-article-form-data';

const EditArticlePage = () => {
  const { article, articleStatus } = useSelector((state) => state.articles);
  const { submitted } = useSelector((state) => state.settings);
  const { auth } = useSelector((state) => state.user);
  const { slug } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (articleStatus === 'fulfilled' && submitted) {
      history.push(`/articles/${slug}`);
      dispatch(checkSubmitted(false));
    }

    if (!auth) {
      history.push('/articles');
    }
  }, [articleStatus, history, dispatch, submitted, slug, auth]);

  return <WithArticleFormData article={article} formTitle="Edit article" slug={slug} submitted={submitted} />;
};

EditArticlePage.defaultProps = {
  article: {},
};

EditArticlePage.propTypes = {
  article: PropTypes.shape({
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
  }),
};

export default EditArticlePage;
