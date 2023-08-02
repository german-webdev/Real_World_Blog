import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { checkSubmitted } from '../../store/slices/main-slice';
import WithSignUpData from '../hoc-components/with-sign-up-data';

const SignUpPage = () => {
  const { userStatus } = useSelector((state) => state.user);
  const { submitted } = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (userStatus === 'fulfilled' && submitted) {
      history.push('/sign-in');
      dispatch(checkSubmitted(false));
    }
  }, [userStatus, history, submitted]);

  return (
    <div>
      <WithSignUpData submitted={submitted} />
    </div>
  );
};

export default SignUpPage;
