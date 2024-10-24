import { Route, Routes, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './appRoutes';

import { RoutePaths } from './routePaths';
import { Suspense } from 'react';
import { Spinner } from '../components/spinner/Spinner';

export const AppRouter = (): JSX.Element => {
  const authToken = true;

  return (
    <Suspense fallback={<Spinner />}>
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
    </Suspense>
  );
};
