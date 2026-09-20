"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface DinnerRecipe {
  id: number;
  slug?: string;
  category: string;
  title: string;
  author: string;
  time?: string;
  rating?: number;
  imageUrl: string;
  tag: string;
}

const filterCategories = [
  "ALL",
  "COMFORT FOOD RECIPES",
  "FAMILY DINNER RECIPES",
  "SIDE DISH RECIPES",
  "SAUCE RECIPES",
  "DINNER RECIPES BY TYPE",
  "DINNER RECIPES BY INGREDIENTS",
  "DINNER RECIPES BY DIET",
  "DINNER RECIPES BY TIME AND EASE",
];

const featuredDinnerRecipes: DinnerRecipe[] = [
  {
    id: 1,
    slug: "four-ingredient-italian-spaghetti",
    category: "EASY PASTAS",
    tag: "DINNER RECIPES BY TIME AND EASE",
    title: "4-Ingredient, 20-Minute Italian Spaghetti Fra Diavolo",
    author: "By Dishora Editorial Team",
    time: "20 mins",
    imageUrl: "/images/dinner-spaghetti-fra-diavolo.jpg",
  },
  {
    id: 2,
    slug: "three-ingredient-baked-potatoes",
    category: "QUICK DINNERS",
    tag: "DINNER RECIPES BY TIME AND EASE",
    title: "3-Ingredient, 25-Minute Crispy Baked Potatoes",
    author: "By Dishora Editorial Team",
    time: "25 mins",
    imageUrl: "/images/dinner-baked-potatoes.jpg",
  },
  {
    id: 3,
    slug: "five-ingredient-sheet-pan-chicken-pot-pie",
    category: "SHEET PAN DINNERS",
    tag: "FAMILY DINNER RECIPES",
    title: "5-Ingredient Sheet Pan Chicken Pot Pie",
    author: "By Dishora Editorial Team",
    time: "50 mins",
    imageUrl: "/images/dinner-sheet-pan-pot-pie.jpg",
  },
];

const dinnerGridRecipes: DinnerRecipe[] = [
  {
    id: 4,
    slug: "cheesy-cowboy-sliders",
    category: "BURGERS",
    tag: "COMFORT FOOD RECIPES",
    title: "Cheesy Baked Cowboy Sliders",
    author: "By Dishora Editorial Team",
    rating: 5,
    time: "40 mins",
    imageUrl: "/images/dinner-cowboy-sliders.jpg",
  },
  {
    id: 5,
    slug: "french-onion-meatloaf",
    category: "MEATLOAF",
    tag: "COMFORT FOOD RECIPES",
    title: "Savory French Onion Glazed Meatloaf",
    author: "By Dishora Editorial Team",
    rating: 5,
    time: "1 hr 15 mins",
    imageUrl: "/images/dinner-meatloaf.jpg",
  },
  {
    id: 6,
    slug: "forgotten-southern-pasta",
    category: "PASTAS",
    tag: "DINNER RECIPES BY TIME AND EASE",
    title: "Traditional Southern-Style Skillet Buttered Pasta",
    author: "By Dishora Editorial Team",
    rating: 5,
    time: "20 mins",
    imageUrl: "/images/dinner-southern-pasta.jpg",
  },
  {
    id: 7,
    slug: "one-pot-dal",
    category: "LENTILS",
    tag: "DINNER RECIPES BY DIET",
    title: "35-Minute One-Pot Spiced Red Lentil Dal",
    author: "By Dishora Editorial Team",
    rating: 5,
    time: "35 mins",
    imageUrl: "/images/dinner-one-pot-dal.jpg",
  },
  {
    id: 8,
    slug: "one-pot-italian-sausage-pasta",
    category: "CREAMY PASTAS",
    tag: "COMFORT FOOD RECIPES",
    title: "Creamy One-Pot Italian Sausage and Shells Pasta",
    author: "By Dishora Editorial Team",
    rating: 5,
    time: "50 mins",
    imageUrl: "/images/dinner-italian-sausage-pasta.jpg",
  },
  {
    id: 9,
    slug: "creamy-amish-macaroni-salad",
    category: "PASTA SALADS",
    tag: "SIDE DISH RECIPES",
    title: "Classic Creamy Amish Macaroni Salad",
    author: "By Dishora Editorial Team",
    rating: 5,
    time: "1 hr 35 mins",
    imageUrl: "/images/dinner-amish-mac-salad.jpg",
  },
  {
    id: 10,
    slug: "four-ingredient-mexican-potatoes",
    category: "YUKON GOLD POTATOES",
    tag: "SIDE DISH RECIPES",
    title: "4-Ingredient Mexican Skillet Potatoes (Papas con Chile)",
    author: "By Dishora Editorial Team",
    rating: 5,
    time: "25 mins",
    imageUrl: "/images/dinner-mexican-potatoes.jpg",
  },
  {
    id: 11,
    slug: "cottage-cheese-mac-and-cheese",
    category: "MACARONIS",
    tag: "COMFORT FOOD RECIPES",
    title: "High-Protein Creamy Cottage Cheese Mac and Cheese",
    author: "By Dishora Editorial Team",
    time: "45 mins",
    imageUrl: "/images/dinner-cottage-mac-cheese.jpg",
  },
  {
    id: 12,
    slug: "mexican-street-corn-beans",
    category: "WHITE BEANS",
    tag: "DINNER RECIPES BY INGREDIENTS",
    title: "15-Minute Creamy Mexican Street Corn Beans",
    author: "By Dishora Editorial Team",
    rating: 5,
    time: "15 mins",
    imageUrl: "/images/dinner-creamy-street-corn-beans.jpg",
  },
  {
    id: 13,
    slug: "one-pot-pork-loin-apples",
    category: "PORK LOIN",
    tag: "FAMILY DINNER RECIPES",
    title: "One-Pot Roast Pork Loin With Sweet Apples",
    author: "By Dishora Editorial Team",
    time: "1 hr 25 mins",
    imageUrl: "/images/dinner-pork-loin-apples.jpg",
  },
  {
    id: 14,
    slug: "pepperoni-pasta-bake",
    category: "RECIPE COLLECTIONS",
    tag: "DINNER RECIPES BY TYPE",
    title: "12 4-Ingredient Dinners That Taste Effortlessly Gourmet",
    author: "By Dishora Editorial Team",
    imageUrl: "/images/dinner-4-ingredient-pasta-bake.jpg",
  },
  {
    id: 15,
    slug: "one-pan-baked-feta-orzo",
    category: "ORZOS",
    tag: "COMFORT FOOD RECIPES",
    title: "One-Pan Baked Feta and Tomato Orzo",
    author: "By Dishora Editorial Team",
    rating: 4,
    time: "45 mins",
    imageUrl: "/images/dinner-baked-feta-orzo.jpg",
  },
  {
    id: 16,
    slug: "crispy-chicken-canned-collard-greens",
    category: "EASY CHICKEN",
    tag: "FAMILY DINNER RECIPES",
    title: "Crispy Skillet Chicken With Braised Collard Greens",
    author: "By Dishora Editorial Team",
    rating: 5,
    time: "55 mins",
    imageUrl: "/images/dinner-crispy-chicken-greens.jpg",
  },
  {
    id: 17,
    slug: "chicken-rice-casserole-french-onion-dip",
    category: "CHICKEN CASSEROLES",
    tag: "COMFORT FOOD RECIPES",
    title: "5-Ingredient French Onion Chicken and Rice Casserole",
    author: "By Dishora Editorial Team",
    rating: 5,
    time: "1 hr 5 mins",
    imageUrl: "/images/dinner-chicken-rice-casserole.jpg",
  },
  {
    id: 18,
    slug: "caramelized-spam-mac-and-cheese",
    category: "ONE POT",
    tag: "COMFORT FOOD RECIPES",
    title: "Creamy Caramelized Spam Mac and Cheese",
    author: "By Dishora Editorial Team",
    rating: 5,
    time: "35 mins",
    imageUrl: "/images/dinner-spam-mac-cheese.jpg",
  },
  {
    id: 19,
    slug: "white-bean-salmon-salad",
    category: "EASY SALADS",
    tag: "DINNER RECIPES BY DIET",
    title: "No-Cook Mediterranean White Bean and Salmon Salad",
    author: "By Dishora Editorial Team",
    time: "10 mins",
    imageUrl: "/images/dinner-salmon-bean-salad.jpg",
  },
  {
    id: 20,
    slug: "crunchy-pizza-night-salad",
    category: "GREEN SALADS",
    tag: "SIDE DISH RECIPES",
    title: "Crispy Italian Chopped Pizza Night Salad",
    author: "By Dishora Editorial Team",
    time: "20 mins",
    imageUrl: "/images/dinner-chopped-pizza-salad.jpg",
  },
  {
    id: 21,
    slug: "deviled-chicken",
    category: "BAKED CHICKEN",
    tag: "FAMILY DINNER RECIPES",
    title: "Sweet-and-Tangy Deviled Baked Chicken (Pollo alla Diavola)",
    author: "By Dishora Editorial Team",
    rating: 5,
    time: "2 hrs 45 mins",
    imageUrl: "/images/dinner-deviled-chicken.jpg",
  },
  {
    id: 22,
    slug: "classic-bolognese-sauce",
    category: "RECIPE COLLECTIONS",
    tag: "DINNER RECIPES BY TYPE",
    title: "34 Essential Weeknight Dinner Recipes",
    author: "By Dishora Editorial Team",
    imageUrl: "/images/dinner-spaghetti-best-dinner.jpg",
  },
  {
    id: 23,
    slug: "the-one-pan-cheeseburger-pie",
    category: "EASY FAMILY DINNERS",
    tag: "FAMILY DINNER RECIPES",
    title: "Classic One-Pan Cheeseburger Skillet Pie",
    author: "By Dishora Editorial Team",
    rating: 5,
    time: "50 mins",
    imageUrl: "/images/cheeseburger-pie.jpg",
  },
  {
    id: 24,
    slug: "three-ingredient-creamed-corn",
    category: "CORN",
    tag: "SIDE DISH RECIPES",
    title: "3-Ingredient Rich Creamed Sweet Corn",
    author: "By Dishora Editorial Team",
    rating: 5,
    time: "20 mins",
    imageUrl: "/images/dinner-creamed-corn.jpg",
  },
  {
    id: 25,
    slug: "summer-zucchini-casserole",
    category: "ZUCCHINI RECIPES",
    tag: "COMFORT FOOD RECIPES",
    title: "Golden Summer Zucchini and Herb Casserole",
    author: "By Dishora Editorial Team",
    rating: 5,
    time: "1 hr",
    imageUrl: "/images/dinner-zucchini-casserole.jpg",
  },
  {
    id: 26,
    slug: "classic-italian-meatballs",
    category: "RECIPE COLLECTIONS",
    tag: "DINNER RECIPES BY TYPE",
    title: "20 Classic Homestyle Italian Dinner Recipes",
    author: "By Dishora Editorial Team",
    imageUrl: "/images/dinner-spaghetti-meatballs.jpg",
  },
  {
    id: 27,
    slug: "twenty-minute-broccoli-pasta",
    category: "PASTAS",
    tag: "DINNER RECIPES BY TIME AND EASE",
    title: "Easy 20-Minute Garlic Parmesan Broccoli Pasta",
    author: "By Dishora Editorial Team",
    time: "20 mins",
    imageUrl: "/images/dinner-broccoli-pasta.jpg",
  },
  {
    id: 28,
    slug: "texas-steak-fingers",
    category: "CUBE STEAKS",
    tag: "COMFORT FOOD RECIPES",
    title: "Crispy Texas Steak Fingers with Country Cream Gravy",
    author: "By Dishora Editorial Team",
    rating: 5,
    time: "55 mins",
    imageUrl: "/images/dinner-steak-fingers.jpg",
  },
  {
    id: 29,
    slug: "creamy-tuscan-chicken-tortellini",
    category: "TORTELLINIS",
    tag: "DINNER RECIPES BY TIME AND EASE",
    title: "Creamy Tuscan Chicken Tortellini in Sun-Dried Tomato Sauce",
    author: "By Dishora Editorial Team",
    time: "30 mins",
    imageUrl: "/images/dinner-tuscan-tortellini.jpg",
  },
  {
    id: 30,
    slug: "mamas-easy-enchilada-casserole",
    category: "CASSEROLES",
    tag: "FAMILY DINNER RECIPES",
    title: "Easy Layered Enchilada Casserole (No-Chop)",
    author: "By Dishora Editorial Team",
    rating: 5,
    time: "1 hr 5 mins",
    imageUrl: "/images/dinner-enchilada-casserole.jpg",
  },
  {
    id: 31,
    slug: "three-ingredient-dumpling-salad",
    category: "EASY SALADS",
    tag: "DINNER RECIPES BY TIME AND EASE",
    title: "Quick 3-Ingredient Crispy Dumpling Salad",
    author: "By Dishora Editorial Team",
    time: "15 mins",
    imageUrl: "/images/dinner-dumpling-salad.jpg",
  },
];

export default function DinnerRecipesPage() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [savedIds, setSavedIds] = useState<number[]>([]);

  const toggleSave = (id: number) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const allRecipes = [...featuredDinnerRecipes, ...dinnerGridRecipes];
  const displayedRecipes =
    activeFilter === "ALL"
      ? allRecipes
      : allRecipes.filter((r) => r.tag === activeFilter);

  const getHref = (recipe: DinnerRecipe) => {
    if (recipe.slug) return `/recipes/${recipe.slug}`;
    return "#";
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap');
        
        .dinner-page {
          background-color: #ffffff;
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
          color: #222222;
        }

        .dinner-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 32px 20px 80px;
        }

        /* ── Header Section ── */
        .dinner-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .dinner-kicker {
          font-size: 11px;
          letter-spacing: 2px;
          font-weight: 700;
          color: #666666;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .dinner-main-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(34px, 5vw, 48px);
          font-weight: 700;
          color: #111111;
          margin-bottom: 12px;
          line-height: 1.15;
        }

        .dinner-subtitle {
          font-size: 15px;
          color: #555555;
          max-width: 680px;
          margin: 0 auto 28px;
          line-height: 1.6;
        }

        /* ── Filter Tags ── */
        .dinner-filters-wrap {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px 18px;
          margin-bottom: 40px;
          padding-bottom: 24px;
          border-bottom: 1px solid #eeeeee;
        }

        .filter-tag-btn {
          background: none;
          border: none;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.8px;
          color: #333333;
          text-transform: uppercase;
          cursor: pointer;
          padding: 6px 10px;
          border-radius: 4px;
          transition: all 0.15s ease;
        }

        .filter-tag-btn:hover {
          color: #0c5354;
          background: #f0f7f6;
        }

        .filter-tag-btn.active {
          color: #0c5354;
          border-bottom: 2px solid #0c5354;
          border-radius: 0;
          font-weight: 800;
        }

        /* ── Grid Layouts ── */
        .dinner-featured-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 28px;
          margin-bottom: 40px;
        }

        @media (min-width: 640px) {
          .dinner-featured-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .dinner-main-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 28px;
        }

        @media (min-width: 540px) {
          .dinner-main-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 900px) {
          .dinner-main-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        /* ── Recipe Card ── */
        .dinner-card {
          display: flex;
          flex-direction: column;
          background: #ffffff;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .dinner-card:hover {
          transform: translateY(-3px);
        }

        .dinner-card-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          border-radius: 4px;
          overflow: hidden;
          background: #f3f3f3;
          margin-bottom: 12px;
        }

        .dinner-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.3s ease;
        }

        .dinner-card:hover .dinner-card-img {
          transform: scale(1.03);
        }

        .dinner-save-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          box-shadow: 0 2px 6px rgba(0,0,0,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #444;
          font-size: 15px;
          transition: all 0.2s ease;
        }

        .dinner-save-btn:hover {
          background: #ffffff;
          transform: scale(1.1);
        }

        .dinner-save-btn.saved {
          color: #e02424;
          background: #ffffff;
        }

        .dinner-card-content {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .dinner-card-cat {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1px;
          color: #777777;
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        .dinner-card-title {
          font-family: 'Playfair Display', serif;
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

        .dinner-card-title:hover {
          color: #0c5354;
        }

        .dinner-card-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #666666;
          margin-bottom: 6px;
        }

        .dinner-stars {
          color: #0c5354;
          letter-spacing: 1px;
          font-size: 13px;
        }

        .dinner-card-author {
          font-size: 12px;
          color: #777777;
          margin-top: auto;
        }

        /* ── Ad Banner placeholder matching screenshot ── */
        .dinner-ad-banner {
          margin: 36px 0;
          background: #fff8eb;
          border: 1px dashed #eed5a1;
          border-radius: 6px;
          padding: 16px;
          text-align: center;
          font-size: 13px;
          color: #a46d12;
          font-weight: 600;
        }
      `}</style>

      <div className="dinner-page">
        <Header />

        <main className="dinner-container">
          {/* Header */}
          <div className="dinner-header">
            <div className="dinner-kicker">RECIPES</div>
            <h1 className="dinner-main-title">Dinner Recipes</h1>
            <p className="dinner-subtitle">
              Need help with dinner ideas? We have one-pot dishes, 30-minute meals,
              slow cooker feasts, and dinner recipes for every mood.
            </p>

            {/* Filter pills */}
            <nav className="dinner-filters-wrap" aria-label="Dinner Recipe Filters">
              {filterCategories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-tag-btn${activeFilter === cat ? " active" : ""}`}
                  onClick={() => setActiveFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </nav>
          </div>

          {/* If filtering, show all matches in one uniform grid; if ALL, show featured top 3 + main grid */}
          {activeFilter === "ALL" ? (
            <>
              {/* Featured Top 3 (Screenshot 2 Top Row) */}
              <section className="dinner-featured-grid" aria-label="Featured Dinners">
                {featuredDinnerRecipes.map((recipe) => {
                  const href = getHref(recipe);
                  const isSaved = savedIds.includes(recipe.id);
                  return (
                    <article key={recipe.id} className="dinner-card">
                      <div className="dinner-card-img-wrap">
                        <Link href={href}>
                          <img
                            src={recipe.imageUrl}
                            alt={recipe.title}
                            className="dinner-card-img"
                            loading="lazy"
                          />
                        </Link>
                        <button
                          className={`dinner-save-btn${isSaved ? " saved" : ""}`}
                          onClick={() => toggleSave(recipe.id)}
                          aria-label={isSaved ? "Unsave recipe" : "Save recipe"}
                        >
                          {isSaved ? "♥" : "♡"}
                        </button>
                      </div>
                      <div className="dinner-card-content">
                        <div className="dinner-card-cat">{recipe.category}</div>
                        <Link href={href} className="dinner-card-title">
                          {recipe.title}
                        </Link>
                        {recipe.time && (
                          <div className="dinner-card-meta">
                            <span>⏱ {recipe.time}</span>
                          </div>
                        )}
                        <div className="dinner-card-author">{recipe.author}</div>
                      </div>
                    </article>
                  );
                })}
              </section>

              {/* Middle Banner matching screenshot layout */}
              <div className="dinner-ad-banner">
                ✨ Featured Dinner Collections & Weekly Meal Inspiration
              </div>

              {/* Main 4-column Grid (Rows from screenshots 2, 3, 4) */}
              <section className="dinner-main-grid" aria-label="Dinner Recipes List">
                {dinnerGridRecipes.map((recipe) => {
                  const href = getHref(recipe);
                  const isSaved = savedIds.includes(recipe.id);
                  return (
                    <article key={recipe.id} className="dinner-card">
                      <div className="dinner-card-img-wrap">
                        <Link href={href}>
                          <img
                            src={recipe.imageUrl}
                            alt={recipe.title}
                            className="dinner-card-img"
                            loading="lazy"
                          />
                        </Link>
                        <button
                          className={`dinner-save-btn${isSaved ? " saved" : ""}`}
                          onClick={() => toggleSave(recipe.id)}
                          aria-label={isSaved ? "Unsave recipe" : "Save recipe"}
                        >
                          {isSaved ? "♥" : "♡"}
                        </button>
                      </div>
                      <div className="dinner-card-content">
                        <div className="dinner-card-cat">{recipe.category}</div>
                        <Link href={href} className="dinner-card-title">
                          {recipe.title}
                        </Link>
                        {(recipe.rating || recipe.time) && (
                          <div className="dinner-card-meta">
                            {recipe.rating && (
                              <span className="dinner-stars">
                                {"★".repeat(recipe.rating)}
                                {"☆".repeat(5 - recipe.rating)}
                              </span>
                            )}
                            {recipe.time && <span>⏱ {recipe.time}</span>}
                          </div>
                        )}
                        <div className="dinner-card-author">{recipe.author}</div>
                      </div>
                    </article>
                  );
                })}
              </section>
            </>
          ) : (
            /* Filtered view */
            <section className="dinner-main-grid" aria-label="Filtered Dinners">
              {displayedRecipes.map((recipe) => {
                const href = getHref(recipe);
                const isSaved = savedIds.includes(recipe.id);
                return (
                  <article key={recipe.id} className="dinner-card">
                    <div className="dinner-card-img-wrap">
                      <Link href={href}>
                        <img
                          src={recipe.imageUrl}
                          alt={recipe.title}
                          className="dinner-card-img"
                          loading="lazy"
                        />
                      </Link>
                      <button
                        className={`dinner-save-btn${isSaved ? " saved" : ""}`}
                        onClick={() => toggleSave(recipe.id)}
                        aria-label={isSaved ? "Unsave recipe" : "Save recipe"}
                      >
                        {isSaved ? "♥" : "♡"}
                      </button>
                    </div>
                    <div className="dinner-card-content">
                      <div className="dinner-card-cat">{recipe.category}</div>
                      <Link href={href} className="dinner-card-title">
                        {recipe.title}
                      </Link>
                      {(recipe.rating || recipe.time) && (
                        <div className="dinner-card-meta">
                          {recipe.rating && (
                            <span className="dinner-stars">
                              {"★".repeat(recipe.rating)}
                              {"☆".repeat(5 - recipe.rating)}
                            </span>
                          )}
                          {recipe.time && <span>⏱ {recipe.time}</span>}
                        </div>
                      )}
                      <div className="dinner-card-author">{recipe.author}</div>
                    </div>
                  </article>
                );
              })}
            </section>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}
