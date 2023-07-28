/* eslint-disable dot-notation */
import ArticleItem from '../article-item';

import classes from './articles-list.module.scss';

const ArticleList = ({ articles }) => {
  const content = articles.map(({ slug }) => {
    return (
      <li key={slug} className={classes['article-item']}>
        <ArticleItem slug={slug} />
      </li>
    );
  });

  return <ul className={classes['articles']}>{content}</ul>;
};

export default ArticleList;