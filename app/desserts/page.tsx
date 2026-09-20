"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface DessertItem {
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
  "DESSERT RECIPES BY TYPE",
  "QUICK DESSERT RECIPES",
  "EASY DESSERT RECIPES",
  "DESSERT RECIPES BY DIETS",
  "DESSERT RECIPES BY INGREDIENTS",
  "DESSERT SAUCE RECIPES",
  "CHOCOLATE DESSERT RECIPES",
  "CAKE & CUPCAKE RECIPES",
  "COOKIE RECIPES",
  "PIE & TART RECIPES",
  "CHEESECAKE RECIPES",
  "ICE CREAM & FROZEN DESSERTS",
  "FRUIT DESSERT RECIPES",
  "NO-BAKE DESSERT RECIPES",
];

const featuredDessertRecipes: DessertItem[] = [
  {
    id: 801,
    slug: "grandmothers-three-ingredient-banana-cream",
    category: "DESSERTS",
    tag: "EASY DESSERT RECIPES",
    title: "Classic 3-Ingredient Banana Cream Dessert",
    author: "By Dishora Editorial Team",
    imageUrl: "/images/dessert-grandma-banana-cream.jpg",
  },
  {
    id: 802,
    slug: "chocolate-cookie-icebox-lush",
    category: "DESSERTS",
    tag: "NO-BAKE DESSERT RECIPES",
    title: "3-Ingredient Chocolate Cookie Icebox Lush",
    author: "By Dishora Editorial Team",
    imageUrl: "/images/dessert-chocolate-lasagna-lush.jpg",
  },
  {
    id: 803,
    slug: "toffee-chip-upgrade-chocolate-chip-cookies",
    category: "DESSERTS",
    tag: "COOKIE RECIPES",
    title: "Toffee-Chip Brown Butter Chocolate Chip Cookies",
    author: "By Dishora Editorial Team",
    imageUrl: "/images/dessert-toffee-chocolate-chip-cookies.jpg",
  },
];

const dessertGridRecipes: DessertItem[] = [
  {
    id: 858,
    slug: "salted-caramel-loaf-cake",
    category: "DESSERTS",
    tag: "CAKE & CUPCAKE RECIPES",
    title: "Salted Caramel Butter Loaf Cake",
    author: "By Dishora Editorial Team",
    time: "1 hr 10 mins",
    rating: 5,
    imageUrl: "/images/salted-caramel-loaf-cake.jpg",
  },
  {
    id: 857,
    slug: "berry-tiramisu-layer-cake",
    category: "DESSERTS",
    tag: "CAKE & CUPCAKE RECIPES",
    title: "Show-Stopping Berry Tiramisu Layer Cake",
    author: "By Dishora Editorial Team",
    time: "30 mins",
    rating: 5,
    imageUrl: "/images/berry-tiramisu-layer-cake.jpg",
  },
  {
    id: 856,
    slug: "oat-carrot-apple-cake",
    category: "DESSERTS",
    tag: "CAKE & CUPCAKE RECIPES",
    title: "Oat Carrot Apple Cake with Creamy Glaze",
    author: "By Dishora Editorial Team",
    time: "50 mins",
    rating: 5,
    imageUrl: "/images/oat-carrot-apple-cake.jpg",
  },
  {
    id: 804,
    slug: "retro-three-ingredient-butter-cookies",
    category: "DESSERTS",
    tag: "COOKIE RECIPES",
    title: "Retro 3-Ingredient Melt-in-Your-Mouth Butter Cookies",
    author: "By Dishora Editorial Team",
    imageUrl: "/images/dessert-three-ingredient-butter-cookies.jpg",
  },
  {
    id: 805,
    slug: "key-lime-icebox-cake-carlota",
    category: "DESSERTS",
    tag: "NO-BAKE DESSERT RECIPES",
    title: "Classic Key Lime Carlota Icebox Cake",
    author: "By Dishora Editorial Team",
    imageUrl: "/images/dessert-key-lime-icebox-cake.jpg",
  },
  {
    id: 806,
    slug: "grandmas-gravestone-spritz-cookies",
    category: "DESSERTS",
    tag: "COOKIE RECIPES",
    title: "Classic Heirloom Buttery Spritz Cookies",
    author: "By Dishora Editorial Team",
    imageUrl: "/images/dessert-spritz-cookies.jpg",
  },
  {
    id: 807,
    slug: "three-ingredient-smores-spoons",
    category: "DESSERTS",
    tag: "QUICK DESSERT RECIPES",
    title: "3-Ingredient Chocolate Dipped S'mores Spoons",
    author: "By Dishora Editorial Team",
    time: "16 mins",
    imageUrl: "/images/dessert-smores-chocolate-spoons.jpg",
  },
  {
    id: 808,
    slug: "four-ingredient-lemon-dump-cobbler",
    category: "DESSERTS",
    tag: "EASY DESSERT RECIPES",
    title: "4-Ingredient Warm Lemon Dump Cobbler",
    author: "By Dishora Editorial Team",
    rating: 5,
    time: "50 mins",
    imageUrl: "/images/dessert-lemon-dump-cobbler.jpg",
  },
  {
    id: 809,
    slug: "chocolate-chip-cookie-dump-cake",
    category: "DESSERTS",
    tag: "CAKE & CUPCAKE RECIPES",
    title: "Layered Chocolate Chip Cookie Dough Dump Cake",
    author: "By Dishora Editorial Team",
    rating: 5,
    time: "50 mins",
    imageUrl: "/images/dessert-cookie-dough-dump-cake.jpg",
  },
  {
    id: 810,
    slug: "five-ingredient-ritz-toffee-bars",
    category: "DESSERTS",
    tag: "NO-BAKE DESSERT RECIPES",
    title: "5-Ingredient Chocolate Caramel Ritz Toffee Bars",
    author: "By Dishora Editorial Team",
    time: "2 hrs",
    imageUrl: "/images/dessert-ritz-toffee-bars.jpg",
  },
  {
    id: 811,
    slug: "butterscotch-pudding-cake",
    category: "DESSERTS",
    tag: "CAKE & CUPCAKE RECIPES",
    title: "Warm Butterscotch Self-Saucing Pudding Cake",
    author: "By Dishora Editorial Team",
    rating: 5,
    time: "55 mins",
    imageUrl: "/images/dessert-butterscotch-pudding-cake.jpg",
  },
  {
    id: 812,
    slug: "retro-hot-milk-cake",
    category: "DESSERTS",
    tag: "CAKE & CUPCAKE RECIPES",
    title: "Traditional Vanilla Hot Milk Sponge Cake",
    author: "By Dishora Editorial Team",
    time: "50 mins",
    imageUrl: "/images/dessert-hot-milk-cake.jpg",
  },
  {
    id: 813,
    slug: "lazy-cat-chocolate-layer-cake",
    category: "DESSERTS",
    tag: "CHOCOLATE DESSERT RECIPES",
    title: "Decadent Lazy Cat Chocolate Layer Cake",
    author: "By Dishora Editorial Team",
    rating: 3,
    time: "3 hrs",
    imageUrl: "/images/dessert-lazy-cat-chocolate-cake.jpg",
  },
  {
    id: 814,
    slug: "danish-dream-cake-drommekage",
    category: "DESSERTS",
    tag: "CAKE & CUPCAKE RECIPES",
    title: "Traditional Danish Dream Cake (Drømmekage)",
    author: "By Dishora Editorial Team",
    time: "55 mins",
    imageUrl: "/images/dessert-danish-dream-cake.jpg",
  },
  {
    id: 815,
    slug: "best-one-bowl-vanilla-snack-cake",
    category: "DESSERTS",
    tag: "CAKE & CUPCAKE RECIPES",
    title: "Classic One-Bowl Vanilla Snack Cake",
    author: "By Dishora Editorial Team",
    rating: 5,
    time: "50 mins",
    imageUrl: "/images/dessert-best-vanilla-snack-cake.jpg",
  },
  {
    id: 816,
    slug: "double-peanut-butter-sheet-cake",
    category: "DESSERTS",
    tag: "CAKE & CUPCAKE RECIPES",
    title: "Rich Double Peanut Butter Sheet Cake",
    author: "By Dishora Editorial Team",
    time: "1 hr 56 mins",
    imageUrl: "/images/dessert-double-peanut-butter-cake.jpg",
  },
  {
    id: 817,
    slug: "neiman-marcus-gooey-butter-cake",
    category: "DESSERTS",
    tag: "CAKE & CUPCAKE RECIPES",
    title: "Classic Neiman Marcus Gooey Butter Cake",
    author: "By Dishora Editorial Team",
    rating: 5,
    time: "3 hrs",
    imageUrl: "/images/dessert-neiman-marcus-gooey-cake.jpg",
  },
  {
    id: 818,
    slug: "five-ingredient-peanut-butter-protein-balls",
    category: "DESSERTS",
    tag: "HEALTHY DESSERT RECIPES",
    title: "5-Ingredient High-Protein Peanut Butter Bites",
    author: "By Dishora Editorial Team",
    imageUrl: "/images/dessert-protein-peanut-butter-bites.jpg",
  },
  {
    id: 819,
    slug: "seventies-watergate-pistachio-cake",
    category: "DESSERTS",
    tag: "CAKE & CUPCAKE RECIPES",
    title: "Classic Retro 70s Watergate Pistachio Cake",
    author: "By Dishora Editorial Team",
    rating: 5,
    time: "2 hrs 20 mins",
    imageUrl: "/images/dessert-watergate-pistachio-cake.jpg",
  },
  {
    id: 820,
    slug: "one-ingredient-chocolate-water-mousse",
    category: "DESSERTS",
    tag: "CHOCOLATE DESSERT RECIPES",
    title: "1-Ingredient Decadent Chocolate Water Mousse",
    author: "By Dishora Editorial Team",
    imageUrl: "/images/dessert-chocolate-water-mousse.jpg",
  },
  {
    id: 821,
    slug: "divorce-carrot-cake-sheet-pan",
    category: "DESSERTS",
    tag: "CAKE & CUPCAKE RECIPES",
    title: "Rich Frosted Sheet Pan Carrot Cake",
    author: "By Dishora Editorial Team",
    time: "1 hr 50 mins",
    imageUrl: "/images/dessert-divorce-carrot-cake.jpg",
  },
  {
    id: 822,
    slug: "french-berry-clafoutis",
    category: "DESSERTS",
    tag: "FRUIT DESSERT RECIPES",
    title: "Classic French Mixed Berry Clafoutis",
    author: "By Dishora Editorial Team",
    time: "55 mins",
    imageUrl: "/images/dessert-french-berry-clafoutis.jpg",
  },
  {
    id: 823,
    slug: "three-ingredient-no-grate-carrot-cake",
    category: "DESSERTS",
    tag: "CAKE & CUPCAKE RECIPES",
    title: "3-Ingredient Easy Spiced Carrot Cake",
    author: "By Dishora Editorial Team",
    rating: 5,
    time: "1 hr 50 mins",
    imageUrl: "/images/dessert-three-ingredient-carrot-cake.jpg",
  },
  {
    id: 824,
    slug: "church-window-marshmallow-cookies",
    category: "DESSERTS",
    tag: "COOKIE RECIPES",
    title: "3-Ingredient Church Window Marshmallow Cookies",
    author: "By Dishora Editorial Team",
    time: "3 hrs 27 mins",
    imageUrl: "/images/dessert-church-window-marshmallow-cookies.jpg",
  },
  {
    id: 825,
    slug: "easy-carrot-coffee-cake",
    category: "DESSERTS",
    tag: "CAKE & CUPCAKE RECIPES",
    title: "Easy Bakery Carrot Streusel Coffee Cake",
    author: "By Dishora Editorial Team",
    time: "1 hr 35 mins",
    imageUrl: "/images/dessert-carrot-coffee-cake.jpg",
  },
  {
    id: 826,
    slug: "three-ingredient-lemon-posset-creams",
    category: "DESSERTS",
    tag: "EASY DESSERT RECIPES",
    title: "3-Ingredient Classic Lemon Posset Creams",
    author: "By Dishora Editorial Team",
    imageUrl: "/images/dessert-lemon-posset-creams.jpg",
  },
  {
    id: 827,
    slug: "five-ingredient-cannoli-dip",
    category: "DESSERTS",
    tag: "QUICK DESSERT RECIPES",
    title: "5-Ingredient Sweet Ricotta Cannoli Dip",
    author: "By Dishora Editorial Team",
    imageUrl: "/images/dessert-cannoli-cream-dip.jpg",
  },
  {
    id: 828,
    slug: "grandmas-easy-spice-sheet-cake",
    category: "DESSERTS",
    tag: "CAKE & CUPCAKE RECIPES",
    title: "Classic Old-Fashioned Spiced Sheet Cake",
    author: "By Dishora Editorial Team",
    rating: 5,
    time: "1 hr",
    imageUrl: "/images/dessert-grandma-spice-sheet-cake.jpg",
  },
  {
    id: 829,
    slug: "chocolate-malt-diner-brownies",
    category: "DESSERTS",
    tag: "CHOCOLATE DESSERT RECIPES",
    title: "Fudgy Chocolate Malt Diner-Style Brownies",
    author: "By Dishora Editorial Team",
    rating: 5,
    time: "1 hr",
    imageUrl: "/images/dessert-chocolate-malt-brownies.jpg",
  },
  {
    id: 830,
    slug: "three-ingredient-strawberry-cake-cookies",
    category: "DESSERTS",
    tag: "COOKIE RECIPES",
    title: "3-Ingredient Soft Strawberry Cake Mix Cookies",
    author: "By Dishora Editorial Team",
    imageUrl: "/images/dessert-strawberry-cake-cookies.jpg",
  },
  {
    id: 831,
    slug: "spanish-citrus-olive-oil-cake",
    category: "DESSERTS",
    tag: "CAKE & CUPCAKE RECIPES",
    title: "Easy Spanish Citrus Olive Oil Cake",
    author: "By Dishora Editorial Team",
    time: "1 hr 50 mins",
    imageUrl: "/images/dessert-spanish-orange-citrus-cake.jpg",
  },
  {
    id: 832,
    slug: "lucky-charms-marshmallow-treats",
    category: "DESSERTS",
    tag: "NO-BAKE DESSERT RECIPES",
    title: "3-Ingredient Marshmallow Cereal Bars",
    author: "By Dishora Editorial Team",
    time: "1 hr 10 mins",
    imageUrl: "/images/dessert-lucky-charms-marshmallow-bars.jpg",
  },
  {
    id: 833,
    slug: "irish-potato-candy",
    category: "DESSERTS",
    tag: "NO-BAKE DESSERT RECIPES",
    title: "Traditional Irish Potato Cinnamon Candy",
    author: "By Dishora Editorial Team",
    time: "1 hr 30 mins",
    imageUrl: "/images/dessert-irish-potato-cinnamon-candy.jpg",
  },
  {
    id: 834,
    slug: "ooey-gooey-cookie-casserole",
    category: "DESSERTS",
    tag: "COOKIE RECIPES",
    title: "Ooey Gooey Chocolate Chip Cookie Casserole",
    author: "By Dishora Editorial Team",
    rating: 3,
    time: "35 mins",
    imageUrl: "/images/dessert-skillet-cookie-casserole.jpg",
  },
  {
    id: 835,
    slug: "moms-kahlua-chocolate-bundt-cake",
    category: "DESSERTS",
    tag: "CAKE & CUPCAKE RECIPES",
    title: "Classic Kahlua Chocolate Bundt Cake",
    author: "By Dishora Editorial Team",
    rating: 5,
    time: "2 hrs 10 mins",
    imageUrl: "/images/dessert-kahlua-chocolate-bundt-cake.jpg",
  },
  {
    id: 836,
    slug: "giant-samoas-girl-scout-cookie-cake",
    category: "DESSERTS",
    tag: "COOKIE RECIPES",
    title: "Giant Samoas-Style Caramel Coconut Cookie Cake",
    author: "By Dishora Editorial Team",
    rating: 3,
    time: "2 hrs 15 mins",
    imageUrl: "/images/dessert-samoas-girl-scout-cookie-cake.jpg",
  },
  {
    id: 837,
    slug: "four-ingredient-chewy-brookie-bars",
    category: "DESSERTS",
    tag: "CHOCOLATE DESSERT RECIPES",
    title: "4-Ingredient Brookie Bars With Fudgy, Chewy Layers",
    author: "By Dishora Editorial Team",
    imageUrl: "/images/dessert-brookie-brownie-cookie-bars.jpg",
  },
  {
    id: 838,
    slug: "lunch-lady-peanut-butter-bars-scotcheroos",
    category: "DESSERTS",
    tag: "NO-BAKE DESSERT RECIPES",
    title: "Classic No-Bake Peanut Butter Scotcheroo Bars",
    author: "By Dishora Editorial Team",
    rating: 5,
    time: "1 hr 27 mins",
    imageUrl: "/images/dessert-lunch-lady-peanut-butter-bars.jpg",
  },
  {
    id: 839,
    slug: "chocolate-fudge-hamantaschen",
    category: "DESSERTS",
    tag: "COOKIE RECIPES",
    title: "Rich Chocolate Fudge Filled Hamantaschen",
    author: "By Dishora Editorial Team",
    time: "2 hrs 14 mins",
    imageUrl: "/images/dessert-chocolate-hamantaschen.jpg",
  },
  {
    id: 840,
    slug: "family-apricot-hamantaschen",
    category: "DESSERTS",
    tag: "COOKIE RECIPES",
    title: "Traditional Apricot Jam Hamantaschen",
    author: "By Dishora Editorial Team",
    time: "1 hr 35 mins",
    imageUrl: "/images/dessert-traditional-apricot-hamantaschen.jpg",
  },
  {
    id: 841,
    slug: "special-childhood-raspberry-hamantaschen",
    category: "DESSERTS",
    tag: "COOKIE RECIPES",
    title: "Classic Sweet Raspberry Jam Hamantaschen",
    author: "By Dishora Editorial Team",
    time: "1 hr 30 mins",
    imageUrl: "/images/dessert-raspberry-jam-hamantaschen.jpg",
  },
  {
    id: 842,
    slug: "sock-it-to-me-bundt-cake",
    category: "DESSERTS",
    tag: "CAKE & CUPCAKE RECIPES",
    title: "Classic Southern Sock-It-To-Me Bundt Cake",
    author: "By Dishora Editorial Team",
    rating: 5,
    time: "50 mins",
    imageUrl: "/images/dessert-sock-it-to-me-bundt-cake.jpg",
  },
  {
    id: 843,
    slug: "two-ingredient-copycat-thin-mints",
    category: "DESSERTS",
    tag: "COOKIE RECIPES",
    title: "2-Ingredient Crispy Copycat Thin Mints",
    author: "By Dishora Editorial Team",
    imageUrl: "/images/dessert-copycat-thin-mints.jpg",
  },
  {
    id: 844,
    slug: "joe-frogger-centuries-old-molasses-cookies",
    category: "DESSERTS",
    tag: "COOKIE RECIPES",
    title: "Traditional Joe Frogger Spiced Molasses Cookies",
    author: "By Dishora Editorial Team",
    rating: 3,
    time: "1 hr 38 mins",
    imageUrl: "/images/dessert-joe-frogger-molasses-cookies.jpg",
  },
  {
    id: 845,
    slug: "one-bowl-skillet-fudge-brownie",
    category: "DESSERTS",
    tag: "CHOCOLATE DESSERT RECIPES",
    title: "One-Bowl Fudgy Cast-Iron Skillet Brownie",
    author: "By Dishora Editorial Team",
    time: "55 mins",
    imageUrl: "/images/dessert-cast-iron-fudgy-skillet-brownie.jpg",
  },
  {
    id: 846,
    slug: "strawberry-muddy-buddies-valentines-treat",
    category: "DESSERTS",
    tag: "QUICK DESSERT RECIPES",
    title: "Easy Strawberry White Chocolate Muddy Buddies",
    author: "By Dishora Editorial Team",
    imageUrl: "/images/dessert-strawberry-muddy-buddies.jpg",
  },
  {
    id: 847,
    slug: "three-ingredient-posh-white-chocolate-berries",
    category: "DESSERTS",
    tag: "FRUIT DESSERT RECIPES",
    title: "3-Ingredient White Chocolate Warm Berry Dessert",
    author: "By Dishora Editorial Team",
    imageUrl: "/images/dessert-white-chocolate-frozen-berries.jpg",
  },
  {
    id: 848,
    slug: "chewy-frosted-sugar-cookie-bars",
    category: "DESSERTS",
    tag: "COOKIE RECIPES",
    title: "Soft and Chewy Frosted Sugar Cookie Bars",
    author: "By Dishora Editorial Team",
    rating: 5,
    time: "2 hrs 12 mins",
    imageUrl: "/images/dessert-sugar-cookie-bars.jpg",
  },
  {
    id: 849,
    slug: "one-bowl-lemon-snack-cake",
    category: "DESSERTS",
    tag: "CAKE & CUPCAKE RECIPES",
    title: "One-Bowl Glazed Lemon Snack Cake",
    author: "By Dishora Editorial Team",
    rating: 5,
    time: "1 hr 20 mins",
    imageUrl: "/images/dessert-one-bowl-lemon-snack-cake.jpg",
  },
  {
    id: 850,
    slug: "five-ingredient-cherry-dump-cobbler-scratch",
    category: "DESSERTS",
    tag: "FRUIT DESSERT RECIPES",
    title: "5-Ingredient Scratch Cherry Dump Cobbler",
    author: "By Dishora Editorial Team",
    time: "50 mins",
    imageUrl: "/images/dessert-cherry-dump-cobbler.jpg",
  },
  {
    id: 851,
    slug: "kentucky-butter-bundt-cake",
    category: "DESSERTS",
    tag: "CAKE & CUPCAKE RECIPES",
    title: "Traditional Southern Kentucky Butter Bundt Cake",
    author: "By Dishora Editorial Team",
    rating: 5,
    time: "1 hr 55 mins",
    imageUrl: "/images/dessert-kentucky-butter-bundt-cake.jpg",
  },
  {
    id: 852,
    slug: "two-ingredient-magic-chocolate-mousse",
    category: "DESSERTS",
    tag: "CHOCOLATE DESSERT RECIPES",
    title: "2-Ingredient Quick Whipped Chocolate Mousse",
    author: "By Dishora Editorial Team",
    imageUrl: "/images/dessert-magic-chocolate-mousse-cream.jpg",
  },
  {
    id: 853,
    slug: "five-minute-ricotta-blackberry-dessert-toast",
    category: "DESSERTS",
    tag: "QUICK DESSERT RECIPES",
    title: "5-Minute Ricotta Blackberry Honey Toast",
    author: "By Dishora Editorial Team",
    imageUrl: "/images/dessert-ricotta-blackberry-toast-dessert.jpg",
  },
  {
    id: 854,
    slug: "millionaire-shortbread-caramel-bars",
    category: "DESSERTS",
    tag: "NO-BAKE DESSERT RECIPES",
    title: "Thick Caramel Layer Millionaire Shortbread Bars",
    author: "By Dishora Editorial Team",
    imageUrl: "/images/dessert-millionaire-shortbread-caramel-bars.jpg",
  },
  {
    id: 855,
    slug: "two-ingredient-retro-peanut-butter-fudge",
    category: "DESSERTS",
    tag: "NO-BAKE DESSERT RECIPES",
    title: "2-Ingredient Retro Microwave Peanut Butter Fudge",
    author: "By Dishora Editorial Team",
    imageUrl: "/images/dessert-two-ingredient-peanut-butter-fudge.jpg",
  },
];

export default function DessertRecipesPage() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [savedIds, setSavedIds] = useState<number[]>([]);

  const toggleSave = (id: number) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const allRecipes = [...featuredDessertRecipes, ...dessertGridRecipes];
  const displayedRecipes =
    activeFilter === "ALL"
      ? allRecipes
      : allRecipes.filter((r) => r.tag === activeFilter);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap');
        
        .dessert-page {
          background-color: #ffffff;
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
          color: #222222;
        }

        .dessert-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 32px 20px 80px;
        }

        /* ── Header Section ── */
        .dessert-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .dessert-main-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(34px, 5vw, 48px);
          font-weight: 700;
          color: #111111;
          margin-bottom: 12px;
          line-height: 1.15;
        }

        .dessert-subtitle {
          font-size: 15px;
          color: #555555;
          max-width: 780px;
          margin: 0 auto 28px;
          line-height: 1.6;
        }

        /* ── Filter Tags ── */
        .dessert-filters-wrap {
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
        .dessert-featured-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 28px;
          margin-bottom: 40px;
        }

        @media (min-width: 640px) {
          .dessert-featured-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .dessert-main-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 28px;
        }

        @media (min-width: 540px) {
          .dessert-main-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 900px) {
          .dessert-main-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        /* ── Recipe Card ── */
        .dessert-card {
          display: flex;
          flex-direction: column;
          background: #ffffff;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .dessert-card:hover {
          transform: translateY(-3px);
        }

        .dessert-card-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          border-radius: 4px;
          overflow: hidden;
          background: #f3f3f3;
          margin-bottom: 12px;
        }

        .dessert-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.3s ease;
        }

        .dessert-card:hover .dessert-card-img {
          transform: scale(1.03);
        }

        .dessert-save-btn {
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

        .dessert-save-btn:hover {
          background: #ffffff;
          transform: scale(1.1);
        }

        .dessert-save-btn.saved {
          color: #e02424;
          background: #ffffff;
        }

        .dessert-card-content {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .dessert-card-cat {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1px;
          color: #777777;
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        .dessert-card-title {
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

        .dessert-card-title:hover {
          color: #0c5354;
        }

        .dessert-card-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #666666;
          margin-bottom: 6px;
        }

        .dessert-stars {
          color: #0c5354;
          letter-spacing: 1px;
          font-size: 13px;
        }

        .dessert-card-author {
          font-size: 12px;
          color: #777777;
          margin-top: auto;
        }

        /* ── Accent banner matching layout ── */
        .dessert-accent-banner {
          margin: 36px 0;
          background: #fcf9f5;
          border: 1px dashed #d9ccb8;
          border-radius: 6px;
          padding: 16px;
          text-align: center;
          font-size: 13px;
          color: #8c5b23;
          font-weight: 600;
        }
      `}</style>

      <div className="dessert-page">
        <Header />

        <main className="dessert-container">
          {/* Header */}
          <div className="dessert-header">
            <h1 className="dessert-main-title">Dessert Recipes</h1>
            <p className="dessert-subtitle">
              Whether you&apos;re looking for a snack cake, lunchbox cookie, or showstopper for your dinner party, we&apos;ve got scores of dessert recipes to choose from.
            </p>

            {/* Filter pills */}
            <nav className="dessert-filters-wrap" aria-label="Dessert Recipe Filters">
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

          {/* If filtering, show all matches in uniform grid; if ALL, show top 3 featured + main grid */}
          {activeFilter === "ALL" ? (
            <>
              {/* Featured Top 3 (Screenshot 1 Top Row) */}
              <section className="dessert-featured-grid" aria-label="Featured Desserts">
                {featuredDessertRecipes.map((recipe) => {
                  const href = `/recipes/${recipe.slug}`;
                  const isSaved = savedIds.includes(recipe.id);
                  return (
                    <article key={recipe.id} className="dessert-card">
                      <div className="dessert-card-img-wrap">
                        <Link href={href}>
                          <img
                            src={recipe.imageUrl}
                            alt={recipe.title}
                            className="dessert-card-img"
                            loading="lazy"
                          />
                        </Link>
                        <button
                          className={`dessert-save-btn${isSaved ? " saved" : ""}`}
                          onClick={() => toggleSave(recipe.id)}
                          aria-label={isSaved ? "Unsave recipe" : "Save recipe"}
                        >
                          {isSaved ? "♥" : "♡"}
                        </button>
                      </div>
                      <div className="dessert-card-content">
                        <div className="dessert-card-cat">{recipe.category}</div>
                        <Link href={href} className="dessert-card-title">
                          {recipe.title}
                        </Link>
                        {recipe.time && (
                          <div className="dessert-card-meta">
                            <span>⏱ {recipe.time}</span>
                          </div>
                        )}
                        <div className="dessert-card-author">{recipe.author}</div>
                      </div>
                    </article>
                  );
                })}
              </section>

              {/* Accent Banner matching screenshot layout */}
              <div className="dessert-accent-banner">
                ✨ Sweet Treats, Quick Cookies, and Showstopping Cakes for Any Occasion
              </div>

              {/* Main 4-column Grid */}
              <section className="dessert-main-grid" aria-label="Dessert Recipes List">
                {dessertGridRecipes.map((recipe) => {
                  const href = `/recipes/${recipe.slug}`;
                  const isSaved = savedIds.includes(recipe.id);
                  return (
                    <article key={recipe.id} className="dessert-card">
                      <div className="dessert-card-img-wrap">
                        <Link href={href}>
                          <img
                            src={recipe.imageUrl}
                            alt={recipe.title}
                            className="dessert-card-img"
                            loading="lazy"
                          />
                        </Link>
                        <button
                          className={`dessert-save-btn${isSaved ? " saved" : ""}`}
                          onClick={() => toggleSave(recipe.id)}
                          aria-label={isSaved ? "Unsave recipe" : "Save recipe"}
                        >
                          {isSaved ? "♥" : "♡"}
                        </button>
                      </div>
                      <div className="dessert-card-content">
                        <div className="dessert-card-cat">{recipe.category}</div>
                        <Link href={href} className="dessert-card-title">
                          {recipe.title}
                        </Link>
                        {(recipe.rating || recipe.time) && (
                          <div className="dessert-card-meta">
                            {recipe.rating && (
                              <span className="dessert-stars">
                                {"★".repeat(recipe.rating)}
                                {"☆".repeat(5 - recipe.rating)}
                              </span>
                            )}
                            {recipe.time && <span>⏱ {recipe.time}</span>}
                          </div>
                        )}
                        <div className="dessert-card-author">{recipe.author}</div>
                      </div>
                    </article>
                  );
                })}
              </section>
            </>
          ) : (
            /* Filtered view */
            <section className="dessert-main-grid" aria-label="Filtered Dessert Recipes">
              {displayedRecipes.map((recipe) => {
                const href = `/recipes/${recipe.slug}`;
                const isSaved = savedIds.includes(recipe.id);
                return (
                  <article key={recipe.id} className="dessert-card">
                    <div className="dessert-card-img-wrap">
                      <Link href={href}>
                        <img
                          src={recipe.imageUrl}
                          alt={recipe.title}
                          className="dessert-card-img"
                          loading="lazy"
                        />
                      </Link>
                      <button
                        className={`dessert-save-btn${isSaved ? " saved" : ""}`}
                        onClick={() => toggleSave(recipe.id)}
                        aria-label={isSaved ? "Unsave recipe" : "Save recipe"}
                      >
                        {isSaved ? "♥" : "♡"}
                      </button>
                    </div>
                    <div className="dessert-card-content">
                      <div className="dessert-card-cat">{recipe.category}</div>
                      <Link href={href} className="dessert-card-title">
                        {recipe.title}
                      </Link>
                      {(recipe.rating || recipe.time) && (
                        <div className="dessert-card-meta">
                          {recipe.rating && (
                            <span className="dessert-stars">
                              {"★".repeat(recipe.rating)}
                              {"☆".repeat(5 - recipe.rating)}
                            </span>
                          )}
                          {recipe.time && <span>⏱ {recipe.time}</span>}
                        </div>
                      )}
                      <div className="dessert-card-author">{recipe.author}</div>
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
