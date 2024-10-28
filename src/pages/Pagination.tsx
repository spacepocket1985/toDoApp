import { useEffect } from 'react';
import { ItemsList } from '../components/ItemsList/ItemsList';
import { Wrapper } from '../components/wrapper/Wrapper';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { fetchPockemons } from '../store/slices/pockemonSlice';
import { PaginationControls } from '../components/paginationControls/PaginationControls';
import { Typography } from '@mui/material';

export const Pagination: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPockemons());
  }, [dispatch]);

  const pockemons = useAppSelector((state) => state.pockemonsData.results);
  const count = useAppSelector((state) => state.pockemonsData.count);


  return (
    <Wrapper>
      <Typography align='center'>Pagination</Typography>
      <PaginationControls count={count} currentPage={1} />
      <ItemsList pockemons={pockemons} />
    </Wrapper>
  );
};
