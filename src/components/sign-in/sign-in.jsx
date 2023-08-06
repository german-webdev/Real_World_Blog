/* eslint-disable dot-notation */
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import classes from './sign-in.module.scss';

const SignIn = ({ formik, errors, submitted, onError }) => {
  return (
    <div className={classes['sign-in']}>
      <div className={classes['sign-in__title-container']}>
        <h2 className={classes['sign-in__title']}>Sign In</h2>
        {Object.keys(errors).length > 0 && (
          <div className={classes['sign-in-error-message']}>{`"Email address or password ${Object.values(
            errors
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
            onFocus={onError}
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
            onFocus={onError}
            autoComplete="on"
            placeholder="Password"
          />
          {formik.touched.password && formik.errors.password && (
            <div className={classes['inputs-error-message']}>{formik.errors.password}</div>
          )}
        </label>

        <input type="submit" name="create" className={classes['submit']} value="Login" disabled={submitted} />
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

SignIn.defaultProps = {
  errors: {},
  onError: () => {},
};

SignIn.propTypes = {
  formik: PropTypes.shape({
    getFieldProps: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.shape({
      email: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
    }).isRequired,
    onSubmit: PropTypes.func,
  }).isRequired,
  errors: PropTypes.shape({}),
  submitted: PropTypes.bool.isRequired,
  onError: PropTypes.func,
};

export default SignIn;
