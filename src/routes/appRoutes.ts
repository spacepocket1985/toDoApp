

import { InfiniteScroll } from '../pages/InfiniteScroll';
import { Main } from '../pages/Main';
import { Pagination } from '../pages/Pagination';
import { RoutePaths } from './routePaths';

export const publicRoutes = [
  {
    path: RoutePaths.MainPage,
    Page: Main,
  },
  {
    path: RoutePaths.Pagination,
    Page: Pagination ,
  },
  {
    path: RoutePaths.InfiniteScroll,
    Page: InfiniteScroll,
  },
];
