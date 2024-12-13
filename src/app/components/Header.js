import React, { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="shadow-md">
      <div className="container flex items-center justify-between py-4 px-8 mx-auto">
        
        <img src="/PokeBall_icon.png" alt="Pokémon Logo" className="h-14" />

     
        <nav className="hidden md:flex space-x-16 lg:space-x-32">
          <Link href="/" className="text-black font-bold text-2xl font-mono hover:text-red-500">Accueil</Link>
          <Link href="/collection" className="text-black font-bold text-2xl font-mono hover:text-red-500">Collection</Link>
          <Link href="/summoning" className="text-black font-bold text-2xl font-mono hover:text-red-500">Summon</Link>
        </nav>

        <div className="flex items-center space-x-4">
          <p className="text-black text-lg font-comic">Pseudo</p>
          <img src="/icone_user.png" alt="Pokéball" className="h-12" />
        </div>

        
        <div className="md:hidden flex items-center">
          <button 
            className="text-black focus:outline-none" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

   
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col items-center space-y-4 bg-yellow-400 py-4">
            <Link href="/" className="text-black font-bold text-xl font-mono hover:text-red-500">Accueil</Link>
            <Link href="/collection" className="text-black font-bold text-xl font-mono hover:text-red-500">Collection</Link>
            <Link href="/summoning" className="text-black font-bold text-xl font-mono hover:text-red-500">Summon</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
