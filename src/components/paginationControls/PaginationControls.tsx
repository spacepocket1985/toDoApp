import * as React from 'react';
import { useState } from 'react';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useAppDispatch } from '../../hooks/storeHooks';
import { fetchPockemons } from '../../store/slices/pockemonSlice';


export const PaginationControls: React.FC<{
  count: number;
  currentPage: number;
}> = ({ currentPage, count }) => {
  const [page, setPage] = useState(currentPage);
  const dispatch = useAppDispatch();
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    dispatch(fetchPockemons(String((value - 1) * 20)));
  };

  return (
    <>
      <Stack spacing={2} sx={{ margin: 'auto' }}>
        <Pagination
          count={Math.floor(count / 20)}
          page={page}
          onChange={handleChange}
          color="primary"
        />
      </Stack>


    </>
  );
};
