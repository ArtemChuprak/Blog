import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Article from '../Article/Article';
import { fetchArticle } from '../../services/api';
import { selectArticle, selectFetchStop } from '../../store/selectors';

function ArticleMarkdown() {
  const dispatch = useDispatch();
  const article = useSelector(selectArticle);
  const fetchStop = useSelector(selectFetchStop);
  const { slug } = useParams();
  useEffect(() => {
    dispatch(fetchArticle(slug));
  }, [slug]);

  return <>{fetchStop ? <Article article={article} fetchStop={fetchStop} /> : null} </>;
}

export default ArticleMarkdown;