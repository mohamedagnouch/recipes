"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { searchRecipes, allRecipes } from "../data/allRecipes";
import { useFavorites } from "../utils/favorites";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";
  
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { isFav, toggleFav } = useFavorites();

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const categories = [
    { label: "All Recipes", value: "all" },
    { label: "Dinner", value: "dinner" },
    { label: "Breakfast", value: "breakfast" },
    { label: "Lunch", value: "lunch" },
    { label: "Desserts", value: "dessert" },
    { label: "Appetizers", value: "appetizer" },
  ];

  const results = useMemo(() => {
    return searchRecipes(query, selectedCategory);
  }, [query, selectedCategory]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/search");
    }
  };

  return (
    <main className="min-h-screen bg-[#fcfcfc] flex flex-col">
      <Header />

      {/* Search Hero & Controls */}
      <section className="bg-gradient-to-b from-[#f3f8f7] to-white border-b border-gray-200 py-10 sm:py-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-black tracking-widest text-[#0c5354] uppercase mb-2 block">
            DISHORA RECIPE SEARCH
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Find Your Next Favorite Recipe
          </h1>

          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative max-w-2xl mx-auto shadow-md rounded-full bg-white flex items-center border-2 border-[#0c5354]/30 focus-within:border-[#0c5354] transition-all"
          >
            <div className="pl-5 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by recipe name, ingredient (e.g. lemon, chicken, pasta, cake)..."
              className="w-full py-3.5 px-4 text-base sm:text-lg text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent rounded-full"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors mr-1 cursor-pointer"
                title="Clear search"
              >
                ✕
              </button>
            )}
            <button
              type="submit"
              className="mr-1.5 px-6 py-2.5 bg-[#0c5354] hover:bg-[#093f40] text-white font-bold text-sm rounded-full transition-all cursor-pointer shadow-sm"
            >
              Search
            </button>
          </form>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {categories.map((cat) => {
              const active = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    active
                      ? "bg-[#0c5354] text-white shadow-xs"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="flex-1 max-w-[1320px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-baseline justify-between mb-6 pb-3 border-b border-gray-200">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900">
              {query.trim() ? (
                <>Results for <span className="text-[#0c5354]">"{query}"</span></>
              ) : selectedCategory !== "all" ? (
                <span className="capitalize">{selectedCategory} Recipes</span>
              ) : (
                "All Recipes"
              )}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Showing {results.length} delicious recipe{results.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>

        {results.length === 0 ? (
          /* No Results State */
          <div className="text-center py-16 px-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-500 text-3xl flex items-center justify-center mx-auto mb-4">
              🍳
            </div>
            <h3 className="font-serif text-2xl font-bold text-gray-800 mb-2">
              No matching recipes found
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              We couldn't find anything matching "<strong>{query}</strong>". Try checking for spelling or search a common ingredient like chicken, chocolate, or pasta.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {["Lemon Spaghetti", "Cheeseburger Pie", "Baked Feta", "French Toast", "Chocolate Brownie"].map((item) => (
                <button
                  key={item}
                  onClick={() => setQuery(item)}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-[#eaf4f3] hover:text-[#0c5354] rounded-lg text-xs font-medium text-gray-700 transition-colors cursor-pointer"
                >
                  🔍 {item}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Results Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map((recipe) => {
              const saved = isFav(recipe.slug);
              const img = recipe.imageUrl || "/images/cheeseburger-pie.jpg";

              return (
                <div
                  key={recipe.slug}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-200/80 hover:shadow-xl hover:border-[#0c5354]/30 transition-all duration-300 flex flex-col group relative"
                >
                  {/* Image Container with Heart Button */}
                  <div className="relative aspect-4/3 w-full bg-gray-100 overflow-hidden">
                    <Link href={`/recipes/${recipe.slug}`} className="block w-full h-full">
                      <Image
                        src={img}
                        alt={recipe.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </Link>

                    {/* Category Badge */}
                    <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-xs text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider">
                      {recipe.category || recipe.badge || "RECIPE"}
                    </span>

                    {/* Save Heart Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFav(recipe.slug);
                      }}
                      className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md ${
                        saved
                          ? "bg-white text-[#e71d73] scale-105 ring-2 ring-[#e71d73]"
                          : "bg-white/90 text-gray-400 hover:text-[#e71d73] hover:scale-110"
                      }`}
                      title={saved ? "Saved in My Recipes" : "Save recipe"}
                      aria-label="Save recipe to favorites"
                    >
                      <span className="text-base">{saved ? "❤️" : "🤍"}</span>
                    </button>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Meta stats */}
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                        {recipe.totalTime && (
                          <span className="flex items-center gap-1 font-medium">
                            ⏱️ {recipe.totalTime}
                          </span>
                        )}
                        {recipe.category && (
                          <span className="text-[11px] font-semibold text-[#0c5354] uppercase tracking-wider bg-[#e8f5f3] px-2 py-0.5 rounded-xs">
                            {recipe.category}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <Link
                        href={`/recipes/${recipe.slug}`}
                        className="font-serif text-lg font-bold text-gray-900 group-hover:text-[#0c5354] transition-colors line-clamp-2 leading-snug mb-2"
                      >
                        {recipe.title}
                      </Link>

                      {/* Description */}
                      {recipe.description && (
                        <p className="text-xs text-gray-600 line-clamp-2 mb-3 leading-relaxed">
                          {recipe.description}
                        </p>
                      )}
                    </div>

                    {/* Author & Action */}
                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                      <span className="text-gray-500 truncate max-w-[140px]">
                        {recipe.author || "Dishora Kitchen"}
                      </span>
                      <Link
                        href={`/recipes/${recipe.slug}`}
                        className="text-[#0c5354] font-bold hover:underline flex items-center gap-1"
                      >
                        View Recipe →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
