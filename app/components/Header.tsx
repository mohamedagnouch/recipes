"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFavorites } from "../utils/favorites";
import FavoritesDrawer from "./FavoritesDrawer";
import { searchRecipes } from "../data/allRecipes";

interface SubMenuItem {
  name: string;
  href: string;
  isSpecial?: boolean;
}

interface NavItem {
  name: string;
  href: string;
  submenu?: SubMenuItem[];
}

export default function Header() {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  const { count: favoritesCount } = useFavorites();

  const liveResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchRecipes(searchQuery.trim()).slice(0, 5);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks: NavItem[] = [
    {
      name: "RECIPE OF THE DAY",
      href: "/recipes/moroccan-couscous-seven-vegetables",
      submenu: [
        { name: "Recipe Round-up", href: "/recipe-round-up" },
        { name: "Surprise Me!", href: "/recipes/giada-de-laurentiis-lemon-spaghetti", isSpecial: true },
        { name: "VIEW ALL", href: "/recipes" },
      ],
    },
    {
      name: "RECIPES",
      href: "/recipes",
      submenu: [
        { name: "Dinner", href: "/dinner" },
        { name: "Breakfast", href: "/breakfast" },
        { name: "Lunch", href: "/lunch" },
        { name: "Desserts", href: "/desserts" },
        { name: "Appetizers", href: "/appetizers" },
        { name: "VIEW ALL", href: "/recipes" },
      ],
    },
    {
      name: "IN THE KITCHEN",
      href: "/in-the-kitchen",
      submenu: [
        { name: "Recipe Collections", href: "/recipe-collections" },
        { name: "Cleaning & Organizing", href: "/cleaning-and-organizing" },
        { name: "VIEW ALL", href: "/in-the-kitchen" },
      ],
    },
    {
      name: "FOOD NEWS",
      href: "/food-news",
      submenu: [
        { name: "News & Trends", href: "/food-news#news-trends" },
        { name: "Celebrity", href: "/food-news#celebrity" },
        { name: "Recipes", href: "/food-news#popular-recipes" },
        { name: "Food Trends", href: "/food-news#food-trends" },
        { name: "Restaurant News", href: "/food-news#restaurant-news" },
        { name: "Grocery News", href: "/food-news#grocery-news" },
        { name: "Most Popular", href: "/food-news#most-popular" },
        { name: "VIEW ALL", href: "/food-news#all" },
      ],
    },

    {
      name: "ABOUT US",
      href: "/about",
      submenu: [
        { name: "About Dishora", href: "/about" },
        { name: "Editorial Guidelines", href: "/editorial-guidelines" },
        { name: "Contact & FAQ", href: "/contact" },
        { name: "Careers", href: "/careers" },
        { name: "Advertise", href: "/advertise" },
        { name: "Terms of Service", href: "/terms-of-service" },
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "VIEW ALL", href: "/about" },
      ],
    },
  ];

  const handleSurpriseMe = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/recipes/giada-de-laurentiis-lemon-spaghetti");
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 text-gray-900 sticky top-0 z-50 shadow-xs">
      {/* Top Logo & Utilities Row */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 md:py-2.5">
          
          {/* Logo Brand: Dishora */}
          <Link href="/" className="flex items-center group select-none py-0.5">
            <Image
              src="/images/dishora-logo.png"
              alt="Dishora - Recipes for a better table"
              width={200}
              height={90}
              priority
              className="h-8 sm:h-9 md:h-10.5 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Right Utilities (Desktop) */}
          <div className="hidden md:flex items-center gap-1 text-[12.5px] text-gray-700">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-1.5 text-gray-700 hover:text-[#0c5354] transition-colors rounded-full hover:bg-gray-100 cursor-pointer"
              title="Search"
              aria-label="Search"
            >
              <svg
                className="w-4.5 h-4.5 stroke-[2.2]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>

            {/* Divider */}
            <span className="h-3.5 w-[1px] bg-gray-300 mx-1.5" />

            {/* Newsletters */}
            <Link
              href="#newsletters"
              className="px-1.5 py-0.5 hover:text-[#0c5354] font-medium transition-colors"
            >
              Newsletters
            </Link>

            {/* Divider */}
            <span className="h-3.5 w-[1px] bg-gray-300 mx-1.5" />

            {/* Sweepstakes */}
            <Link
              href="/sweepstakes"
              className="px-1.5 py-0.5 hover:text-[#0c5354] font-medium transition-colors"
            >
              Sweepstakes
            </Link>

            {/* Divider */}
            <span className="h-3.5 w-[1px] bg-gray-300 mx-1.5" />

            {/* myrecipes Badge */}
            <button
              onClick={() => setIsFavoritesOpen(true)}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded-full hover:bg-pink-50/80 group transition-all cursor-pointer select-none"
              title="View Saved Recipes"
            >
              {/* Pink Heart with black border */}
              <span className="text-[15px] inline-block -rotate-12 transform group-hover:scale-110 transition-transform">
                💖
              </span>
              <div className="flex items-center text-[13.5px] tracking-tight">
                <span className="font-extrabold text-[#e71d73]">my</span>
                <span className="font-extrabold text-black">recipes</span>
              </div>
              {favoritesCount > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-[9.5px] font-black bg-[#e71d73] text-white rounded-full leading-none shadow-xs">
                  {favoritesCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsFavoritesOpen(true)}
              className="relative p-1.5 text-gray-700 hover:text-[#e71d73] rounded-lg"
              aria-label="Saved Recipes"
            >
              <span className="text-lg">💖</span>
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 text-[9px] font-black bg-[#e71d73] text-white rounded-full flex items-center justify-center leading-none">
                  {favoritesCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-700 hover:text-black rounded-lg"
              aria-label="Search"
            >
              <svg className="w-5 h-5 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-black rounded-lg focus:outline-none"
              aria-label="Open Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>

        {/* Expandable Search Input with Live Dropdown Autocomplete */}
        {isSearchOpen && (
          <div className="py-2.5 pb-4 transition-all duration-200 relative">
            <form
              onSubmit={handleSearchSubmit}
              className="relative max-w-xl mx-auto flex items-center"
            >
              <input
                type="text"
                placeholder="Search recipes, ingredients (e.g. lemon spaghetti, chicken, cake)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full pl-10 pr-24 py-2.5 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-[#0c5354] focus:ring-2 focus:ring-[#0c5354]/20 bg-gray-50 shadow-inner"
              />
              <svg
                className="w-4 h-4 text-gray-400 absolute left-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-20 text-gray-400 hover:text-gray-600 text-xs p-1"
                >
                  ✕
                </button>
              )}
              <button
                type="submit"
                className="absolute right-1.5 px-4 py-1.5 bg-[#0c5354] hover:bg-[#093f40] text-white text-xs font-semibold rounded-full transition-colors cursor-pointer"
              >
                Search
              </button>
            </form>

            {/* Live Autocomplete Results Dropdown */}
            {searchQuery.trim().length > 0 && (
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                <div className="p-2 border-b border-gray-100 flex items-center justify-between text-xs text-gray-500 px-3 bg-gray-50/80">
                  <span>Quick Results</span>
                  <Link
                    href={`/search?q=${encodeURIComponent(searchQuery.trim())}`}
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="text-[#0c5354] font-bold hover:underline"
                  >
                    View all results →
                  </Link>
                </div>

                {liveResults.length === 0 ? (
                  <div className="p-4 text-center text-xs text-gray-500">
                    No recipes found matching &ldquo;{searchQuery}&rdquo;. Press Search to see all recipes.
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100 max-h-[340px] overflow-y-auto">
                    {liveResults.map((r) => (
                      <Link
                        key={r.slug}
                        href={`/recipes/${r.slug}`}
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSearchQuery("");
                        }}
                        className="flex items-center gap-3 p-2.5 hover:bg-[#f3f9f8] transition-colors group"
                      >
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                          <Image
                            src={r.imageUrl || "/images/cheeseburger-pie.jpg"}
                            alt={r.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                            sizes="48px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-black uppercase text-[#0c5354] tracking-wider">
                              {r.category || r.badge || "RECIPE"}
                            </span>
                            {r.totalTime && (
                              <span className="text-[10px] text-gray-400">
                                • {r.totalTime}
                              </span>
                            )}
                          </div>
                          <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#0c5354] truncate">
                            {r.title}
                          </h4>
                          {r.rating && (
                            <span className="text-[10px] text-amber-500 font-semibold">
                              ★ {r.rating.toFixed(1)}
                            </span>
                          )}
                        </div>
                        <span className="text-gray-300 group-hover:text-[#0c5354] text-xs">
                          →
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Navigation Bar (Desktop) with Submenu Dropdowns */}
      <nav className="border-t border-gray-200/80 bg-white hidden md:block relative">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-start gap-6 lg:gap-8 text-[12px] lg:text-[12.5px] font-extrabold tracking-wider text-black">
            {navLinks.map((link) => {
              const isOpen = activeDropdown === link.name;
              return (
                <li
                  key={link.name}
                  className="relative group py-2"
                  onMouseEnter={() => setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={`transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#0c5354] after:transition-all after:duration-200 ${
                      isOpen
                        ? "text-[#0c5354] after:w-full"
                        : "hover:text-[#0c5354] after:w-0 hover:after:w-full"
                    }`}
                  >
                    {link.name}
                  </Link>

                  {/* Dropdown Menu */}
                  {link.submenu ? (
                    <div
                      className={`absolute top-full left-0 w-48 bg-white border border-gray-200/90 shadow-lg py-2.5 z-50 transition-all duration-150 transform origin-top-left ${
                        isOpen
                          ? "opacity-100 scale-100 visible pointer-events-auto"
                          : "opacity-0 scale-95 invisible pointer-events-none"
                      }`}
                    >
                      <div className="flex flex-col">
                        {link.submenu.map((sub, idx) => {
                          const isViewAll = sub.name === "VIEW ALL";
                          return isViewAll ? (
                            <div key={idx} className="pt-2 mt-1 border-t border-gray-100 px-4">
                              <Link
                                href={sub.href}
                                onClick={() => setActiveDropdown(null)}
                                className="block text-[11.5px] font-black text-gray-900 hover:text-[#0c5354] uppercase tracking-wider py-1"
                              >
                                {sub.name}
                              </Link>
                            </div>
                          ) : (
                            <Link
                              key={idx}
                              href={sub.href}
                              onClick={(e) => {
                                if (sub.isSpecial) {
                                  handleSurpriseMe(e);
                                }
                                setActiveDropdown(null);
                              }}
                              className="px-4 py-1.5 text-[13.5px] font-medium text-gray-700 hover:text-[#0c5354] hover:bg-[#f3f9f8] transition-colors"
                            >
                              {sub.name}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Drawer Menu with Accordion Submenus */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-3 shadow-lg max-h-[80vh] overflow-y-auto">
          <ul className="space-y-1">
            {navLinks.map((link) => {
              const isExpanded = expandedMobileItem === link.name;
              return (
                <li key={link.name} className="border-b border-gray-100 last:border-b-0 pb-1">
                  <div className="flex items-center justify-between py-1.5">
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-sm font-extrabold text-gray-900 hover:text-[#0c5354] tracking-wide"
                    >
                      {link.name}
                    </Link>
                    {link.submenu && (
                      <button
                        onClick={() =>
                          setExpandedMobileItem(isExpanded ? null : link.name)
                        }
                        className="p-1.5 text-gray-500 hover:text-[#0c5354]"
                        aria-label="Toggle submenu"
                      >
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Mobile Submenu Accordion */}
                  {isExpanded && link.submenu && (
                    <div className="pl-3 py-1 space-y-1 bg-gray-50/70 rounded-xs mb-1">
                      {link.submenu.map((sub, idx) => (
                        <Link
                          key={idx}
                          href={sub.href}
                          onClick={(e) => {
                            if (sub.isSpecial) handleSurpriseMe(e);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`block py-1 text-xs ${
                            sub.name === "VIEW ALL"
                              ? "font-black text-gray-900 uppercase pt-1 border-t border-gray-200"
                              : "text-gray-600 hover:text-[#0c5354]"
                          }`}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="pt-3 border-t border-gray-200 flex flex-col gap-2.5 text-sm text-gray-700">
            <Link
              href="#newsletters"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-[#0c5354] font-medium"
            >
              Newsletters
            </Link>
            <Link
              href="/sweepstakes"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-[#0c5354] font-medium"
            >
              Sweepstakes
            </Link>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsFavoritesOpen(true);
              }}
              className="flex items-center gap-1.5 font-bold pt-1 text-left cursor-pointer"
            >
              <span>💖</span>
              <span className="text-[#e71d73]">my</span>
              <span className="text-black">recipes</span>
              {favoritesCount > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-[10px] font-black bg-[#e71d73] text-white rounded-full leading-none">
                  {favoritesCount}
                </span>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Global Saved Recipes Drawer */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
      />
    </header>
  );
}

