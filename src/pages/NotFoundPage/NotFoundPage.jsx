import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div>
      Страница не найдена. Перейти на главную страницу <Link to="/">Realworld Blog</Link>
    </div>
  );
}

export default NotFoundPage;