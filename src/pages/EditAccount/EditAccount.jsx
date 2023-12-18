import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import styles from './EditAccount.module.scss';
import { fetchUpdateUser, onReset } from '../../store/userSlice';
import { selectUser, selectErrorMessage, selectCreatefulfilled } from '../../store/selectors';
import { userEditValidation } from '../../components/validation/userValidation';

function EditAccount() {
  const userDefault = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorMessage = useSelector(selectErrorMessage);
  const createfulfilled = useSelector(selectCreatefulfilled);
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(userEditValidation),
  });
  const onSubmit = (data) => {
    const user = {
      user: {
        email: data.email,
        password: data.password,
        username: data.userName,
        bio: 'I work at State Farm.',
        image: data.avatar,
      },
    };
    dispatch(fetchUpdateUser(user));
  };

  useEffect(() => {
    if (createfulfilled) {
      message.success('профиль успешно отредактирован');
      navigate('/articles');
      dispatch(onReset());
    }
    return () => dispatch(onReset());
  }, [createfulfilled]);

  const emailError = errorMessage.email ? errorMessage.email : null;

  return (
    <div className={styles.createForm}>
      <div className={styles.title}>Edit Profile</div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.label} htmlFor="userName">
          Username
          <input
            className={styles.input}
            {...register('userName')}
            name="userName"
            placeholder="Username"
            defaultValue={userDefault.username}
          />
          <div className={styles.errors}>
            {errors.userName && <span>{errors.userName.message || 'Error!'}</span>}
            {errorMessage.username ? errorMessage.username : null}
          </div>
        </label>
        <label className={styles.label} htmlFor="email">
          Email Address
          <input
            className={styles.input}
            {...register('email')}
            name="email"
            placeholder="Email Address"
            type="email"
            defaultValue={userDefault.email}
          />
          <div className={styles.errors}>
            {errors.email && <span>{errors.email.message || 'Error!'}</span>}
            {emailError}
          </div>
        </label>
        <label className={styles.label} htmlFor="password">
          New password
          <input
            className={styles.input}
            {...register('password')}
            name="password"
            type="password"
            placeholder="New password"
          />
          <div className={styles.errors}>
            {errors.password && <span>{errors.password.message}</span>}
          </div>
        </label>
        <label className={styles.label} htmlFor="avatar">
          Avatar image (url)
          <input
            className={styles.input}
            {...register('avatar')}
            type="url"
            name="avatar"
            placeholder="Avatar image"
            defaultValue={userDefault.image}
          />
          <div className={styles.errors}>
            {errors.avatar && <span>{errors.avatar.message}</span>}
          </div>
        </label>
        <input className={styles.submit} type="submit" value="Save" />
      </form>
    </div>
  );
}

export default EditAccount;