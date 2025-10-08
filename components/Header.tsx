import React from 'react';
import { CarvedPattern } from './icons/SlavicPattern';

export const Header: React.FC = () => {
  return (
    <header className="w-full py-6 text-center text-[#e7b100]">
      <h1 className="font-display text-5xl md:text-7xl mb-2 text-shadow-3d">
        Волшебный Горшочек
      </h1>
      <div className="inline-block transition-all duration-300 hover:drop-shadow-gold">
        <CarvedPattern className="mx-auto" />
      </div>
    </header>
  );
};