import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  _BaseEndpoint,
  _BaseLimit,
  _BaseOffset,
  _ImageEndpoint,
  PokeApiResponse,
  PokemonType,
} from '../../service/pokeApi';

type PockemonState = {
  results: PokemonType[];
  loading: boolean;
  error: null | string;
  count: number;
  next: string | null;
  previous: string | null;
};

export const initialState: PockemonState = {
  results: [],
  loading: false,
  error: null,
  count: 0,
  next: null,
  previous: null,
};

export const fetchPockemons = createAsyncThunk<
  PokeApiResponse,
  string | undefined,
  { rejectValue: string }
>('tasks/fetchTodos', async (offset = _BaseOffset, { rejectWithValue }) => {
  const response = await fetch(
    `${_BaseEndpoint}?offset=${offset}&limit=${_BaseLimit}`
  );
  if (!response.ok) {
    return rejectWithValue('Error loading pockemons.');
  }
  const data: PokeApiResponse = await response.json();
  return {
    ...data,
    results: data.results.map((item) => {
      if (!item.img) {
        const urlParts = item.url.split('/');
        const pokemonId = urlParts[urlParts.length - 2];

        return {
          ...item,
          img: `${_ImageEndpoint}/${pokemonId}.png`,
        };
      }
      return item;
    }),
  };
});

const pockemonSlice = createSlice({
  name: 'pockemons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPockemons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPockemons.fulfilled, (state, action) => {
        state.results = action.payload.results;
        state.next = action.payload.next;
        state.previous = action.payload.previous;
        state.count = action.payload.count;
        state.loading = false;
      })
      .addCase(fetchPockemons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default pockemonSlice.reducer;
