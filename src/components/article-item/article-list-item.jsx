import { useSelector } from 'react-redux';

import Article from '../article';

const ArticleListItem = ({ slug }) => {
  const article = useSelector((state) => state.articles.articles.find((item) => item.slug === slug));
  const { body, ...otherProps } = article;

  return <Article {...otherProps} />;
};

export default ArticleListItem;
