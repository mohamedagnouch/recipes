"use client";

import { useState, useEffect } from "react";
import { getRecipeBySlug } from "../data/allRecipes";
import { Recipe } from "../data/recipes";

const STORAGE_KEY = "dishora_saved_recipes";
const LEGACY_STORAGE_KEY = "simply_recipes_saved";
const EVENT_NAME = "dishora_favorites_updated";

/**
 * Get the list of saved recipe slugs from localStorage
 */
export function getFavoriteSlugs(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY);

    let list: string[] = [];
    if (raw) {
      list = JSON.parse(raw);
    } else if (legacyRaw) {
      list = JSON.parse(legacyRaw);
      // Migrate to new key
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }

    if (!Array.isArray(list)) list = [];
    // Deduplicate
    return Array.from(new Set(list));
  } catch (e) {
    console.error("Error reading favorite recipes:", e);
    return [];
  }
}

/**
 * Check if a recipe is favorited
 */
export function isFavorite(slug: string): boolean {
  if (!slug) return false;
  const slugs = getFavoriteSlugs();
  return slugs.includes(slug);
}

/**
 * Add a recipe to favorites
 */
export function addFavorite(slug: string): void {
  if (typeof window === "undefined" || !slug) return;
  try {
    const slugs = getFavoriteSlugs();
    if (!slugs.includes(slug)) {
      const updated = [...slugs, slug];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: updated }));
    }
  } catch (e) {
    console.error("Error adding favorite recipe:", e);
  }
}

/**
 * Remove a recipe from favorites
 */
export function removeFavorite(slug: string): void {
  if (typeof window === "undefined" || !slug) return;
  try {
    const slugs = getFavoriteSlugs();
    const updated = slugs.filter((s) => s !== slug);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: updated }));
  } catch (e) {
    console.error("Error removing favorite recipe:", e);
  }
}

/**
 * Toggle favorite state for a recipe
 */
export function toggleFavorite(slug: string): boolean {
  if (!slug) return false;
  const currentlySaved = isFavorite(slug);
  if (currentlySaved) {
    removeFavorite(slug);
    return false;
  } else {
    addFavorite(slug);
    return true;
  }
}

/**
 * Clear all saved favorites
 */
export function clearAllFavorites(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: [] }));
  } catch (e) {
    console.error("Error clearing favorites:", e);
  }
}

/**
 * Get full recipe objects for all favorited slugs
 */
export function getFavoriteRecipes(): Recipe[] {
  const slugs = getFavoriteSlugs();
  const recipes: Recipe[] = [];
  for (const slug of slugs) {
    const r = getRecipeBySlug(slug);
    if (r) {
      recipes.push(r);
    }
  }
  return recipes;
}

/**
 * React hook for live favorites state
 */
export function useFavorites() {
  const [favoriteSlugs, setFavoriteSlugs] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initial read
    setFavoriteSlugs(getFavoriteSlugs());
    setIsLoaded(true);

    // Listen for changes
    const handler = () => {
      setFavoriteSlugs(getFavoriteSlugs());
    };

    window.addEventListener(EVENT_NAME, handler);
    window.addEventListener("storage", handler);

    return () => {
      window.removeEventListener(EVENT_NAME, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const favoriteRecipes = favoriteSlugs
    .map((slug) => getRecipeBySlug(slug))
    .filter((r): r is Recipe => Boolean(r));

  return {
    favoriteSlugs,
    favoriteRecipes,
    count: favoriteSlugs.length,
    isLoaded,
    isFav: (slug: string) => favoriteSlugs.includes(slug),
    toggleFav: toggleFavorite,
    removeFav: removeFavorite,
    addFav: addFavorite,
    clearAll: clearAllFavorites,
  };
}
