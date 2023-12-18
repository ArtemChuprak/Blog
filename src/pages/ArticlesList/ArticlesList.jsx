import React from 'react';
import { Pagination } from 'antd';
import { BarLoader } from 'react-spinners';
import { useSelector, useDispatch } from 'react-redux';
import Article from '../Article/Article';
import { onOffset } from '../../store/articlesSlice';
import styles from './ArticlesList.module.scss';
import {
  selectArticles,
  selectCurrentPage,
  selectArticlesCount,
  selectIsloading,
} from '../../store/selectors';

function ArticlesList() {
  const dispatch = useDispatch();
  const articles = useSelector(selectArticles);
  const currentPage = useSelector(selectCurrentPage);
  const articlesCount = useSelector(selectArticlesCount);
  const isloading = useSelector(selectIsloading);

  return (
    <div>
      <BarLoader
        width={920}
        color="#36d7b7"
        loading={isloading}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      {articles.map((article) => {
        return <Article key={article.slug} article={article} />;
      })}
      <Pagination
        className={styles.antPagination}
        defaultCurrent={1}
        current={currentPage}
        total={articlesCount}
        showSizeChanger={false}
        onChange={(page) => dispatch(onOffset({ page }))}
      />
    </div>
  );
}

export default ArticlesList;