'use client';
import { Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import IconButton from '@/components/buttons/IconButton';

import { getTypeColor } from '@/app/components/PokemonListingPage';
import { usePokemonContext } from '@/context/PokemonContext';

import { PokemonDetailPageProps } from '@/types/types';

export default function PokemonDetailPage({ params }: PokemonDetailPageProps) {
  const pokemonId = parseInt(params.id);
  const { getPokemonById, error, addFavorite, removeFavorite, isFavorite } =
    usePokemonContext();

  const pokemon = getPokemonById(pokemonId);

  const handleFavoriteToggle = () => {
    if (!pokemon) return;

    if (isFavorite(pokemon.id)) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon);
    }
  };

  if (error || !pokemon) {
    return (
      <div className='min-h-screen  bg-gradient-to-r from-blue-500 via-purple-600 to-pink-400 flex items-center justify-center'>
        <div className='bg-white rounded-lg p-8 shadow-2xl max-w-md mx-4 text-center'>
          <h1 className='h1  text-purple-600 mb-4'>
            Soroy but this Pokemon Not Found
          </h1>
          <p className='text-gray-600 mb-6 p'>
            The Pokemon you're looking for doesn't exist.
          </p>
          <Link
            href='/'
            className='inline-block px-6 py-2 bg-text-purple-600 text-white rounded-lg hover:text-purple-800 transition-colors'
          >
            Back to Pokemon List
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='p-4'>
      <div className='max-w-2xl mx-auto'>
        <div className='flex justify-between items-center mb-6'>
          <Link
            href='/'
            className='flex items-center px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-gray-700 hover:text-gray-900'
          >
            ← Back to Pokemon List
          </Link>

          <button onClick={handleFavoriteToggle}>
            {isFavorite(pokemon.id) ? (
              <IconButton icon={Plus} variant='light' />
            ) : (
              <IconButton icon={Minus} variant='light' />
            )}
          </button>
        </div>

        <div className='bg-white rounded-2xl shadow-2xl overflow-hidden'>
          <div className='bg-gradient-to-r from-yellow-400 to-yellow-500 p-6 text-center'>
            <Image
              loading='lazy'
              src={pokemon.sprites?.front_default || '/api/placeholder/200/200'}
              alt={pokemon.name}
              width={200}
              height={200}
              className='mx-auto drop-shadow-lg'
            />
            <h1 className='text-4xl font-bold text-white capitalize mt-4 drop-shadow'>
              {pokemon.name}
            </h1>
            <p className='text-yellow-100 text-lg font-semibold'>
              #{pokemon.id.toString()}
            </p>
          </div>

          <div className='p-8 space-y-6'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='bg-gray-50 rounded-lg p-4 text-center'>
                <p className='text-gray-600 font-medium'>Height</p>
                <p className='text-2xl font-bold text-gray-800'>
                  {(pokemon.height / 10).toFixed(1)} m
                </p>
              </div>
              <div className='bg-gray-50 rounded-lg p-4 text-center'>
                <p className='text-gray-600 font-medium'>Weight</p>
                <p className='text-2xl font-bold text-gray-800'>
                  {(pokemon.weight / 10).toFixed(1)} kg
                </p>
              </div>
            </div>

            <div className='bg-gray-50 rounded-lg p-4 text-center'>
              <p className='text-gray-600 font-medium'>Base Experience</p>
              <p className='text-2xl font-bold text-gray-800'>
                {pokemon.base_experience || 'N/A'}
              </p>
            </div>

            <div>
              <h3 className='text-xl font-bold text-gray-800 mb-3'>Types</h3>
              <div className='flex gap-3 flex-wrap'>
                {pokemon.types.map((type) => (
                  <span
                    key={type.slot}
                    className={`px-4 py-2 rounded-full text-white font-semibold text-lg ${getTypeColor(
                      type.type.name
                    )}`}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className='text-xl font-bold text-gray-800 mb-3'>
                Abilities
              </h3>
              <div className='flex gap-3 flex-wrap'>
                {pokemon.abilities.map((ability) => (
                  <span
                    key={ability.slot}
                    className={`px-4 py-2 rounded-lg text-gray-700 font-medium border-2 ${
                      ability.is_hidden
                        ? 'bg-yellow-100 border-yellow-300 text-yellow-800'
                        : 'bg-gray-100 border-gray-300'
                    }`}
                    title={
                      ability.is_hidden ? 'Hidden Ability' : 'Normal Ability'
                    }
                  >
                    {ability.ability.name.replace('-', ' ')}
                    {ability.is_hidden && ' ⭐'}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className='text-xl font-bold text-gray-800 mb-3'>
                Base Stats
              </h3>
              <div className='space-y-3'>
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name} className='flex items-center'>
                    <div className='w-32 text-gray-600 font-medium capitalize'>
                      {stat.stat.name.replace('-', ' ')}:
                    </div>
                    <div className='flex-1 mx-4'>
                      <div className='bg-gray-200 rounded-full h-3'>
                        <div
                          className='bg-blue-500 h-3 rounded-full transition-all duration-1000'
                          style={{
                            width: `${Math.min(
                              (stat.base_stat / 100) * 100,
                              100
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className='w-12 text-right font-bold text-gray-800'>
                      {stat.base_stat}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
