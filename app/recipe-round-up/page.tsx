"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { summerCookoutRelatedArticles, RelatedArticle, recipesData, Recipe } from "../data/recipes";

interface RoundupItem {
  number: string;
  slug: string;
  title: string;
  photoCredit: string;
  quote: string;
  authorQuote: string;
  imageUrl: string;
  time: string;
  category: string;
}

const roundupRecipes: RoundupItem[] = [
  {
    number: "01",
    slug: "hawaiian-macaroni-salad",
    title: "Hawaiian Macaroni Salad",
    photoCredit: "Dishora",
    quote:
      "What makes this summery side dish distinctive from mainland pasta salads? The macaroni is cooked until tender so it thoroughly absorbs cider vinegar for bright acidity, followed by a rich dressing of mayonnaise and milk, with grated carrots and sweet onion.",
    authorQuote: "Dishora Editorial Team",
    imageUrl: "/images/hawaiian-mac-salad.jpg",
    time: "20 mins",
    category: "Salads & Sides",
  },
  {
    number: "02",
    slug: "coronation-coleslaw",
    title: "Coronation Coleslaw",
    photoCredit: "Dishora",
    quote:
      "With colorful and crunchy coleslaw mix, juicy mango, crisp cashews, and chewy raisins, this side delivers an explosion of textures. A simple dressing of mayo, yogurt, lemon juice, and mild curry powder completes the dish.",
    authorQuote: "Dishora Editorial Team",
    imageUrl: "/images/coronation-coleslaw.jpg",
    time: "15 mins",
    category: "Coleslaw & Salads",
  },
  {
    number: "03",
    slug: "grilled-greek-meatballs",
    title: "Grilled Skewered Meatballs",
    photoCredit: "Dishora",
    quote:
      "Flat metal skewers simplify the grilling process, preventing meatballs from rolling as they cook. Seasoned with garlic, oregano, and lemon, they make a flavorful weeknight meal.",
    authorQuote: "Dishora Editorial Team",
    imageUrl: "/images/grilled-meatballs.jpg",
    time: "25 mins",
    category: "Mains & Skewers",
  },
  {
    number: "04",
    slug: "potato-chip-salad",
    title: "Potato Chip Salad",
    photoCredit: "Dishora",
    quote:
      "A crisp, satisfying summer side that pairs naturally with grilled fare like barbecue chicken, burgers, and roasted vegetables for family gatherings.",
    authorQuote: "Dishora Editorial Team",
    imageUrl: "/images/potato-chip-salad.jpg",
    time: "10 mins",
    category: "Sides & Salads",
  },
  {
    number: "05",
    slug: "mediterranean-grilled-vegetables",
    title: "Mediterranean Grilled Vegetables",
    photoCredit: "Dishora",
    quote:
      "Give your grill at least 15 minutes to heat up before adding vegetables. A hot grate ensures clean sear marks and preserves texture.",
    authorQuote: "Dishora Editorial Team",
    imageUrl: "/images/grilled-vegetables.jpg",
    time: "22 mins",
    category: "Sides & Grilling",
  },
  {
    number: "06",
    slug: "grilled-halibut-calabrian-chile-gremolata",
    title: "Grilled Halibut with Calabrian Chile Gremolata",
    photoCredit: "Dishora",
    quote:
      "Grilled halibut cooks in just 10 minutes over direct heat. Paired with a zesty Calabrian chile, parsley, and garlic gremolata, it offers bright Mediterranean flavor.",
    authorQuote: "Dishora Editorial Team",
    imageUrl: "/images/grilled-halibut.jpg",
    time: "20 mins",
    category: "Seafood & Grilling",
  },
  {
    number: "07",
    slug: "dill-pickle-potato-salad",
    title: "Dill Pickle Potato Salad",
    photoCredit: "Dishora",
    quote:
      "Crushed potato chips add pleasant crunch to this dill-forward potato salad, making it a crowd-pleasing make-ahead side dish.",
    authorQuote: "Dishora Editorial Team",
    imageUrl: "/images/dill-pickle-potato-salad.jpg",
    time: "25 mins",
    category: "Sides & Salads",
  },
  {
    number: "08",
    slug: "summer-stone-fruit-tomato-cucumber-salad",
    title: "Stone Fruit, Tomato and Cucumber Salad",
    photoCredit: "Dishora",
    quote:
      "Dicing ripe stone fruits, cucumbers, and chiles into uniform small cubes ensures every bite balances sweet, crisp, and savory notes.",
    authorQuote: "Dishora Editorial Team",
    imageUrl: "/images/stone-fruit-salad.jpg",
    time: "15 mins",
    category: "Salads & Fruit",
  },
  {
    number: "09",
    slug: "grilled-chicken-satay-with-peanut-sauce",
    title: "Grilled Chicken Satay With Peanut Sauce",
    photoCredit: "Dishora",
    quote:
      "Marinated chicken skewers grilled over hot coals provide a balance of savory spice, bright lime, and rich peanut dipping sauce.",
    authorQuote: "Dishora Editorial Team",
    imageUrl: "/images/chicken-satay.jpg",
    time: "25 mins",
    category: "Mains & Skewers",
  },
  {
    number: "10",
    slug: "moms-greek-pasta-salad",
    title: "Classic Mediterranean Greek Pasta Salad",
    photoCredit: "Dishora",
    quote:
      "Not only is this pasta salad super simple to throw together, but it is a balanced combination of flavors: salty from the feta, bright from the lemon juice, fresh from the dill and scallions, and juicy from the grape tomatoes.",
    authorQuote: "Dishora Editorial Team",
    imageUrl: "/images/greek-pasta-salad.jpg",
    time: "20 mins",
    category: "Pasta Salads & Sides",
  },
  {
    number: "11",
    slug: "grilled-mexican-street-corn-elotes",
    title: "Grilled Mexican Street Corn (Elotes)",
    photoCredit: "Dishora",
    quote:
      "Mexican street corn (Elotes) brings vibrant street-food flavors straight to your grill. Sweet charred corn on the cob is slathered in a savory crema sauce, then dusted with cotija cheese and fresh cilantro.",
    authorQuote: "Dishora Editorial Team",
    imageUrl: "/images/cowboy-corn.jpg",
    time: "15 mins",
    category: "Sides & BBQ",
  },
  {
    number: "12",
    slug: "grilled-balsamic-flank-steak",
    title: "Grilled Balsamic-Marinated Flank Steak",
    photoCredit: "Dishora",
    quote:
      "A balsamic-Dijon marinade tenderizes lean flank steak while creating a savory, caramelized crust under direct high heat.",
    authorQuote: "Dishora Editorial Team",
    imageUrl: "/images/flank-steak.jpg",
    time: "20 mins",
    category: "Mains & Beef",
  },
  {
    number: "13",
    slug: "sicilian-potato-salad",
    title: "Sicilian Potato Salad",
    photoCredit: "Dishora",
    quote:
      "Potatoes, crisp green beans, and ripe tomatoes tossed with buttery Sicilian green olives and an oregano vinaigrette create a bright summer side.",
    authorQuote: "Dishora Editorial Team",
    imageUrl: "/images/sicilian-potato-salad.jpg",
    time: "25 mins",
    category: "Sides & Salads",
  },
  {
    number: "14",
    slug: "easy-grilled-peppers",
    title: "Easy Grilled Peppers",
    photoCredit: "Dishora",
    quote:
      "Sweet bell peppers charred on the grill develop natural sweetness that complements burgers, chicken, and vegetarian platters.",
    authorQuote: "Dishora Editorial Team",
    imageUrl: "/images/grilled-peppers.jpg",
    time: "15 mins",
    category: "Sides & Grilling",
  },
  {
    number: "15",
    slug: "how-to-grill-the-best-burgers",
    title: "Grilled Burgers",
    photoCredit: "Dishora",
    quote:
      "A simple seasoning of kosher salt and freshly cracked black pepper allows good-quality ground beef to develop a rich, savory crust on the grill.",
    authorQuote: "Dishora Editorial Team",
    imageUrl: "/images/grilled-burger.jpg",
    time: "18 mins",
    category: "Burgers & Mains",
  },
  {
    number: "16",
    slug: "dads-easy-greek-salad",
    title: "Easy Greek Salad",
    photoCredit: "Dishora",
    quote:
      "Ripe summer tomatoes, cucumbers, red onion, kalamata olives, and block feta tossed with olive oil and oregano make an effortless fresh salad.",
    authorQuote: "Dishora Editorial Team",
    imageUrl: "/images/greek-salad.jpg",
    time: "10 mins",
    category: "Salads & Sides",
  },
  {
    number: "17",
    slug: "foil-packet-grilled-asparagus",
    title: "Foil Packet Grilled Asparagus",
    photoCredit: "Dishora",
    quote:
      "Grilling asparagus in a foil packet with butter, lemon, and sea salt creates tender stalks with light smokiness and zero cleanup.",
    authorQuote: "Dishora Editorial Team",
    imageUrl: "/images/asparagus-foil.jpg",
    time: "15 mins",
    category: "Sides & Grilling",
  },
  {
    number: "18",
    slug: "hot-dogs-with-spicy-kimchi-slaw",
    title: "Hot Dogs with Spicy Kimchi Slaw",
    photoCredit: "Dishora",
    quote:
      "Topped with spicy kimchi slaw and creamy sauce, these grilled beef hot dogs offer bold, zesty flavor in under 20 minutes.",
    authorQuote: "Dishora Editorial Team",
    imageUrl: "/images/kimchi-hot-dogs.jpg",
    time: "18 mins",
    category: "Mains & Grilling",
  },
  {
    number: "19",
    slug: "easy-grilled-broccolini",
    title: "Easy Grilled Broccolini",
    photoCredit: "Dishora",
    quote:
      "Tossed in olive oil and coarse salt, whole broccolini chars quickly on the grill without requiring tedious prep work.",
    authorQuote: "Dishora Editorial Team",
    imageUrl: "/images/grilled-broccolini.jpg",
    time: "10 mins",
    category: "Sides & Grilling",
  },
];

export default function RecipeRoundupPage() {
  const [savedItems, setSavedItems] = useState<string[]>([]);
  const [activeModalRecipe, setActiveModalRecipe] = useState<Recipe | null>(null);

  const toggleSave = (num: string) => {
    setSavedItems((prev) =>
      prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num]
    );
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col justify-between selection:bg-[#0c5354]/20 selection:text-[#0c5354]">
      <Header />

      <main className="max-w-[760px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Collection Header */}
        <header className="mb-6">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-gray-900 leading-[1.18] tracking-tight mb-3">
            19 Recipes for Summer Cookouts You Can Make In 30 Minutes or Less
          </h1>

          <p className="text-xl font-serif text-gray-700 italic mb-5">
            Delicious doesn&apos;t have to be complicated.
          </p>

          {/* Author Box */}
          <div className="p-4 bg-[#f8faf9] border border-gray-200 rounded-xs mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-gray-500 uppercase">By</span>
              <span className="font-bold text-sm text-[#0c5354]">
                Dishora Editorial Team
              </span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed font-sans mb-2">
              Curated by the Dishora Editorial Team, focusing on fresh, seasonal ingredients and straightforward techniques for easy summer entertaining.
            </p>
            <div className="text-[11.5px] text-gray-500 pt-2 border-t border-gray-200 flex flex-wrap items-center gap-3">
              <span className="underline cursor-pointer hover:text-[#0c5354]">Editorial Process</span>
              <span>•</span>
              <span>Published on May 18, 2026</span>
            </div>
          </div>
        </header>

        {/* Hero Photo Banner with Credit */}
        <div className="mb-8">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] rounded-xs overflow-hidden bg-gray-100 shadow-xs mb-1.5">
            <img
              src="/images/old-bay-pasta.jpg"
              alt="Greek Pasta Salad summer cookout feast"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-[11.5px] text-gray-500 font-normal">
            Credit: Dishora
          </div>
        </div>

        {/* Story Intro */}
        <div className="space-y-4 text-[17px] sm:text-[18px] text-gray-800 leading-relaxed font-serif mb-8">
          <p>
            Summer cookout season is here, and if you&apos;re looking for recipes that don&apos;t require tons of time to make or prep, then we&apos;ve got some great news for you—these recipes can be made in <strong>30 minutes or less</strong>!
          </p>
          <p>
            Whether you&apos;re hosting a last-minute gathering or just want to throw together a delicious dinner for you and your family, this collection has you covered. From Grilled Skewered Meatballs and Hot Dogs with Spicy Kimchi Slaw to Easy Grilled Broccolini and Potato Chip Salad, these recipes prove that delicious doesn&apos;t mean complicated. So fire up that grill and get cooking.
          </p>
        </div>

        {/* Join MyRecipes Callout */}
        <div className="p-4 bg-[#fdf2eb] border-l-4 border-[#ba4f1c] rounded-r-xs mb-12 text-sm">
          <span className="font-bold text-gray-900">Love these recipes? </span>
          <span className="text-[#ba4f1c] font-bold underline hover:opacity-80 cursor-pointer">
            Join MyRecipes
          </span>
          <span className="text-gray-700">
            —your personal home for recipes—to easily save and organize your favorites, plus thousands more, in one convenient place.
          </span>
        </div>

        {/* ========================================================================= */}
        {/* THE 19 EXACT RECIPES */}
        {/* ========================================================================= */}
        <div className="space-y-16">
          {roundupRecipes.map((item) => {
            const isSaved = savedItems.includes(item.number);
            return (
              <article key={item.number} className="pt-8 border-t-2 border-gray-200 first:pt-0 first:border-t-0">
                {/* Number Badge */}
                <div className="text-xs font-black text-[#ba4f1c] uppercase tracking-widest mb-1.5">
                  {item.number} of 19
                </div>

                {/* Recipe Title */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <Link href={`/recipes/${item.slug}`}>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0c5354] hover:underline leading-tight">
                      {item.title}
                    </h2>
                  </Link>

                  <button
                    onClick={() => toggleSave(item.number)}
                    className="p-1.5 text-gray-400 hover:text-red-500 cursor-pointer transition-colors shrink-0"
                    title="Save recipe"
                  >
                    <span className={`text-xl ${isSaved ? "text-red-500 font-bold" : ""}`}>
                      {isSaved ? "♥" : "♡"}
                    </span>
                  </button>
                </div>

                {/* Photo */}
                <div className="mb-2">
                  <div className="relative w-full aspect-[4/3] rounded-xs overflow-hidden bg-gray-100 shadow-xs mb-1.5 group">
                    <Link href={`/recipes/${item.slug}`} className="block w-full h-full">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                        loading="lazy"
                      />
                    </Link>
                  </div>
                  <div className="text-[11.5px] text-gray-500 font-normal">
                    {item.photoCredit}
                  </div>
                </div>

                {/* Editorial Quote */}
                <div className="my-5 p-5 bg-[#f8faf9] border-l-4 border-[#0c5354] rounded-r-xs font-serif text-[16.5px] sm:text-[17.5px] text-gray-800 leading-relaxed">
                  <p className="mb-3">&ldquo;{item.quote}&rdquo;</p>
                  <div className="text-xs font-bold font-sans text-gray-600 uppercase tracking-wider">
                    — {item.authorQuote}
                  </div>
                </div>

                {/* Direct Action Link */}
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-500 uppercase">
                    ⏱ {item.time} • {item.category}
                  </span>
                  <Link
                    href={`/recipes/${item.slug}`}
                    className="px-5 py-2 bg-[#0c5354] hover:bg-[#093f40] text-white font-bold text-xs uppercase tracking-wider rounded-xs transition-colors shadow-2xs flex items-center gap-1.5"
                  >
                    <span>Get the Recipe</span>
                    <span>→</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Read More Section */}
        <div className="mt-16 pt-8 border-t border-gray-300 flex flex-wrap items-center gap-4 text-sm font-bold text-[#0c5354]">
          <span className="text-gray-900">Read More:</span>
          <Link href="/" className="underline hover:text-[#009b72]">Recipes</Link>
          <span>•</span>
          <Link href="/recipe-round-up" className="underline hover:text-[#009b72]">Recipe Collections</Link>
        </div>

        {/* Feedback Section */}
        <div className="my-8 p-4 bg-gray-50 border border-gray-200 rounded-xs flex items-center justify-between">
          <span className="text-xs font-bold text-gray-700">Was this page helpful?</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-white border border-gray-300 rounded-xs text-xs font-bold hover:bg-gray-100 cursor-pointer">
              👍 Yes
            </button>
            <button className="px-3 py-1 bg-white border border-gray-300 rounded-xs text-xs font-bold hover:bg-gray-100 cursor-pointer">
              👎 No
            </button>
          </div>
        </div>

      </main>

      {/* ========================================================================= */}
      {/* RELATED ARTICLES SECTION (Exact 16 Cards) */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#f8faf9] border-t border-gray-200 py-12 sm:py-16">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
            Related Articles
          </h2>

          {/* 4x4 Grid (16 Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {summerCookoutRelatedArticles.map((article: RelatedArticle) => (
              <article
                key={article.id}
                className="bg-white border border-gray-200/80 rounded-xs overflow-hidden flex flex-col group shadow-2xs hover:shadow-md transition-shadow relative"
              >
                <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
                  <Link href={`/recipes/${article.slug}`} className="block w-full h-full">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </Link>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-black tracking-widest text-[#009b72] uppercase block mb-1.5">
                      {article.category}
                    </span>

                    <Link href={`/recipes/${article.slug}`}>
                      <h3 className="font-serif text-[15px] font-bold text-gray-900 leading-snug group-hover:text-[#0c5354] transition-colors mb-2">
                        {article.title}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-2 mb-2 text-xs text-gray-600">
                      {article.time && (
                        <div className="flex items-center gap-1 font-medium">
                          <span>⏱</span>
                          <span>{article.time}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 pt-2 border-t border-gray-100 flex items-center justify-between">
                    <span className="truncate max-w-[110px]">{article.author}</span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => {
                          const found = recipesData.find((r) => r.slug === article.slug);
                          if (found) {
                            setActiveModalRecipe(found);
                          }
                        }}
                        className="px-2 py-0.5 text-[11px] font-bold text-gray-700 hover:text-[#0c5354] bg-gray-100 hover:bg-[#eaf5f3] rounded border border-gray-200 transition-colors cursor-pointer"
                        title="Preview recipe content on this page"
                      >
                        Quick Look
                      </button>
                      <Link
                        href={`/recipes/${article.slug}`}
                        className="text-[#0c5354] font-bold hover:underline text-xs"
                      >
                        View →
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* QUICK RECIPE MODAL */}
      {/* ========================================================================= */}
      {activeModalRecipe && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={() => setActiveModalRecipe(null)}
        >
          <div
            className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative my-auto text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-gray-200 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-[#0c5354] text-white px-2 py-0.5 rounded">
                  {activeModalRecipe.badge || activeModalRecipe.category}
                </span>
                <span className="text-xs text-gray-500 font-semibold">
                  ⏱ {activeModalRecipe.totalTime || activeModalRecipe.cookTime}
                </span>
              </div>
              <button
                onClick={() => setActiveModalRecipe(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-2">
                  {activeModalRecipe.title}
                </h2>
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <span>{activeModalRecipe.author}</span>
                  <span>•</span>
                  <span>⏱ {activeModalRecipe.totalTime || activeModalRecipe.cookTime}</span>
                  <span>•</span>
                  <span>{activeModalRecipe.servings}</span>
                </div>
              </div>

              {/* Photo */}
              <div className="relative w-full aspect-[16/9] rounded-md overflow-hidden bg-gray-100">
                <img
                  src={activeModalRecipe.imageUrl}
                  alt={activeModalRecipe.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Lead & Description */}
              {activeModalRecipe.leadText && (
                <p className="font-serif text-base text-gray-700 italic border-l-3 border-[#0c5354] pl-3 py-1 bg-[#f8faf9]">
                  {activeModalRecipe.leadText}
                </p>
              )}

              <p className="text-sm text-gray-700 leading-relaxed">
                {activeModalRecipe.description}
              </p>

              {/* Meta Grid */}
              <div className="grid grid-cols-4 gap-2 text-center p-3 bg-gray-50 rounded-md border border-gray-100">
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase">Prep</div>
                  <div className="text-xs font-bold text-gray-800">{activeModalRecipe.prepTime}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase">Cook</div>
                  <div className="text-xs font-bold text-gray-800">{activeModalRecipe.cookTime}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase">Servings</div>
                  <div className="text-xs font-bold text-gray-800">{activeModalRecipe.servings}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase">Calories</div>
                  <div className="text-xs font-bold text-gray-800">{activeModalRecipe.calories}</div>
                </div>
              </div>

              {/* Ingredients */}
              <div>
                <h3 className="font-serif text-lg font-bold text-gray-900 mb-3 flex items-center justify-between">
                  <span>Ingredients</span>
                  <span className="text-xs font-sans font-normal text-gray-500">
                    {activeModalRecipe.ingredients.length} items
                  </span>
                </h3>
                <ul className="space-y-2 bg-[#fdfbf7] p-4 rounded-md border border-amber-100 text-sm">
                  {activeModalRecipe.ingredients.map((ing, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-gray-800">
                      <span className="text-[#0c5354] font-bold mt-0.5">•</span>
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div>
                <h3 className="font-serif text-lg font-bold text-gray-900 mb-3">
                  Step-by-Step Instructions
                </h3>
                <ol className="space-y-4">
                  {activeModalRecipe.instructions.map((step) => (
                    <li key={step.step} className="flex items-start gap-3 text-sm">
                      <span className="w-6 h-6 rounded-full bg-[#0c5354] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {step.step}
                      </span>
                      <div className="flex-1">
                        <div className="font-bold text-gray-900 mb-1">{step.title}</div>
                        <p className="text-gray-700 leading-relaxed">{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Chef Tips */}
              {activeModalRecipe.tips && activeModalRecipe.tips.length > 0 && (
                <div className="p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-md">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">
                    💡 Kitchen Tip
                  </div>
                  <p className="text-xs text-amber-900 leading-relaxed">
                    {activeModalRecipe.tips[0]}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/recipes/${activeModalRecipe.slug}`}
                  className="flex-1 text-center py-2.5 px-4 bg-[#0c5354] hover:bg-[#083c3d] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors"
                >
                  Open Dedicated Recipe Page (Cook Mode, Scaling &amp; Reviews) →
                </Link>
                <button
                  onClick={() => setActiveModalRecipe(null)}
                  className="py-2.5 px-4 border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold text-xs uppercase tracking-wider rounded transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
