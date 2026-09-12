"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { appetizerRecipesData } from "../data/appetizerRecipes";

interface SubcategoryInfo {
  name: string;
  filterKey: string;
  tag: string;
  description: string;
}

const subcategories: SubcategoryInfo[] = [
  {
    name: "Dip Recipes",
    filterKey: "DIP RECIPES",
    tag: "Dip Recipes",
    description: "Warm bubbling skillets, creamy cold spreads, and crowd-pleasing dips for chips, pita, and fresh crudités.",
  },
  {
    name: "Salsa Recipes",
    filterKey: "SALSA RECIPES",
    tag: "Salsa Recipes",
    description: "Zesty fire-roasted tomatillo verde, smoky charred sweet corn, and vibrant garden-fresh salsas.",
  },
  {
    name: "Easy Snack Recipes",
    filterKey: "EASY SNACK RECIPES",
    tag: "Easy Snack Recipes",
    description: "Simple, pantry-friendly savory bites and crunchy roasted snacks that come together effortlessly.",
  },
  {
    name: "Healthy Snack Recipes",
    filterKey: "HEALTHY SNACK RECIPES",
    tag: "Healthy Snack Recipes",
    description: "Wholesome, low-carb, and nutrient-dense appetizers that look stunning and taste like an indulgence.",
  },
  {
    name: "Quick Appetizer Recipes",
    filterKey: "QUICK APPETIZER RECIPES",
    tag: "Quick Appetizer Recipes",
    description: "Speedy 10-to-15 minute starters, crostini, and handheld skewers for last-minute entertaining.",
  },
  {
    name: "Party Appetizers",
    filterKey: "PARTY APPETIZERS",
    tag: "Party Appetizers",
    description: "Showstopping crowd-pleasers like savory slow-cooker cocktail meatballs and golden puff pastry tarts.",
  },
  {
    name: "Finger Food Recipes",
    filterKey: "FINGER FOOD RECIPES",
    tag: "Finger Food Recipes",
    description: "Neat, handheld two-bite favorites including bacon-wrapped dates and lump crab cakes for cocktail hour.",
  },
  {
    name: "Cheese Appetizers",
    filterKey: "CHEESE APPETIZERS",
    tag: "Cheese Appetizers",
    description: "Melty, gooey, and decadent cheese creations from honey-pecan baked brie to golden fried mozzarella bites.",
  },
  {
    name: "Chicken Appetizers",
    filterKey: "CHICKEN APPETIZERS",
    tag: "Chicken Appetizers",
    description: "Extra-crisp garlic parmesan wings and spicy buffalo chicken wonton cups built for sharing.",
  },
  {
    name: "Vegetarian Appetizers",
    filterKey: "VEGETARIAN APPETIZERS",
    tag: "Vegetarian Appetizers",
    description: "Garden-fresh zucchini corn fritters, heritage creamy deviled eggs, and vegetable-forward starters.",
  },
  {
    name: "Baked Appetizers",
    filterKey: "BAKED APPETIZERS",
    tag: "Baked Appetizers",
    description: "Oven-fresh wonders from cheesy garlic pull-apart bread to shatteringly crisp spanakopita triangles.",
  },
  {
    name: "Game Day Snacks",
    filterKey: "GAME DAY SNACKS",
    tag: "Game Day Snacks",
    description: "Hearty, tailgate-approved snacks including loaded skillet sheet pan nachos and smoky bacon jalapeño poppers.",
  },
];

const filterList = ["ALL", ...subcategories.map((s) => s.filterKey)];

export default function AppetizersPage() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [savedIds, setSavedIds] = useState<number[]>([]);

  const toggleSave = (id: number) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const currentSubcategory = subcategories.find(
    (s) => s.filterKey === activeFilter
  );

  const displayedRecipes =
    activeFilter === "ALL"
      ? appetizerRecipesData
      : appetizerRecipesData.filter(
          (recipe) =>
            recipe.category.toUpperCase() === activeFilter ||
            (currentSubcategory &&
              recipe.category.toLowerCase() ===
                currentSubcategory.name.toLowerCase())
        );

  // Top 3 featured cards for the top section (matching reference Screenshot 2)
  const featuredRecipes = [
    appetizerRecipesData[0], // Spinach Artichoke Dip
    appetizerRecipesData[16], // Garlic Parm Wings
    appetizerRecipesData[23], // Jalapeño Poppers
  ];

  return (
    <>
      <style jsx>{`
        .appetizer-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #ffffff;
          color: #222222;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Helvetica, Arial, sans-serif;
        }

        .appetizer-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 24px 20px 80px;
          width: 100%;
        }

        /* ── Header ── */
        .appetizer-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .appetizer-main-title {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 38px;
          font-weight: 700;
          letter-spacing: -0.5px;
          color: #111111;
          margin-bottom: 12px;
          line-height: 1.15;
        }

        @media (min-width: 768px) {
          .appetizer-main-title {
            font-size: 48px;
          }
        }

        .appetizer-subtitle {
          font-size: 15.5px;
          color: #4a4a4a;
          max-width: 780px;
          margin: 0 auto 28px;
          line-height: 1.6;
        }

        /* ── Subcategory filter navigation pills ── */
        .appetizer-filters-wrap {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 6px 14px;
          padding-bottom: 16px;
          border-bottom: 1px solid #eaeaea;
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

        /* ── Subcategory Description Banner ── */
        .subcategory-header-banner {
          margin: 24px 0 32px;
          padding: 18px 24px;
          background: #f7faf9;
          border-left: 4px solid #0c5354;
          border-radius: 4px;
        }

        .subcategory-header-title {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 24px;
          font-weight: 700;
          color: #0c5354;
          margin-bottom: 6px;
        }

        .subcategory-header-desc {
          font-size: 14.5px;
          color: #555555;
          line-height: 1.5;
        }

        /* ── Featured Top 3 Grid (Screenshot 2 Top Row) ── */
        .appetizer-featured-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 28px;
          margin-bottom: 40px;
        }

        @media (min-width: 640px) {
          .appetizer-featured-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* ── Main 4-column Grid ── */
        .appetizer-main-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 28px;
        }

        @media (min-width: 540px) {
          .appetizer-main-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 900px) {
          .appetizer-main-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        /* ── Recipe Card ── */
        .appetizer-card {
          display: flex;
          flex-direction: column;
          background: #ffffff;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .appetizer-card:hover {
          transform: translateY(-3px);
        }

        .appetizer-card-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          border-radius: 4px;
          overflow: hidden;
          background: #f3f3f3;
          margin-bottom: 12px;
        }

        .appetizer-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.3s ease;
        }

        .appetizer-card:hover .appetizer-card-img {
          transform: scale(1.03);
        }

        .appetizer-save-btn {
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

        .appetizer-save-btn:hover {
          background: #ffffff;
          transform: scale(1.1);
        }

        .appetizer-save-btn.saved {
          color: #e02424;
          background: #ffffff;
        }

        .appetizer-card-content {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .appetizer-card-cat {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1px;
          color: #009b72;
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        .appetizer-card-title {
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

        .appetizer-card-title:hover {
          color: #0c5354;
        }

        .appetizer-card-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #666666;
          margin-bottom: 6px;
        }

        .appetizer-stars {
          color: #0c5354;
          letter-spacing: 1px;
          font-size: 13px;
        }

        .appetizer-card-author {
          font-size: 12px;
          color: #777777;
          margin-top: auto;
        }

        /* ── Accent banner ── */
        .appetizer-accent-banner {
          margin: 36px 0;
          background: #f7faf9;
          border: 1px dashed #49bcc3;
          border-radius: 6px;
          padding: 16px;
          text-align: center;
          font-size: 14px;
          color: #0c5354;
          font-weight: 600;
          letter-spacing: 0.2px;
        }

        /* ── Subcategory Quick Grid Navigation ── */
        .subcategories-browse-section {
          margin-top: 60px;
          padding-top: 40px;
          border-top: 1px solid #eaeaea;
        }

        .browse-title {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 28px;
          font-weight: 700;
          color: #111111;
          margin-bottom: 8px;
          text-align: center;
        }

        .browse-subtitle {
          font-size: 15px;
          color: #666666;
          text-align: center;
          margin-bottom: 30px;
        }

        .subcategories-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 18px;
        }

        @media (min-width: 600px) {
          .subcategories-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 960px) {
          .subcategories-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .subcategory-box {
          background: #fafafa;
          border: 1px solid #eeeeee;
          border-radius: 8px;
          padding: 20px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
        }

        .subcategory-box:hover {
          background: #ffffff;
          border-color: #0c5354;
          box-shadow: 0 4px 12px rgba(12, 83, 84, 0.08);
          transform: translateY(-2px);
        }

        .subcat-box-title {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 19px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 6px;
        }

        .subcategory-box:hover .subcat-box-title {
          color: #0c5354;
        }

        .subcat-box-desc {
          font-size: 13.5px;
          color: #666666;
          line-height: 1.45;
          margin-bottom: 12px;
        }

        .subcat-box-count {
          font-size: 11.5px;
          font-weight: 700;
          color: #009b72;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: auto;
        }
      `}</style>

      <div className="appetizer-page">
        <Header />

        <main className="appetizer-container">
          {/* Header */}
          <div className="appetizer-header">
            <h1 className="appetizer-main-title">
              Snacks & Appetizer Recipes
            </h1>
            <p className="appetizer-subtitle">
              Whether you need a casual pre-dinner nibble or something fancy to
              take to a holiday party, we&apos;ve got all the appetizing
              appetizers and party snacks here for you.
            </p>

            {/* Filter pills */}
            <nav
              className="appetizer-filters-wrap"
              aria-label="Appetizer and Snack Recipe Filters"
            >
              {filterList.map((cat) => (
                <button
                  key={cat}
                  className={`filter-tag-btn${
                    activeFilter === cat ? " active" : ""
                  }`}
                  onClick={() => setActiveFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </nav>
          </div>

          {/* Active Subcategory Details (if filtered) */}
          {currentSubcategory && (
            <div className="subcategory-header-banner">
              <h2 className="subcategory-header-title">
                {currentSubcategory.name}
              </h2>
              <p className="subcategory-header-desc">
                {currentSubcategory.description}
              </p>
            </div>
          )}

          {/* If ALL is active, show Top 3 Featured row + Accent Banner, then full grid */}
          {activeFilter === "ALL" ? (
            <>
              {/* Featured Top 3 (Screenshot 2 Top Row) */}
              <section
                className="appetizer-featured-grid"
                aria-label="Featured Appetizers"
              >
                {featuredRecipes.map((recipe) => {
                  const href = `/recipes/${recipe.slug}`;
                  const isSaved = savedIds.includes(recipe.id);
                  return (
                    <article key={recipe.id} className="appetizer-card">
                      <div className="appetizer-card-img-wrap">
                        <Link href={href}>
                          <img
                            src={recipe.imageUrl}
                            alt={recipe.title}
                            className="appetizer-card-img"
                            loading="lazy"
                          />
                        </Link>
                        <button
                          className={`appetizer-save-btn${
                            isSaved ? " saved" : ""
                          }`}
                          onClick={() => toggleSave(recipe.id)}
                          aria-label={isSaved ? "Unsave recipe" : "Save recipe"}
                        >
                          {isSaved ? "♥" : "♡"}
                        </button>
                      </div>
                      <div className="appetizer-card-content">
                        <div className="appetizer-card-cat">
                          {recipe.category}
                        </div>
                        <Link href={href} className="appetizer-card-title">
                          {recipe.title}
                        </Link>
                        <div className="appetizer-card-meta">
                          <span className="appetizer-stars">
                            {"★".repeat(recipe.rating)}
                            {"☆".repeat(5 - recipe.rating)}
                          </span>
                          <span>⏱ {recipe.totalTime}</span>
                        </div>
                        <div className="appetizer-card-author">
                          By {recipe.author}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </section>

              {/* Accent Banner matching layout */}
              <div className="appetizer-accent-banner">
                ✨ Savory Warm Dips, Crispy Finger Foods, and Crowd-Pleasing
                Party Bites for Any Occasion
              </div>

              {/* Main 4-column Grid */}
              <section
                className="appetizer-main-grid"
                aria-label="All Appetizer Recipes"
              >
                {appetizerRecipesData.map((recipe) => {
                  const href = `/recipes/${recipe.slug}`;
                  const isSaved = savedIds.includes(recipe.id);
                  return (
                    <article key={recipe.id} className="appetizer-card">
                      <div className="appetizer-card-img-wrap">
                        <Link href={href}>
                          <img
                            src={recipe.imageUrl}
                            alt={recipe.title}
                            className="appetizer-card-img"
                            loading="lazy"
                          />
                        </Link>
                        <button
                          className={`appetizer-save-btn${
                            isSaved ? " saved" : ""
                          }`}
                          onClick={() => toggleSave(recipe.id)}
                          aria-label={isSaved ? "Unsave recipe" : "Save recipe"}
                        >
                          {isSaved ? "♥" : "♡"}
                        </button>
                      </div>
                      <div className="appetizer-card-content">
                        <div className="appetizer-card-cat">
                          {recipe.category}
                        </div>
                        <Link href={href} className="appetizer-card-title">
                          {recipe.title}
                        </Link>
                        <div className="appetizer-card-meta">
                          <span className="appetizer-stars">
                            {"★".repeat(recipe.rating)}
                            {"☆".repeat(5 - recipe.rating)}
                          </span>
                          <span>⏱ {recipe.totalTime}</span>
                        </div>
                        <div className="appetizer-card-author">
                          By {recipe.author}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </section>

              {/* Subcategories Browse Section */}
              <section className="subcategories-browse-section">
                <h2 className="browse-title">Explore by Appetizer Category</h2>
                <p className="browse-subtitle">
                  Find the perfect bite for every mood, party theme, and dietary
                  preference.
                </p>

                <div className="subcategories-grid">
                  {subcategories.map((subcat) => {
                    const count = appetizerRecipesData.filter(
                      (r) =>
                        r.category.toLowerCase() ===
                        subcat.name.toLowerCase()
                    ).length;
                    return (
                      <div
                        key={subcat.filterKey}
                        className="subcategory-box"
                        onClick={() => {
                          setActiveFilter(subcat.filterKey);
                          window.scrollTo({ top: 120, behavior: "smooth" });
                        }}
                      >
                        <h3 className="subcat-box-title">{subcat.name}</h3>
                        <p className="subcat-box-desc">{subcat.description}</p>
                        <span className="subcat-box-count">
                          {count} {count === 1 ? "Recipe" : "Recipes"} &rarr;
                        </span>
                      </div>
                    );
                  })}
                </div>
              </section>
            </>
          ) : (
            /* Filtered View */
            <section
              className="appetizer-main-grid"
              aria-label={`Recipes for ${activeFilter}`}
            >
              {displayedRecipes.map((recipe) => {
                const href = `/recipes/${recipe.slug}`;
                const isSaved = savedIds.includes(recipe.id);
                return (
                  <article key={recipe.id} className="appetizer-card">
                    <div className="appetizer-card-img-wrap">
                      <Link href={href}>
                        <img
                          src={recipe.imageUrl}
                          alt={recipe.title}
                          className="appetizer-card-img"
                          loading="lazy"
                        />
                      </Link>
                      <button
                        className={`appetizer-save-btn${
                          isSaved ? " saved" : ""
                        }`}
                        onClick={() => toggleSave(recipe.id)}
                        aria-label={isSaved ? "Unsave recipe" : "Save recipe"}
                      >
                        {isSaved ? "♥" : "♡"}
                      </button>
                    </div>
                    <div className="appetizer-card-content">
                      <div className="appetizer-card-cat">
                        {recipe.category}
                      </div>
                      <Link href={href} className="appetizer-card-title">
                        {recipe.title}
                      </Link>
                      <div className="appetizer-card-meta">
                        <span className="appetizer-stars">
                          {"★".repeat(recipe.rating)}
                          {"☆".repeat(5 - recipe.rating)}
                        </span>
                        <span>⏱ {recipe.totalTime}</span>
                      </div>
                      <div className="appetizer-card-author">
                        By {recipe.author}
                      </div>
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
