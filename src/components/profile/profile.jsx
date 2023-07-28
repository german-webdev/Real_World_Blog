/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable dot-notation */
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { setErrors, updateProfile } from '../../store/slices/user-slice';

import classes from './profile.module.scss';

const Profile = () => {
  const { username: usernameError, email: emailError, image: imageError } = useSelector((state) => state.user.errors);
  const { username, email, image, password } = useSelector((state) => state.user.user);
  console.log('nickname', username);
  console.log('email', username);
  const dispatch = useDispatch();

  const onError = () => {
    dispatch(setErrors(null));
  };

  const formik = useFormik({
    initialValues: {
      username,
      email,
      password,
      image,
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .matches(/^[a-zA-Z0-9]+$/, 'Username can only contain letters and numbers')
        .min(3, 'username must be at least 3 characters')
        .max(20, 'username must be less than 16 characters')
        .required('Username cannot be empty'),
      email: Yup.string().email('Invalid email address').required('Email cannot be empty'),
      password: Yup.string()
        .min(6, 'password must be at least 6 characters')
        .max(40, 'password must be no more than 40 characters')
        .required('New password cannot be empty'),
      image: Yup.string().url('URL format is invalid'),
    }),
    onSubmit: (values) => {
      console.log(values);
      const user = {
        user: {
          username: values.username,
          email: values.email,
          password: values.password,
          image: values.image,
        },
      };
      dispatch(updateProfile(JSON.stringify(user)));
      console.log(dispatch(updateProfile(user)));
      console.log(user);
    },
  });

  return (
    <div className={classes['profile']}>
      <h2 className={classes['profile__title']}>Edit Profile</h2>

      <form onSubmit={formik.handleSubmit} className={classes['profile__form']}>
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
          {usernameError && <div className={classes['inputs-error-message']}>{`Username ${usernameError}`}</div>}
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
          {emailError && <div className={classes['inputs-error-message']}>{`Email address ${emailError}`}</div>}
        </label>

        <label htmlFor="password" className={classes['password-label']}>
          New password
          <input
            type="password"
            id="password"
            name="password"
            {...formik.getFieldProps('password')}
            className={`${classes['password-input']} ${
              formik.touched.password && formik.errors.password ? classes['inputs-error'] : ''
            }`}
            placeholder="New password"
          />
          {formik.touched.password && formik.errors.password && (
            <div className={classes['inputs-error-message']}>{formik.errors.password}</div>
          )}
        </label>

        <label htmlFor="imageUrl" className={classes['password-label']}>
          Avatar image (url)
          <input
            type="text"
            id="image"
            name="image"
            {...formik.getFieldProps('image')}
            className={`${classes['image-url-input']} ${
              formik.touched.image && formik.errors.image ? classes['inputs-error'] : ''
            }`}
            placeholder="Avatar image"
          />
          {formik.touched.image && formik.errors.image && (
            <div className={classes['inputs-error-message']}>{formik.errors.image}</div>
          )}
          {imageError && <div className={classes['inputs-error-message']}>{imageError}</div>}
        </label>

        <input type="submit" name="create" className={classes['submit']} value="Save" />
      </form>
    </div>
  );
};

export default Profile;
