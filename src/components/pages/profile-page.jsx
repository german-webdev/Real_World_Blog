import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { offRedirect } from '../../store/slices/user-slice';
import Profile from '../profile';

const ProfilePage = () => {
  const { userStatus, redirect, auth } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (userStatus !== 'rejected' && redirect) {
      history.push('/articles');
      dispatch(offRedirect(false));
    }
    if (!auth) {
      history.push('/articles');
    }
  }, [userStatus, history, dispatch, redirect, auth]);

  return (
    <div>
      <Profile />
    </div>
  );
};

export default ProfilePage;
