import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { setErrors, updateProfile } from '../../store/slices/user-slice';
import { checkSubmitted } from '../../store/slices/main-slice';
import Profile from '../profile';

const WithProfileData = () => {
  const { errors } = useSelector((state) => state.user);
  const { username, email, image } = useSelector((state) => state.user.user);
  const { submitted } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  const profileFormik = useFormik({
    initialValues: {
      username: username || '',
      email: email || '',
      password: '',
      image: image || '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .matches(/^[a-zA-Z0-9]+$/, 'Username can only contain letters and numbers')
        .min(3, 'username must be at least 3 characters')
        .max(20, 'username must be less than 16 characters')
        .required('Username cannot be empty'),
      email: Yup.string()
        .matches(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/, 'Invalid email address')
        .required('Email cannot be empty'),
      password: Yup.string()
        .min(6, 'password must be at least 6 characters')
        .max(40, 'password must be no more than 40 characters')
        .required('New password cannot be empty'),
      image: Yup.string().url('URL format is invalid'),
    }),
    onSubmit: (values) => {
      const data = {
        user: {
          username: values.username,
          email: values.email,
          password: values.password,
          image: values.image,
        },
      };
      dispatch(updateProfile(data));
      dispatch(checkSubmitted(true));
    },
  });

  const onError = () => dispatch(setErrors(null));

  return <Profile formik={profileFormik} submitted={submitted} onError={onError} {...errors} />;
};

export default WithProfileData;
