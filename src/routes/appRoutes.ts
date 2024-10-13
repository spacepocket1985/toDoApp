import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import { Main } from '../pages/Main';
import { RoutePaths } from './routePaths';

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
