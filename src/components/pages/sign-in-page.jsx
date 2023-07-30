import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { offRedirect } from '../../store/slices/user-slice';
import SignIn from '../sign-in';

const SignInPage = () => {
  const { userStatus, redirect, auth } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (redirect && userStatus === 'fulfilled' && auth) {
      history.replace('/articles');
      dispatch(offRedirect(false));
    }
  }, [userStatus, history, redirect, dispatch, auth]);

  const content = userStatus !== 'loading' ? <SignIn /> : null;
  return <div>{content}</div>;
};

export default SignInPage;
