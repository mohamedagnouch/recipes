/**
 * app/sitemap.ts — Dishora Dynamic Sitemap
 *
 * Accessible at /sitemap.xml (Next.js 16 App Router native)
 *
 * Rules:
 * - Only include routes that have a real page.tsx
 * - Exclude /my-recipes and /search (user-specific / no SEO value)
 * - Individual recipe slugs dynamically included for SEO indexation
 */

import { MetadataRoute } from "next";
import { recipesData } from "./data/recipes";

const BASE = "https://dishora.net";
const now = new Date();

// Helper to build an entry with defaults
function page(
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
): MetadataRoute.Sitemap[number] {
  return { url: `${BASE}${path}`, lastModified: now, changeFrequency, priority };
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Dynamically generate all individual recipe detail pages
  const recipePages: MetadataRoute.Sitemap = recipesData
    .filter((r) => r.slug && r.slug.trim() !== "")
    .map((r) => page(`/recipes/${r.slug}`, 0.8, "monthly"));

  return [
    // ── Home ────────────────────────────────────────────────────────────────
    page("/",                        1.0, "daily"),

    // ── Recipe hubs (high SEO value) ────────────────────────────────────────
    page("/recipes",                 0.9, "daily"),
    page("/dinner",                  0.8, "weekly"),
    page("/breakfast",               0.8, "weekly"),
    page("/lunch",                   0.7, "weekly"),
    page("/desserts",                0.7, "weekly"),
    page("/appetizers",              0.7, "weekly"),
    page("/in-the-kitchen",          0.7, "weekly"),
    page("/recipe-round-up",         0.7, "weekly"),
    page("/recipe-collections",      0.6, "weekly"),

    // ── Editorial / News ────────────────────────────────────────────────────
    page("/food-news",               0.8, "daily"),

    // ── Lifestyle ───────────────────────────────────────────────────────────
    page("/cleaning-and-organizing", 0.5, "monthly"),

    // ── Freezies Awards ─────────────────────────────────────────────────────
    page("/freezies",                0.7, "monthly"),
    page("/freezies/about",          0.5, "monthly"),
    page("/freezies/announcement",   0.5, "monthly"),
    page("/freezies/methodology",    0.5, "monthly"),
    page("/freezies/contact",        0.4, "monthly"),

    // ── Surprise Me ─────────────────────────────────────────────────────────
    page("/surprise-me",             0.4, "never"),

    // ── Trust & Legal ───────────────────────────────────────────────────────
    page("/about",                   0.6, "monthly"),
    page("/editorial-guidelines",    0.5, "monthly"),
    page("/privacy-policy",          0.4, "monthly"),
    page("/terms-of-service",        0.4, "monthly"),
    page("/contact",                 0.5, "monthly"),
    page("/advertise",               0.5, "monthly"),
    page("/careers",                 0.4, "monthly"),
    page("/sweepstakes",             0.5, "monthly"),

    // ── Individual Recipe Pages (dynamically generated) ──────────────────────
    ...recipePages,

    // ── Excluded intentionally ───────────────────────────────────────────────
    // /my-recipes   — user-specific localStorage page, no SEO value
    // /search       — no static content, no SEO value
  ];
}
