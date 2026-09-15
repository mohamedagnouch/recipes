"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface NewsItem {
  id: number;
  slug: string;
  category: string;
  timeAgo: string;
  title: string;
  author: string;
  imageUrl: string;
  imageAlt: string;
}

const latestNews: NewsItem[] = [
  {
    id: 1,
    slug: "dollar-tree-1-50-find-wish-bought-sooner",
    category: "GROCERIES",
    timeAgo: "20 MINUTES AGO",
    title: "The $1.50 Dollar Tree Find I Wish I Bought Sooner",
    author: "By Kim Osborne",
    imageUrl: "/images/food-news/canadian-grocery-aisle.jpg",
    imageAlt: "Dollar Tree grocery shelves",
  },
  {
    id: 2,
    slug: "cooked-chicken-same-way-one-change-so-much-better",
    category: "COOKING TIPS & TECHNIQUES",
    timeAgo: "58 MINUTES AGO",
    title: "I Cooked Chicken the Same Way for Years—This One Change Made It So Much Better",
    author: "By Sam Dir",
    imageUrl: "/images/tip-roast-chicken.jpg",
    imageAlt: "Crispy roasted chicken",
  },
  {
    id: 3,
    slug: "asked-3-chefs-if-grass-fed-butter-worth-buying",
    category: "COOKING TIPS & TECHNIQUES",
    timeAgo: "1 HOUR AGO",
    title: "I Asked 3 Chefs If Grass-Fed Butter Is Worth Buying—They All Said the Same Thing",
    author: "By Molly Allen",
    imageUrl: "/images/tip-grass-fed-butter.jpg",
    imageAlt: "Fresh grass-fed butter block",
  },
  {
    id: 4,
    slug: "asked-4-chefs-if-beef-tallow-worth-buying",
    category: "COOKING TIPS & TECHNIQUES",
    timeAgo: "5 HOURS AGO",
    title: "I Asked 4 Chefs If Beef Tallow Is Worth Buying—They All Said the Same Thing",
    author: "By Laurel Randolph",
    imageUrl: "/images/tip-beef-tallow.jpg",
    imageAlt: "Whipped beef tallow",
  },
  {
    id: 5,
    slug: "only-way-making-avocado-toast-from-now-on-genius",
    category: "GROCERIES",
    timeAgo: "6 HOURS AGO",
    title: "The Only Way I'm Making Avocado Toast From Now on (It's Genius)",
    author: "By Laurel Randolph",
    imageUrl: "/images/avocado-bean-toast.jpg",
    imageAlt: "Delicious avocado toast with seasoning",
  },
];

export default function HeroSection() {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Column: Featured Main Recipe (Hero) */}
        <article className="lg:col-span-7 xl:col-span-8 flex flex-col group">
          {/* Main Hero Image with Save Button */}
          <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden bg-gray-100 mb-5 shadow-xs">
            <Link href="/recipes/moroccan-couscous-seven-vegetables" className="block w-full h-full">
              <img
                src="/images/moroccan-couscous-seven-vegetables.jpg"
                alt="Authentic Moroccan Couscous with Seven Vegetables & Tender Beef"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </Link>
            {/* Save Heart Button */}
            <button
              onClick={() => setIsSaved(!isSaved)}
              className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-gray-700 hover:text-red-500 hover:bg-white shadow-md transition-all duration-200 cursor-pointer"
              title="Save recipe"
              aria-label="Save recipe"
            >
              <svg
                className={`w-5 h-5 ${isSaved ? "fill-red-500 text-red-500" : "fill-none stroke-current stroke-2"}`}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </button>
          </div>

          {/* Metadata & Description */}
          <div className="flex flex-col">
            <span className="text-[11.5px] sm:text-[12px] font-black tracking-widest text-[#009b72] uppercase mb-2">
              SIGNATURE FEAST • TRADITIONAL DINNER
            </span>

            <Link href="/recipes/moroccan-couscous-seven-vegetables">
              <h1 className="font-serif text-xl sm:text-3xl lg:text-[34px] font-bold text-gray-900 leading-[1.25] mb-3 group-hover:text-[#0c5354] transition-colors break-words">
                Authentic Moroccan Couscous with Seven Vegetables & Tender Beef
              </h1>
            </Link>

            <p className="text-[14px] sm:text-[16px] text-gray-600 leading-relaxed mb-4">
              Steamed to cloud-light perfection over a slow-simmered saffron and ginger broth, this royal Moroccan couscous is piled high with tender beef, roasted chicken, melting pumpkin, carrots, zucchini, and chickpeas.
            </p>

            {/* Rating Stars & Cook Time */}
            <div className="flex items-center gap-3 mb-2.5">
              <div className="flex text-[#009b72] text-[15px] tracking-tight">
                ★ ★ ★ ★ ★
              </div>
              <div className="flex items-center gap-1.5 text-[13px] font-semibold text-gray-600">
                <svg className="w-4 h-4 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>2 hrs</span>
              </div>
            </div>

            <div className="text-[13.5px] text-gray-500 font-normal">
              By <span className="text-gray-700 font-medium hover:underline cursor-pointer">Chef Dishora</span>
            </div>
          </div>
        </article>

        {/* Right Column: Latest News */}
        <aside className="lg:col-span-5 xl:col-span-4 flex flex-col">
          <h2 className="font-serif text-xl sm:text-[22px] font-bold text-gray-900 mb-6 pb-2.5 border-b border-gray-200">
            Latest News
          </h2>

          <div className="flex flex-col divide-y divide-gray-100">
            {latestNews.map((news) => (
              <article key={news.id} className="py-4 first:pt-0 last:pb-0 group">
                <div className="flex items-start justify-between gap-4">
                  
                  {/* News Info (Left) */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-1.5 text-[10.5px] font-extrabold text-[#009b72] tracking-wider uppercase mb-1">
                      <span>{news.category}</span>
                      <span className="text-gray-400 font-normal">•</span>
                      <span className="text-gray-500 font-semibold">{news.timeAgo}</span>
                    </div>

                    <Link href={`/food-news/${news.slug}`}>
                      <h3 className="text-[14.5px] sm:text-[15px] font-bold text-gray-900 leading-snug group-hover:text-[#0c5354] transition-colors mb-2">
                        {news.title}
                      </h3>
                    </Link>

                    <span className="text-[12.5px] text-gray-500">
                      {news.author}
                    </span>
                  </div>

                  {/* Thumbnail (Right) */}
                  <Link
                    href={`/food-news/${news.slug}`}
                    className="shrink-0 w-20 h-20 sm:w-[90px] sm:h-[90px] rounded-xs overflow-hidden bg-gray-100 relative group-hover:opacity-90 transition-opacity"
                  >
                    <img
                      src={news.imageUrl}
                      alt={news.imageAlt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </Link>

                </div>
              </article>
            ))}
          </div>
        </aside>

      </div>
    </section>
  );
}
