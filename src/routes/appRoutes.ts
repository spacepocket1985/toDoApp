import React from 'react';
import { RoutePaths } from './routePaths';

const SignIn = React.lazy(() => import('../pages/SignIn'));
const SignUp = React.lazy(() => import('../pages/SignUp'));
const Main = React.lazy(() => import('../pages/Main'));

export const privateRoutes = [
  {
    path: RoutePaths.MainPage,
    Page: Main,
  },
];

export const publicRoutes = [
  {
    path: RoutePaths.SignInPage,
    Page: SignIn,
  },
  {
    path: RoutePaths.SignUpPage,
    Page: SignUp,
  },
];
