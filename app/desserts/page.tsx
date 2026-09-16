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
    title: "My Grandmother's 3-Ingredient Dessert Is Genius",
    author: "By Alexandra Emanuelli",
    imageUrl: "/images/dessert-grandma-banana-cream.jpg",
  },
  {
    id: 802,
    slug: "chocolate-cookie-icebox-lush",
    category: "DESSERTS",
    tag: "NO-BAKE DESSERT RECIPES",
    title: "My Favorite Dessert Takes Only 3 Ingredients (It's Genius)",
    author: "By Jessica Furniss",
    imageUrl: "/images/dessert-chocolate-lasagna-lush.jpg",
  },
  {
    id: 803,
    slug: "toffee-chip-upgrade-chocolate-chip-cookies",
    category: "DESSERTS",
    tag: "COOKIE RECIPES",
    title: "My 1-Ingredient Upgrade for Better Chocolate Chip Cookies",
    author: "By Jeanette Hurt",
    imageUrl: "/images/dessert-toffee-chocolate-chip-cookies.jpg",
  },
];

const dessertGridRecipes: DessertItem[] = [
  {
    id: 856,
    slug: "oat-carrot-apple-cake",
    category: "DESSERTS",
    tag: "CAKE & CUPCAKE RECIPES",
    title: "Oat Carrot Apple Cake with Creamy Glaze",
    author: "By Dishora Test Kitchen",
    time: "50 mins",
    rating: 5,
    imageUrl: "/images/oat-carrot-apple-cake.jpg",
  },
  {
    id: 804,
    slug: "retro-three-ingredient-butter-cookies",
    category: "DESSERTS",
    tag: "COOKIE RECIPES",
    title: "The Retro 3-Ingredient Cookie Recipe Redditors Are Calling \"So Good\" and \"Perfect\"",
    author: "By Meghan Splawn",
    imageUrl: "/images/dessert-three-ingredient-butter-cookies.jpg",
  },
  {
    id: 805,
    slug: "key-lime-icebox-cake-carlota",
    category: "DESSERTS",
    tag: "NO-BAKE DESSERT RECIPES",
    title: "Our Most Popular No-Cook Dessert Of All Time",
    author: "By Devan Grimsrud",
    imageUrl: "/images/dessert-key-lime-icebox-cake.jpg",
  },
  {
    id: 806,
    slug: "grandmas-gravestone-spritz-cookies",
    category: "DESSERTS",
    tag: "COOKIE RECIPES",
    title: "This Grandma's Recipe Is So Good, Her Family Etched It on Her Gravestone",
    author: "By Lauren Bair",
    imageUrl: "/images/dessert-spritz-cookies.jpg",
  },
  {
    id: 807,
    slug: "three-ingredient-smores-spoons",
    category: "DESSERTS",
    tag: "QUICK DESSERT RECIPES",
    title: "These 3-Ingredient S'mores Spoons Are the Easiest Summer Treat",
    author: "By Rebecca Fennel",
    time: "16 mins",
    imageUrl: "/images/dessert-smores-chocolate-spoons.jpg",
  },
  {
    id: 808,
    slug: "four-ingredient-lemon-dump-cobbler",
    category: "DESSERTS",
    tag: "EASY DESSERT RECIPES",
    title: "This 4-Ingredient Lemon Dump Cobbler Is a No-Brainer",
    author: "By Sara Bir",
    rating: 5,
    time: "50 mins",
    imageUrl: "/images/dessert-lemon-dump-cobbler.jpg",
  },
  {
    id: 809,
    slug: "chocolate-chip-cookie-dump-cake",
    category: "DESSERTS",
    tag: "CAKE & CUPCAKE RECIPES",
    title: "This Chocolate Chip Cookie Dump Cake Is Straight Out of the 90s",
    author: "By Morgan Baker",
    rating: 5,
    time: "50 mins",
    imageUrl: "/images/dessert-cookie-dough-dump-cake.jpg",
  },
  {
    id: 810,
    slug: "five-ingredient-ritz-toffee-bars",
    category: "DESSERTS",
    tag: "NO-BAKE DESSERT RECIPES",
    title: "The 5-Ingredient Ritz Toffee Bars I Can't Stop Making",
    author: "By Sara Bir",
    time: "2 hrs",
    imageUrl: "/images/dessert-ritz-toffee-bars.jpg",
  },
  {
    id: 811,
    slug: "butterscotch-pudding-cake",
    category: "DESSERTS",
    tag: "CAKE & CUPCAKE RECIPES",
    title: "This 9x9 Butterscotch Pudding Cake Is Pure Comfort",
    author: "By Sara Bir",
    rating: 5,
    time: "55 mins",
    imageUrl: "/images/dessert-butterscotch-pudding-cake.jpg",
  },
  {
    id: 812,
    slug: "retro-hot-milk-cake",
    category: "DESSERTS",
    tag: "CAKE & CUPCAKE RECIPES",
    title: "Hot Milk Cake Is the Easy Retro Dessert You Need To Try",
    author: "By Shayma Saadat",
    time: "50 mins",
    imageUrl: "/images/dessert-hot-milk-cake.jpg",
  },
  {
    id: 813,
    slug: "lazy-cat-chocolate-layer-cake",
    category: "DESSERTS",
    tag: "CHOCOLATE DESSERT RECIPES",
    title: "Lazy Cat Cake Is the Chocolate Dessert You Need to Make",
    author: "By Sara Bir",
    rating: 3,
    time: "3 hrs",
    imageUrl: "/images/dessert-lazy-cat-chocolate-cake.jpg",
  },
  {
    id: 814,
    slug: "danish-dream-cake-drommekage",
    category: "DESSERTS",
    tag: "CAKE & CUPCAKE RECIPES",
    title: "Danish \"Dream Cake\" Is Buttery, Tender, and Truly Dreamy",
    author: "By Mark Beahm",
    time: "55 mins",
    imageUrl: "/images/dessert-danish-dream-cake.jpg",
  },
  {
    id: 815,
    slug: "best-one-bowl-vanilla-snack-cake",
    category: "DESSERTS",
    tag: "CAKE & CUPCAKE RECIPES",
    title: "The Best Vanilla Cake Is Also the Easiest",
    author: "By Afton Cyrus",
    rating: 5,
    time: "50 mins",
    imageUrl: "/images/dessert-best-vanilla-snack-cake.jpg",
  },
  {
    id: 816,
    slug: "double-peanut-butter-sheet-cake",
    category: "DESSERTS",
    tag: "CAKE & CUPCAKE RECIPES",
    title: "This Easy Double Peanut Butter Sheet Cake Is My Favorite Dessert",
    author: "By Molly Allen",
    time: "1 hr 56 mins",
    imageUrl: "/images/dessert-double-peanut-butter-cake.jpg",
  },
  {
    id: 817,
    slug: "neiman-marcus-gooey-butter-cake",
    category: "DESSERTS",
    tag: "CAKE & CUPCAKE RECIPES",
    title: "This Easy Neiman Marcus Cake Is Worth Its Weight in Gold",
    author: "By Sara Bir",
    rating: 5,
    time: "3 hrs",
    imageUrl: "/images/dessert-neiman-marcus-gooey-cake.jpg",
  },
  {
    id: 818,
    slug: "five-ingredient-peanut-butter-protein-balls",
    category: "DESSERTS",
    tag: "HEALTHY DESSERT RECIPES",
    title: "The 5-Ingredient, High-Protein Snack I Keep in My Fridge At All Times",
    author: "By Rebecca Fennel",
    imageUrl: "/images/dessert-protein-peanut-butter-bites.jpg",
  },
  {
    id: 819,
    slug: "seventies-watergate-pistachio-cake",
    category: "DESSERTS",
    tag: "CAKE & CUPCAKE RECIPES",
    title: "The 70's-Era Cake I'm Bringing to Every Party From Now On",
    author: "By Sara Bir",
    rating: 5,
    time: "2 hrs 20 mins",
    imageUrl: "/images/dessert-watergate-pistachio-cake.jpg",
  },
  {
    id: 820,
    slug: "one-ingredient-chocolate-water-mousse",
    category: "DESSERTS",
    tag: "CHOCOLATE DESSERT RECIPES",
    title: "The 1-Ingredient Chocolate Mousse My Whole Family Can Enjoy in a Moment's Notice",
    author: "By Jennifer Zyman",
    imageUrl: "/images/dessert-chocolate-water-mousse.jpg",
  },
  {
    id: 821,
    slug: "divorce-carrot-cake-sheet-pan",
    category: "DESSERTS",
    tag: "CAKE & CUPCAKE RECIPES",
    title: "Divorce Carrot Cake Lets Me Have My Cake and Eat It, Too",
    author: "By Sara Bir",
    time: "1 hr 50 mins",
    imageUrl: "/images/dessert-divorce-carrot-cake.jpg",
  },
  {
    id: 822,
    slug: "french-berry-clafoutis",
    category: "DESSERTS",
    tag: "FRUIT DESSERT RECIPES",
    title: "The Simple French Dessert That's (Way) Easier Than Pie",
    author: "By Morgan Baker",
    time: "55 mins",
    imageUrl: "/images/dessert-french-berry-clafoutis.jpg",
  },
  {
    id: 823,
    slug: "three-ingredient-no-grate-carrot-cake",
    category: "DESSERTS",
    tag: "CAKE & CUPCAKE RECIPES",
    title: "The 3-Ingredient Carrot Cake I Make with Zero Peeling or Grating",
    author: "By Jessica Furniss",
    rating: 5,
    time: "1 hr 50 mins",
    imageUrl: "/images/dessert-three-ingredient-carrot-cake.jpg",
  },
  {
    id: 824,
    slug: "church-window-marshmallow-cookies",
    category: "DESSERTS",
    tag: "COOKIE RECIPES",
    title: "The 3-Ingredient No-Bake Cookies I Make Every Easter",
    author: "By Jessica Furniss",
    time: "3 hrs 27 mins",
    imageUrl: "/images/dessert-church-window-marshmallow-cookies.jpg",
  },
  {
    id: 825,
    slug: "easy-carrot-coffee-cake",
    category: "DESSERTS",
    tag: "CAKE & CUPCAKE RECIPES",
    title: "The Easy Carrot Coffee Cake I Make All Spring Long",
    author: "By Annika Panikker",
    time: "1 hr 35 mins",
    imageUrl: "/images/dessert-carrot-coffee-cake.jpg",
  },
  {
    id: 826,
    slug: "three-ingredient-lemon-posset-creams",
    category: "DESSERTS",
    tag: "EASY DESSERT RECIPES",
    title: "The 3-Ingredient Lemon Dessert I Make Every Spring",
    author: "By Jessica Furniss",
    imageUrl: "/images/dessert-lemon-posset-creams.jpg",
  },
  {
    id: 827,
    slug: "five-ingredient-cannoli-dip",
    category: "DESSERTS",
    tag: "QUICK DESSERT RECIPES",
    title: "My Sister's 5-Ingredient Cannoli Dip Is Perfect for Spring Get-Togethers",
    author: "By Jeanette Hurt",
    imageUrl: "/images/dessert-cannoli-cream-dip.jpg",
  },
  {
    id: 828,
    slug: "grandmas-easy-spice-sheet-cake",
    category: "DESSERTS",
    tag: "CAKE & CUPCAKE RECIPES",
    title: "I Crave My Grandma's Easy Spice Cake (And Now You Will, Too)",
    author: "By Joey Firoben",
    rating: 5,
    time: "1 hr",
    imageUrl: "/images/dessert-grandma-spice-sheet-cake.jpg",
  },
  {
    id: 829,
    slug: "chocolate-malt-diner-brownies",
    category: "DESSERTS",
    tag: "CHOCOLATE DESSERT RECIPES",
    title: "My Fudgy Brownies Taste Like a Chocolate Malt from an Old-School Diner",
    author: "By Melissa Knific",
    rating: 5,
    time: "1 hr",
    imageUrl: "/images/dessert-chocolate-malt-brownies.jpg",
  },
  {
    id: 830,
    slug: "three-ingredient-strawberry-cake-cookies",
    category: "DESSERTS",
    tag: "COOKIE RECIPES",
    title: "The 3-Ingredient Strawberry Cookies I've Loved Since Childhood",
    author: "By Amanda Luchtel",
    imageUrl: "/images/dessert-strawberry-cake-cookies.jpg",
  },
  {
    id: 831,
    slug: "spanish-citrus-olive-oil-cake",
    category: "DESSERTS",
    tag: "CAKE & CUPCAKE RECIPES",
    title: "This Easy Spanish Citrus Cake Tastes Like Sunshine",
    author: "By Mark Beahm",
    time: "1 hr 50 mins",
    imageUrl: "/images/dessert-spanish-orange-citrus-cake.jpg",
  },
  {
    id: 832,
    slug: "lucky-charms-marshmallow-treats",
    category: "DESSERTS",
    tag: "NO-BAKE DESSERT RECIPES",
    title: "The 3-Ingredient Lucky Charms Treats I've Been Making for 10 Years",
    author: "By Meghan Splawn",
    time: "1 hr 10 mins",
    imageUrl: "/images/dessert-lucky-charms-marshmallow-bars.jpg",
  },
  {
    id: 833,
    slug: "irish-potato-candy",
    category: "DESSERTS",
    tag: "NO-BAKE DESSERT RECIPES",
    title: "It's Not St. Patrick's Day Without Irish Potato Candy",
    author: "By Sara Bir",
    time: "1 hr 30 mins",
    imageUrl: "/images/dessert-irish-potato-cinnamon-candy.jpg",
  },
  {
    id: 834,
    slug: "ooey-gooey-cookie-casserole",
    category: "DESSERTS",
    tag: "COOKIE RECIPES",
    title: "This Ooey, Gooey Cookie Casserole Is So Good I Want to Marry It",
    author: "By Laurel Randolph",
    rating: 3,
    time: "35 mins",
    imageUrl: "/images/dessert-skillet-cookie-casserole.jpg",
  },
  {
    id: 835,
    slug: "moms-kahlua-chocolate-bundt-cake",
    category: "DESSERTS",
    tag: "CAKE & CUPCAKE RECIPES",
    title: "My Mom's Kahlua Cake Is the Easy Dessert Everyone Loves",
    author: "By Morgan Baker",
    rating: 5,
    time: "2 hrs 10 mins",
    imageUrl: "/images/dessert-kahlua-chocolate-bundt-cake.jpg",
  },
  {
    id: 836,
    slug: "giant-samoas-girl-scout-cookie-cake",
    category: "DESSERTS",
    tag: "COOKIE RECIPES",
    title: "Make the Best Girl Scout Cookie in the Lineup (But as a Big Cookie Cake)",
    author: "By Molly Allen",
    rating: 3,
    time: "2 hrs 15 mins",
    imageUrl: "/images/dessert-samoas-girl-scout-cookie-cake.jpg",
  },
  {
    id: 837,
    slug: "four-ingredient-chewy-brookie-bars",
    category: "DESSERTS",
    tag: "CHOCOLATE DESSERT RECIPES",
    title: "4-Ingredient Brookie Bars With Fudgy, Chewy Layers in Every Bite",
    author: "By Kayla Hoang",
    imageUrl: "/images/dessert-brookie-brownie-cookie-bars.jpg",
  },
  {
    id: 838,
    slug: "lunch-lady-peanut-butter-bars-scotcheroos",
    category: "DESSERTS",
    tag: "NO-BAKE DESSERT RECIPES",
    title: "These No-Bake Lunch Lady Bars Are a Retro Treat",
    author: "By Sara Bir",
    rating: 5,
    time: "1 hr 27 mins",
    imageUrl: "/images/dessert-lunch-lady-peanut-butter-bars.jpg",
  },
  {
    id: 839,
    slug: "chocolate-fudge-hamantaschen",
    category: "DESSERTS",
    tag: "COOKIE RECIPES",
    title: "The Chocolate Hamantaschen I've Made Thousands of Times",
    author: "By Anne Wolf",
    time: "2 hrs 14 mins",
    imageUrl: "/images/dessert-chocolate-hamantaschen.jpg",
  },
  {
    id: 840,
    slug: "family-apricot-hamantaschen",
    category: "DESSERTS",
    tag: "COOKIE RECIPES",
    title: "The Hamantaschen I Make Every Single Year (It's My Family Recipe)",
    author: "By Coco Morante",
    time: "1 hr 35 mins",
    imageUrl: "/images/dessert-traditional-apricot-hamantaschen.jpg",
  },
  {
    id: 841,
    slug: "special-childhood-raspberry-hamantaschen",
    category: "DESSERTS",
    tag: "COOKIE RECIPES",
    title: "The Special Hamantaschen I've Been Making Since Childhood",
    author: "By Micah Siva, RD",
    time: "1 hr 30 mins",
    imageUrl: "/images/dessert-raspberry-jam-hamantaschen.jpg",
  },
  {
    id: 842,
    slug: "sock-it-to-me-bundt-cake",
    category: "DESSERTS",
    tag: "CAKE & CUPCAKE RECIPES",
    title: "The Retro Cake My Family Has at Every Gathering",
    author: "By Erika Kwee",
    rating: 5,
    time: "50 mins",
    imageUrl: "/images/dessert-sock-it-to-me-bundt-cake.jpg",
  },
  {
    id: 843,
    slug: "two-ingredient-copycat-thin-mints",
    category: "DESSERTS",
    tag: "COOKIE RECIPES",
    title: "The 2-Ingredient Copycat Thin Mints I Make After Girl Scout Season Ends",
    author: "By Afton Cyrus",
    imageUrl: "/images/dessert-copycat-thin-mints.jpg",
  },
  {
    id: 844,
    slug: "joe-frogger-centuries-old-molasses-cookies",
    category: "DESSERTS",
    tag: "COOKIE RECIPES",
    title: "Joe Froggers Are the Centuries-Old Cookies I Can't Stop Eating",
    author: "By Sara Bir",
    rating: 3,
    time: "1 hr 38 mins",
    imageUrl: "/images/dessert-joe-frogger-molasses-cookies.jpg",
  },
  {
    id: 845,
    slug: "one-bowl-skillet-fudge-brownie",
    category: "DESSERTS",
    tag: "CHOCOLATE DESSERT RECIPES",
    title: "The Gooey, Fudgy, One-Bowl Skillet Brownie I'm Making on Repeat",
    author: "By Kayla Hoang",
    time: "55 mins",
    imageUrl: "/images/dessert-cast-iron-fudgy-skillet-brownie.jpg",
  },
  {
    id: 846,
    slug: "strawberry-muddy-buddies-valentines-treat",
    category: "DESSERTS",
    tag: "QUICK DESSERT RECIPES",
    title: "The Easy Valentine's Day Treat I Make With My Kids Every Year",
    author: "By Molly Adams",
    imageUrl: "/images/dessert-strawberry-muddy-buddies.jpg",
  },
  {
    id: 847,
    slug: "three-ingredient-posh-white-chocolate-berries",
    category: "DESSERTS",
    tag: "FRUIT DESSERT RECIPES",
    title: "My 3-Ingredient “Posh Dessert” Only Takes Five Minutes To Make",
    author: "By Shayma Saadat",
    imageUrl: "/images/dessert-white-chocolate-frozen-berries.jpg",
  },
  {
    id: 848,
    slug: "chewy-frosted-sugar-cookie-bars",
    category: "DESSERTS",
    tag: "COOKIE RECIPES",
    title: "The Easy Sugar Cookie Bars No One Can Resist",
    author: "By Mark Beahm",
    rating: 5,
    time: "2 hrs 12 mins",
    imageUrl: "/images/dessert-sugar-cookie-bars.jpg",
  },
  {
    id: 849,
    slug: "one-bowl-lemon-snack-cake",
    category: "DESSERTS",
    tag: "CAKE & CUPCAKE RECIPES",
    title: "The One-Bowl Lemon Snack Cake That Brightens Up My Winter",
    author: "By Molly Adams",
    rating: 5,
    time: "1 hr 20 mins",
    imageUrl: "/images/dessert-one-bowl-lemon-snack-cake.jpg",
  },
  {
    id: 850,
    slug: "five-ingredient-cherry-dump-cobbler-scratch",
    category: "DESSERTS",
    tag: "FRUIT DESSERT RECIPES",
    title: "This 5-Ingredient Cherry Dump Cobbler Is Made Without a Cake Mix",
    author: "By Molly Allen",
    time: "50 mins",
    imageUrl: "/images/dessert-cherry-dump-cobbler.jpg",
  },
  {
    id: 851,
    slug: "kentucky-butter-bundt-cake",
    category: "DESSERTS",
    tag: "CAKE & CUPCAKE RECIPES",
    title: "This Kentucky Butter Cake Is My New Favorite Bundt (and I'm a Bundt Fanatic)",
    author: "By Stephanie Burt",
    rating: 5,
    time: "1 hr 55 mins",
    imageUrl: "/images/dessert-kentucky-butter-bundt-cake.jpg",
  },
  {
    id: 852,
    slug: "two-ingredient-magic-chocolate-mousse",
    category: "DESSERTS",
    tag: "CHOCOLATE DESSERT RECIPES",
    title: "The 2-Ingredient “Magic” Chocolate Mousse",
    author: "By Dishora Test Kitchen",
    imageUrl: "/images/dessert-magic-chocolate-mousse-cream.jpg",
  },
  {
    id: 853,
    slug: "five-minute-ricotta-blackberry-dessert-toast",
    category: "DESSERTS",
    tag: "QUICK DESSERT RECIPES",
    title: "My New Favorite Dessert Is Just 3 Ingredients and Takes 5 Minutes To Make",
    author: "By Dishora Test Kitchen",
    imageUrl: "/images/dessert-ricotta-blackberry-toast-dessert.jpg",
  },
  {
    id: 854,
    slug: "millionaire-shortbread-caramel-bars",
    category: "DESSERTS",
    tag: "NO-BAKE DESSERT RECIPES",
    title: "These Millionaire Bars Have the Thickest Caramel Layer",
    author: "By Dishora Test Kitchen",
    imageUrl: "/images/dessert-millionaire-shortbread-caramel-bars.jpg",
  },
  {
    id: 855,
    slug: "two-ingredient-retro-peanut-butter-fudge",
    category: "DESSERTS",
    tag: "NO-BAKE DESSERT RECIPES",
    title: "The 2-Ingredient Retro Fudge That Tastes Like Childhood",
    author: "By Dishora Test Kitchen",
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
