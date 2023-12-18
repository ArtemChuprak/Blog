/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import styles from './Article.module.scss';
import { fetchRemoveArticle, onIsRemove } from '../../store/articlesSlice';
import { fetchLikePlus, fetchLikeMinus } from '../../services/api';
import { setLocalStorage, removeLocalStorage, getLocalStorage } from '../../services/localstorage';
import { selectIsRemove, selectisLogin } from '../../store/selectors';
import arrow from '../../assets/arrow.png';
import exclamation from '../../assets/exclamation.png';

function Article({ article, fetchStop }) {
  const [isDelete, setIsDelete] = useState(false);
  const [styleLike, setStyleLike] = useState(getLocalStorage(article.slug) || false);
  const [favoritesCount, setFavoritesCount] = useState(article.favoritesCount);
  const dispatch = useDispatch();
  const isRemove = useSelector(selectIsRemove);
  const navigate = useNavigate();
  const dateCreated = format(new Date(article.createdAt), 'MMMM dd, yyyy ');
  const isLogin = useSelector(selectisLogin);

  const remove = () => {
    dispatch(fetchRemoveArticle(article.slug));
  };

  const onLike = (slug) => {
    const favorited = getLocalStorage(article.slug) || false;
    if (!favorited) {
      setFavoritesCount(favoritesCount + 1);
      dispatch(fetchLikePlus(slug));
      setLocalStorage(`${slug}`, true);
      setStyleLike(true);
    }
    if (favorited) {
      setFavoritesCount(favoritesCount - 1);
      dispatch(fetchLikeMinus(slug));
      removeLocalStorage(`${slug}`);
      setStyleLike(false);
    }
  };

  useEffect(() => {
    if (isRemove) {
      navigate('/articles', { replace: true });
      dispatch(onIsRemove(false));
    }
  }, [isRemove]);

  const user = getLocalStorage('username');
  const title = article.title.slice(0, 80) + (article.title.length > 80 ? '...' : '');
  const description =
    article.description.slice(0, 250) + (article.description.length > 250 ? '...' : '');

  return (
    <div className={styles.article}>
      <div className={styles.wraper}>
        <div className={styles.wraperTitle}>
          <div className={styles.titleLike}>
            <Link to={`/articles/${article.slug}`} className={styles.title}>
              {title}
            </Link>
            <button
              onClick={() => onLike(article.slug)}
              className={styleLike && isLogin ? styles.likeActive : styles.like}
              type="button"
              disabled={!isLogin}
            />
            <span className={styles.titleSpan}>{favoritesCount}</span>
          </div>
          {article.tagList.map((tag) => {
            return (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            );
          })}
        </div>
        <div className={styles.authorData}>
          <div>
            <div className={styles.author}>{article.author.username}</div>
            <div className={styles.data}>{dateCreated}</div>
          </div>
          <img
            className={styles.img}
            src={article.author.image}
            alt="foto"
            width={46}
            height={46}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.description}>{description}</div>
        {article.author.username === user && fetchStop && (
          <>
            <button onClick={() => setIsDelete(true)} className={styles.delete} type="button">
              Delete
            </button>
            {isDelete && (
              <div className={styles.isDelete}>
                <img className={styles.arrow} src={arrow} alt="arrow" />
                <div className={styles.isDeleteWraper}>
                  <img src={exclamation} alt="exclamation" width={16} height={16} />
                  <span>Are you sure to delete this article?</span>
                </div>
                <div className={styles.btnWraper}>
                  <button className={styles.btnNo} onClick={() => setIsDelete(false)} type="button">
                    No
                  </button>
                  <button className={styles.btnYes} onClick={remove} type="button">
                    Yes
                  </button>
                </div>
              </div>
            )}
            <Link to={`/articles/${article.slug}/edit`} className={styles.edit} type="button">
              Edit
            </Link>
          </>
        )}
      </div>
      {fetchStop && <ReactMarkdown className={styles.markdown}>{article.body}</ReactMarkdown>}
    </div>
  );
}

export default Article;