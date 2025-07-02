'use client';

import * as React from 'react';
import '@/lib/env';

import PokemonListPage from '@/app/components/PokemonListingPage';

export default function HomePage() {
  return (
    <main className='layout'>
      <PokemonListPage />;
    </main>
  );
}
