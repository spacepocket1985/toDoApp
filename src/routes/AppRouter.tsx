import { Route, Routes } from 'react-router-dom';
import { AppRoutes } from './appRoutes';

export const AppRouter = (): JSX.Element => {
  return (
    <Routes>
      {AppRoutes.map(({ path, Page }) => (
        <Route path={path} key={path} element={<Page />} />
      ))}
    </Routes>
  );
};
