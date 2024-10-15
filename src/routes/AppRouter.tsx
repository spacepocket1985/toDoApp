import { Route, Routes, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './appRoutes';

import { RoutePaths } from './routePaths';

export const AppRouter = (): JSX.Element => {
  const authToken = true;

  return (
    <Routes>
      {authToken ? (
        [...privateRoutes, ...publicRoutes].map(({ path, Page }) => (
          <Route key={path} path={path} element={<Page />} />
        ))
      ) : (
        <>
          {publicRoutes.map(({ path, Page }) => (
            <Route key={path} path={path} element={<Page />} />
          ))}
          <Route
            path={RoutePaths.MainPage}
            element={<Navigate replace to={RoutePaths.SignInPage} />}
          />
        </>
      )}
    </Routes>
  );
};
