import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ArticleForm from '../../components/ArticleForm/ArticleForm';
import styles from './NewArticle.module.scss';
import { onIsArticle } from '../../store/articleSlice';
import { fetchCreateArticle } from '../../services/api';

function NewArticle() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const article = {};

  const handlerSubmit = (result) => {
    dispatch(fetchCreateArticle(result));
    dispatch(onIsArticle(false));
    navigate('/articles');
  };

  return (
    <div className={styles.article}>
      <div className={styles.title}>Create new article</div>
      <ArticleForm article={article} handlerSubmit={handlerSubmit} />
    </div>
  );
}

export default NewArticle;