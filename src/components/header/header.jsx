/* eslint-disable dot-notation */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { removeUser } from '../../store/slices/user-slice';
import avatar from '../../assets/default-avatar.svg';

import classes from './header.module.scss';

const Header = () => {
  const { auth } = useSelector((state) => state.user);
  const { image, username } = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const location = useLocation();

  const [activeButton, setActiveButton] = useState(null);

  const logOut = () => {
    dispatch(removeUser());
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const handleButtonClick = (buttonClass) => {
    setActiveButton(buttonClass);
  };

  useEffect(() => {
    const { pathname } = location;
    if (pathname === '/sign-in') {
      setActiveButton('sign-in-btn');
    } else if (pathname === '/sign-up') {
      setActiveButton('sign-up-btn');
    } else {
      setActiveButton(null);
    }
  }, [location]);

  const generateButtonClass = (baseClass) => {
    return classNames(classes[baseClass], {
      [classes[`${baseClass}--active`]]: activeButton === baseClass,
    });
  };

  const signInButtonClasses = generateButtonClass('sign-in-btn');
  const signUpButtonClasses = generateButtonClass('sign-up-btn');

  return (
    <header className={classes['header']}>
      <div className={classes['header__content']}>
        <div>
          <Link className={classes['logo']} to="/articles">
            Realworld Blog
          </Link>
        </div>

        <ul className={classes['header-content-list']}>
          {!auth && (
            <div className={classes['log-out-box']}>
              <li>
                <Link to="/sign-in">
                  <button
                    type="button"
                    className={signInButtonClasses}
                    onClick={() => handleButtonClick('sign-in-btn')}
                  >
                    Sign In
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/sign-up">
                  <button
                    type="button"
                    className={signUpButtonClasses}
                    onClick={() => handleButtonClick('sign-up-btn')}
                  >
                    Sign Up
                  </button>
                </Link>
              </li>
            </div>
          )}

          {auth && (
            <div className={classes['log-in-box']}>
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
            </div>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
