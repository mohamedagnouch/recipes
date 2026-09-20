import React from "react";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function NotFound() {
  const popularCategories = [
    { name: "Dinner Recipes", href: "/recipes?category=dinner" },
    { name: "Moroccan Specialties", href: "/recipes?cuisine=moroccan" },
    { name: "Desserts & Sweets", href: "/recipes?category=desserts" },
    { name: "Quick Weeknight Meals", href: "/recipes?tag=quick" },
    { name: "Beverages & Drinks", href: "/recipes?category=drinks" },
    { name: "Food News & Guides", href: "/food-news" },
  ];

  return (
    <main className="min-h-screen bg-[#fcfcfc] flex flex-col text-gray-900">
      <Header />

      <section className="flex-1 flex items-center justify-center py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-2xl w-full text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-[#0c5354] uppercase tracking-wider">
            <span>404 Error</span>
            <span aria-hidden="true">•</span>
            <span>Recipe Not Found</span>
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
              Looks like this dish isn&apos;t on the menu.
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-lg mx-auto">
              The page you are looking for may have moved, been renamed, or does not exist. Try searching our collection or exploring our top categories below.
            </p>
          </div>

          {/* Search Form */}
          <form
            action="/search"
            method="GET"
            className="max-w-md mx-auto flex items-center gap-2 bg-white p-2 rounded-2xl border border-gray-300 shadow-xs focus-within:border-[#0c5354] focus-within:ring-2 focus-within:ring-[#0c5354]/10 transition-all"
          >
            <input
              type="text"
              name="q"
              placeholder="Search recipes, ingredients, techniques..."
              className="flex-1 px-4 py-2 text-sm text-gray-800 bg-transparent focus:outline-hidden"
              required
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#0c5354] hover:bg-[#009b72] text-white text-sm font-semibold rounded-xl transition-colors shadow-xs"
            >
              Search
            </button>
          </form>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/"
              className="px-6 py-3 bg-[#0c5354] hover:bg-[#083a3b] text-white font-semibold text-sm rounded-xl transition-colors shadow-sm"
            >
              Return Home
            </Link>
            <Link
              href="/recipes"
              className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-800 font-semibold text-sm rounded-xl border border-gray-300 transition-colors shadow-xs"
            >
              Browse All Recipes
            </Link>
          </div>

          {/* Helpful Navigation Links */}
          <div className="pt-8 border-t border-gray-200">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
              Or Explore Popular Topics
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {popularCategories.map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className="px-3.5 py-1.5 rounded-full bg-gray-100 hover:bg-[#e8f5f3] hover:text-[#0c5354] text-xs font-medium text-gray-700 transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
