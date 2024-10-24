import { RoutePaths } from './routePaths';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Main from '../pages/Main';
import { NotFound } from '../pages/NotFound';

export const publicRoutes = [
  {
    path: RoutePaths.MainPage,
    Page: Main,
  },
  {
    path: RoutePaths.SignInPage,
    Page: SignIn,
  },
  {
    path: RoutePaths.SignUpPage,
    Page: SignUp,
  },
  {
    path: RoutePaths.PAGE404,
    Page: NotFound,
  },
];
