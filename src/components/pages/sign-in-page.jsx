import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { checkSubmitted } from '../../store/slices/main-slice';
import WithSignInData from '../hoc-components/with-sign-in-data';

const SignInPage = () => {
  const { userStatus, auth } = useSelector((state) => state.user);
  const { submitted } = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (submitted && userStatus === 'fulfilled' && auth) {
      history.replace('/articles');
      dispatch(checkSubmitted(false));
    }
  }, [userStatus, history, submitted, dispatch, auth]);

  return (
    <div>
      <WithSignInData submitted={submitted} />
    </div>
  );
};

export default SignInPage;
