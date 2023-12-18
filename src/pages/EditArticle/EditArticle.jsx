import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ArticleForm from '../../components/ArticleForm/ArticleForm';
import styles from './EditArticle.module.scss';
import { selectArticle } from '../../store/selectors';
import { onIsArticle } from '../../store/articleSlice';
import { fetchArticle, fetchEditArticle } from '../../services/api';

function EditArticle() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { slug } = useParams();
  const article = useSelector(selectArticle);

  useEffect(() => {
    dispatch(fetchArticle(slug));
  }, [slug]);

  const handlerSubmit = (result) => {
    dispatch(fetchEditArticle({ result, slug }));
    dispatch(onIsArticle(false));
    navigate('/articles');
  };

  return (
    <div className={styles.article}>
      {article && (
        <>
          <div className={styles.title}>Edit article</div>
          <ArticleForm article={article} handlerSubmit={handlerSubmit} />
        </>
      )}
    </div>
  );
}

export default EditArticle;