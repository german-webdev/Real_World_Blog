import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { setErrors, loginUser } from '../../store/slices/user-slice';
import { checkSubmitted } from '../../store/slices/main-slice';
import SignIn from '../sign-in';

const WithSignInData = (props) => {
  const { errors } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const signInFormik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/, 'Invalid email address')
        .required('Email is required'),
      password: Yup.string().required('password is required'),
    }),
    onSubmit: (values) => {
      const data = {
        user: {
          email: values.email,
          password: values.password,
        },
      };
      dispatch(loginUser(data));
      dispatch(checkSubmitted(true));
    },
  });

  const onError = () => dispatch(setErrors(null));

  return <SignIn {...props} formik={signInFormik} errors={errors} onError={onError} />;
};

WithSignInData.defaultProps = {
  errors: {},
  onError: () => {},
};

WithSignInData.propTypes = {
  errors: PropTypes.shape({}),
  onError: PropTypes.func,
};

export default WithSignInData;
