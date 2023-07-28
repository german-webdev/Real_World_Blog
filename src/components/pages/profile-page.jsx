import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { offRedirect } from '../../store/slices/user-slice';
import Profile from '../profile';

const ProfilePage = () => {
  const { userStatus, redirect } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (userStatus !== 'rejected' && redirect) {
      history.push('/articles');
      dispatch(offRedirect(false));
    }
  }, [userStatus, history, dispatch, redirect]);

  return (
    <div>
      <Profile />
    </div>
  );
};

export default ProfilePage;
