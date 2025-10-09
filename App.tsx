import React, { useState, useCallback } from 'react';
import { generateRecipe } from './services/geminiService';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { RecipeDisplay } from './components/RecipeDisplay';
import { IngredientManager } from './components/IngredientManager';

const App: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>(['картофель', 'грибы', 'сметана']);
  const [recipe, setRecipe] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateRecipe = useCallback(async () => {
    if (ingredients.length === 0) {
      setError('Положите хоть что-нибудь в горшочек!');
      return;
    }
    setIsLoading(true);
    setError(null);
    setRecipe(null);
    try {
      const result = await generateRecipe(ingredients);
      setRecipe(result);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('Что-то пошло не так на кухне предков.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [ingredients]);

  const addIngredient = (ingredient: string) => {
    if (ingredient && !ingredients.includes(ingredient)) {
      setIngredients([...ingredients, ingredient]);
    }
  };

  const removeIngredient = (ingredientToRemove: string) => {
    setIngredients(ingredients.filter(ing => ing !== ingredientToRemove));
  };

  return (
    <div className="flex flex-col min-h-screen text-[#f5e5d3]">
      <div className="animate-fadeInUp" style={{animationDelay: '100ms'}}>
        <Header />
      </div>
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <section className="animate-fadeInUp text-center mb-10" style={{animationDelay: '300ms'}}>
            <p className="text-lg md:text-xl leading-relaxed text-[#d4c1ab]">
              Расскажите, что у вас есть под рукой — я подскажу, что из этого приготовить!
            </p>
          </section>

          <section className="animate-fadeInUp bg-[#5a3a2e]/60 p-6 rounded-xl shadow-2xl shadow-black/50 border-2 border-[#8a5a44] mb-8" style={{boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)', animationDelay: '500ms'}}>
            <IngredientManager 
              ingredients={ingredients}
              onAddIngredient={addIngredient}
              onRemoveIngredient={removeIngredient}
            />
            <div className="text-center mt-6">
              <button
                onClick={handleGenerateRecipe}
                disabled={isLoading || ingredients.length === 0}
                className={`button-3d bg-[#6a4a34] text-white font-display text-2xl px-10 py-3 rounded-lg disabled:bg-gray-700 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none disabled:text-gray-400 ${!isLoading && ingredients.length > 0 ? 'animate-breathe' : ''}`}
              >
                {isLoading ? 'Горшочек, вари!' : 'Сотворить Яство'}
              </button>
            </div>
          </section>

          <section>
            {(isLoading || error || recipe) && (
               <div className="animate-scaleIn">
                <RecipeDisplay
                  recipeText={recipe}
                  isLoading={isLoading}
                  error={error}
                />
              </div>
            )}
          </section>
        </div>
      </main>

      <div className="animate-fadeInUp" style={{animationDelay: '700ms'}}>
        <Footer />
      </div>
    </div>
  );
};

export default App;