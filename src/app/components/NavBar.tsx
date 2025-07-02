import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <header className='flex items-center  maxLayout justify-center w-full py-2 text-white bg-gradient-to-r from-blue-500 via-purple-600 to-pink-400  shadow-md'>
      <Link href='/'>
        <h2 className='h2 cursor-pointer px-8'>Pokemon</h2>
      </Link>

      <Link href='/trainers'>
        <h2 className='h2 cursor-pointer'>My Team</h2>
      </Link>
    </header>
  );
};

export default Header;
