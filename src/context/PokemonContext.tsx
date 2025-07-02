'use client';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { getPokemonDetails, getPokemons } from '@/lib/api';

import { Pokemon } from '@/types/types';

interface PokemonContextType {
  allPokemons: Pokemon[];
  setAllPokemons: (pokemons: Pokemon[]) => void;
  getPokemonById: (id: number) => Pokemon | undefined;

  error: string | null;
  setError: (error: string | null) => void;

  fetchPokemonData: () => Promise<void>;

  favorites: Pokemon[];
  addFavorite: (pokemon: Pokemon) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

const FAVORITES_STORAGE_KEY = 'pokemon-team';

const loadFavoritesFromStorage = (): Pokemon[] => {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : 'Failed to load favorites from storage'
    );
  }
  return [];
};

const saveFavoritesToStorage = (favorites: Pokemon[]) => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : 'Failed to save favorites to localStorage:'
    );
  }
};

export const PokemonProvider = ({ children }: { children: ReactNode }) => {
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Pokemon[]>([]);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    const storedFavorites = loadFavoritesFromStorage();
    setFavorites(storedFavorites);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      saveFavoritesToStorage(favorites);
    }
  }, [favorites, isInitialized]);

  const getPokemonById = (id: number) => {
    return allPokemons.find((pokemon) => pokemon.id === id);
  };

  const fetchPokemonData = async () => {
    try {
      setError(null);

      const pokemonList = await getPokemons();

      const pokemonDetails = await Promise.all(
        pokemonList.map(async (pokemon) => {
          try {
            return await getPokemonDetails(pokemon.url);
          } catch (detailError) {
            throw new Error(
              `Failed to save favorites to localStorage: ${detailError}`
            );
          }
        })
      );

      setAllPokemons(pokemonDetails);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
    }
  };
  const addFavorite = (pokemon: Pokemon) => {
    setFavorites((prev) => {
      const exists = prev.find((p) => p.id === pokemon.id);
      if (exists) return prev;
      const newFavorites = [...prev, pokemon];

      return newFavorites;
    });
  };

  const removeFavorite = (id: number) => {
    setFavorites((prev) => {
      const newFavorites = prev.filter((pokemon) => pokemon.id !== id);

      return newFavorites;
    });
  };

  const isFavorite = (id: number) => {
    return favorites.some((pokemon) => pokemon.id === id);
  };

  return (
    <PokemonContext.Provider
      value={{
        allPokemons,
        setAllPokemons,
        getPokemonById,

        error,
        setError,
        fetchPokemonData,
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('usePokemonContext must be used within a PokemonProvider');
  }
  return context;
};
