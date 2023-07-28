/* eslint-disable dot-notation */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { removeUser } from '../../store/slices/user-slice';
import avatar from '../../assets/default-avatar.svg';

import classes from './header.module.scss';

const Header = () => {
  const { auth } = useSelector((state) => state.user);
  const { image, username } = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const withAuthClasses = classNames(classes['header-content-list'], {
    [classes['header-content-list--auth']]: auth,
  });

  const logOut = () => {
    dispatch(removeUser());
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <header className={classes['header']}>
      <div className={classes['header__content']}>
        <div>
          <Link className={classes['logo']} to="/articles">
            Realworld Blog
          </Link>
        </div>

        <ul className={withAuthClasses}>
          <li>
            <Link to="/sign-in">
              <button type="button" className={classes['sign-in-btn']}>
                Sign In
              </button>
            </Link>
          </li>
          <li>
            <Link to="/sign-up">
              <button type="button" className={classes['sign-up-btn']}>
                Sign Up
              </button>
            </Link>
          </li>
          <li>
            <Link to="/new-article">
              <button type="button" className={classes['create-article-btn']}>
                Create article
              </button>
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <button type="button" className={classes['profile-btn']}>
                <p className={classes['name']}>{username}</p>
                <img className={classes['avatar']} src={image || avatar} alt="avatar" />
              </button>
            </Link>
          </li>
          <li>
            <button onClick={() => logOut()} type="button" className={classes['log-out-btn']}>
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
