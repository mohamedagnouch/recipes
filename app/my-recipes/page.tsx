"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useFavorites } from "../utils/favorites";

export default function MyRecipesPage() {
  const { favoriteRecipes, count, removeFav, clearAll, isLoaded } = useFavorites();

  return (
    <main className="min-h-screen bg-[#fcfcfc] flex flex-col">
      <Header />

      {/* Hero Header */}
      <section className="bg-gradient-to-r from-[#fff0f6] via-[#fdf7f9] to-[#f4f9f8] border-b border-gray-200 py-10 sm:py-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/80 rounded-full border border-pink-200 mb-3 shadow-2xs">
            <span className="text-lg">💖</span>
            <span className="font-extrabold text-xs tracking-wide uppercase text-[#e71d73]">
              Personal Cookbook
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            My Saved Recipes
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
            All your favorite dishes, saved in one place for whenever you are ready to cook.
          </p>

          {count > 0 && (
            <div className="mt-6 flex items-center justify-center gap-4">
              <span className="text-xs font-bold text-gray-500">
                {count} recipe{count === 1 ? "" : "s"} saved
              </span>
              <button
                onClick={() => {
                  if (confirm("Are you sure you want to remove all saved recipes?")) {
                    clearAll();
                  }
                }}
                className="text-xs font-semibold text-red-500 hover:text-red-700 underline cursor-pointer"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Main Grid */}
      <section className="flex-1 max-w-[1320px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {!isLoaded ? (
          <div className="py-20 text-center text-gray-400 text-sm">
            Loading your saved recipes...
          </div>
        ) : count === 0 ? (
          /* Empty state */
          <div className="max-w-md mx-auto text-center py-16 px-4">
            <div className="w-20 h-20 rounded-full bg-pink-50 text-[#e71d73] text-4xl flex items-center justify-center mx-auto mb-4 shadow-inner">
              🤍
            </div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">
              Your recipe box is empty
            </h2>
            <p className="text-sm text-gray-600 mb-8 leading-relaxed">
              Whenever you see a recipe you love, click the <strong className="text-[#e71d73]">❤️ Heart</strong> icon to save it here!
            </p>
            <Link
              href="/recipes"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#0c5354] hover:bg-[#093f40] text-white font-bold text-sm rounded-full transition-all shadow-md"
            >
              Browse All Recipes →
            </Link>
          </div>
        ) : (
          /* Grid of saved recipes */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favoriteRecipes.map((recipe) => {
              const img = recipe.imageUrl || "/images/cheeseburger-pie.jpg";
              return (
                <div
                  key={recipe.slug}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-200/80 hover:shadow-xl transition-all duration-300 flex flex-col group relative"
                >
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

                    {/* Category */}
                    <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-xs text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider">
                      {recipe.category || recipe.badge || "RECIPE"}
                    </span>

                    {/* Remove Heart */}
                    <button
                      onClick={() => removeFav(recipe.slug)}
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white text-[#e71d73] flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer ring-2 ring-[#e71d73]"
                      title="Remove from saved"
                    >
                      <span className="text-base">❤️</span>
                    </button>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                        {recipe.totalTime && (
                          <span className="flex items-center gap-1 font-medium">
                            ⏱️ {recipe.totalTime}
                          </span>
                        )}
                        {recipe.rating && (
                          <span className="flex items-center gap-1 text-amber-600 font-bold">
                            ★ {recipe.rating.toFixed(1)}
                          </span>
                        )}
                      </div>

                      <Link
                        href={`/recipes/${recipe.slug}`}
                        className="font-serif text-lg font-bold text-gray-900 group-hover:text-[#0c5354] transition-colors line-clamp-2 leading-snug mb-2"
                      >
                        {recipe.title}
                      </Link>

                      {recipe.description && (
                        <p className="text-xs text-gray-600 line-clamp-2 mb-3 leading-relaxed">
                          {recipe.description}
                        </p>
                      )}
                    </div>

                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                      <span className="text-gray-500 truncate max-w-[140px]">
                        {recipe.author || "Dishora"}
                      </span>
                      <Link
                        href={`/recipes/${recipe.slug}`}
                        className="text-[#0c5354] font-bold hover:underline"
                      >
                        Cook Now →
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
