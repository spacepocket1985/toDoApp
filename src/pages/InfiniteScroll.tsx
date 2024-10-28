import { useEffect, useState, useCallback } from 'react';
import { Wrapper } from '../components/wrapper/Wrapper';
import { useAppDispatch } from '../hooks/storeHooks';
import { fetchPockemons } from '../store/slices/pockemonSlice';
import { ItemsList } from '../components/ItemsList/ItemsList';
import { Typography } from '@mui/material';
import { PokemonType, PokeApiResponse } from '../service/pokeApi';
import { Snack } from '../components/snack/Snack';

export const InfiniteScroll: React.FC = () => {
  const [loadedItems, setLoadedItems] = useState(0);
  const [firstLoading, setFirstLoading] = useState(true);
  const [data, setData] = useState<PokemonType[]>([]);
  const [snackOpen, setSnackOpen] = useState(false);

  const dispatch = useAppDispatch();

  const fetchData = useCallback(async () => {
    if (firstLoading) {
      setFirstLoading(false);
      return;
    }

    const newData = await dispatch(fetchPockemons(String(loadedItems)));

    if (newData.meta.requestStatus === 'fulfilled' && newData.payload) {
      const payload = newData.payload as PokeApiResponse;

      setData((prevData) => [...prevData, ...payload.results]);
    }
  }, [dispatch, firstLoading, loadedItems]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const handleScroll = () => {
      const isBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (isBottom) {
        loadMoreItems();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const loadMoreItems = () => {
    setLoadedItems((prevLoaded) => {
      const newLoaded = prevLoaded + 20;
      setSnackOpen(true);
      return newLoaded;
    });
  };

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  return (
    <Wrapper>
      <Typography align="center">InfiniteScroll</Typography>
      <ItemsList pockemons={data} />
      <Snack
        color="primary"
        variant="solid"
        open={snackOpen}
        onClose={handleSnackClose}
      >
        {`💚 20 more pockemons loaded. Totla - ${20 + loadedItems}.`}
      </Snack>
    </Wrapper>
  );
};
