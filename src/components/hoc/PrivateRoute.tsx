import React from 'react';  
import { Navigate } from 'react-router-dom';  
import { RoutePaths } from '../../routes/routePaths';  
import { isToken } from '../../utils/localStorageActions';  

type PrivateRouteProps = {  
  element: React.ComponentType;  
};  

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element: Element }) => {  
  if (!isToken()) {  
    return <Navigate to={RoutePaths.SignInPage} replace />;  
  }  

  return <Element />;  
};  

export default PrivateRoute;