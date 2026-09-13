/**
 * sitemap.ts — Dishora Dynamic Sitemap
 *
 * Next.js 16 App Router native sitemap generation.
 * Accessible at /sitemap.xml
 *
 * Includes all static pages with appropriate priorities and changeFrequencies.
 * Add dynamic recipe slugs below once a data source is available.
 */

import { MetadataRoute } from "next";

const SITE_URL = "https://dishora.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ─── STATIC PAGES ──────────────────────────────────────────────────────────

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    // Category hubs
    {
      url: `${SITE_URL}/recipes`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/dinner`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/breakfast`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/lunch`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/desserts`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/appetizers`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/in-the-kitchen`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/recipe-round-up`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/recipe-collections`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/food-news`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/cleaning-and-organizing`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    // Freezies Awards
    {
      url: `${SITE_URL}/freezies`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // My Recipes (user feature)
    {
      url: `${SITE_URL}/my-recipes`,
      lastModified: now,
      changeFrequency: "never",
      priority: 0.3,
    },
    // Legal & Trust pages
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/editorial-guidelines`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/terms-of-service`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/advertise`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/careers`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/sweepstakes`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    // Search (noindex recommended, but included for crawlability)
    {
      url: `${SITE_URL}/search`,
      lastModified: now,
      changeFrequency: "never",
      priority: 0.2,
    },
  ];

  // ─── DYNAMIC RECIPE PAGES ──────────────────────────────────────────────────
  // TODO: When you have a CMS or database, fetch slugs here and map them.
  // Example (uncomment and adapt):
  //
  // const recipes = await fetchAllRecipeSlugs();
  // const recipePages: MetadataRoute.Sitemap = recipes.map((slug) => ({
  //   url: `${SITE_URL}/recipes/${slug}`,
  //   lastModified: new Date(),
  //   changeFrequency: "monthly",
  //   priority: 0.75,
  // }));
  //
  // return [...staticPages, ...recipePages];

  return staticPages;
}
