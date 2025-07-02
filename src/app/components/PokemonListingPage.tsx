'use client';
import { useEffect, useState } from 'react';

import { PokemonPagination } from '@/app/components/Pagination';
import PokemonCard from '@/app/components/PokemonCard';
import PokemonListHeader from '@/app/components/PokemonListHeader';
// import SearchBar from '@/app/components/SearchBar';
import { usePokemonContext } from '@/context/PokemonContext';

import { Pokemon } from '@/types/types';
export function getTypeColor(type: string): string {
  const typeColors: Record<string, string> = {
    normal: 'bg-gray-500',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-500',
    grass: 'bg-green-500',
    ice: 'bg-blue-300',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-700',
    flying: 'bg-indigo-400',
    psychic: 'bg-pink-500',
    bug: 'bg-green-400',
    rock: 'bg-yellow-800',
    ghost: 'bg-purple-700',
    dragon: 'bg-indigo-700',
    dark: 'bg-gray-800',
    steel: 'bg-gray-600',
    fairy: 'bg-pink-300',
  };
  return typeColors[type] || 'bg-gray-500';
}

export default function PokemonList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const {
    allPokemons,
    error,
    fetchPokemonData,
    addFavorite,
    removeFavorite,
    isFavorite,
  } = usePokemonContext();

  useEffect(() => {
    if (allPokemons.length === 0) {
      fetchPokemonData();
    }
  }, [allPokemons.length, fetchPokemonData]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleFavoriteToggle = (pokemon: Pokemon, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite(pokemon.id)) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon);
    }
  };

  const filteredPokemons = allPokemons.filter(
    (pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon.id === Number(searchTerm)
  );

  const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPokemons = filteredPokemons.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (error) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center'>
        <div className='bg-white rounded-lg p-8 shadow-2xl max-w-md mx-4'>
          <h2 className='h2 text-red-600 mb-4'>Error</h2>
          <p className='p text-gray-700'>{error}</p>
          <button
            onClick={() => fetchPokemonData()}
            className='mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors'
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <PokemonListHeader />
      {/* <SearchBar value={searchTerm} onChange={setSearchTerm} /> */}

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {currentPokemons.map((pokemon: Pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            isFavorite={isFavorite}
            handleFavoriteToggle={handleFavoriteToggle}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <PokemonPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
