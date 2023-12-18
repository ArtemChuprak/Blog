import React from 'react';

import { useLocation, Navigate } from 'react-router-dom';
import { getLocalStorage } from '../services/localstorage';

function RequireLogin({ children }) {
  const location = useLocation();
  const user = getLocalStorage('username');

  if (!user) {
    return <Navigate to="/sign-in" replace state={{ from: location }} />;
  }

  return children;
}

export default RequireLogin;