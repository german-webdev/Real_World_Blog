import { useSelector } from 'react-redux';

import Article from '../article';

const ArticleItem = ({ slug }) => {
  const article = useSelector((state) => state.articles.articles.find((a) => a.slug === slug));
  const { body, ...data } = article;

  return <Article {...data} />;
};

export default ArticleItem;
