/* eslint-disable dot-notation */
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';

import { setLike, setUnlike } from '../../store/slices/articles-slice';

import classes from './article-likes.module.scss';

const Likes = ({ likes, favorited, slug }) => {
  const { auth } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <label className={classes['like-box']}>
      {favorited ? (
        <button onClick={() => auth && dispatch(setUnlike(slug))} className={classes['like']} type="button">
          <HeartFilled style={{ color: '#FF0707' }} />
        </button>
      ) : (
        <button onClick={() => auth && dispatch(setLike(slug))} className={classes['like']} type="button">
          <HeartOutlined style={{ color: 'rgba(0, 0, 0, 0.75)' }} />
        </button>
      )}

      <span className={classes['like-counter']}>{likes}</span>
    </label>
  );
};

Likes.defaultProps = {
  likes: 0,
  favorited: false,
  slug: '',
};

Likes.propTypes = {
  likes: PropTypes.number,
  favorited: PropTypes.bool,
  slug: PropTypes.string,
};

export default Likes;
