"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { recipesData, Recipe } from "../data/recipes";
import { useFavorites } from "../utils/favorites";
import FavoritesDrawer from "./FavoritesDrawer";

export default function MyRecipesCarousel() {
  const { isFav, toggleFav } = useFavorites();
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const toggleSave = (slug: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFav(slug);
  };

  const toggleFlip = (id: number) => {
    setFlippedCards((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollContainerRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full bg-[#fbfbfb] py-12 border-t border-gray-200/80">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Branding & Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div className="flex flex-col">
            {/* Logo */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center gap-1.5 mb-1.5 cursor-pointer text-left group w-fit"
            >
              <span className="text-[20px] inline-block -rotate-12 group-hover:scale-110 transition-transform">💖</span>
              <span className="font-extrabold text-[22px] tracking-tight">
                <span className="text-[#e71d73]">my</span>
                <span className="text-black">recipes</span>
              </span>
            </button>

            {/* Title & Subtitle */}
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-gray-900 leading-tight">
                Start Saving These Dishes
              </h2>
              <p className="text-sm text-gray-600 font-normal">
                Keep your favorite recipes saved in My Recipes for instant access.
              </p>
            </div>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={() => scroll("left")}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:text-[#0c5354] hover:border-[#0c5354] hover:bg-white transition-all cursor-pointer shadow-xs"
              aria-label="Previous recipes"
            >
              <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-8 h-8 rounded-full border border-[#0c5354] text-[#0c5354] flex items-center justify-center hover:bg-[#0c5354] hover:text-white transition-all cursor-pointer shadow-xs"
              aria-label="Next recipes"
            >
              <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-auto pb-6 pt-2 scrollbar-hide snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {recipesData.map((recipe) => {
            const isFlipped = flippedCards.includes(recipe.id);
            const isSaved = isFav(recipe.slug);

            return (
              <div
                key={recipe.id}
                onClick={() => toggleFlip(recipe.id)}
                className="shrink-0 w-[245px] sm:w-[265px] snap-start cursor-pointer perspective-[1000px] select-none"
              >
                {/* 3D Flip Card Inner */}
                <div
                  className={`relative w-full h-[415px] transition-transform duration-500 rounded-sm shadow-xs [transform-style:preserve-3d] ${
                    isFlipped ? "[transform:rotateY(180deg)]" : ""
                  }`}
                >
                  {/* FRONT SIDE */}
                  <div className="absolute inset-0 w-full h-full bg-white border border-gray-200/90 rounded-sm flex flex-col justify-between p-3.5 [backface-visibility:hidden]">
                    {/* Top Image + Badge */}
                    <div className="relative w-full aspect-square rounded-xs overflow-hidden bg-gray-100 mb-3">
                      <img
                        src={recipe.imageUrl}
                        alt={recipe.imageAlt}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/images/old-bay-pasta.jpg";
                        }}
                      />
                      {/* Yellow Pill Badge */}
                      <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 translate-y-1/2 z-10">
                        <span className="inline-block bg-[#f8c644] text-black font-extrabold text-[9.5px] tracking-wider px-2.5 py-1 rounded-full uppercase shadow-xs whitespace-nowrap">
                          {recipe.badge}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between pt-2">
                      <div>
                        <h3 className="font-bold text-[14.5px] text-gray-900 leading-snug line-clamp-2 mb-2 text-center">
                          {recipe.title}
                        </h3>

                        {/* Stars & Review Count & Time */}
                        <div className="flex items-center justify-center gap-2 text-xs text-gray-600 mb-3">
                          <div className="flex items-center text-[#009b72] text-[12px]">
                            {"★".repeat(recipe.rating)}
                            <span className="text-gray-500 text-[11px] ml-1">
                              ({recipe.reviewCount})
                            </span>
                          </div>
                          <span className="text-gray-300">•</span>
                          <div className="flex items-center gap-1 text-[11px] text-gray-500 font-medium">
                            <svg className="w-3 h-3 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{recipe.totalTime.split(" ")[0]} mins</span>
                          </div>
                        </div>
                      </div>

                      {/* Save Recipe Button */}
                      <div className="flex flex-col gap-1.5">
                        <button
                          onClick={(e) => toggleSave(recipe.slug, e)}
                          className={`w-full py-2 px-3 border rounded-xs font-bold text-[12.5px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                            isSaved
                              ? "border-[#e71d73] bg-[#fdf2f6] text-[#e71d73]"
                              : "border-black text-black hover:bg-gray-50"
                          }`}
                        >
                          <span>{isSaved ? "Saved" : "Save Recipe"}</span>
                          <span>{isSaved ? "♥" : "♡"}</span>
                        </button>

                        <Link
                          href={`/recipes/${recipe.slug}`}
                          onClick={(e) => e.stopPropagation()}
                          className="w-full text-center py-1 text-[11px] font-bold text-[#0c5354] hover:underline"
                        >
                          View Full Recipe →
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* BACK SIDE (FLIPPED) */}
                  <div className="absolute inset-0 w-full h-full bg-[#0c5354] text-white border border-[#0c5354] rounded-sm flex flex-col justify-between p-4 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between border-b border-teal-700/80 pb-1.5 mb-2.5">
                        <span className="text-[10px] font-bold tracking-widest uppercase text-[#9fe2e5]">
                          RECIPE DETAILS
                        </span>
                        <span className="text-xs text-teal-200">↻ Flip</span>
                      </div>

                      <h4 className="font-serif text-[15px] font-bold text-white mb-2 leading-tight">
                        {recipe.title}
                      </h4>

                      <p className="text-xs text-teal-100 leading-relaxed mb-3 line-clamp-3">
                        {recipe.description}
                      </p>

                      <div className="grid grid-cols-2 gap-2 text-[11px] bg-[#093f40] p-2 rounded-xs border border-teal-700/50 mb-2">
                        <div>
                          <span className="block text-teal-300 text-[9.5px] uppercase">Servings</span>
                          <span className="font-bold text-white text-xs">{recipe.servings}</span>
                        </div>
                        <div>
                          <span className="block text-teal-300 text-[9.5px] uppercase">Calories</span>
                          <span className="font-bold text-white text-xs">{recipe.calories}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Link
                        href={`/recipes/${recipe.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full py-2 bg-[#f8c644] text-black font-extrabold text-xs text-center rounded-xs hover:bg-[#eab32a] transition-colors"
                      >
                        See Ingredients & Steps 📖
                      </Link>

                      <button
                        onClick={(e) => toggleSave(recipe.slug, e)}
                        className={`w-full py-1.5 px-3 rounded-xs font-bold text-xs flex items-center justify-center gap-1.5 transition-colors ${
                          isSaved
                            ? "bg-[#e71d73] text-white"
                            : "bg-white text-[#0c5354] hover:bg-teal-50"
                        }`}
                      >
                        <span>{isSaved ? "Saved in MyRecipes ♥" : "Save Recipe ♡"}</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Hint */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500 mt-2 font-medium">
          <span>Click any card to flip for quick info, or click</span>
          <span className="text-[#0c5354] font-bold">"View Full Recipe"</span>
          <span>to view full ingredients & cooking steps! ↻</span>
        </div>

      </div>

      {/* Drawer */}
      <FavoritesDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </section>
  );
}
