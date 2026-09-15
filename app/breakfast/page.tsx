"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface BreakfastItem {
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
  "HEALTHY BREAKFAST RECIPES",
  "EASY BREAKFAST RECIPES",
  "QUICK BREAKFAST RECIPES",
  "GLUTEN-FREE BREAKFAST RECIPES",
  "VEGAN BREAKFAST RECIPES",
  "BRUNCH RECIPES",
];

const featuredBreakfastRecipes: BreakfastItem[] = [
  {
    id: 601,
    slug: "high-protein-make-ahead-breakfast",
    category: "HEALTHY BREAKFAST",
    tag: "HEALTHY BREAKFAST RECIPES",
    title: "The High-Protein Make-Ahead Breakfast I Make Every Week",
    author: "By Mark Beahm",
    time: "6 hrs 5 mins",
    imageUrl: "/images/breakfast-protein-overnight-oats.jpg",
  },
  {
    id: 602,
    slug: "pumpkin-spice-banana-bread",
    category: "QUICK BREAD",
    tag: "EASY BREAKFAST RECIPES",
    title: "The One-Bowl Pumpkin Spice Banana Bread I'm Making All Fall Long",
    author: "By Mark Beahm",
    rating: 5,
    time: "2 hrs 10 mins",
    imageUrl: "/images/breakfast-pumpkin-banana-bread.jpg",
  },
  {
    id: 603,
    slug: "pumpkin-chocolate-chip-muffins",
    category: "MUFFINS",
    tag: "QUICK BREAKFAST RECIPES",
    title: "The One-Bowl Pumpkin Chocolate Chip Muffins I Make All Fall Long",
    author: "By Molly Allen",
    rating: 5,
    time: "35 mins",
    imageUrl: "/images/breakfast-pumpkin-chocolate-muffins.jpg",
  },
];

const breakfastGridRecipes: BreakfastItem[] = [
  {
    id: 604,
    slug: "high-protein-pbj-muffins",
    category: "MUFFINS",
    tag: "HEALTHY BREAKFAST RECIPES",
    title: "The One-Bowl, High-Protein PB&J Muffins I Make Every Single Week",
    author: "By Micah Siva, RD",
    rating: 5,
    time: "1 hr 30 mins",
    imageUrl: "/images/breakfast-pbj-muffins.jpg",
  },
  {
    id: 605,
    slug: "dutch-hagelslag-breakfast-toast",
    category: "TOAST",
    tag: "QUICK BREAKFAST RECIPES",
    title: "The 3-Ingredient Dutch Breakfast My Kids Are Crazy About",
    author: "By Molly Adams",
    time: "5 mins",
    imageUrl: "/images/breakfast-dutch-hagelslag-toast.jpg",
  },
  {
    id: 606,
    slug: "flourless-blueberry-protein-muffins",
    category: "MUFFINS",
    tag: "GLUTEN-FREE BREAKFAST RECIPES",
    title: "These Flourless Blueberry Muffins Are Shockingly Light and Packed With Protein",
    author: "By Theodora Kaloudis",
    rating: 5,
    time: "35 mins",
    imageUrl: "/images/breakfast-flourless-blueberry-muffins.jpg",
  },
  {
    id: 607,
    slug: "easy-food-processor-zucchini-bread",
    category: "QUICK BREAD",
    tag: "EASY BREAKFAST RECIPES",
    title: "For the Easiest Zucchini Bread, Skip the Grater",
    author: "By Robin Asbell",
    time: "1 hr 15 mins",
    imageUrl: "/images/breakfast-easy-zucchini-bread.jpg",
  },
  {
    id: 608,
    slug: "cornmeal-pancakes-boxed-shortcut",
    category: "PANCAKES",
    tag: "QUICK BREAKFAST RECIPES",
    title: "These 4-Ingredient Cornmeal Pancakes Start With a Boxed Shortcut",
    author: "By Sara Bir",
    rating: 5,
    time: "20 mins",
    imageUrl: "/images/breakfast-cornmeal-pancakes.jpg",
  },
  {
    id: 609,
    slug: "breakfasts-from-around-the-world",
    category: "RECIPE COLLECTIONS",
    tag: "BRUNCH RECIPES",
    title: "18 Breakfasts From Around the World",
    author: "By Theodora Kaloudis",
    imageUrl: "/images/breakfast-world-breakfast-spread.jpg",
  },
  {
    id: 610,
    slug: "mother-in-law-one-bowl-banana-bread",
    category: "QUICK BREAD",
    tag: "EASY BREAKFAST RECIPES",
    title: "My Mother-in-Law's One-Bowl Recipe Changed My Mind About Banana Bread",
    author: "By Haley Scarpino",
    rating: 5,
    time: "2 hrs 55 mins",
    imageUrl: "/images/breakfast-mother-in-law-banana-bread.jpg",
  },
  {
    id: 611,
    slug: "dessert-inspired-overnight-oats",
    category: "EASY BREAKFAST",
    tag: "VEGAN BREAKFAST RECIPES",
    title: "These 5-Ingredient Overnight Oats Taste More Like Dessert Than Breakfast",
    author: "By Haley Scarpino",
    time: "8 hrs 10 mins",
    imageUrl: "/images/breakfast-dessert-overnight-oats.jpg",
  },
  {
    id: 612,
    slug: "high-fiber-breakfast-recipes-collection",
    category: "RECIPE COLLECTIONS",
    tag: "HEALTHY BREAKFAST RECIPES",
    title: "16 High-Fiber Breakfast Recipes To Start Your Day",
    author: "By Theodora Kaloudis",
    imageUrl: "/images/breakfast-high-fiber-casserole.jpg",
  },
  {
    id: 613,
    slug: "grab-and-go-back-to-school-breakfasts",
    category: "RECIPE COLLECTIONS",
    tag: "EASY BREAKFAST RECIPES",
    title: "7 Grab-and-Go Breakfasts for Back-to-School",
    author: "By Theodora Kaloudis",
    imageUrl: "/images/breakfast-grab-and-go-baked-oats.jpg",
  },
  {
    id: 614,
    slug: "make-ahead-protein-breakfast-burritos",
    category: "EASY BREAKFAST",
    tag: "QUICK BREAKFAST RECIPES",
    title: "The Make-Ahead High-Protein Breakfast Burritos That Save My Mornings",
    author: "By Morgan Baker",
    rating: 5,
    time: "25 mins",
    imageUrl: "/images/breakfast-burritos.jpg",
  },
  {
    id: 615,
    slug: "austrian-kaiserschmarrn-emperors-mess-pancakes",
    category: "PANCAKES",
    tag: "BRUNCH RECIPES",
    title: "These \"Emperor's Mess\" Pancakes Are a Royal Treat",
    author: "By Devan Grimsrud",
    time: "38 mins",
    imageUrl: "/images/breakfast-kaiserschmarrn-pancakes.jpg",
  },
  {
    id: 616,
    slug: "easy-strawberry-scones",
    category: "SCONES",
    tag: "BRUNCH RECIPES",
    title: "My Easy Strawberry Scones Taste Like Summer",
    author: "By Melissa Knific",
    time: "1 hr 45 mins",
    imageUrl: "/images/breakfast-strawberry-scones.jpg",
  },
  {
    id: 617,
    slug: "three-ingredient-shirred-eggs-mothers-day",
    category: "BRUNCH",
    tag: "BRUNCH RECIPES",
    title: "The 3-Ingredient, Secretly Easy Eggs I'm Making for Mother's Day",
    author: "By Haley Scarpino",
    time: "20 mins",
    imageUrl: "/images/breakfast-shirred-eggs.jpg",
  },
  {
    id: 618,
    slug: "crispy-fried-eggs-over-rice",
    category: "QUICK RECIPES",
    tag: "QUICK BREAKFAST RECIPES",
    title: "I Make My Mom's 5-Minute Eggs Again and Again",
    author: "By Malina Syvoravong",
    time: "5 mins",
    imageUrl: "/images/breakfast-crispy-fried-eggs-rice.jpg",
  },
  {
    id: 619,
    slug: "one-bowl-high-protein-morning-muffins",
    category: "EASY BREAKFAST",
    tag: "HEALTHY BREAKFAST RECIPES",
    title: "The One-Bowl, High-Protein Muffins I've Been Making for Years",
    author: "By Amanda Luchtel",
    rating: 5,
    time: "1 hr 15 mins",
    imageUrl: "/images/breakfast-high-protein-morning-muffins.jpg",
  },
  {
    id: 620,
    slug: "five-minute-cottage-cheese-scrambled-eggs",
    category: "COTTAGE CHEESE",
    tag: "QUICK BREAKFAST RECIPES",
    title: "The 5-Minute, High-Protein Breakfast I Make All the Time",
    author: "By Jamie Anulewicz",
    time: "5 mins",
    imageUrl: "/images/breakfast-cottage-cheese-scramble.jpg",
  },
  {
    id: 621,
    slug: "whipped-ricotta-blackberry-toast",
    category: "DESSERTS",
    tag: "QUICK BREAKFAST RECIPES",
    title: "My New Favorite Dessert Is Just 3 Ingredients and Takes 5 Minutes To Make",
    author: "By Kat Lieu",
    time: "5 mins",
    imageUrl: "/images/breakfast-ricotta-blackberry-toast.jpg",
  },
  {
    id: 622,
    slug: "caramel-apple-overnight-oats",
    category: "OATMEAL",
    tag: "VEGAN BREAKFAST RECIPES",
    title: "This 5-Ingredient Breakfast Tastes Just Like a Caramel Apple",
    author: "By Rebecca Fennel",
    rating: 5,
    time: "8 hrs 10 mins",
    imageUrl: "/images/breakfast-caramel-apple-oats.jpg",
  },
  {
    id: 623,
    slug: "five-minute-avocado-tomato-toast",
    category: "TOAST",
    tag: "HEALTHY BREAKFAST RECIPES",
    title: "The Cheap, Nutritious Breakfast I Make All the Time (It Takes 5 Minutes)",
    author: "By Alexandra Shytsman",
    rating: 5,
    time: "5 mins",
    imageUrl: "/images/breakfast-avocado-tomato-toast.jpg",
  },
  {
    id: 624,
    slug: "eggs-in-purgatory",
    category: "EGGS",
    tag: "BRUNCH RECIPES",
    title: "My Shortcut Eggs in Purgatory Is a Fast, Flavorful Skillet Meal with Italian Flair",
    author: "By Nick Evans",
    rating: 5,
    time: "25 mins",
    imageUrl: "/images/breakfast-eggs-in-purgatory.jpg",
  },
  {
    id: 625,
    slug: "french-bistro-breakfast-casserole",
    category: "BREAKFAST CASSEROLES",
    tag: "BRUNCH RECIPES",
    title: "This Easy Make-Ahead Breakfast Casserole Tastes Like a French Bistro",
    author: "By Cynthia Christensen",
    time: "3 hrs 5 mins",
    imageUrl: "/images/breakfast-french-bistro-casserole.jpg",
  },
  {
    id: 626,
    slug: "make-ahead-breakfasts-without-eggs",
    category: "RECIPE COLLECTIONS",
    tag: "VEGAN BREAKFAST RECIPES",
    title: "17 Make-Ahead Breakfasts That Aren't Eggs for Busy Mornings",
    author: "By Theodora Kaloudis",
    imageUrl: "/images/breakfast-make-ahead-baked-oatmeal.jpg",
  },
  {
    id: 627,
    slug: "cheesy-hashbrown-breakfast-casserole",
    category: "CASSEROLES",
    tag: "EASY BREAKFAST RECIPES",
    title: "This Easy Cheesy Breakfast Casserole Is a Total Crowd-Pleaser",
    author: "By Checka Ciammaichelli",
    time: "1 hr 5 mins",
    imageUrl: "/images/breakfast-cheesy-hashbrown-casserole.jpg",
  },
  {
    id: 628,
    slug: "easy-apple-oatmeal-cookies",
    category: "COOKIES",
    tag: "EASY BREAKFAST RECIPES",
    title: "The Easy Apple Cookies My Whole Family Loves",
    author: "By Lou Perseghin",
    rating: 5,
    time: "28 mins",
    imageUrl: "/images/breakfast-apple-oatmeal-cookies.jpg",
  },
  {
    id: 629,
    slug: "aunt-cindys-quick-blueberry-muffins",
    category: "MUFFINS",
    tag: "QUICK BREAKFAST RECIPES",
    title: "I've Been Eating My Aunt Cindy's Quick Blueberry Muffins for Decades",
    author: "By Kris Osborne",
    rating: 5,
    time: "30 mins",
    imageUrl: "/images/breakfast-aunt-cindy-blueberry-muffins.jpg",
  },
  {
    id: 630,
    slug: "make-ahead-banana-bread-casserole",
    category: "BREAKFAST CASSEROLES",
    tag: "BRUNCH RECIPES",
    title: "The Easy Banana Bread Casserole You Can Make Ahead",
    author: "By Megan Scott",
    time: "3 hrs",
    imageUrl: "/images/breakfast-banana-bread-casserole.jpg",
  },
  {
    id: 631,
    slug: "one-bowl-cinnamon-streusel-coffee-cake",
    category: "EASY CAKES",
    tag: "BRUNCH RECIPES",
    title: "The One-Bowl Coffee Cake I Can't Stop Making",
    author: "By Molly Allen",
    rating: 5,
    time: "1 hr",
    imageUrl: "/images/breakfast-one-bowl-coffee-cake.jpg",
  },
  {
    id: 632,
    slug: "persian-kuku-sabzi-herb-frittata",
    category: "EASY DINNERS",
    tag: "HEALTHY BREAKFAST RECIPES",
    title: "The One-Pot Persian Recipe I Make for Breakfast, Lunch, and Dinner",
    author: "By Omid Roustaei",
    rating: 5,
    time: "40 mins",
    imageUrl: "/images/breakfast-persian-kuku-sabzi.jpg",
  },
  {
    id: 633,
    slug: "three-ingredient-morning-berry-smoothie",
    category: "EASY SMOOTHIES",
    tag: "VEGAN BREAKFAST RECIPES",
    title: "The 3-Ingredient Smoothie I Make Almost Every Day",
    author: "By Laurel Randolph",
    time: "8 mins",
    imageUrl: "/images/breakfast-strawberry-banana-smoothie.jpg",
  },
  {
    id: 634,
    slug: "three-ingredient-banana-pancakes-for-kids",
    category: "PANCAKES",
    tag: "GLUTEN-FREE BREAKFAST RECIPES",
    title: "The 3-Ingredient Breakfast My Son Requests Every Morning",
    author: "By Shayma Saadat",
    time: "15 mins",
    imageUrl: "/images/breakfast-banana-egg-pancakes.jpg",
  },
  {
    id: 635,
    slug: "five-ingredient-summer-peach-parfait",
    category: "PEACH",
    tag: "HEALTHY BREAKFAST RECIPES",
    title: "The 5-Ingredient Breakfast I Love To Make in the Summer",
    author: "By Molly Allen",
    time: "10 mins",
    imageUrl: "/images/breakfast-summer-peach-parfait.jpg",
  },
  {
    id: 636,
    slug: "three-ingredient-bisquick-muffins",
    category: "BREAKFAST",
    tag: "QUICK BREAKFAST RECIPES",
    title: "These 3-Ingredient Muffins Are So Fluffy and Easy To Make",
    author: "By Stephanie Burt",
    time: "30 mins",
    imageUrl: "/images/breakfast-three-ingredient-bisquick-muffins.jpg",
  },
  {
    id: 637,
    slug: "three-ingredient-pancake-casserole",
    category: "BREAKFAST",
    tag: "EASY BREAKFAST RECIPES",
    title: "The 3-Ingredient Pancake Casserole That Makes Weekend Breakfasts Practically Effortless",
    author: "By Sara Bir",
    time: "45 mins",
    imageUrl: "/images/breakfast-pancake-casserole.jpg",
  },
  {
    id: 638,
    slug: "two-ingredient-banana-egg-pancakes",
    category: "PANCAKES",
    tag: "GLUTEN-FREE BREAKFAST RECIPES",
    title: "The 2-Ingredient Pancakes I Make Once a Week",
    author: "By Emma Christensen",
    rating: 5,
    time: "13 mins",
    imageUrl: "/images/breakfast-two-ingredient-banana-pancakes.jpg",
  },
  {
    id: 639,
    slug: "one-bowl-soda-bread-scones",
    category: "BREAKFAST",
    tag: "BRUNCH RECIPES",
    title: "These One-Bowl Soda Bread Scones Are the Best of Both Worlds",
    author: "By Sara Bir",
    time: "45 mins",
    imageUrl: "/images/breakfast-soda-bread-scones.jpg",
  },
  {
    id: 640,
    slug: "sheet-pan-sweet-potato-bacon-hash",
    category: "BREAKFAST HASH",
    tag: "GLUTEN-FREE BREAKFAST RECIPES",
    title: "Crispy Sheet Pan Sweet Potato & Bacon Breakfast Hash",
    author: "By Dishora Test Kitchen",
    rating: 5,
    time: "45 mins",
    imageUrl: "/images/breakfast-sweet-potato-hash.jpg",
  },
  {
    id: 641,
    slug: "brioche-french-toast-vanilla-butter",
    category: "FRENCH TOAST",
    tag: "BRUNCH RECIPES",
    title: "Brioche French Toast with Cinnamon Vanilla Butter",
    author: "By Dishora Test Kitchen",
    rating: 5,
    time: "25 mins",
    imageUrl: "/images/breakfast-brioche-french-toast.jpg",
  },
  {
    id: 642,
    slug: "austin-style-chorizo-breakfast-tacos",
    category: "BREAKFAST TACOS",
    tag: "QUICK BREAKFAST RECIPES",
    title: "Austin-Style Breakfast Tacos with Crispy Chorizo and Eggs",
    author: "By Dishora Test Kitchen",
    rating: 5,
    time: "25 mins",
    imageUrl: "/images/breakfast-austin-breakfast-tacos.jpg",
  },
  {
    id: 643,
    slug: "classic-shakshuka-with-feta",
    category: "SHAKSHUKA",
    tag: "HEALTHY BREAKFAST RECIPES",
    title: "North African Shakshuka with Feta and Crusty Sourdough",
    author: "By Dishora Test Kitchen",
    rating: 5,
    time: "30 mins",
    imageUrl: "/images/breakfast-shakshuka-feta.jpg",
  },
  {
    id: 644,
    slug: "crispy-belgian-waffles-maple-butter",
    category: "WAFFLES",
    tag: "BRUNCH RECIPES",
    title: "Crispy Malted Belgian Waffles with Maple Butter",
    author: "By Dishora Test Kitchen",
    rating: 5,
    time: "30 mins",
    imageUrl: "/images/breakfast-belgian-waffles.jpg",
  },
  {
    id: 645,
    slug: "lemon-ricotta-pancakes",
    category: "PANCAKES",
    tag: "BRUNCH RECIPES",
    title: "Fluffy Lemon Ricotta Pancakes with Blueberry Butter",
    author: "By Dishora Test Kitchen",
    rating: 5,
    time: "30 mins",
    imageUrl: "/images/breakfast-lemon-ricotta-pancakes.jpg",
  },
  {
    id: 646,
    slug: "classic-eggs-benedict",
    category: "BRUNCH",
    tag: "BRUNCH RECIPES",
    title: "Classic Eggs Benedict with 60-Second Blender Hollandaise",
    author: "By Dishora Test Kitchen",
    rating: 5,
    time: "25 mins",
    imageUrl: "/images/breakfast-classic-eggs-benedict.jpg",
  },
  {
    id: 647,
    slug: "chilaquiles-rojos",
    category: "QUICK BREAKFAST",
    tag: "QUICK BREAKFAST RECIPES",
    title: "Crispy Chilaquiles Rojos with Fried Eggs and Cotija",
    author: "By Dishora Test Kitchen",
    rating: 5,
    time: "25 mins",
    imageUrl: "/images/breakfast-chilaquiles-rojos.jpg",
  },
  {
    id: 648,
    slug: "avocado-egg-breakfast-melt",
    category: "TOAST",
    tag: "QUICK BREAKFAST RECIPES",
    title: "Crispy Avocado and Cheddar Egg Breakfast Melt",
    author: "By Dishora Test Kitchen",
    rating: 5,
    time: "13 mins",
    imageUrl: "/images/breakfast-avocado-egg-melt.jpg",
  },
  {
    id: 649,
    slug: "smoked-salmon-bagel-board",
    category: "BRUNCH",
    tag: "BRUNCH RECIPES",
    title: "Ultimate Smoked Salmon and Everything Bagel Platter",
    author: "By Dishora Test Kitchen",
    rating: 5,
    time: "20 mins",
    imageUrl: "/images/breakfast-smoked-salmon-bagel.jpg",
  },
  {
    id: 650,
    slug: "blueberry-baked-oatmeal-skillet",
    category: "HEALTHY BREAKFAST",
    tag: "HEALTHY BREAKFAST RECIPES",
    title: "Skillet Blueberry Baked Oatmeal with Maple Pecans",
    author: "By Dishora Test Kitchen",
    rating: 5,
    time: "40 mins",
    imageUrl: "/images/breakfast-blueberry-baked-oatmeal.jpg",
  },
  {
    id: 651,
    slug: "sweet-potato-crust-spinach-quiche",
    category: "GLUTEN-FREE BREAKFAST",
    tag: "GLUTEN-FREE BREAKFAST RECIPES",
    title: "Spinach and Goat Cheese Quiche with Sweet Potato Crust",
    author: "By Dishora Test Kitchen",
    rating: 5,
    time: "1 hr",
    imageUrl: "/images/breakfast-sweet-potato-quiche.jpg",
  },
  {
    id: 652,
    slug: "golden-milk-chia-seed-pudding",
    category: "VEGAN BREAKFAST",
    tag: "VEGAN BREAKFAST RECIPES",
    title: "Golden Turmeric Milk Chia Seed Pudding with Coconut",
    author: "By Dishora Test Kitchen",
    rating: 5,
    time: "4 hrs 5 mins",
    imageUrl: "/images/breakfast-golden-chia-pudding.jpg",
  },
  {
    id: 653,
    slug: "classic-croque-madame",
    category: "BRUNCH",
    tag: "BRUNCH RECIPES",
    title: "Classic French Croque Madame with Béchamel and Fried Egg",
    author: "By Dishora Test Kitchen",
    rating: 5,
    time: "30 mins",
    imageUrl: "/images/breakfast-croque-madame.jpg",
  },
  {
    id: 654,
    slug: "banana-walnut-baked-french-toast",
    category: "BRUNCH",
    tag: "BRUNCH RECIPES",
    title: "Overnight Banana Walnut Baked French Toast",
    author: "By Dishora Test Kitchen",
    rating: 5,
    time: "3 hrs",
    imageUrl: "/images/breakfast-banana-walnut-french-toast.jpg",
  },
  {
    id: 655,
    slug: "cheesy-bacon-broccoli-egg-muffins",
    category: "EASY BREAKFAST",
    tag: "EASY BREAKFAST RECIPES",
    title: "Low-Carb Cheesy Bacon & Broccoli Egg Muffins",
    author: "By Dishora Test Kitchen",
    rating: 5,
    time: "30 mins",
    imageUrl: "/images/breakfast-bacon-egg-muffins.jpg",
  },
  {
    id: 656,
    slug: "matcha-green-tea-smoothie-bowl",
    category: "HEALTHY BREAKFAST",
    tag: "HEALTHY BREAKFAST RECIPES",
    title: "Vibrant Matcha Green Tea Smoothie Bowl with Kiwi & Granola",
    author: "By Dishora Test Kitchen",
    rating: 5,
    time: "5 mins",
    imageUrl: "/images/breakfast-matcha-smoothie-bowl.jpg",
  },
];

export default function BreakfastRecipesPage() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [savedIds, setSavedIds] = useState<number[]>([]);

  const toggleSave = (id: number) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const allRecipes = [...featuredBreakfastRecipes, ...breakfastGridRecipes];
  const displayedRecipes =
    activeFilter === "ALL"
      ? allRecipes
      : allRecipes.filter((r) => r.tag === activeFilter);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap');
        
        .breakfast-page {
          background-color: #ffffff;
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
          color: #222222;
        }

        .breakfast-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 32px 20px 80px;
        }

        /* ── Header Section ── */
        .breakfast-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .breakfast-kicker {
          font-size: 11px;
          letter-spacing: 2px;
          font-weight: 700;
          color: #666666;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .breakfast-main-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(34px, 5vw, 48px);
          font-weight: 700;
          color: #111111;
          margin-bottom: 12px;
          line-height: 1.15;
        }

        .breakfast-subtitle {
          font-size: 15px;
          color: #555555;
          max-width: 720px;
          margin: 0 auto 28px;
          line-height: 1.6;
        }

        /* ── Filter Tags ── */
        .breakfast-filters-wrap {
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
        .breakfast-featured-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 28px;
          margin-bottom: 40px;
        }

        @media (min-width: 640px) {
          .breakfast-featured-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .breakfast-main-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 28px;
        }

        @media (min-width: 540px) {
          .breakfast-main-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 900px) {
          .breakfast-main-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        /* ── Recipe Card ── */
        .breakfast-card {
          display: flex;
          flex-direction: column;
          background: #ffffff;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .breakfast-card:hover {
          transform: translateY(-3px);
        }

        .breakfast-card-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          border-radius: 4px;
          overflow: hidden;
          background: #f3f3f3;
          margin-bottom: 12px;
        }

        .breakfast-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.3s ease;
        }

        .breakfast-card:hover .breakfast-card-img {
          transform: scale(1.03);
        }

        .breakfast-save-btn {
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

        .breakfast-save-btn:hover {
          background: #ffffff;
          transform: scale(1.1);
        }

        .breakfast-save-btn.saved {
          color: #e02424;
          background: #ffffff;
        }

        .breakfast-card-content {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .breakfast-card-cat {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1px;
          color: #777777;
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        .breakfast-card-title {
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

        .breakfast-card-title:hover {
          color: #0c5354;
        }

        .breakfast-card-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #666666;
          margin-bottom: 6px;
        }

        .breakfast-stars {
          color: #0c5354;
          letter-spacing: 1px;
          font-size: 13px;
        }

        .breakfast-card-author {
          font-size: 12px;
          color: #777777;
          margin-top: auto;
        }

        /* ── Ad Banner placeholder matching screenshot ── */
        .breakfast-ad-banner {
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

      <div className="breakfast-page">
        <Header />

        <main className="breakfast-container">
          {/* Header */}
          <div className="breakfast-header">
            <div className="breakfast-kicker">RECIPES &gt; RECIPE COLLECTIONS</div>
            <h1 className="breakfast-main-title">Breakfast Recipes</h1>
            <p className="breakfast-subtitle">
              Whether it&apos;s a grab-and-go or a hearty breakfast to eat while reading the news, get off to a great start with our breakfast recipes and ideas.
            </p>

            {/* Filter pills */}
            <nav className="breakfast-filters-wrap" aria-label="Breakfast Recipe Filters">
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
              <section className="breakfast-featured-grid" aria-label="Featured Breakfasts">
                {featuredBreakfastRecipes.map((recipe) => {
                  const href = `/recipes/${recipe.slug}`;
                  const isSaved = savedIds.includes(recipe.id);
                  return (
                    <article key={recipe.id} className="breakfast-card">
                      <div className="breakfast-card-img-wrap">
                        <Link href={href}>
                          <img
                            src={recipe.imageUrl}
                            alt={recipe.title}
                            className="breakfast-card-img"
                            loading="lazy"
                          />
                        </Link>
                        <button
                          className={`breakfast-save-btn${isSaved ? " saved" : ""}`}
                          onClick={() => toggleSave(recipe.id)}
                          aria-label={isSaved ? "Unsave recipe" : "Save recipe"}
                        >
                          {isSaved ? "♥" : "♡"}
                        </button>
                      </div>
                      <div className="breakfast-card-content">
                        <div className="breakfast-card-cat">{recipe.category}</div>
                        <Link href={href} className="breakfast-card-title">
                          {recipe.title}
                        </Link>
                        {recipe.time && (
                          <div className="breakfast-card-meta">
                            <span>⏱ {recipe.time}</span>
                          </div>
                        )}
                        <div className="breakfast-card-author">{recipe.author}</div>
                      </div>
                    </article>
                  );
                })}
              </section>

              {/* Middle Banner matching screenshot layout */}
              <div className="breakfast-ad-banner">
                ✨ Weekly Breakfast Inspiration & Make-Ahead Morning Favorites
              </div>

              {/* Main 4-column Grid */}
              <section className="breakfast-main-grid" aria-label="Breakfast Recipes List">
                {breakfastGridRecipes.map((recipe) => {
                  const href = `/recipes/${recipe.slug}`;
                  const isSaved = savedIds.includes(recipe.id);
                  return (
                    <article key={recipe.id} className="breakfast-card">
                      <div className="breakfast-card-img-wrap">
                        <Link href={href}>
                          <img
                            src={recipe.imageUrl}
                            alt={recipe.title}
                            className="breakfast-card-img"
                            loading="lazy"
                          />
                        </Link>
                        <button
                          className={`breakfast-save-btn${isSaved ? " saved" : ""}`}
                          onClick={() => toggleSave(recipe.id)}
                          aria-label={isSaved ? "Unsave recipe" : "Save recipe"}
                        >
                          {isSaved ? "♥" : "♡"}
                        </button>
                      </div>
                      <div className="breakfast-card-content">
                        <div className="breakfast-card-cat">{recipe.category}</div>
                        <Link href={href} className="breakfast-card-title">
                          {recipe.title}
                        </Link>
                        {(recipe.rating || recipe.time) && (
                          <div className="breakfast-card-meta">
                            {recipe.rating && (
                              <span className="breakfast-stars">
                                {"★".repeat(recipe.rating)}
                                {"☆".repeat(5 - recipe.rating)}
                              </span>
                            )}
                            {recipe.time && <span>⏱ {recipe.time}</span>}
                          </div>
                        )}
                        <div className="breakfast-card-author">{recipe.author}</div>
                      </div>
                    </article>
                  );
                })}
              </section>
            </>
          ) : (
            /* Filtered view */
            <section className="breakfast-main-grid" aria-label="Filtered Breakfasts">
              {displayedRecipes.map((recipe) => {
                const href = `/recipes/${recipe.slug}`;
                const isSaved = savedIds.includes(recipe.id);
                return (
                  <article key={recipe.id} className="breakfast-card">
                    <div className="breakfast-card-img-wrap">
                      <Link href={href}>
                        <img
                          src={recipe.imageUrl}
                          alt={recipe.title}
                          className="breakfast-card-img"
                          loading="lazy"
                        />
                      </Link>
                      <button
                        className={`breakfast-save-btn${isSaved ? " saved" : ""}`}
                        onClick={() => toggleSave(recipe.id)}
                        aria-label={isSaved ? "Unsave recipe" : "Save recipe"}
                      >
                        {isSaved ? "♥" : "♡"}
                      </button>
                    </div>
                    <div className="breakfast-card-content">
                      <div className="breakfast-card-cat">{recipe.category}</div>
                      <Link href={href} className="breakfast-card-title">
                        {recipe.title}
                      </Link>
                      {(recipe.rating || recipe.time) && (
                        <div className="breakfast-card-meta">
                          {recipe.rating && (
                            <span className="breakfast-stars">
                              {"★".repeat(recipe.rating)}
                              {"☆".repeat(5 - recipe.rating)}
                            </span>
                          )}
                          {recipe.time && <span>⏱ {recipe.time}</span>}
                        </div>
                      )}
                      <div className="breakfast-card-author">{recipe.author}</div>
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
