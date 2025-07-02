'use client';

import React from 'react';

import PokemonCard from '@/app/components/PokemonCard';
import { usePokemonContext } from '@/context/PokemonContext';

import { Pokemon } from '@/types/types';

export default function FavoritesPage() {
  const { favorites, addFavorite, removeFavorite, isFavorite } =
    usePokemonContext();
  const handleFavoriteToggle = (pokemon: Pokemon, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite(pokemon.id)) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon);
    }
  };

  return (
    <div className='layout px-4 py-8  '>
      <h1 className='h1 text-white text-center mb-8 drop-shadow-lg '>
        Pokémon Team
      </h1>
      <p className='text-white text-center mb-6 max-w-2xl mx-auto'>
        Welcome to your Pokémon Team! Here you can view and manage your favorite
        Pokémon. Add your top picks to your team and easily remove them whenever
        you want. Start building your ultimate collection!
      </p>

      {favorites.length === 0 ? (
        <div className='text-center py-16'>
          <p className='text-white p'>No favorites yet!</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {favorites.map((pokemon: Pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              isFavorite={isFavorite}
              handleFavoriteToggle={handleFavoriteToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}
