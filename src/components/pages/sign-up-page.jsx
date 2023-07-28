import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Spinner from '../spinner';
import { offRedirect } from '../../store/slices/user-slice';
import SignUp from '../sign-up';

const SignUpPage = () => {
  const { auth, status, redirect } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (status === 'fulfilled' && redirect) {
      history.push('/sign-in');
      dispatch(offRedirect(false));
    }
  }, [auth, status, history, redirect]);

  const loading = status === 'loading' ? <Spinner /> : null;
  const content = status !== 'loading' ? <SignUp /> : null;

  return (
    <div>
      {loading}
      {content}
    </div>
  );
};

export default SignUpPage;
