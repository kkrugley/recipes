import React from 'react';
import { CarvedPattern } from './icons/SlavicPattern';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 text-center text-[#a1887f]">
       <div className="inline-block transition-all duration-300 hover:drop-shadow-gold">
        <CarvedPattern className="mx-auto transform rotate-180" />
      </div>
      <p className="mt-4 text-sm font-semibold">Рецепты от предков — handcrafted by <a href="https://pasza.ru" target="_blank" rel="noopener noreferrer" className="underline hover:text-amber-700 transition-colors">Паша</a></p>
    </footer>
  );
};