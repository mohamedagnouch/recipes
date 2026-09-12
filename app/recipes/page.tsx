"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { recipesData, Recipe } from "../data/recipes";

const categoryFilters = [
  { label: "ALL RECIPES", key: "ALL" },
  { label: "DINNER", key: "DINNER" },
  { label: "BREAKFAST", key: "BREAKFAST" },
  { label: "LUNCH", key: "LUNCH" },
  { label: "DESSERTS", key: "DESSERTS" },
  { label: "APPETIZERS", key: "APPETIZERS" },
  { label: "QUICK & EASY (<30 MIN)", key: "QUICK" },
  { label: "VEGETARIAN", key: "VEGETARIAN" },
];

const categorySpotlights = [
  {
    title: "Dinner Recipes",
    desc: "One-skillet wonders, cozy pastas, and quick weeknight family dinners.",
    href: "/dinner",
    badge: "WEEKLY FAVORITES",
    imageUrl: "/images/cheeseburger-pie.jpg",
  },
  {
    title: "Breakfast & Brunch",
    desc: "Fluffy pancakes, hearty egg scrambles, and grab-and-go morning bakes.",
    href: "/breakfast",
    badge: "MORNING ESSENTIALS",
    imageUrl: "/images/breakfast-chilaquiles-rojos.jpg",
  },
  {
    title: "Lunch Recipes",
    desc: "Crisp salads, packed wraps, and warm satisfying midday meals.",
    href: "/lunch",
    badge: "EASY MIDDAY",
    imageUrl: "/images/lunch-caesar-pasta-salad.jpg",
  },
  {
    title: "Desserts & Baking",
    desc: "Decadent cakes, chewy cookies, and easy no-bake sweet treats.",
    href: "/desserts",
    badge: "SWEET INDULGENCE",
    imageUrl: "/images/dessert-toffee-chocolate-chip-cookies.jpg",
  },
  {
    title: "Snacks & Appetizers",
    desc: "Warm bubbling dips, crunchy finger foods, and game day snacks.",
    href: "/appetizers",
    badge: "PARTY STARTERS",
    imageUrl: "/images/appetizer-spinach-artichoke-dip.jpg",
  },
];

export default function AllRecipesPage() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "rating" | "time" | "alphabetical">("featured");
  const [visibleCount, setVisibleCount] = useState(24);
  const [savedIds, setSavedIds] = useState<number[]>([]);

  const toggleSave = (id: number) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Helper to extract minutes as number
  const parseMinutes = (timeStr?: string): number => {
    if (!timeStr) return 999;
    let mins = 0;
    const hrMatch = timeStr.match(/(\d+)\s*(?:hr|hour)/i);
    const minMatch = timeStr.match(/(\d+)\s*(?:min)/i);
    if (hrMatch) mins += parseInt(hrMatch[1], 10) * 60;
    if (minMatch) mins += parseInt(minMatch[1], 10);
    return mins || 999;
  };

  // Filtered and sorted recipes
  const filteredRecipes = useMemo(() => {
    return recipesData.filter((recipe) => {
      // Category matching
      if (activeCategory === "DINNER") {
        const cat = (recipe.category || "").toLowerCase();
        if (!cat.includes("dinner") && !cat.includes("pasta") && !cat.includes("skillet") && !cat.includes("roast")) return false;
      } else if (activeCategory === "BREAKFAST") {
        const cat = (recipe.category || "").toLowerCase();
        if (!cat.includes("breakfast") && !cat.includes("brunch") && !cat.includes("pancake") && !cat.includes("waffle") && !cat.includes("egg")) return false;
      } else if (activeCategory === "LUNCH") {
        const cat = (recipe.category || "").toLowerCase();
        if (!cat.includes("lunch") && !cat.includes("salad") && !cat.includes("sandwich") && !cat.includes("toast")) return false;
      } else if (activeCategory === "DESSERTS") {
        const cat = (recipe.category || "").toLowerCase();
        if (!cat.includes("dessert") && !cat.includes("cake") && !cat.includes("cookie") && !cat.includes("sweet") && !cat.includes("pie")) return false;
      } else if (activeCategory === "APPETIZERS") {
        const cat = (recipe.category || "").toLowerCase();
        if (!cat.includes("appetizer") && !cat.includes("dip") && !cat.includes("snack") && !cat.includes("salsa") && !cat.includes("finger")) return false;
      } else if (activeCategory === "QUICK") {
        const mins = parseMinutes(recipe.totalTime || recipe.cookTime);
        if (mins > 30) return false;
      } else if (activeCategory === "VEGETARIAN") {
        const tags = (recipe.tags || []).join(" ").toLowerCase();
        const cat = (recipe.category || "").toLowerCase();
        const title = (recipe.title || "").toLowerCase();
        if (!tags.includes("vegetarian") && !cat.includes("vegetarian") && !tags.includes("vegan") && !title.includes("veggie")) {
          // Exclude obvious meat
          if (title.includes("beef") || title.includes("chicken") || title.includes("bacon") || title.includes("crab") || title.includes("steak") || title.includes("meatball") || title.includes("pork")) {
            return false;
          }
        }
      }

      // Search matching
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = (recipe.title || "").toLowerCase().includes(q);
        const inDesc = (recipe.description || "").toLowerCase().includes(q);
        const inAuthor = (recipe.author || "").toLowerCase().includes(q);
        const inCategory = (recipe.category || "").toLowerCase().includes(q);
        const inIngredients = (recipe.ingredients || []).some((ing) => ing.toLowerCase().includes(q));
        return inTitle || inDesc || inAuthor || inCategory || inIngredients;
      }

      return true;
    });
  }, [activeCategory, searchQuery]);

  const sortedRecipes = useMemo(() => {
    const list = [...filteredRecipes];
    if (sortBy === "rating") {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0) || (b.ratingsCount || 0) - (a.ratingsCount || 0));
    } else if (sortBy === "time") {
      list.sort((a, b) => parseMinutes(a.totalTime || a.cookTime) - parseMinutes(b.totalTime || b.cookTime));
    } else if (sortBy === "alphabetical") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }
    return list;
  }, [filteredRecipes, sortBy]);

  const displayedRecipes = sortedRecipes.slice(0, visibleCount);

  return (
    <>
      <style jsx>{`
        .view-all-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #ffffff;
          color: #222222;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }

        .view-all-container {
          max-width: 1320px;
          margin: 0 auto;
          padding: 24px 20px 80px;
          width: 100%;
        }

        /* ── Header Section ── */
        .all-recipes-header {
          text-align: center;
          margin-bottom: 36px;
          padding-top: 10px;
        }

        .all-recipes-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: #0c5354;
          background: #e8f5f4;
          padding: 4px 12px;
          border-radius: 20px;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .all-recipes-title {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 40px;
          font-weight: 700;
          letter-spacing: -0.5px;
          color: #111111;
          margin-bottom: 14px;
          line-height: 1.15;
        }

        @media (min-width: 768px) {
          .all-recipes-title {
            font-size: 52px;
          }
        }

        .all-recipes-desc {
          font-size: 16.5px;
          color: #4a4a4a;
          max-width: 760px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* ── Category Filter Pills ── */
        .category-filters-scroll {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 8px 12px;
          margin-bottom: 30px;
          padding-bottom: 16px;
          border-bottom: 1px solid #eaeaea;
        }

        .filter-pill {
          background: none;
          border: 1px solid transparent;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.8px;
          color: #444444;
          text-transform: uppercase;
          cursor: pointer;
          padding: 8px 16px;
          border-radius: 24px;
          transition: all 0.2s ease;
        }

        .filter-pill:hover {
          color: #0c5354;
          background: #f0f7f6;
          border-color: #d1e8e6;
        }

        .filter-pill.active {
          color: #ffffff;
          background: #0c5354;
          border-color: #0c5354;
          box-shadow: 0 2px 8px rgba(12, 83, 84, 0.2);
        }

        /* ── Controls Bar (Search & Sort) ── */
        .controls-bar {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 32px;
          background: #fafafa;
          border: 1px solid #eeeeee;
          padding: 14px 20px;
          border-radius: 8px;
        }

        @media (min-width: 768px) {
          .controls-bar {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        }

        .search-box {
          position: relative;
          flex: 1;
          max-width: 440px;
        }

        .search-input {
          width: 100%;
          padding: 10px 14px 10px 38px;
          font-size: 14px;
          border: 1px solid #dcdcdc;
          border-radius: 6px;
          background: #ffffff;
          outline: none;
          transition: border-color 0.2s;
        }

        .search-input:focus {
          border-color: #0c5354;
          box-shadow: 0 0 0 2px rgba(12, 83, 84, 0.1);
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #888888;
          pointer-events: none;
        }

        .sort-and-count {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .results-count {
          font-size: 13.5px;
          font-weight: 600;
          color: #555555;
          white-space: nowrap;
        }

        .sort-select {
          padding: 8px 14px;
          font-size: 13px;
          font-weight: 600;
          color: #333333;
          background: #ffffff;
          border: 1px solid #dcdcdc;
          border-radius: 6px;
          cursor: pointer;
          outline: none;
        }

        .sort-select:focus {
          border-color: #0c5354;
        }

        /* ── Main Recipe Grid ── */
        .recipes-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 28px;
          margin-bottom: 48px;
        }

        @media (min-width: 540px) {
          .recipes-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 900px) {
          .recipes-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .recipe-card {
          display: flex;
          flex-direction: column;
          background: #ffffff;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .recipe-card:hover {
          transform: translateY(-3px);
        }

        .recipe-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          border-radius: 4px;
          overflow: hidden;
          background: #f3f3f3;
          margin-bottom: 12px;
        }

        .recipe-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.3s ease;
        }

        .recipe-card:hover .recipe-img {
          transform: scale(1.03);
        }

        .recipe-save-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #444444;
          font-size: 15px;
          transition: all 0.2s ease;
        }

        .recipe-save-btn:hover {
          background: #ffffff;
          transform: scale(1.1);
        }

        .recipe-save-btn.saved {
          color: #e02424;
          background: #ffffff;
        }

        .recipe-card-content {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .recipe-card-cat {
          font-size: 10.5px;
          font-weight: 800;
          letter-spacing: 1px;
          color: #009b72;
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        .recipe-card-title {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 17px;
          font-weight: 700;
          line-height: 1.35;
          color: #1a1a1a;
          margin-bottom: 8px;
          text-decoration: none;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.15s ease;
        }

        .recipe-card-title:hover {
          color: #0c5354;
        }

        .recipe-card-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #666666;
          margin-bottom: 6px;
        }

        .recipe-stars {
          color: #0c5354;
          letter-spacing: 1px;
          font-size: 13px;
        }

        .recipe-card-author {
          font-size: 12px;
          color: #777777;
          margin-top: auto;
        }

        /* ── Load More Button ── */
        .load-more-wrap {
          text-align: center;
          margin: 20px 0 60px;
        }

        .load-more-btn {
          background: #0c5354;
          color: #ffffff;
          border: none;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          padding: 14px 36px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 3px 8px rgba(12, 83, 84, 0.25);
        }

        .load-more-btn:hover {
          background: #083c3d;
          transform: translateY(-2px);
          box-shadow: 0 5px 12px rgba(12, 83, 84, 0.35);
        }

        /* ── Category Spotlight Section ── */
        .spotlight-section {
          margin-top: 40px;
          padding-top: 50px;
          border-top: 1px solid #eaeaea;
        }

        .spotlight-header {
          text-align: center;
          margin-bottom: 36px;
        }

        .spotlight-main-title {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 32px;
          font-weight: 700;
          color: #111111;
          margin-bottom: 8px;
        }

        .spotlight-main-desc {
          font-size: 15px;
          color: #666666;
        }

        .spotlight-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 20px;
        }

        @media (min-width: 640px) {
          .spotlight-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .spotlight-grid {
            grid-template-columns: repeat(5, 1fr);
          }
        }

        .spotlight-card {
          background: #fafafa;
          border: 1px solid #eaeaea;
          border-radius: 6px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: inherit;
          transition: all 0.2s ease;
        }

        .spotlight-card:hover {
          transform: translateY(-4px);
          border-color: #0c5354;
          box-shadow: 0 6px 18px rgba(12, 83, 84, 0.1);
        }

        .spotlight-img {
          width: 100%;
          aspect-ratio: 16 / 10;
          object-fit: cover;
        }

        .spotlight-content {
          padding: 16px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .spotlight-badge {
          font-size: 9.5px;
          font-weight: 800;
          letter-spacing: 1px;
          color: #009b72;
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        .spotlight-card-title {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 18px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 6px;
        }

        .spotlight-card:hover .spotlight-card-title {
          color: #0c5354;
        }

        .spotlight-card-desc {
          font-size: 12.5px;
          color: #666666;
          line-height: 1.45;
          margin-bottom: 12px;
        }

        .spotlight-card-link {
          margin-top: auto;
          font-size: 12px;
          font-weight: 700;
          color: #0c5354;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      `}</style>

      <div className="view-all-page">
        <Header />

        <main className="view-all-container">
          {/* Header */}
          <div className="all-recipes-header">
            <span className="all-recipes-badge">The Complete Collection</span>
            <h1 className="all-recipes-title">All Recipes</h1>
            <p className="all-recipes-desc">
              Explore our complete library of hundreds of editor-tested, kitchen-proven recipes.
              From 20-minute weeknight dinners and hearty breakfasts to decadent desserts and party appetizers,
              find your next culinary inspiration right here.
            </p>
          </div>

          {/* Category Filter Pills */}
          <nav className="category-filters-scroll" aria-label="Recipe Categories">
            {categoryFilters.map((cat) => (
              <button
                key={cat.key}
                className={`filter-pill${activeCategory === cat.key ? " active" : ""}`}
                onClick={() => {
                  setActiveCategory(cat.key);
                  setVisibleCount(24);
                }}
              >
                {cat.label}
              </button>
            ))}
          </nav>

          {/* Controls Bar: Search & Sort */}
          <div className="controls-bar">
            <div className="search-box">
              <svg
                className="search-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Search by recipe, ingredient, or keyword..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(24);
                }}
              />
            </div>

            <div className="sort-and-count">
              <span className="results-count">
                Showing {Math.min(visibleCount, sortedRecipes.length)} of {sortedRecipes.length} recipes
              </span>

              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort recipes"
              >
                <option value="featured">Featured First</option>
                <option value="rating">Highest Rated</option>
                <option value="time">Quickest to Cook</option>
                <option value="alphabetical">Alphabetical (A–Z)</option>
              </select>
            </div>
          </div>

          {/* Recipes Grid */}
          {displayedRecipes.length > 0 ? (
            <section className="recipes-grid" aria-label="All Recipes Grid">
              {displayedRecipes.map((recipe) => {
                const href = `/recipes/${recipe.slug}`;
                const isSaved = savedIds.includes(recipe.id);
                return (
                  <article key={recipe.id} className="recipe-card">
                    <div className="recipe-img-wrap">
                      <Link href={href}>
                        <img
                          src={recipe.imageUrl}
                          alt={recipe.title}
                          className="recipe-img"
                          loading="lazy"
                        />
                      </Link>
                      <button
                        className={`recipe-save-btn${isSaved ? " saved" : ""}`}
                        onClick={() => toggleSave(recipe.id)}
                        aria-label={isSaved ? "Unsave recipe" : "Save recipe"}
                      >
                        {isSaved ? "♥" : "♡"}
                      </button>
                    </div>

                    <div className="recipe-card-content">
                      <div className="recipe-card-cat">{recipe.category}</div>
                      <Link href={href} className="recipe-card-title">
                        {recipe.title}
                      </Link>

                      <div className="recipe-card-meta">
                        <span className="recipe-stars">
                          {"★".repeat(recipe.rating || 5)}
                          {"☆".repeat(5 - (recipe.rating || 5))}
                        </span>
                        <span>⏱ {recipe.totalTime || recipe.cookTime || "30 mins"}</span>
                      </div>

                      <div className="recipe-card-author">
                        By {recipe.author}
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>
          ) : (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#666" }}>
              <p style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}>
                No recipes found matching your criteria.
              </p>
              <p style={{ fontSize: "14px" }}>
                Try clearing your search query or selecting a different category filter.
              </p>
            </div>
          )}

          {/* Load More Button */}
          {visibleCount < sortedRecipes.length && (
            <div className="load-more-wrap">
              <button
                className="load-more-btn"
                onClick={() => setVisibleCount((prev) => prev + 24)}
              >
                Load More Recipes ({sortedRecipes.length - visibleCount} remaining)
              </button>
            </div>
          )}

          {/* Category Spotlight Section */}
          <section className="spotlight-section">
            <div className="spotlight-header">
              <h2 className="spotlight-main-title">Browse by Category Hub</h2>
              <p className="spotlight-main-desc">
                Prefer a curated experience? Dive deep into our dedicated category spaces.
              </p>
            </div>

            <div className="spotlight-grid">
              {categorySpotlights.map((spot) => (
                <Link key={spot.href} href={spot.href} className="spotlight-card">
                  <img src={spot.imageUrl} alt={spot.title} className="spotlight-img" loading="lazy" />
                  <div className="spotlight-content">
                    <span className="spotlight-badge">{spot.badge}</span>
                    <h3 className="spotlight-card-title">{spot.title}</h3>
                    <p className="spotlight-card-desc">{spot.desc}</p>
                    <span className="spotlight-card-link">Explore Hub &rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
