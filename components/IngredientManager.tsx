import React, { useState } from 'react';

interface IngredientManagerProps {
  ingredients: string[];
  onAddIngredient: (ingredient: string) => void;
  onRemoveIngredient: (ingredient: string) => void;
}

export const IngredientManager: React.FC<IngredientManagerProps> = ({ ingredients, onAddIngredient, onRemoveIngredient }) => {
  const [currentIngredient, setCurrentIngredient] = useState('');

  const handleAdd = () => {
    onAddIngredient(currentIngredient.trim().toLowerCase());
    setCurrentIngredient('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div>
      <label htmlFor="ingredient-input" className="block text-2xl font-semibold mb-4 text-center text-[#f5e5d3] text-shadow-md">
        Что в твоем погребке?
      </label>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          id="ingredient-input"
          type="text"
          value={currentIngredient}
          onChange={(e) => setCurrentIngredient(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Например: картофель, грибы..."
          className="flex-grow p-3 border-2 border-[#8a5a44] rounded-lg bg-[#2b160d] text-[#f5e5d3] placeholder-[#a1887f] focus:outline-none focus:border-[#e7b100] focus:ring-1 focus:ring-[#e7b100] shadow-inner shadow-black/50"
        />
        <button
          onClick={handleAdd}
          className="button-3d bg-[#ab7a59] text-[#2b160d] px-6 py-3 rounded-lg font-bold"
        >
          Добавить
        </button>
      </div>
      <div className="mt-5 flex flex-wrap gap-3 justify-center">
        {ingredients.map((ingredient) => (
          <div
            key={ingredient}
            className="flex items-center bg-[#6a4a34] border border-[#8a5a44] rounded-lg px-4 py-1.5 text-sm font-semibold text-[#f5e5d3] shadow-md shadow-black/40 animate-scaleIn transition-transform duration-200 hover:-translate-y-1"
          >
            <span>{ingredient}</span>
            <button
              onClick={() => onRemoveIngredient(ingredient)}
              className="ml-2 text-[#e7b100] hover:text-white font-bold text-lg transform transition-transform hover:scale-125"
              aria-label={`Удалить ${ingredient}`}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};