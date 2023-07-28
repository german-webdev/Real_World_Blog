import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { offRedirect } from '../../store/slices/user-slice';
import Spinner from '../spinner';
import SignIn from '../sign-in';

const SignInPage = () => {
  const { status, redirect } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (status !== 'rejected' && redirect) {
      history.push('/articles');
      dispatch(offRedirect(false));
    }
  }, [status, history, dispatch, redirect]);

  const loading = status === 'loading' ? <Spinner /> : null;
  const content = status !== 'loading' ? <SignIn /> : null;
  return (
    <div>
      {loading}
      {content}
    </div>
  );
};

export default SignInPage;
