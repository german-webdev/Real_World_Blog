/* eslint-disable dot-notation */
/* eslint-disable react/no-unstable-nested-components */
import { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { offRedirect, restoreUser } from '../../store/slices/user-slice';
import Header from '../header';
import HomePage from '../pages/home-page';
import ArticlePage from '../pages/article-page';
import SignInPage from '../pages/sign-in-page';
import SignUpPage from '../pages/sign-up-page';
import ProfilePage from '../pages/profile-page';
import NewArticlePage from '../pages/new-article-page';
import EditArticlePage from '../pages/edit-article-page';
import Preloader from '../spinner';

import './reset.scss';
import classes from './app.module.scss';

const App = () => {
  const dispatch = useDispatch();
  const { user, auth, redirect, userStatus } = useSelector((state) => state.user);
  const { articleStatus } = useSelector((state) => state.articles);
  const history = useHistory();

  useEffect(() => {
    if (auth) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user, auth]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('user'));
    if (token) {
      dispatch(restoreUser(userData));
    }
    if (redirect) {
      history.replace('/articles');
      dispatch(offRedirect(false));
    }
  }, [history, auth, redirect]);

  const loadingClasses = classNames(classes['wrapper'], {
    [classes['wrapper--loading']]: articleStatus === 'loading' || userStatus === 'loading',
  });

  return (
    <>
      {articleStatus === 'loading' || userStatus === 'loading' ? <Preloader /> : null}
      <div className={loadingClasses}>
        <Header />
        <main className={classes['main']}>
          <Switch>
            <Route path="/articles" component={HomePage} exact />
            <Route path="/sign-in" component={SignInPage} />
            <Route path="/sign-up" component={SignUpPage} />
            <Route path="/articles/:slug/edit" component={EditArticlePage} exact />
            <Route path="/articles/:slug" component={ArticlePage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/new-article" component={NewArticlePage} />
          </Switch>
        </main>
      </div>
    </>
  );
};

export default App;
