import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: 'AIzaSyA0bBklp23aRbTNeO9aIhak_78l6RK8BNc' });

export const generateRecipe = async (ingredients: string[]): Promise<string> => {
  if (ingredients.length === 0) {
    return Promise.reject(new Error("Пожалуйста, добавьте хотя бы один ингредиент."));
  }

  const ingredientsString = ingredients.join(', ');

  const prompt = `
Ты — Хранитель Старых Рецептов. Твоя мудрость — в традициях предков, ты знаешь, как из простых даров земли приготовить сытное и душевное яство. Говоришь ты по-старинному, но понятно.

Сотвори рецепт, используя вот эти продукты: ${ingredientsString}.
Можешь добавлять к ним то, что всегда в избе найдется: соль, перец, травы душистые, масло, лук, чеснок, муку, сахар. Но главное — те продукты, что я тебе назвал.

Ответ дай строго на русском языке в таком виде, без лишних слов и поклонов:

**Название:** [Придумай старинное, красивое название для блюда]

**Снадобья:**
- [Продукт 1 (с количеством, по-простому, в горшках, щепотках, пригоршнях)]
- [Продукт 2 (с количеством)]
- [и так далее для всех продуктов]

**Колдовство:**
1. [Шаг 1. Опиши просто и понятно, как готовить]
2. [Шаг 2. И так далее]
`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text ?? "";
  } catch (error) {
    console.error("Error generating recipe with Gemini:", error);
    throw new Error("Духи предков не отвечают. Попробуйте воззвать к ним позже.");
  }
};
