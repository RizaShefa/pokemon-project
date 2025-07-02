import { Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import IconButton from '@/components/buttons/IconButton';

import { getTypeColor } from '@/app/components/PokemonListingPage';

import { PokemonCardProps, PokemonType } from '@/types/types';

const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  isFavorite,
  handleFavoriteToggle,
}) => {
  return (
    <Link href={`/${pokemon.id}`} key={pokemon.id}>
      <div className='bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden relative cursor-pointer'>
        <div className='flex items-center justify-between p-4  '>
          <button
            onClick={(e) => handleFavoriteToggle(pokemon, e)}
            className=' rounded-full z-10 transition-colors'
          >
            {isFavorite(pokemon.id) ? (
              <IconButton icon={Minus} variant='light' />
            ) : (
              <IconButton icon={Plus} variant='light' />
            )}
          </button>

          <div className=' bg-yellow-400 text-yellow-900 rounded-sm p-1  '>
            #{pokemon.id}
          </div>
        </div>
        <div className='p-4'>
          <div className='flex justify-center items-center min-h-[150px]'>
            <Image
              loading='lazy'
              src={pokemon.sprites?.front_default || '/pokemon-placeholder.png'}
              alt={`${pokemon.name} sprite`}
              width={150}
              height={150}
              className='mx-auto'
            />
          </div>
        </div>

        <div className='p-6 pt-2'>
          <h2 className='h2 text-gray-800 mb-3 capitalize text-center'>
            {pokemon.name}
          </h2>

          {pokemon.types && pokemon.types.length > 0 && (
            <div>
              <h3 className='text-gray-600 h3 mb-2 text-center'>Types:</h3>
              <div className='flex flex-wrap gap-2 justify-center'>
                {pokemon.types.map((typeOfPokemon: PokemonType) => (
                  <p
                    key={typeOfPokemon.slot}
                    className={`px-3 py-1 p rounded-full text-sm font-semibold text-white ${getTypeColor(
                      typeOfPokemon.type.name
                    )}`}
                  >
                    {typeOfPokemon.type.name}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
