"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { recipesData } from "../data/recipes";

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

  const navLinks: NavItem[] = [
    {
      name: "RECIPE OF THE DAY",
      href: "/recipes/the-one-pan-cheeseburger-pie",
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
      name: "THE 2026 FREEZIES AWARDS",
      href: "/freezies",
      submenu: [
        { name: "Best Frozen Dinners", href: "/freezies/categories/best-frozen-dinners" },
        { name: "Best Ice Cream & Treats", href: "/freezies/categories/best-ice-cream" },
        { name: "Best Frozen Pizzas", href: "/freezies/categories/best-frozen-pizzas" },
        { name: "Best Frozen Breakfasts", href: "/freezies/categories/best-frozen-breakfast" },
        { name: "Best Frozen Snacks", href: "/freezies/categories/best-frozen-snacks" },
        { name: "Best Budget Freezer Finds", href: "/freezies/categories/best-budget-freezer-finds" },
        { name: "Best Healthy Frozen Foods", href: "/freezies/categories/best-healthy-frozen-foods" },
        { name: "Best New Frozen Foods", href: "/freezies/categories/best-new-frozen-foods" },
        { name: "Fruits & Smoothies", href: "/freezies/categories/best-frozen-smoothies" },
        { name: "Supermarket Finds", href: "/freezies/categories/best-supermarket-finds" },
        { name: "Winners Announcement", href: "/freezies/announcement" },
        { name: "Testing Methodology", href: "/freezies/methodology" },
        { name: "About The Freezies", href: "/freezies/about" },
        { name: "VIEW ALL", href: "/freezies" },
      ],
    },
    {
      name: "ABOUT US",
      href: "#about-us",
      submenu: [
        { name: "Our Culinary Team", href: "#about-us" },
        { name: "Editorial Guidelines", href: "#editorial-guidelines" },
        { name: "Contact & FAQ", href: "#contact" },
        { name: "VIEW ALL", href: "#about-us" },
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
        <div className="flex items-center justify-between py-3 md:py-4">
          
          {/* Logo Brand: Simply Recipes */}
          <Link href="/" className="flex items-center gap-3.5 group select-none">
            {/* Flower / Sunburst Icon */}
            <div className="relative flex items-center justify-center w-12 h-12 transition-transform duration-300 group-hover:scale-105">
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                {/* 8 Outer Petal Dots (Teal #49bcc3) */}
                <circle cx="50" cy="16" r="6.8" fill="#49bcc3" />
                <circle cx="74" cy="26" r="6.8" fill="#49bcc3" />
                <circle cx="84" cy="50" r="6.8" fill="#49bcc3" />
                <circle cx="74" cy="74" r="6.8" fill="#49bcc3" />
                <circle cx="50" cy="84" r="6.8" fill="#49bcc3" />
                <circle cx="26" cy="74" r="6.8" fill="#49bcc3" />
                <circle cx="16" cy="50" r="6.8" fill="#49bcc3" />
                <circle cx="26" cy="26" r="6.8" fill="#49bcc3" />

                {/* 8 Mid Petal Dots */}
                <circle cx="50" cy="31" r="5" fill="#49bcc3" />
                <circle cx="63.5" cy="36.5" r="5" fill="#49bcc3" />
                <circle cx="69" cy="50" r="5" fill="#49bcc3" />
                <circle cx="63.5" cy="63.5" r="5" fill="#49bcc3" />
                <circle cx="50" cy="69" r="5" fill="#49bcc3" />
                <circle cx="36.5" cy="63.5" r="5" fill="#49bcc3" />
                <circle cx="31" cy="50" r="5" fill="#49bcc3" />
                <circle cx="36.5" cy="36.5" r="5" fill="#49bcc3" />

                {/* Center Core Circle (Light Aqua #9fe2e5) */}
                <circle cx="50" cy="50" r="6.5" fill="#a0e1e4" />
              </svg>
            </div>

            {/* Typography */}
            <div className="flex flex-col leading-none">
              <span className="font-serif text-[34px] sm:text-[38px] font-bold text-[#0c5354] tracking-tight -mb-1">
                Simply
              </span>
              <span className="font-sans text-[11px] sm:text-[12px] font-black tracking-[0.28em] text-[#009b72] uppercase pl-0.5">
                Recipes
              </span>
            </div>
          </Link>

          {/* Right Utilities (Desktop) */}
          <div className="hidden md:flex items-center gap-1 text-[13.5px] text-gray-700">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-700 hover:text-[#0c5354] transition-colors rounded-full hover:bg-gray-100 cursor-pointer"
              title="Search"
              aria-label="Search"
            >
              <svg
                className="w-5 h-5 stroke-[2.2]"
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
            <span className="h-4 w-[1px] bg-gray-300 mx-2" />

            {/* Newsletters */}
            <Link
              href="#newsletters"
              className="px-2 py-1 hover:text-[#0c5354] font-medium transition-colors"
            >
              Newsletters
            </Link>

            {/* Divider */}
            <span className="h-4 w-[1px] bg-gray-300 mx-2" />

            {/* Sweepstakes */}
            <Link
              href="#sweepstakes"
              className="px-2 py-1 hover:text-[#0c5354] font-medium transition-colors"
            >
              Sweepstakes
            </Link>

            {/* Divider */}
            <span className="h-4 w-[1px] bg-gray-300 mx-2" />

            {/* myrecipes Badge */}
            <Link
              href="#myrecipes"
              className="flex items-center gap-1.5 px-2 py-1 group hover:opacity-90 transition-opacity"
            >
              {/* Pink Heart with black border */}
              <span className="text-[17px] inline-block -rotate-12 transform group-hover:scale-110 transition-transform">
                💖
              </span>
              <div className="flex items-center text-[15px] tracking-tight">
                <span className="font-extrabold text-[#e71d73]">my</span>
                <span className="font-extrabold text-black">recipes</span>
              </div>
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-2">
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

        {/* Expandable Search Input */}
        {isSearchOpen && (
          <div className="py-2.5 pb-4 transition-all duration-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(`Recherche : ${searchQuery}`);
              }}
              className="relative max-w-xl mx-auto flex items-center"
            >
              <input
                type="text"
                placeholder="Search recipes, ingredients, tips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full pl-10 pr-24 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-[#0c5354] focus:ring-1 focus:ring-[#0c5354] bg-gray-50 shadow-inner"
              />
              <svg
                className="w-4 h-4 text-gray-400 absolute left-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <button
                type="submit"
                className="absolute right-1.5 px-4 py-1 bg-[#0c5354] text-white text-xs font-semibold rounded-full hover:bg-[#093f40] transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Main Navigation Bar (Desktop) with Submenu Dropdowns */}
      <nav className="border-t border-gray-200/80 bg-white hidden md:block relative">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-start gap-8 lg:gap-10 text-[13px] lg:text-[13.5px] font-extrabold tracking-wider text-black">
            {navLinks.map((link) => {
              const isOpen = activeDropdown === link.name;
              return (
                <li
                  key={link.name}
                  className="relative group py-3"
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
                  {link.name === "THE 2026 FREEZIES AWARDS" && link.submenu ? (
                    <div
                      className={`absolute top-full -left-20 lg:left-0 w-[620px] bg-white border border-gray-200 shadow-2xl rounded-b-lg p-5 z-50 transition-all duration-150 transform origin-top-left ${
                        isOpen
                          ? "opacity-100 scale-100 visible pointer-events-auto"
                          : "opacity-0 scale-95 invisible pointer-events-none"
                      }`}
                    >
                      <div className="grid grid-cols-12 gap-5 pb-4 border-b border-gray-100">
                        {/* Categories (7 cols) */}
                        <div className="col-span-7">
                          <div className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-2.5">
                            Award Categories
                          </div>
                          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                            <Link href="/freezies/categories/best-frozen-dinners" onClick={() => setActiveDropdown(null)} className="py-1 text-xs font-semibold text-gray-700 hover:text-[#0c5354] flex items-center gap-1.5 transition-colors">
                              <span>🍝</span><span>Frozen Dinners</span>
                            </Link>
                            <Link href="/freezies/categories/best-ice-cream" onClick={() => setActiveDropdown(null)} className="py-1 text-xs font-semibold text-gray-700 hover:text-[#0c5354] flex items-center gap-1.5 transition-colors">
                              <span>🍨</span><span>Ice Cream</span>
                            </Link>
                            <Link href="/freezies/categories/best-frozen-pizzas" onClick={() => setActiveDropdown(null)} className="py-1 text-xs font-semibold text-gray-700 hover:text-[#0c5354] flex items-center gap-1.5 transition-colors">
                              <span>🍕</span><span>Frozen Pizzas</span>
                            </Link>
                            <Link href="/freezies/categories/best-frozen-breakfast" onClick={() => setActiveDropdown(null)} className="py-1 text-xs font-semibold text-gray-700 hover:text-[#0c5354] flex items-center gap-1.5 transition-colors">
                              <span>🧇</span><span>Breakfast</span>
                            </Link>
                            <Link href="/freezies/categories/best-frozen-snacks" onClick={() => setActiveDropdown(null)} className="py-1 text-xs font-semibold text-gray-700 hover:text-[#0c5354] flex items-center gap-1.5 transition-colors">
                              <span>🥟</span><span>Snacks &amp; Bites</span>
                            </Link>
                            <Link href="/freezies/categories/best-budget-freezer-finds" onClick={() => setActiveDropdown(null)} className="py-1 text-xs font-semibold text-gray-700 hover:text-[#0c5354] flex items-center gap-1.5 transition-colors">
                              <span>🏷️</span><span>Budget Finds</span>
                            </Link>
                            <Link href="/freezies/categories/best-healthy-frozen-foods" onClick={() => setActiveDropdown(null)} className="py-1 text-xs font-semibold text-gray-700 hover:text-[#0c5354] flex items-center gap-1.5 transition-colors">
                              <span>🥗</span><span>Healthy Frozen</span>
                            </Link>
                            <Link href="/freezies/categories/best-new-frozen-foods" onClick={() => setActiveDropdown(null)} className="py-1 text-xs font-semibold text-gray-700 hover:text-[#0c5354] flex items-center gap-1.5 transition-colors">
                              <span>✨</span><span>New Foods</span>
                            </Link>
                            <Link href="/freezies/categories/best-frozen-smoothies" onClick={() => setActiveDropdown(null)} className="py-1 text-xs font-semibold text-gray-700 hover:text-[#0c5354] flex items-center gap-1.5 transition-colors">
                              <span>🍓</span><span>Fruits &amp; Bowls</span>
                            </Link>
                            <Link href="/freezies/categories/best-supermarket-finds" onClick={() => setActiveDropdown(null)} className="py-1 text-xs font-semibold text-gray-700 hover:text-[#0c5354] flex items-center gap-1.5 transition-colors">
                              <span>🛒</span><span>Store Brands</span>
                            </Link>
                          </div>
                        </div>

                        {/* Featured Winner Spotlight (5 cols) */}
                        <div className="col-span-5 bg-[#fdfbf7] p-3.5 rounded-lg border border-amber-200/80 flex flex-col justify-between">
                          <div>
                            <span className="inline-block text-[9.5px] font-black uppercase tracking-wider bg-amber-500 text-white px-2 py-0.5 rounded-full mb-1.5">
                              🏆 2026 Grand Champion
                            </span>
                            <div className="text-xs font-bold text-gray-900 leading-snug">
                              Rao&apos;s Meat Lasagna with Bolognese
                            </div>
                            <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">
                              Top score 98/100 across 48 tested frozen dinners.
                            </p>
                          </div>
                          <div className="pt-2 border-t border-amber-100 flex flex-col gap-1 text-[11px] font-semibold text-[#0c5354]">
                            <Link href="/freezies/announcement" onClick={() => setActiveDropdown(null)} className="hover:underline flex items-center gap-1">
                              <span>📢</span><span>Winners Announcement</span>
                            </Link>
                            <Link href="/freezies/methodology" onClick={() => setActiveDropdown(null)} className="hover:underline flex items-center gap-1">
                              <span>🔬</span><span>Testing Methodology</span>
                            </Link>
                            <Link href="/freezies/about" onClick={() => setActiveDropdown(null)} className="hover:underline flex items-center gap-1">
                              <span>📖</span><span>About The Freezies</span>
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Bar */}
                      <div className="pt-3 flex items-center justify-between">
                        <span className="text-[11px] text-gray-400 font-medium">
                          The authoritative guide to American frozen foods.
                        </span>
                        <Link
                          href="/freezies"
                          onClick={() => setActiveDropdown(null)}
                          className="text-xs font-extrabold text-white bg-[#0c5354] hover:bg-[#083c3d] px-4 py-1.5 rounded transition-colors uppercase tracking-wider flex items-center gap-1"
                        >
                          <span>Explore All 2026 Winners</span>
                          <span>→</span>
                        </Link>
                      </div>
                    </div>
                  ) : link.submenu ? (
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
              href="#sweepstakes"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-[#0c5354] font-medium"
            >
              Sweepstakes
            </Link>
            <Link
              href="#myrecipes"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-1.5 font-bold pt-1"
            >
              <span>💖</span>
              <span className="text-[#e71d73]">my</span>
              <span className="text-black">recipes</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

