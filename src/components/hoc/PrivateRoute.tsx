import React from 'react';
import { Navigate } from 'react-router-dom';
import { RoutePaths } from '../../routes/routePaths';
import { useAuth } from '../../context/AuthContext';

type PrivateRouteProps = {
  element: React.ReactNode;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { authToken } = useAuth();

  if (!authToken) {
    return <Navigate to={RoutePaths.SignInPage} replace />;
  }

  return <>{element}</>;
};

export default PrivateRoute;
