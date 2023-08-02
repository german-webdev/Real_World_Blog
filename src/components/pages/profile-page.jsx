import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { checkSubmitted } from '../../store/slices/main-slice';
import WithProfileData from '../hoc-components/with-profile-data';

const ProfilePage = () => {
  const { userStatus, auth } = useSelector((state) => state.user);
  const { submitted } = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (userStatus === 'fulfilled' && submitted) {
      history.push('/articles');
      dispatch(checkSubmitted(false));
    }
    if (!auth) {
      history.push('/articles');
    }
  }, [userStatus, history, dispatch, submitted, auth]);

  return (
    <div>
      <WithProfileData />
    </div>
  );
};

export default ProfilePage;
