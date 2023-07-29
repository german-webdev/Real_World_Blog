import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { offRedirect } from '../../store/slices/user-slice';
import SignUp from '../sign-up';

const SignUpPage = () => {
  const { userStatus, redirect } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (userStatus === 'fulfilled' && redirect) {
      history.push('/sign-in');
      dispatch(offRedirect(false));
    }
  }, [userStatus, history, redirect]);

  const content = userStatus !== 'loading' ? <SignUp /> : null;

  return <div>{content}</div>;
};

export default SignUpPage;
