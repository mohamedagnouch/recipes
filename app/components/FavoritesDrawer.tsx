"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useFavorites } from "../utils/favorites";

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FavoritesDrawer({ isOpen, onClose }: FavoritesDrawerProps) {
  const { favoriteRecipes, count, removeFav, clearAll, isLoaded } = useFavorites();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300 animate-fadeIn"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col transform transition-transform duration-300 ease-out animate-slideInRight">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-[#fdfdfd] to-[#f4f9f8]">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl animate-bounce">💖</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg font-bold text-gray-900 tracking-tight">
                  My Saved Recipes
                </h3>
                {count > 0 && (
                  <span className="px-2 py-0.5 text-xs font-black bg-[#e71d73] text-white rounded-full">
                    {count}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-gray-500 font-medium">
                Your personal cookbook & favorites
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            aria-label="Close saved recipes drawer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 divide-y divide-gray-100">
          {!isLoaded ? (
            <div className="py-12 text-center text-gray-400 text-sm">
              Loading your recipes...
            </div>
          ) : count === 0 ? (
            /* Empty State */
            <div className="py-12 flex flex-col items-center text-center px-4">
              <div className="w-16 h-16 rounded-full bg-[#fdf2f7] flex items-center justify-center text-3xl mb-4 text-[#e71d73] shadow-inner">
                🤍
              </div>
              <h4 className="font-serif text-lg font-bold text-gray-800 mb-1">
                No saved recipes yet
              </h4>
              <p className="text-xs text-gray-500 max-w-[240px] mb-6 leading-relaxed">
                Click the <span className="text-[#e71d73] font-bold">❤️ Heart</span> icon on any recipe to save it here for quick access later!
              </p>

              {/* Popular recommendations */}
              <div className="w-full text-left bg-[#f6f9f9] p-3.5 rounded-xl border border-[#e1eded]">
                <span className="text-[11px] font-bold text-[#0c5354] uppercase tracking-wider block mb-2">
                  ✨ Popular to explore:
                </span>
                <div className="flex flex-col gap-1.5 text-xs">
                  <Link
                    href="/recipes/giada-de-laurentiis-lemon-spaghetti"
                    onClick={onClose}
                    className="text-gray-700 hover:text-[#0c5354] font-medium flex items-center justify-between py-1 px-2 hover:bg-white rounded transition-colors"
                  >
                    <span>🍋 Lemon Spaghetti (Giada)</span>
                    <span className="text-[10px] text-gray-400">20 min</span>
                  </Link>
                  <Link
                    href="/recipes/the-one-pan-cheeseburger-pie"
                    onClick={onClose}
                    className="text-gray-700 hover:text-[#0c5354] font-medium flex items-center justify-between py-1 px-2 hover:bg-white rounded transition-colors"
                  >
                    <span>🥧 One-Pan Cheeseburger Pie</span>
                    <span className="text-[10px] text-gray-400">45 min</span>
                  </Link>
                  <Link
                    href="/recipes/grilled-salmon-with-lemon-herb-butter"
                    onClick={onClose}
                    className="text-gray-700 hover:text-[#0c5354] font-medium flex items-center justify-between py-1 px-2 hover:bg-white rounded transition-colors"
                  >
                    <span>🐟 Grilled Lemon-Herb Salmon</span>
                    <span className="text-[10px] text-gray-400">25 min</span>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            /* Saved Recipe List */
            <div className="space-y-3 pt-1 pb-4">
              {favoriteRecipes.map((recipe) => {
                const img = recipe.imageUrl || "/images/cheeseburger-pie.jpg";
                return (
                  <div
                    key={recipe.slug}
                    className="flex items-center gap-3.5 p-2.5 rounded-xl bg-gray-50/70 hover:bg-[#f3f9f8] border border-gray-100 hover:border-[#0c5354]/20 transition-all group"
                  >
                    {/* Thumbnail */}
                    <Link
                      href={`/recipes/${recipe.slug}`}
                      onClick={onClose}
                      className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-200"
                    >
                      <Image
                        src={img}
                        alt={recipe.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="64px"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#0c5354]">
                          {recipe.category || recipe.badge || "RECIPE"}
                        </span>
                        {recipe.totalTime && (
                          <span className="text-[10px] text-gray-400">
                            • {recipe.totalTime}
                          </span>
                        )}
                      </div>

                      <Link
                        href={`/recipes/${recipe.slug}`}
                        onClick={onClose}
                        className="block font-serif text-sm font-bold text-gray-900 group-hover:text-[#0c5354] transition-colors truncate"
                      >
                        {recipe.title}
                      </Link>

                      {recipe.rating && (
                        <div className="flex items-center gap-1 text-xs text-amber-500 mt-0.5">
                          <span>★ {recipe.rating.toFixed(1)}</span>
                          {recipe.reviewCount ? (
                            <span className="text-[10px] text-gray-400">
                              ({recipe.reviewCount})
                            </span>
                          ) : null}
                        </div>
                      )}
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFav(recipe.slug)}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Remove from saved"
                      aria-label={`Remove ${recipe.title} from favorites`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {count > 0 && (
          <div className="p-4 border-t border-gray-100 bg-gray-50/80 flex items-center justify-between gap-3">
            <button
              onClick={() => {
                if (confirm("Are you sure you want to clear all your saved recipes?")) {
                  clearAll();
                }
              }}
              className="text-xs text-gray-500 hover:text-red-600 font-semibold transition-colors cursor-pointer"
            >
              Clear All
            </button>

            <Link
              href="/recipes"
              onClick={onClose}
              className="px-4 py-2 bg-[#0c5354] hover:bg-[#083b3c] text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
            >
              Explore More Recipes →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
