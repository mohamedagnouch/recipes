"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { recipesData, Recipe } from "../../data/recipes";

interface RelatedCelebrityArticle {
  id: number;
  slug: string;
  category: "CELEBRITY" | "NEWS & TRENDS";
  title: string;
  author: string;
  imageUrl: string;
}

const giadaRelatedArticles: RelatedCelebrityArticle[] = [
  {
    id: 1,
    slug: "giada-4-ingredient-dinner",
    category: "CELEBRITY",
    title: "Giada De Laurentiis's 4-Ingredient Dinner Is My New Go-To",
    author: "By Kat Lieu",
    imageUrl: "/images/lemon-spaghetti.jpg",
  },
  {
    id: 2,
    slug: "most-popular-dinner-recipe-30-minutes",
    category: "NEWS & TRENDS",
    title: "Our Most Popular Dinner Recipe Of All Time Is Ready in 30 Minutes",
    author: "By Sheela Prakash",
    imageUrl: "/images/cheeseburger-pie-slice.jpg",
  },
  {
    id: 3,
    slug: "two-ingredient-recipe-february",
    category: "NEWS & TRENDS",
    title: "The 2-Ingredient Recipe I Make Every Single February",
    author: "By Laurel Randolph",
    imageUrl: "/images/cinnamon-toast.jpg",
  },
  {
    id: 4,
    slug: "giada-famous-pasta-busy-weeknights",
    category: "CELEBRITY",
    title: "I Make Giada De Laurentiis' Famous Pasta on the Busiest Weeknights—It's So Good",
    author: "By Myo Quinn",
    imageUrl: "/images/dinner-italian-sausage-pasta.jpg",
  },
  {
    id: 5,
    slug: "giada-viral-sheet-pan-lasagna",
    category: "CELEBRITY",
    title: "I Tried Giada De Laurentiis' Viral Sheet Pan Lasagna—My Family Can't Get Enough",
    author: "By Myo Quinn",
    imageUrl: "/images/dinner-4-ingredient-pasta-bake.jpg",
  },
  {
    id: 6,
    slug: "alton-brown-vs-giada-chicken-piccata",
    category: "CELEBRITY",
    title: "I Tried Alton Brown's and Giada De Laurentiis' Chicken Piccata Recipes—There's a Clear Winner",
    author: "By Stephanie A Ganz",
    imageUrl: "/images/dinner-crispy-chicken-greens.jpg",
  },
  {
    id: 7,
    slug: "giada-favorite-snack-ingredient",
    category: "CELEBRITY",
    title: "This One Ingredient Is Giada De Laurentiis' Favorite Snack",
    author: "By Kat Lieu",
    imageUrl: "/images/appetizer-prosciutto-melon-skewers.jpg",
  },
  {
    id: 8,
    slug: "five-ingredient-giada-friday-night",
    category: "CELEBRITY",
    title: "The 5-Ingredient Giada De Laurentiis Recipe I Make Every Friday Night",
    author: "By Candace Nagy",
    imageUrl: "/images/tip-crispy-potatoes.jpg",
  },
];

export default function GiadaLemonSpaghettiPage() {
  const [servingScale, setServingScale] = useState<number>(1);
  const [activeModalRecipe, setActiveModalRecipe] = useState<Recipe | null>(null);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  const [isSaved, setIsSaved] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [printMode, setPrintMode] = useState<"full" | "ingredients">("full");

  const baseIngredients = [
    { qty: 1, unit: "lb", item: "spaghetti (or linguine)" },
    { qty: 3, unit: "tbsp", item: "kosher salt (for the pasta cooking water)" },
    { qty: 8, unit: "oz", item: "mascarpone cheese, at room temperature" },
    { qty: 1, unit: "cup", item: "Parmigiano Reggiano, freshly grated (plus more for serving)" },
    { qty: 1, unit: "large", item: "fresh lemon, zested and juiced (about 2-3 tbsp juice)" },
    { qty: 2, unit: "tbsp", item: "extra virgin olive oil (to finish)" },
    { qty: 0.5, unit: "tsp", item: "freshly cracked black pepper" },
    { qty: 0.25, unit: "cup", item: "fresh basil leaves, torn for garnish" },
  ];

  const toggleIngredient = (index: number) => {
    setCheckedIngredients((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handlePrint = (mode: "full" | "ingredients") => {
    setPrintMode(mode);
    setShowPrintModal(false);
    setTimeout(() => {
      window.print();
    }, 150);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col justify-between selection:bg-[#0c5354]/20 selection:text-[#0c5354]">
      <Header />

      <main className="max-w-[760px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-4 no-print">
          <Link href="/" className="hover:text-[#0c5354] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/" className="hover:text-[#0c5354] transition-colors">Celebrity Recipes</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Giada De Laurentiis</span>
        </nav>

        {/* Article Header */}
        <header className="mb-6">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-gray-900 leading-[1.18] tracking-tight mb-3">
            Giada de Laurentiis Swears by This 4-Ingredient Lemon Spaghetti
          </h1>

          <p className="text-xl sm:text-[22px] font-serif text-gray-700 leading-relaxed mb-4">
            This pasta is bright, silky, and exactly the kind of low-effort dinner I want to make on repeat.
          </p>

          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600 pb-5 border-b border-gray-200">
            <span>By <strong className="text-gray-900 font-bold underline cursor-pointer hover:text-[#0c5354]">Meghan Splawn</strong></span>
            <span>|</span>
            <span>Published on February 12, 2026</span>
          </div>
        </header>

        {/* Hero Photo with Giada Inset */}
        <div className="mb-8">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] rounded-xs overflow-hidden bg-gray-100 shadow-xs mb-1.5">
            <img
              src="/images/old-bay-pasta.jpg"
              alt="Giada de Laurentiis Swears by This 4-Ingredient Lemon Spaghetti"
              className="w-full h-full object-cover"
            />
            {/* Giada Inset Badge */}
            <div className="absolute top-4 left-4 flex items-center gap-3 bg-white/95 backdrop-blur-xs p-2.5 rounded-xs shadow-md border border-gray-200/80">
              <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#ba4f1c] shrink-0">
                <img
                  src="/images/blueberry-french-toast.jpg"
                  alt="Giada De Laurentiis"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-[#ba4f1c] tracking-wider block">CELEBRITY CHEF</span>
                <span className="text-xs font-bold text-gray-900">Giada De Laurentiis</span>
              </div>
            </div>
          </div>
          <div className="text-[11.5px] text-gray-500 font-normal">
            Credit: Simply Recipes / Getty Images / Meghan Splawn
          </div>
        </div>

        {/* Story Section 1 */}
        <div className="space-y-4 text-[17px] sm:text-[18px] text-gray-800 leading-relaxed font-serif mb-8">
          <p>
            I&apos;d love to travel to Italy at any time, but being in Milan for the 2026 Olympic Games would be top-tier. Since a trip abroad isn&apos;t in my budget this year, I needed a meal that would satisfy my travel dreams. Right now, Giada De Laurentiis is covering the Olympics and food in Milan as a correspondent for <em>The Today Show</em>, so I decided to choose something from her repertoire.
          </p>
          <p>
            This recipe for <strong>Lemon Spaghetti</strong> calls for four ingredients (spaghetti, mascarpone, Parmigiano Reggiano, and a lemon) plus salt, pepper, and olive oil. If you need me, I&apos;ll be eating a bowl of this pasta while I watch cross-country skiing.
          </p>
        </div>

        {/* Image 2: Ingredients Prep Flatlay */}
        <div className="my-8">
          <div className="relative w-full aspect-[4/3] rounded-xs overflow-hidden bg-gray-100 shadow-xs mb-1.5">
            <img
              src="/images/avocado-beans-prep.jpg"
              alt="Ingredients for Giada's Lemon Spaghetti: spaghetti, mascarpone, lemon, parmesan, basil"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-[11.5px] text-gray-500 font-normal">
            Credit: Simply Recipes / Meghan Splawn
          </div>
        </div>

        {/* Section: How I Make Giada's Creamy Lemon Pasta */}
        <div className="mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            How I Make Giada&apos;s Creamy Lemon Pasta
          </h2>

          <div className="space-y-4 text-[17px] sm:text-[18px] text-gray-800 leading-relaxed font-serif">
            <p>
              I keep spaghetti in my pantry, Parmesan in the refrigerator, and a lemon on the counter, so the only special ingredient I needed was mascarpone. In her recipe, Giada also calls for salt for the pasta water, olive oil to coat the pasta, plus black pepper and basil, which are optional to garnish the pasta.
            </p>
            <p>
              While the pasta cooks in a large pot of salted water, I grated the zest off a lemon and then juiced it, which is a brilliant way to get both the vibrant color and tart sweetness from the fruit. Once the pasta was done, I moved it to a pan with some of the pasta water, then spooned in the mascarpone and cooked for just a few minutes before adding the Parmesan. Off the heat, I added a tablespoon of the lemon juice, and garnished the pan with lemon zest, more Parmesan, and basil before serving.
            </p>
            <p>
              The finished pasta is somehow cozy and creamy without being heavy. The bright lemon and pepper will keep you coming back, bite after bite!
            </p>
          </div>
        </div>

        {/* Image 3: Skillet tossing */}
        <div className="my-8">
          <div className="relative w-full aspect-[4/3] rounded-xs overflow-hidden bg-gray-100 shadow-xs mb-1.5">
            <img
              src="/images/old-bay-pasta.jpg"
              alt="Tossing spaghetti in a skillet with mascarpone, lemon zest, and parmesan"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-[11.5px] text-gray-500 font-normal">
            Credit: Simply Recipes / Meghan Splawn
          </div>
        </div>

        {/* Section: How To Make Pasta Just Like Giada Would */}
        <div className="mb-10">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            How To Make Pasta Just Like Giada Would
          </h2>

          <p className="text-[17px] sm:text-[18px] text-gray-800 leading-relaxed font-serif mb-5">
            Having watched Giada make this recipe and many others over the years, here&apos;s my advice to whip up this dish exactly like she would:
          </p>

          <ul className="space-y-4 text-[16px] sm:text-[17px] text-gray-800 leading-relaxed font-serif pl-5 list-disc">
            <li>
              <strong>Use a tall pot for long pasta like spaghetti.</strong> Longer pasta shapes need more water and room to move around to cook to al dente, so use a taller, narrower pot for boiling the pasta here.
            </li>
            <li>
              <strong>Use a lot of salt for that pasta water.</strong> &ldquo;It is the first time you add flavor to the pasta,&rdquo; says Giada, and she adds a hefty three tablespoons of kosher salt for big pots of pasta water.
            </li>
            <li>
              <strong>Skip the strainer for draining.</strong> Use tongs to move the cooked pasta from the boiling water to the pan where you&apos;ll make the sauce. It saves you a dirty dish and brings some of the pasta&apos;s starchy water into your pan, a vital component of thickening the sauce.
            </li>
            <li>
              <strong>Save the olive oil for finishing the pasta, not boiling it.</strong> Giada includes directions for coating the pasta in oil if you prefer to drain it, but also encourages you to finish each serving of pasta with a little bit of olive oil to add richness.
            </li>
          </ul>

          <p className="text-[17px] sm:text-[18px] text-gray-800 leading-relaxed font-serif mt-6 italic">
            However you tune in to the Olympics, let it be with a bowl of this simple, creamy, and light lemon pasta!
          </p>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE RECIPE CARD */}
        {/* ========================================================================= */}
        <section
          id="recipe-card"
          className={`border-2 border-[#0c5354] rounded-xs bg-[#fafcfb] p-6 sm:p-8 mb-12 shadow-sm ${
            printMode === "ingredients" ? "print-ingredients-only" : ""
          }`}
        >
          <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-gray-200">
            <div>
              <span className="text-xs font-black uppercase text-[#ba4f1c] tracking-widest block mb-1">
                AUTHENTIC RECIPE
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
                Giada De Laurentiis&apos; 4-Ingredient Lemon Spaghetti
              </h2>
              <div className="flex items-center gap-3 text-xs text-gray-600 mt-2">
                <span>⏱ Prep: 5 mins</span>
                <span>•</span>
                <span>⏱ Cook: 15 mins</span>
                <span>•</span>
                <span className="font-bold text-[#0c5354]">⏱ Total: 20 mins</span>
              </div>
            </div>

            <div className="flex items-center gap-2 no-print">
              <button
                onClick={() => setShowPrintModal(true)}
                className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-bold text-xs uppercase tracking-wider rounded-xs transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <span>Print 🖨️</span>
              </button>
              <button
                onClick={() => setIsSaved(!isSaved)}
                className="px-4 py-2 bg-[#0c5354] hover:bg-[#093f40] text-white font-bold text-xs uppercase tracking-wider rounded-xs transition-colors shadow-2xs cursor-pointer"
              >
                {isSaved ? "Saved ♥" : "Save Recipe ♡"}
              </button>
            </div>
          </div>

          {/* Servings Scale Selector */}
          <div className="py-4 border-b border-gray-200 flex items-center justify-between no-print">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Yield: {(4 * servingScale)} Servings
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-gray-500 mr-1">Scale:</span>
              {[1, 2, 3].map((scale) => (
                <button
                  key={scale}
                  onClick={() => setServingScale(scale)}
                  className={`w-7 h-7 rounded-xs text-xs font-bold transition-all cursor-pointer ${
                    servingScale === scale
                      ? "bg-[#0c5354] text-white shadow-2xs"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {scale}x
                </button>
              ))}
            </div>
          </div>

          {/* Ingredients Checklist */}
          <div className="py-6">
            <h3 className="font-serif text-xl font-bold text-gray-900 mb-4 flex items-center justify-between">
              <span>Ingredients</span>
              <span className="text-xs font-normal text-gray-500">
                (Click to check off items)
              </span>
            </h3>

            <ul className="space-y-3 font-sans text-sm sm:text-base">
              {baseIngredients.map((ing, index) => {
                const scaledQty = ing.qty * servingScale;
                const isChecked = !!checkedIngredients[index];
                return (
                  <li
                    key={index}
                    onClick={() => toggleIngredient(index)}
                    className="flex items-start gap-3 cursor-pointer group select-none"
                  >
                    <span
                      className={`w-5 h-5 mt-0.5 rounded-xs border flex items-center justify-center text-xs shrink-0 transition-colors ${
                        isChecked
                          ? "bg-[#009b72] border-[#009b72] text-white"
                          : "border-gray-300 bg-white group-hover:border-gray-500"
                      }`}
                    >
                      {isChecked ? "✓" : ""}
                    </span>
                    <span
                      className={`${
                        isChecked
                          ? "line-through text-gray-400"
                          : "text-gray-800 group-hover:text-gray-900"
                      }`}
                    >
                      <strong className="font-bold text-gray-900">
                        {scaledQty} {ing.unit}
                      </strong>{" "}
                      {ing.item}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Instructions (Hidden when printing ingredients only) */}
          <div className={`pt-6 border-t border-gray-200 ${printMode === "ingredients" ? "no-print" : ""}`}>
            <h3 className="font-serif text-xl font-bold text-gray-900 mb-4">
              Instructions
            </h3>

            <ol className="space-y-5 font-serif text-[16px] sm:text-[17px] text-gray-800 leading-relaxed">
              <li className="pl-2 border-l-2 border-[#ba4f1c]">
                <strong className="block font-sans text-xs uppercase tracking-wider text-[#ba4f1c] mb-1">
                  Step 1: Boil Pasta & Reserve Liquid
                </strong>
                Bring a tall, large pot of water to a rolling boil. Add 3 tablespoons of kosher salt. Cook the spaghetti until al dente (about 8-9 minutes). Do not drain into a sink!
              </li>

              <li className="pl-2 border-l-2 border-[#ba4f1c]">
                <strong className="block font-sans text-xs uppercase tracking-wider text-[#ba4f1c] mb-1">
                  Step 2: Emulsify Mascarpone
                </strong>
                Using tongs, transfer hot cooked spaghetti directly from the boiling water into a large skillet over low heat, bringing some starchy cooking water along. Spoon in the mascarpone cheese and toss vigorously for 1-2 minutes until smooth and creamy.
              </li>

              <li className="pl-2 border-l-2 border-[#ba4f1c]">
                <strong className="block font-sans text-xs uppercase tracking-wider text-[#ba4f1c] mb-1">
                  Step 3: Add Lemon & Parmesan
                </strong>
                Remove skillet from heat. Stir in grated Parmigiano Reggiano and fresh lemon juice until a silky sauce coats every strand of pasta.
              </li>

              <li className="pl-2 border-l-2 border-[#ba4f1c]">
                <strong className="block font-sans text-xs uppercase tracking-wider text-[#ba4f1c] mb-1">
                  Step 4: Garnish & Finish
                </strong>
                Drizzle with extra virgin olive oil. Garnish with fresh lemon zest, cracked black pepper, more Parmesan, and torn fresh basil leaves. Serve immediately while piping hot.
              </li>
            </ol>
          </div>
        </section>

      </main>

      {/* ========================================================================= */}
      {/* RELATED ARTICLES SECTION (Exact 8 Celebrity & Trends Cards) */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#f8faf9] border-t border-gray-200 py-12 sm:py-16 no-print">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
            Related Articles
          </h2>

          {/* 4x2 Grid (8 Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {giadaRelatedArticles.map((article) => (
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
                        title="Quick recipe preview on this page"
                      >
                        Quick Look
                      </button>
                      <Link
                        href={`/recipes/${article.slug}`}
                        className="text-[#0c5354] font-bold hover:underline text-xs"
                      >
                        Read →
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
      {/* QUICK RECIPE MODAL FOR RELATED CELEBRITY ARTICLES */}
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
                  <span>★ {activeModalRecipe.rating}.0 ({activeModalRecipe.reviewCount} reviews)</span>
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
                    💡 Chef Tip
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

      {/* Print Options Modal */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xs max-w-md w-full p-6 shadow-2xl border border-gray-200">
            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2">
              Options d&apos;impression
            </h3>
            <p className="text-sm text-gray-600 mb-6 font-sans">
              Choisissez le format d&apos;impression souhaité pour cette recette de Giada :
            </p>

            <div className="space-y-3 mb-6 font-sans">
              <button
                onClick={() => handlePrint("ingredients")}
                className="w-full p-4 rounded-xs border-2 border-gray-200 hover:border-[#0c5354] hover:bg-[#0c5354]/5 transition-all text-left flex items-start gap-3 cursor-pointer group"
              >
                <span className="text-2xl">🛒</span>
                <div>
                  <strong className="block text-sm font-bold text-gray-900 group-hover:text-[#0c5354]">
                    Ingrédients Uniquement (Liste de courses)
                  </strong>
                  <span className="text-xs text-gray-500">
                    Imprime uniquement la liste des ingrédients pour faire vos courses.
                  </span>
                </div>
              </button>

              <button
                onClick={() => handlePrint("full")}
                className="w-full p-4 rounded-xs border-2 border-gray-200 hover:border-[#0c5354] hover:bg-[#0c5354]/5 transition-all text-left flex items-start gap-3 cursor-pointer group"
              >
                <span className="text-2xl">📄</span>
                <div>
                  <strong className="block text-sm font-bold text-gray-900 group-hover:text-[#0c5354]">
                    Fiche Recette Complète
                  </strong>
                  <span className="text-xs text-gray-500">
                    Imprime les ingrédients, les instructions pas-à-pas et les astuces de Giada.
                  </span>
                </div>
              </button>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowPrintModal(false)}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
