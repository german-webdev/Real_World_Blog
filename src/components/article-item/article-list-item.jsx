import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Article from '../article';

const ArticleListItem = ({ slug }) => {
  const article = useSelector((state) => state.articles.articles.find((item) => item.slug === slug));
  const { body, ...otherProps } = article;

  return <Article {...otherProps} />;
};

Article.propTypes = {
  author: PropTypes.shape({
    username: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    following: PropTypes.bool.isRequired,
  }).isRequired,
  createdAt: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  favorited: PropTypes.bool.isRequired,
  favoritesCount: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
  tagList: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
};

export default ArticleListItem;
