import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { message } from 'antd';
import styles from './LoginIn.module.scss';
import { fetchLoginIn, onReset } from '../../store/userSlice';
import { selectErrorLogin, selectisLogin } from '../../store/selectors';
import { userLoginValidation } from '../../components/validation/userValidation';

function LoginIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const error = useSelector(selectErrorLogin);
  const isLogin = useSelector(selectisLogin);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(userLoginValidation),
  });
  const onSubmit = async (data) => {
    const user = {
      user: {
        email: data.email,
        password: data.password,
      },
    };
    dispatch(fetchLoginIn(user));
  };

  const fromPage = location.state?.from?.pathname || '/articles';

  useEffect(() => {
    if (isLogin) {
      message.success('Вы успешно авторизировались!');
      navigate(fromPage, { replace: true });
    }
    return () => dispatch(onReset());
  }, [isLogin]);

  return (
    <div className={styles.login}>
      <div className={styles.title}>Sign In</div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.label} htmlFor="email">
          Email Address
          <input
            className={styles.input}
            {...register('email')}
            name="email"
            placeholder="Email Address"
          />
          <div className={styles.errors}>{errors.email && <span>{errors.email.message}</span>}</div>
        </label>
        <label className={styles.label} htmlFor="password">
          Password
          <input
            className={styles.input}
            {...register('password')}
            placeholder="Password"
            name="password"
            type="password"
          />
          <div className={styles.errors}>
            {errors.password && <span>{errors.password.message}</span>}
          </div>
        </label>
        {error ? <div className={styles.errors}>Введен некорректный email или password</div> : null}
        <input className={styles.submit} value="Login" type="submit" />
        <div className={styles.notAccount}>
          Don’t have an account?{' '}
          <Link className={styles.link} to="/sign-up">
            Sign Up.
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginIn;