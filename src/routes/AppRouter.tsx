import { Navigate, Route, Routes } from 'react-router-dom';
import { publicRoutes } from './appRoutes';
import { RoutePaths } from './routePaths';

export const AppRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route path={RoutePaths.MainPage} element={<Navigate replace to={RoutePaths.Pagination} />} />
      {publicRoutes.map(({ path, Page }) => (
        <Route key={path} path={path} element={<Page />} />
      ))}
    </Routes>
  );
};
