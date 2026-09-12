"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface LunchItem {
  id: number;
  slug: string;
  category: string;
  tag: string;
  title: string;
  author: string;
  time?: string;
  rating?: number;
  imageUrl: string;
}

const filterCategories = [
  "ALL",
  "SANDWICH RECIPES",
  "QUICK LUNCH RECIPES",
  "SALAD RECIPES",
  "SOUP RECIPES",
  "HEALTHY LUNCH RECIPES",
  "EASY LUNCH RECIPES",
  "COMFORT FOOD RECIPES",
  "PASTA LUNCH RECIPES",
  "CHICKEN LUNCH RECIPES",
  "VEGETARIAN LUNCH RECIPES",
  "RICE & GRAIN BOWLS",
  "WRAPS & TACOS",
];

const featuredLunchRecipes: LunchItem[] = [
  {
    id: 701,
    slug: "white-bean-salmon-salad",
    category: "EASY SALADS",
    tag: "SALAD RECIPES",
    title: "The No-Cook White Bean and Salmon Salad That Keeps Me Full for Hours",
    author: "By Robin Asbell",
    time: "10 mins",
    imageUrl: "/images/lunch-white-bean-salmon-salad.jpg",
  },
  {
    id: 702,
    slug: "royal-coronation-chicken-salad",
    category: "CHICKEN SALADS",
    tag: "CHICKEN LUNCH RECIPES",
    title: "This 10-Minute Royal Chicken Salad Is Fit for a Queen",
    author: "By Sara Bir",
    rating: 5,
    time: "10 mins",
    imageUrl: "/images/lunch-royal-coronation-chicken-salad.jpg",
  },
  {
    id: 703,
    slug: "flavor-packed-italian-tuna-salad",
    category: "TUNA SALADS",
    tag: "SALAD RECIPES",
    title: "The Easy, Flavor-Packed Italian Tuna Salad I Make on Repeat",
    author: "By Ivy Manning",
    imageUrl: "/images/lunch-italian-tuna-salad.jpg",
  },
];

const lunchGridRecipes: LunchItem[] = [
  {
    id: 704,
    slug: "broiled-tomato-cheddar-sandwich",
    category: "SUMMER",
    tag: "SANDWICH RECIPES",
    title: "The Tomato Sandwich I've Been Making Since College",
    author: "By Claudia Cash",
    imageUrl: "/images/lunch-tomato-cheddar-sandwich.jpg",
  },
  {
    id: 705,
    slug: "ten-minute-summer-tomato-salad",
    category: "SUMMER SALADS",
    tag: "SALAD RECIPES",
    title: "The No-Cook, 10-Minute Tomato Salad I'm Making Until Tomato Season Ends",
    author: "By Sara Bir",
    rating: 5,
    time: "10 mins",
    imageUrl: "/images/lunch-fresh-tomato-salad.jpg",
  },
  {
    id: 706,
    slug: "two-ingredient-cold-soba-noodles",
    category: "SOBA NOODLES",
    tag: "QUICK LUNCH RECIPES",
    title: "The 2-Ingredient Cold Noodles I Make When It's Too Hot To Cook",
    author: "By Kat Thompson",
    time: "10 mins",
    imageUrl: "/images/lunch-cold-soba-noodles.jpg",
  },
  {
    id: 707,
    slug: "italian-sub-panzanella-salad",
    category: "EASY SALADS",
    tag: "SALAD RECIPES",
    title: "This Panzanella Turns an Italian Sub Into the Perfect Summer Salad",
    author: "By Theodora Kaloudis",
    rating: 5,
    time: "25 mins",
    imageUrl: "/images/lunch-italian-sub-panzanella.jpg",
  },
  {
    id: 708,
    slug: "southern-pimento-cheese-sandwich",
    category: "SANDWICHES",
    tag: "SANDWICH RECIPES",
    title: "The 3-Ingredient Southern Sandwich I'm Eating All Summer Long",
    author: "By Sara Bir",
    rating: 5,
    time: "10 mins",
    imageUrl: "/images/lunch-southern-pimento-sandwich.jpg",
  },
  {
    id: 709,
    slug: "greek-island-tomato-feta-dakos-toast",
    category: "SANDWICHES",
    tag: "SANDWICH RECIPES",
    title: "This 5-Ingredient Tomato Toast Is My Shortcut to a Greek Island",
    author: "By Theodora Kaloudis",
    rating: 5,
    time: "10 mins",
    imageUrl: "/images/lunch-greek-dakos-tomato-toast.jpg",
  },
  {
    id: 710,
    slug: "high-protein-salads-lunch-dinner",
    category: "RECIPE COLLECTIONS",
    tag: "HEALTHY LUNCH RECIPES",
    title: "12 Easy High-Protein Salads To Make for Lunch or Dinner",
    author: "By Theodora Kaloudis",
    imageUrl: "/images/lunch-high-protein-salads-collection.jpg",
  },
  {
    id: 711,
    slug: "summer-casseroles-collection",
    category: "EASY CASSEROLES",
    tag: "COMFORT FOOD RECIPES",
    title: "12 Summer Casserole Recipes You'll Want to Make Forever",
    author: "By Devan Grimsrud",
    imageUrl: "/images/lunch-summer-casseroles-collection.jpg",
  },
  {
    id: 712,
    slug: "no-cook-lunches-fifteen-minutes",
    category: "RECIPE COLLECTIONS",
    tag: "QUICK LUNCH RECIPES",
    title: "14 No-Cook Lunches You Can Make in 15 Minutes",
    author: "By Theodora Kaloudis",
    imageUrl: "/images/lunch-no-cook-lunches-collection.jpg",
  },
  {
    id: 713,
    slug: "four-ingredient-strawberry-pasta",
    category: "STRAWBERRY",
    tag: "PASTA LUNCH RECIPES",
    title: "This 4-Ingredient Strawberry Pasta Is Sweet, Creamy, and Unexpected",
    author: "By Jamie Anulewicz",
    time: "45 mins",
    imageUrl: "/images/lunch-strawberry-pasta.jpg",
  },
  {
    id: 714,
    slug: "fancy-department-store-shrimp-louie-salad",
    category: "SALADS",
    tag: "SALAD RECIPES",
    title: "The Fancy Department Store Salad That Reminds Me of My Mom",
    author: "By Ivy Manning",
    rating: 5,
    time: "25 mins",
    imageUrl: "/images/lunch-shrimp-louie-salad.jpg",
  },
  {
    id: 715,
    slug: "everything-bagel-salad",
    category: "BRUNCH",
    tag: "SALAD RECIPES",
    title: "Everything Bagel Salad Is My All-Time Favorite Brunch Recipe",
    author: "By Jill Silverman Hough",
    time: "35 mins",
    imageUrl: "/images/lunch-everything-bagel-salad.jpg",
  },
  {
    id: 716,
    slug: "fifteen-minute-spring-snap-pea-salad",
    category: "SPRING SALADS",
    tag: "SALAD RECIPES",
    title: "The 15-Minute Spring Salad I Wait All Year To Make",
    author: "By Robin Asbell",
    imageUrl: "/images/lunch-spring-snap-pea-salad.jpg",
  },
  {
    id: 717,
    slug: "twenty-minute-caesar-pasta-salad",
    category: "DINNERS",
    tag: "PASTA LUNCH RECIPES",
    title: "The 20-Minute Caesar Pasta Salad I've Made Too Many Times To Count",
    author: "By Morgan Baker",
    time: "20 mins",
    imageUrl: "/images/lunch-caesar-pasta-salad.jpg",
  },
  {
    id: 718,
    slug: "twenty-minute-skillet-chicken-tacos",
    category: "DINNERS",
    tag: "WRAPS & TACOS",
    title: "These 20-Minute Chicken Tacos Are Packed With Flavor",
    author: "By Kris Osborne",
    time: "20 mins",
    imageUrl: "/images/lunch-skillet-chicken-tacos.jpg",
  },
  {
    id: 719,
    slug: "ten-minute-crab-nachos-free-will-meal",
    category: "DINNERS",
    tag: "COMFORT FOOD RECIPES",
    title: "The 10-Minute “Free Will” Meal I Make When My Husband's Away",
    author: "By Micah Siva, RD",
    imageUrl: "/images/lunch-crab-cheese-nachos.jpg",
  },
  {
    id: 720,
    slug: "crispy-baked-cauliflower-nuggets",
    category: "DINNERS",
    tag: "VEGETARIAN LUNCH RECIPES",
    title: "The Crispy Cauliflower “Nuggets” Even Picky Eaters Love",
    author: "By Alexandra Shytsman",
    rating: 5,
    time: "1 hr 10 mins",
    imageUrl: "/images/lunch-crispy-cauliflower-nuggets.jpg",
  },
  {
    id: 721,
    slug: "four-ingredient-spicy-garlic-sesame-noodles",
    category: "DINNERS",
    tag: "QUICK LUNCH RECIPES",
    title: "These 4-Ingredient Noodles Are My Favorite Easy Dinner",
    author: "By Rebecca Fennel",
    time: "15 mins",
    imageUrl: "/images/lunch-spicy-garlic-sesame-noodles.jpg",
  },
  {
    id: 722,
    slug: "ten-minute-classic-egg-sandwich",
    category: "BREAKFAST",
    tag: "SANDWICH RECIPES",
    title: "The 10-Minute Egg Sandwich I've Made Weekly for 20 Years",
    author: "By Kris Osborne",
    rating: 5,
    time: "10 mins",
    imageUrl: "/images/lunch-ten-minute-egg-sandwich.jpg",
  },
  {
    id: 723,
    slug: "four-ingredient-dill-egg-salad",
    category: "EASY DINNERS",
    tag: "EASY LUNCH RECIPES",
    title: "The 4-Ingredient Egg Salad I Make All the Time",
    author: "By Robin Asbell",
    imageUrl: "/images/lunch-dill-egg-salad.jpg",
  },
  {
    id: 724,
    slug: "southern-cowboy-spaghetti",
    category: "DINNERS",
    tag: "COMFORT FOOD RECIPES",
    title: "Cowboy Spaghetti Will Make You Hoot and Holler",
    author: "By Sara Bir",
    time: "50 mins",
    imageUrl: "/images/lunch-cowboy-spaghetti.jpg",
  },
  {
    id: 725,
    slug: "three-ingredient-cheesy-pizza-white-beans",
    category: "EASY DINNERS",
    tag: "EASY LUNCH RECIPES",
    title: "The 3-Ingredient Pizza Beans That Converted My Kids Into Bean Lovers",
    author: "By Stephanie A Ganz",
    imageUrl: "/images/lunch-pizza-white-beans.jpg",
  },
  {
    id: 726,
    slug: "three-ingredient-cajun-sausage-pasta",
    category: "PASTAS",
    tag: "PASTA LUNCH RECIPES",
    title: "The 3-Ingredient Cajun Pasta That Reminds Me of Home",
    author: "By Jessica Furniss",
    time: "15 mins",
    imageUrl: "/images/lunch-cajun-sausage-pasta.jpg",
  },
  {
    id: 727,
    slug: "twenty-minute-sheet-pan-baked-chicken",
    category: "DINNERS",
    tag: "CHICKEN LUNCH RECIPES",
    title: "The 20-Minute Baked Chicken I Make on Repeat",
    author: "By Sara Haas, RDN, LDN",
    rating: 5,
    time: "20 mins",
    imageUrl: "/images/lunch-sheet-pan-baked-chicken.jpg",
  },
  {
    id: 728,
    slug: "three-minute-peanut-butter-pickle-sandwich",
    category: "EASY DINNERS",
    tag: "SANDWICH RECIPES",
    title: "This Easy 3-Minute Sandwich Might Sound Crazy, but I Love It",
    author: "By Nick Evans",
    imageUrl: "/images/lunch-peanut-butter-pickle-sandwich.jpg",
  },
  {
    id: 729,
    slug: "five-minute-egg-salad-toast",
    category: "EASY DINNERS",
    tag: "EASY LUNCH RECIPES",
    title: "This 5-Minute Egg Salad Is the Only One I Make",
    author: "By Kris Osborne",
    imageUrl: "/images/lunch-five-minute-egg-salad-toast.jpg",
  },
  {
    id: 730,
    slug: "southern-biscuits-and-bacon-gravy",
    category: "BRUNCH",
    tag: "COMFORT FOOD RECIPES",
    title: "The Secret to This 4-Ingredient Southern Breakfast Is Bacon Gravy",
    author: "By Meghan Splawn",
    time: "25 mins",
    imageUrl: "/images/lunch-southern-biscuit-bacon-gravy.jpg",
  },
  {
    id: 731,
    slug: "dinners-better-as-leftovers",
    category: "RECIPE COLLECTIONS",
    tag: "COMFORT FOOD RECIPES",
    title: "18 Easy Dinners That Are Even Better As Leftovers",
    author: "By Theodora Kaloudis",
    imageUrl: "/images/lunch-leftovers-dinner-collection.jpg",
  },
  {
    id: 732,
    slug: "five-minute-spicy-mayo-tuna-salad",
    category: "TUNA SALADS",
    tag: "SALAD RECIPES",
    title: "The 5-Minute Flavor-Packed Tuna Salad I Make Again and Again",
    author: "By Young Sun Huh",
    imageUrl: "/images/lunch-spicy-mayo-tuna-salad.jpg",
  },
  {
    id: 733,
    slug: "dump-and-go-slow-cooker-chicken-tortilla-soup",
    category: "SOUPS",
    tag: "SOUP RECIPES",
    title: "The Dump-and-Go Slow Cooker Soup That Saves Me on Busy Days",
    author: "By Morgan Baker",
    rating: 5,
    time: "4 hrs 10 mins",
    imageUrl: "/images/lunch-slow-cooker-chicken-tortilla-soup.jpg",
  },
  {
    id: 734,
    slug: "five-minute-avocado-radish-toast",
    category: "TOAST",
    tag: "SANDWICH RECIPES",
    title: "The Cheap, Nutritious Breakfast I Make All the Time (It Takes 5 Minutes)",
    author: "By Alexandra Shytsman",
    rating: 5,
    time: "5 mins",
    imageUrl: "/images/lunch-avocado-radish-toast.jpg",
  },
  {
    id: 735,
    slug: "classic-homemade-bloody-mary",
    category: "DRINKS",
    tag: "QUICK LUNCH RECIPES",
    title: "This Is the Easiest (and Most Delicious) Bloody Mary You'll Ever Make",
    author: "By Jamie Anulewicz",
    time: "5 mins",
    imageUrl: "/images/lunch-classic-bloody-mary.jpg",
  },
  {
    id: 736,
    slug: "five-minute-spicy-salmon-cucumber-rice-bowl",
    category: "QUICK DINNERS",
    tag: "RICE & GRAIN BOWLS",
    title: "The 5-Minute Meal I Make on Repeat",
    author: "By Jessica Furniss",
    rating: 5,
    time: "6 mins",
    imageUrl: "/images/lunch-spicy-salmon-cucumber-rice-bowl.jpg",
  },
  {
    id: 737,
    slug: "taco-stuffed-baked-potatoes",
    category: "POTATOES",
    tag: "COMFORT FOOD RECIPES",
    title: "Turn a Simple Baked Potato Into a Memorable Dinner",
    author: "By Devan Grimsrud",
    time: "1 hr 10 mins",
    imageUrl: "/images/lunch-taco-stuffed-baked-potato.jpg",
  },
  {
    id: 738,
    slug: "no-peeling-steamed-egg-salad",
    category: "EGGS",
    tag: "EASY LUNCH RECIPES",
    title: "My 4-Ingredient Egg Salad Has a Trick—There's No Peeling Required",
    author: "By Lou Perseghin",
    rating: 5,
    time: "45 mins",
    imageUrl: "/images/lunch-hard-boiled-egg-salad.jpg",
  },
  {
    id: 739,
    slug: "ten-minute-pickle-chicken-salad-sandwich",
    category: "CHICKEN SALADS",
    tag: "CHICKEN LUNCH RECIPES",
    title: "My 10-Minute Chicken Salad Has a Pickle-y Twist",
    author: "By Checka Ciammaichelli",
    imageUrl: "/images/lunch-pickled-chicken-salad-sandwich.jpg",
  },
];

export default function LunchRecipesPage() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [savedIds, setSavedIds] = useState<number[]>([]);

  const toggleSave = (id: number) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const allRecipes = [...featuredLunchRecipes, ...lunchGridRecipes];
  const displayedRecipes =
    activeFilter === "ALL"
      ? allRecipes
      : allRecipes.filter((r) => r.tag === activeFilter);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap');
        
        .lunch-page {
          background-color: #ffffff;
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
          color: #222222;
        }

        .lunch-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 32px 20px 80px;
        }

        /* ── Header Section ── */
        .lunch-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .lunch-kicker {
          font-size: 11px;
          letter-spacing: 2px;
          font-weight: 700;
          color: #666666;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .lunch-main-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(34px, 5vw, 48px);
          font-weight: 700;
          color: #111111;
          margin-bottom: 12px;
          line-height: 1.15;
        }

        .lunch-subtitle {
          font-size: 15px;
          color: #555555;
          max-width: 760px;
          margin: 0 auto 28px;
          line-height: 1.6;
        }

        /* ── Filter Tags ── */
        .lunch-filters-wrap {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px 16px;
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
        .lunch-featured-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 28px;
          margin-bottom: 40px;
        }

        @media (min-width: 640px) {
          .lunch-featured-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .lunch-main-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 28px;
        }

        @media (min-width: 540px) {
          .lunch-main-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 900px) {
          .lunch-main-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        /* ── Recipe Card ── */
        .lunch-card {
          display: flex;
          flex-direction: column;
          background: #ffffff;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .lunch-card:hover {
          transform: translateY(-3px);
        }

        .lunch-card-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          border-radius: 4px;
          overflow: hidden;
          background: #f3f3f3;
          margin-bottom: 12px;
        }

        .lunch-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.3s ease;
        }

        .lunch-card:hover .lunch-card-img {
          transform: scale(1.03);
        }

        .lunch-save-btn {
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

        .lunch-save-btn:hover {
          background: #ffffff;
          transform: scale(1.1);
        }

        .lunch-save-btn.saved {
          color: #e02424;
          background: #ffffff;
        }

        .lunch-card-content {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .lunch-card-cat {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1px;
          color: #777777;
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        .lunch-card-title {
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

        .lunch-card-title:hover {
          color: #0c5354;
        }

        .lunch-card-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #666666;
          margin-bottom: 6px;
        }

        .lunch-stars {
          color: #0c5354;
          letter-spacing: 1px;
          font-size: 13px;
        }

        .lunch-card-author {
          font-size: 12px;
          color: #777777;
          margin-top: auto;
        }

        /* ── Mid-page Accent Banner ── */
        .lunch-accent-banner {
          margin: 36px 0;
          background: #fdfbf7;
          border: 1px dashed #d5c8b5;
          border-radius: 6px;
          padding: 16px;
          text-align: center;
          font-size: 13px;
          color: #7a5e3a;
          font-weight: 600;
        }
      `}</style>

      <div className="lunch-page">
        <Header />

        <main className="lunch-container">
          {/* Header section matching screenshot */}
          <div className="lunch-header">
            <div className="lunch-kicker">RECIPES</div>
            <h1 className="lunch-main-title">Lunch Recipes</h1>
            <p className="lunch-subtitle">
              Don't forget about lunch! We know you need tasty, easy lunches to get you through your day—whether you're at work, school, or home. Browse pasta salads, quick soups, and sandwiches galore!
            </p>

            {/* Filter tags matching screenshot */}
            <nav className="lunch-filters-wrap" aria-label="Lunch Recipe Category Filters">
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

          {activeFilter === "ALL" ? (
            <>
              {/* Top 3 Featured Section */}
              <section className="lunch-featured-grid" aria-label="Featured Lunches">
                {featuredLunchRecipes.map((recipe) => {
                  const href = `/recipes/${recipe.slug}`;
                  const isSaved = savedIds.includes(recipe.id);
                  return (
                    <article key={recipe.id} className="lunch-card">
                      <div className="lunch-card-img-wrap">
                        <Link href={href}>
                          <img
                            src={recipe.imageUrl}
                            alt={recipe.title}
                            className="lunch-card-img"
                            loading="lazy"
                          />
                        </Link>
                        <button
                          className={`lunch-save-btn${isSaved ? " saved" : ""}`}
                          onClick={() => toggleSave(recipe.id)}
                          aria-label={isSaved ? "Unsave recipe" : "Save recipe"}
                        >
                          {isSaved ? "♥" : "♡"}
                        </button>
                      </div>
                      <div className="lunch-card-content">
                        <div className="lunch-card-cat">{recipe.category}</div>
                        <Link href={href} className="lunch-card-title">
                          {recipe.title}
                        </Link>
                        {(recipe.rating || recipe.time) && (
                          <div className="lunch-card-meta">
                            {recipe.rating && (
                              <span className="lunch-stars">
                                {"★".repeat(recipe.rating)}
                                {"☆".repeat(5 - recipe.rating)}
                              </span>
                            )}
                            {recipe.time && <span>⏱ {recipe.time}</span>}
                          </div>
                        )}
                        <div className="lunch-card-author">{recipe.author}</div>
                      </div>
                    </article>
                  );
                })}
              </section>

              {/* Middle Accent Banner */}
              <div className="lunch-accent-banner">
                ✨ Fresh, Quick & Hearty Midday Lunches Ready in Minutes
              </div>

              {/* Main 4-column Grid */}
              <section className="lunch-main-grid" aria-label="Lunch Recipes List">
                {lunchGridRecipes.map((recipe) => {
                  const href = `/recipes/${recipe.slug}`;
                  const isSaved = savedIds.includes(recipe.id);
                  return (
                    <article key={recipe.id} className="lunch-card">
                      <div className="lunch-card-img-wrap">
                        <Link href={href}>
                          <img
                            src={recipe.imageUrl}
                            alt={recipe.title}
                            className="lunch-card-img"
                            loading="lazy"
                          />
                        </Link>
                        <button
                          className={`lunch-save-btn${isSaved ? " saved" : ""}`}
                          onClick={() => toggleSave(recipe.id)}
                          aria-label={isSaved ? "Unsave recipe" : "Save recipe"}
                        >
                          {isSaved ? "♥" : "♡"}
                        </button>
                      </div>
                      <div className="lunch-card-content">
                        <div className="lunch-card-cat">{recipe.category}</div>
                        <Link href={href} className="lunch-card-title">
                          {recipe.title}
                        </Link>
                        {(recipe.rating || recipe.time) && (
                          <div className="lunch-card-meta">
                            {recipe.rating && (
                              <span className="lunch-stars">
                                {"★".repeat(recipe.rating)}
                                {"☆".repeat(5 - recipe.rating)}
                              </span>
                            )}
                            {recipe.time && <span>⏱ {recipe.time}</span>}
                          </div>
                        )}
                        <div className="lunch-card-author">{recipe.author}</div>
                      </div>
                    </article>
                  );
                })}
              </section>
            </>
          ) : (
            /* Filtered view */
            <section className="lunch-main-grid" aria-label="Filtered Lunch Recipes">
              {displayedRecipes.map((recipe) => {
                const href = `/recipes/${recipe.slug}`;
                const isSaved = savedIds.includes(recipe.id);
                return (
                  <article key={recipe.id} className="lunch-card">
                    <div className="lunch-card-img-wrap">
                      <Link href={href}>
                        <img
                          src={recipe.imageUrl}
                          alt={recipe.title}
                          className="lunch-card-img"
                          loading="lazy"
                        />
                      </Link>
                      <button
                        className={`lunch-save-btn${isSaved ? " saved" : ""}`}
                        onClick={() => toggleSave(recipe.id)}
                        aria-label={isSaved ? "Unsave recipe" : "Save recipe"}
                      >
                        {isSaved ? "♥" : "♡"}
                      </button>
                    </div>
                    <div className="lunch-card-content">
                      <div className="lunch-card-cat">{recipe.category}</div>
                      <Link href={href} className="lunch-card-title">
                        {recipe.title}
                      </Link>
                      {(recipe.rating || recipe.time) && (
                        <div className="lunch-card-meta">
                          {recipe.rating && (
                            <span className="lunch-stars">
                              {"★".repeat(recipe.rating)}
                              {"☆".repeat(5 - recipe.rating)}
                            </span>
                          )}
                          {recipe.time && <span>⏱ {recipe.time}</span>}
                        </div>
                      )}
                      <div className="lunch-card-author">{recipe.author}</div>
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
