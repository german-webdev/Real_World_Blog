import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { setErrors, registrationUser } from '../../store/slices/user-slice';
import { checkSubmitted } from '../../store/slices/main-slice';
import SignUp from '../sign-up';

const WithSignUpData = (props) => {
  const { errors } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const signUpFormik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
      checkbox: false,
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .matches(/^[a-zA-Z0-9]+$/, 'Username can only contain letters and numbers')
        .min(3, 'username must be at least 3 characters')
        .max(20, 'username must be less than 20 characters')
        .required('Username is required'),
      email: Yup.string()
        .matches(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/, 'Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'password must be at least 6 characters')
        .max(16, 'password must be no more than 16 characters')
        .required('password is required'),
      repeatPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Repeat Password is required'),
      checkbox: Yup.boolean().oneOf([true], 'You must agree to the terms'),
    }),
    onSubmit: (values) => {
      const data = {
        user: {
          username: values.username,
          email: values.email,
          password: values.password,
        },
      };
      dispatch(registrationUser(data));
      dispatch(checkSubmitted(true));
    },
  });

  const onError = () => dispatch(setErrors(null));

  return <SignUp formik={signUpFormik} onError={onError} {...errors} {...props} />;
};

WithSignUpData.defaultProps = {
  errors: {},
  onError: () => {},
};

WithSignUpData.propTypes = {
  errors: PropTypes.shape({}),
  onError: PropTypes.func,
};

export default WithSignUpData;
