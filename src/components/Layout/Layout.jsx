import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import styles from './Layout.module.scss';
import CustomLink from '../CustomLink/CustomLink';
import plug from '../../assets/plug.jpg';
import {
  selectisLogin,
  selectUser,
  selectArticleError,
  selectArticlesError,
} from '../../store/selectors';
import { onLogOut } from '../../store/userSlice';
import useNetworkState from '../../hooks/useNetworkState';

function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector(selectisLogin);
  const user = useSelector(selectUser);
  const logOut = () => {
    dispatch(onLogOut(false));
    navigate('/', { replace: true });
  };
  const isOnline = useNetworkState();
  const articleError = useSelector(selectArticleError);
  const articlesError = useSelector(selectArticlesError);

  return (
    <>
      <div className={styles.header}>
        <Link to="/articles" className={styles.link}>
          Realworld Blog
        </Link>
        <Link className={styles.createAticle} to="/new-article">
          Create article
        </Link>
        {isLogin ? (
          <div className={styles.wraper}>
            <Link className={styles.name} to="/profile">
              {user.username}
            </Link>
            <Link to="/profile">
              <img
                className={styles.avatar}
                width={46}
                src={user.image ? user.image : plug}
                alt="Аватар"
              />
            </Link>
            <button onClick={logOut} type="button" className={styles.logOut}>
              Log Out
            </button>
          </div>
        ) : (
          <div className={styles.login}>
            <CustomLink to="/sign-in" className={styles.link}>
              Sign In
            </CustomLink>
            <CustomLink to="/sign-up" className={styles.link}>
              Sign Up
            </CustomLink>
          </div>
        )}
      </div>
      {!isOnline ? (
        <div className={styles.network}>
          You are offline. Please check your connectivity and try again.
        </div>
      ) : null}
      {articleError || articlesError ? (
        <div className={styles.network}>an error has occurred, go back to the main page</div>
      ) : null}
      <div className={styles.Outlet}>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;