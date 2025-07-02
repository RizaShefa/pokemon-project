import { Pokemon, PokemonListItem, PokemonListResponse } from '@/types/types';

export async function getPokemons(): Promise<PokemonListItem[]> {
  const res = await fetch(
    'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20'
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch pokemons. Status: ${res.status}`);
  }

  const data: PokemonListResponse = await res.json();
  return data.results;
}

export async function getPokemonDetails(url: string): Promise<Pokemon> {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch pokemon details. Status: ${res.status}`);
  }

  return res.json();
}
