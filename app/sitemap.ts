import type { MetadataRoute } from "next";
import { recipesData } from "./data/recipes";

const BASE_URL = "https://dishora.net";

/**
 * Parses an editorial date string if valid.
 * Returns undefined if missing or invalid, avoiding artificial dates.
 */
function parseValidDate(dateString?: string): Date | undefined {
  if (!dateString) return undefined;
  const parsed = new Date(dateString);
  return isNaN(parsed.getTime()) ? undefined : parsed;
}

export default function sitemap(): MetadataRoute.Sitemap {
  // 1. Static and Hub Pages (verified existing and indexable)
  const corePages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/` },
    { url: `${BASE_URL}/recipes` },
    { url: `${BASE_URL}/dinner` },
    { url: `${BASE_URL}/breakfast` },
    { url: `${BASE_URL}/lunch` },
    { url: `${BASE_URL}/desserts` },
    { url: `${BASE_URL}/appetizers` },
    { url: `${BASE_URL}/in-the-kitchen` },
    { url: `${BASE_URL}/recipe-round-up` },
    { url: `${BASE_URL}/recipe-collections` },
    { url: `${BASE_URL}/about` },
    { url: `${BASE_URL}/editorial-guidelines` },
    { url: `${BASE_URL}/contact` },
    { url: `${BASE_URL}/privacy-policy` },
    { url: `${BASE_URL}/terms-of-service` },
  ];

  // 2. Individual Recipe Pages (deduplicated by slug, verified against recipesData)
  const seenSlugs = new Set<string>();
  const recipePages: MetadataRoute.Sitemap = [];

  for (const recipe of recipesData) {
    if (!recipe.slug || seenSlugs.has(recipe.slug)) continue;
    seenSlugs.add(recipe.slug);

    const entry: MetadataRoute.Sitemap[number] = {
      url: `${BASE_URL}/recipes/${recipe.slug}`,
    };

    const validDate = parseValidDate(recipe.date);
    if (validDate) {
      entry.lastModified = validDate;
    }

    recipePages.push(entry);
  }

  return [...corePages, ...recipePages];
}
