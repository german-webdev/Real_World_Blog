/* eslint-disable dot-notation */
import { Fragment } from 'react';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';

import classes from './article-likes.module.scss';

const Likes = ({ likes, favorited }) => {
  return (
    <>
      {favorited ? (
        <span className={classes['like']} role="button" tabIndex="0">
          <HeartFilled style={{ color: '#FF0707' }} />
        </span>
      ) : (
        <span className={classes['like']} role="button" tabIndex="0">
          <HeartOutlined style={{ color: 'rgba(0, 0, 0, 0.75)' }} />
        </span>
      )}

      <span className={classes['like-counter']}>{likes}</span>
    </>
  );
};

export default Likes;
