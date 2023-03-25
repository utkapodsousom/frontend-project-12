import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthContext } from '../contexts';
import routes from './routes';

const PrivateRoute = ({ children }) => {
  const { userData } = useAuthContext();
  const { token } = userData;

  return token ? children : <Navigate to={routes.pages.login()} />;
};

export default PrivateRoute;
