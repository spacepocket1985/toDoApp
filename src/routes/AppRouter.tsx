import { Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './appRoutes';

import PrivateRoute from '../components/hoc/PrivateRoute';

export const AppRouter = (): JSX.Element => {
  return (
    <Routes>
      {privateRoutes.map(({ path, Page }) => (
        <Route
          key={path}
          path={path}
          element={<PrivateRoute element={<Page />} />}
        />
      ))}

      {publicRoutes.map(({ path, Page }) => (
        <Route key={path} path={path} element={<Page />} />
      ))}
    </Routes>
  );
};
