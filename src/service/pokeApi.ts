export const _BaseEndpoint = 'https://pokeapi.co/api/v2/pokemon';
export const _ImageEndpoint = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';
export const _BaseOffset = '0';
export const _BaseLimit = '20';


export type PokeApiResponse = {
  count: number;
  results: PokemonType[];
  next: string | null;
  previous: string | null;
};

export type PokemonType = {
  name: string;
  url: string;
  img?: string;
};
