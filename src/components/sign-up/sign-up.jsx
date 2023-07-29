/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable dot-notation */
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { setErrors, registrationUser } from '../../store/slices/user-slice';

import classes from './sign-up.module.scss';

const SignUp = () => {
  const { username, email } = useSelector((state) => state.user.errors);
  const dispatch = useDispatch();

  const onError = () => {
    dispatch(setErrors(null));
  };

  const formik = useFormik({
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
        .max(15, 'username must be less than 15 characters')
        .required('Username is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
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
      // Обработка отправки формы
      console.debug(values);
      const user = {
        user: {
          username: values.username,
          email: values.email,
          password: values.password,
        },
      };
      dispatch(registrationUser(JSON.stringify(user)));
      console.debug(dispatch(registrationUser(user)));
      console.debug(user);
    },
  });

  return (
    <div className={classes['sign-up']}>
      <h2 className={classes['sign-up__title']}>Create new account</h2>

      <form onSubmit={formik.handleSubmit} className={classes['sign-up__form']}>
        <label htmlFor="username" className={classes['user-name-label']}>
          Username
          <input
            type="text"
            id="username"
            name="username"
            {...formik.getFieldProps('username')}
            className={`${classes['user-name-input']} ${
              formik.touched.username && formik.errors.username ? classes['inputs-error'] : ''
            }`}
            placeholder="Username"
            onFocus={() => onError()}
          />
          {formik.touched.username && formik.errors.username && (
            <div className={classes['inputs-error-message']}>{formik.errors.username}</div>
          )}
          {username && <div className={classes['inputs-error-message']}>{`Username ${username}`}</div>}
        </label>

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
          {email && <div className={classes['inputs-error-message']}>{`Email address ${email}`}</div>}
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
            placeholder="Password"
          />
          {formik.touched.password && formik.errors.password && (
            <div className={classes['inputs-error-message']}>{formik.errors.password}</div>
          )}
        </label>

        <label htmlFor="repeatPassword" className={classes['password-label']}>
          Repeat Password
          <input
            type="password"
            id="repeatPassword"
            name="repeatPassword"
            {...formik.getFieldProps('repeatPassword')}
            className={`${classes['password-input']} ${
              formik.touched.repeatPassword && formik.errors.repeatPassword ? classes['inputs-error'] : ''
            }`}
            placeholder="Password"
          />
          {formik.touched.repeatPassword && formik.errors.repeatPassword && (
            <div className={classes['inputs-error-message']}>{formik.errors.repeatPassword}</div>
          )}
        </label>

        <span className={classes['divider']} />

        <label htmlFor="checkbox" className={classes['checkbox-label']}>
          <input
            type="checkbox"
            id="checkbox"
            name="checkbox"
            checked={formik.values.checkbox}
            {...formik.getFieldProps('checkbox')}
            className={`${classes['checkbox-input']} ${
              formik.touched.checkbox && formik.errors.checkbox ? classes['inputs-error'] : ''
            }`}
          />
          <span
            className={`${classes['custom-checkbox']} ${
              formik.touched.checkbox && formik.errors.checkbox ? classes['inputs-error'] : ''
            }`}
          />
          I agree to the processing of my personal information
        </label>
        {formik.touched.checkbox && formik.errors.checkbox && (
          <div className={classes['inputs-error-message']}>{formik.errors.checkbox}</div>
        )}

        <input type="submit" name="create" className={classes['submit']} value="Create" />
        <span className={classes['sign-in-info']}>
          Already have an account?{' '}
          <Link to="/sign-in" className={classes['sign-in-info__link']}>
            Sign In.
          </Link>
        </span>
      </form>
    </div>
  );
};

export default SignUp;
