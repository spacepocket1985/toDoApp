import { Route, Routes } from 'react-router-dom';
import { publicRoutes } from './appRoutes';
import PrivateRoute from '../components/hoc/PrivateRoute';
import { RoutePaths } from './routePaths';
import Main from '../pages/Main';

export const AppRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route
        path={RoutePaths.MainPage}
        element={<PrivateRoute element={Main} />}
      />
      {publicRoutes.map(({ path, Page }) => (
        <Route key={path} path={path} element={<Page />} />
      ))}
    </Routes>
  );
};
