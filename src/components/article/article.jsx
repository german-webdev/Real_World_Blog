/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable dot-notation */
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import Markdown from 'markdown-to-jsx';
import { Popconfirm } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { deleteArticle } from '../../store/slices/articles-slice';
import Likes from '../article-likes';
import avatar from '../../assets/default-avatar.svg';

import classes from './article.module.scss';
import './popconfirm.scss';

const Article = (props) => {
  const { username } = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const { author, createdAt, description, favorited, favoritesCount, tagList, title, body, slug } = props;
  const authorAvatar = author?.image ? author?.image : avatar;
  const authorName = author?.username || 'Unknown Author';

  return (
    <div className={classes['article']}>
      <div className={classes['article__header']}>
        <div className={classes['header-left']}>
          <div className={classes['header-left__title']}>
            <Link to={`/articles/${slug}`}>{title}</Link>
            <Likes likes={favoritesCount} favorited={favorited} slug={slug} />
          </div>
          <ul className={classes['header-left__tags']}>
            {tagList && tagList.length > 0 && (
              <ul className={classes['header-left__tags']}>
                {tagList.map((tag) => {
                  return (
                    <li key={uuid()} className={classes['tag']}>
                      {tag}
                    </li>
                  );
                })}
              </ul>
            )}
          </ul>
          <div className={classes['description']}>{description}</div>
        </div>
        <div className={classes['header-right']}>
          <div className={classes['author-container']}>
            <div className={classes['author-info']}>
              <div className={classes['author-name']}>{authorName}</div>
              <Moment className={classes['post-date']} format="MMMM D, Y">
                {createdAt}
              </Moment>
            </div>
            <div className={classes['author-avatar-box']}>
              <img className={classes['author-avatar']} src={authorAvatar} alt="avatar" />
            </div>
          </div>

          {!!body && username === author?.username && (
            <div className={classes['article-controls']}>
              <Popconfirm
                description="Are you sure to delete this article?"
                onConfirm={() => dispatch(deleteArticle(slug))}
                okText="Yes"
                cancelText="No"
                placement="rightTop"
                overlayClassName={'popconfirm'}
              >
                <button type="button" className={classes['delete']}>
                  Delete
                </button>
              </Popconfirm>
              <Link to={`/articles/${slug}/edit`}>
                <button type="button" className={classes['edit']}>
                  Edit
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
      {!!body && (
        <div className={classes['article__body']}>
          <Markdown>{body}</Markdown>
        </div>
      )}
    </div>
  );
};

export default Article;
