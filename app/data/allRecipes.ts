import { Recipe, recipesData } from "./recipes";
import { dinnerRecipesData } from "./dinnerRecipes";
import { breakfastRecipesData } from "./breakfastRecipes";
import { lunchRecipesData } from "./lunchRecipes";
import { dessertRecipesData } from "./dessertRecipes";
import { appetizerRecipesData } from "./appetizerRecipes";
import { giadaCelebrityRecipesData } from "./giadaCelebrityRecipesData";
import { roundupArticlesData } from "./roundupArticlesData";

// Combine and deduplicate all recipes across collections
const allRawRecipes: Recipe[] = [
  ...recipesData,
  ...dinnerRecipesData,
  ...breakfastRecipesData,
  ...lunchRecipesData,
  ...dessertRecipesData,
  ...appetizerRecipesData,
  ...giadaCelebrityRecipesData,
  ...roundupArticlesData,
];

// Map by slug to ensure 100% uniqueness
const recipeMap = new Map<string, Recipe>();
allRawRecipes.forEach((recipe) => {
  if (recipe && recipe.slug && !recipeMap.has(recipe.slug)) {
    recipeMap.set(recipe.slug, recipe);
  }
});

export const allRecipes: Recipe[] = Array.from(recipeMap.values());

export function getAllRecipes(): Recipe[] {
  return allRecipes;
}

export function getRecipeBySlug(slug: string): Recipe | undefined {
  if (!slug) return undefined;
  return recipeMap.get(slug);
}

export interface SearchResult {
  recipe: Recipe;
  matchScore: number;
}

export function searchRecipes(query: string, categoryFilter?: string): Recipe[] {
  if (!query && !categoryFilter) return allRecipes.slice(0, 20);

  const cleanQuery = (query || "").trim().toLowerCase();
  const cleanCategory = (categoryFilter || "").trim().toLowerCase();

  const results: SearchResult[] = [];

  for (const recipe of allRecipes) {
    // Category filter check
    if (cleanCategory && cleanCategory !== "all") {
      const rCat = (recipe.category || "").toLowerCase();
      const rBadge = (recipe.badge || "").toLowerCase();
      if (!rCat.includes(cleanCategory) && !rBadge.includes(cleanCategory)) {
        continue;
      }
    }

    if (!cleanQuery) {
      results.push({ recipe, matchScore: 1 });
      continue;
    }

    let score = 0;
    const titleLower = (recipe.title || "").toLowerCase();
    const descLower = (recipe.description || "").toLowerCase();
    const leadLower = (recipe.leadText || "").toLowerCase();
    const catLower = (recipe.category || "").toLowerCase();
    const ingredientsText = (recipe.ingredients || []).join(" ").toLowerCase();

    // Exact title match gets highest score
    if (titleLower === cleanQuery) {
      score += 100;
    } else if (titleLower.startsWith(cleanQuery)) {
      score += 60;
    } else if (titleLower.includes(cleanQuery)) {
      score += 40;
    }

    // Category / Badge match
    if (catLower.includes(cleanQuery)) {
      score += 25;
    }

    // Ingredient match
    if (ingredientsText.includes(cleanQuery)) {
      score += 15;
    }

    // Description / Lead text match
    if (descLower.includes(cleanQuery) || leadLower.includes(cleanQuery)) {
      score += 10;
    }

    // Multi-word split query matching (e.g. "lemon pasta")
    const words = cleanQuery.split(/\s+/).filter(Boolean);
    if (words.length > 1) {
      const allWordsInTitle = words.every((w) => titleLower.includes(w));
      if (allWordsInTitle) score += 30;
      const someWordsInTitle = words.some((w) => titleLower.includes(w));
      if (someWordsInTitle) score += 10;
    }

    if (score > 0) {
      results.push({ recipe, matchScore: score });
    }
  }

  // Sort descending by relevance score
  results.sort((a, b) => b.matchScore - a.matchScore);

  return results.map((r) => r.recipe);
}
