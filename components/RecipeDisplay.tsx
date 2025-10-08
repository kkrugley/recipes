import React, { useMemo } from 'react';
import type { Recipe } from '../types';
import { LoaderIcon } from './icons/LoaderIcon';

interface RecipeDisplayProps {
  recipeText: string | null;
  isLoading: boolean;
  error: string | null;
}

const parseRecipe = (text: string): Recipe => {
  try {
    const titleMatch = text.match(/\*\*Название:\*\*\s*(.*)/);
    const ingredientsMatch = text.match(/\*\*Снадобья:\*\*\s*([\s\S]*?)(?:\*\*Колдовство:\*\*|$)/);
    const instructionsMatch = text.match(/\*\*Колдовство:\*\*\s*([\s\S]*)/);

    if (!titleMatch && !ingredientsMatch && !instructionsMatch) {
       return { title: "Рецепт от предков", ingredients: [], instructions: text.split('\n').filter(Boolean) };
    }
    
    const title = titleMatch ? titleMatch[1].trim() : "Неведомое Яство";
    
    const ingredients = ingredientsMatch 
      ? ingredientsMatch[1].trim().split('\n').map(line => line.replace(/^-/, '').trim()).filter(Boolean)
      : [];
      
    const instructions = instructionsMatch
      ? instructionsMatch[1].trim().split('\n').map(line => line.replace(/^\d+\.\s*/, '').trim()).filter(Boolean)
      : [];

    return { title, ingredients, instructions };

  } catch (e) {
    console.error("Failed to parse recipe:", e);
    return { title: "Не удалось прочесть свиток", ingredients: [], instructions: [text] };
  }
};

export const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipeText, isLoading, error }) => {
  const recipe = useMemo(() => {
    if (!recipeText) return null;
    return parseRecipe(recipeText);
  }, [recipeText]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <LoaderIcon />
        <p className="mt-4 text-lg font-semibold text-[#d4c1ab]">Горшочек варит...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/50 border-2 border-red-500/50 text-red-200 p-4 rounded-lg shadow-lg shadow-black/50" role="alert">
        <p className="font-bold text-lg">Ошибка в старом заклинании!</p>
        <p>{error}</p>
      </div>
    );
  }

  if (!recipe) {
    return null;
  }

  return (
    <div className="bg-[#5a3a2e]/60 p-6 sm:p-8 rounded-xl shadow-2xl shadow-black/50 border-2 border-[#8a5a44]" style={{boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)'}}>
      <h2 className="text-3xl sm:text-4xl text-center mb-6 text-[#e7b100] font-display text-shadow-3d">{recipe.title}</h2>
      
      {recipe.ingredients.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-[#f5e5d3]">Снадобья:</h3>
          <ul className="list-disc list-inside space-y-1 text-lg text-[#d4c1ab] marker:text-[#e7b100]">
            {recipe.ingredients.map((item, index) => (
              <li key={index} className="transition-all duration-200 hover:text-white hover:translate-x-2">{item}</li>
            ))}
          </ul>
        </div>
      )}

      {recipe.instructions.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-3 text-[#f5e5d3]">Колдовство:</h3>
          <ol className="list-decimal list-inside space-y-3 text-lg text-[#d4c1ab] marker:text-[#e7b100]">
            {recipe.instructions.map((step, index) => (
              <li key={index} className="transition-all duration-200 hover:text-white hover:translate-x-2">{step}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};