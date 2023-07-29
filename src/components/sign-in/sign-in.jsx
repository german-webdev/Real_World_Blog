/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable dot-notation */
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { setErrors, loginUser } from '../../store/slices/user-slice';

import classes from './sign-in.module.scss';

const SignIn = () => {
  const loginErrorMassage = useSelector((state) => state.user.errors);
  const dispatch = useDispatch();

  const onError = () => {
    dispatch(setErrors(null));
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('password is required'),
    }),
    onSubmit: (values) => {
      console.debug(values);
      const user = {
        user: {
          email: values.email,
          password: values.password,
        },
      };
      dispatch(loginUser(user));
      console.debug(dispatch(loginUser(user)));
      console.debug(user);
    },
  });

  return (
    <div className={classes['sign-in']}>
      <div className={classes['sign-in__title-container']}>
        <h2 className={classes['sign-in__title']}>Sign In</h2>
        {Object.keys(loginErrorMassage).length > 0 && (
          <div className={classes['sign-in-error-message']}>{`"Email address or password ${Object.values(
            loginErrorMassage
          )}"`}</div>
        )}
      </div>
      <form onSubmit={formik.handleSubmit} className={classes['sign-in__form']}>
        <label htmlFor="email" className={classes['email-label']}>
          Email address
          <input
            type="email"
            id="email"
            name="email"
            {...formik.getFieldProps('email')}
            className={`${classes['email-input']} ${
              formik.touched.email && formik.errors.email ? classes['inputs-error'] : ''
            }`}
            placeholder="Email address"
            onFocus={() => onError()}
          />
          {formik.touched.email && formik.errors.email && (
            <div className={classes['inputs-error-message']}>{formik.errors.email}</div>
          )}
        </label>

        <label htmlFor="password" className={classes['password-label']}>
          Password
          <input
            type="password"
            id="password"
            name="password"
            {...formik.getFieldProps('password')}
            className={`${classes['password-input']} ${
              formik.touched.password && formik.errors.password ? classes['inputs-error'] : ''
            }`}
            onFocus={() => onError()}
            placeholder="Password"
          />
          {formik.touched.password && formik.errors.password && (
            <div className={classes['inputs-error-message']}>{formik.errors.password}</div>
          )}
        </label>

        <input type="submit" name="create" className={classes['submit']} value="Login" />
        <span className={classes['sign-up-info']}>
          Don’t have an account?{' '}
          <Link to="/sign-up" className={classes['sign-up-info__link']}>
            Sign Up.
          </Link>
        </span>
      </form>
    </div>
  );
};

export default SignIn;
