/* eslint-disable dot-notation */
import classes from './profile.module.scss';

const Profile = ({ formik, onError, username, email, image }) => {
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
            onFocus={onError}
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
            onFocus={onError}
          />
          {formik.touched.email && formik.errors.email && (
            <div className={classes['inputs-error-message']}>{formik.errors.email}</div>
          )}
          {email && <div className={classes['inputs-error-message']}>{`Email address ${email}`}</div>}
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
            autoComplete="on"
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
          {image && <div className={classes['inputs-error-message']}>{image}</div>}
        </label>

        <input type="submit" name="create" className={classes['submit']} value="Save" />
      </form>
    </div>
  );
};

export default Profile;
