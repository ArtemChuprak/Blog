import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { message } from 'antd';
import styles from './CreateAccount.module.scss';
import { fetchUser, onReset } from '../../store/userSlice';
import { selectErrorMessage, selectCreatefulfilled } from '../../store/selectors';
import { userCreateValidation } from '../../components/validation/userValidation';

function CreateAccount() {
  const dispatch = useDispatch();
  const errorMessage = useSelector(selectErrorMessage);
  const createfulfilled = useSelector(selectCreatefulfilled);
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(userCreateValidation),
  });
  const onSubmit = (data) => {
    const user = {
      user: {
        username: data.userName,
        email: data.email,
        password: data.password,
      },
    };
    dispatch(fetchUser(user));
  };

  useEffect(() => {
    if (createfulfilled) {
      message.success('профиль успешно создан');
      navigate('/sign-in');
      reset();
    }
    return () => dispatch(onReset());
  }, [createfulfilled]);

  return (
    <div className={styles.createForm}>
      <div className={styles.title}>Create new account</div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.label} htmlFor="userName">
          Username
          <input
            className={styles.input}
            {...register('userName')}
            name="userName"
            placeholder="Username"
          />
          <div className={styles.errors}>
            {errors.userName && <span>{errors.userName.message}</span>}
            {errorMessage?.username ? errorMessage.username : null}
          </div>
        </label>
        <label className={styles.label} htmlFor="email">
          Email Address
          <input
            className={styles.input}
            {...register('email')}
            name="email"
            placeholder="Email Address"
          />
          <div className={styles.errors}>
            {errors.email && <span>{errors.email.message}</span>}
            {errorMessage?.email ? errorMessage.email : null}
          </div>
        </label>
        <label className={styles.label} htmlFor="Password">
          Password
          <input
            className={styles.input}
            {...register('password')}
            name="password"
            placeholder="Password"
            type="password"
          />
          <div className={styles.errors}>
            {errors.password && <span>{errors.password.message}</span>}
          </div>
        </label>
        <label className={styles.label} htmlFor="repeatPassword">
          Repeat Password
          <input
            className={styles.input}
            {...register('repeatPassword')}
            type="password"
            name="repeatPassword"
            placeholder="Password"
          />
          <div className={styles.errors}>
            {errors.repeatPassword && <span>{errors.repeatPassword.message}</span>}
          </div>
        </label>
        <div className={styles.line} />
        <div className={styles.wraperCheckbox}>
          <label className={styles.labelCheckbox} htmlFor="checkbox">
            <input
              {...register('checkbox')}
              id="checkbox"
              name="checkbox"
              className={styles.checkbox}
              type="checkbox"
            />
            <span className={styles.spanCheckbox}>
              I agree to the processing of my personal information
            </span>
          </label>
          <div className={styles.errors}>
            {errors.checkbox && <span>{errors.checkbox.message}</span>}
          </div>
        </div>
        <input className={styles.submit} type="submit" value="Create" />
        <div className={styles.haveAccount}>
          Already have an account?
          <Link className={styles.link} to="/sign-in">
            Sign In.
          </Link>
        </div>
      </form>
    </div>
  );
}

export default CreateAccount;