"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { recipeCollectionsData } from "../data/recipeCollectionsData";
import { cleaningArticlesData } from "../data/cleaningOrganizingData";

export interface UnifiedKitchenItem {
  id: string;
  itemType: "collection" | "cleaning";
  title: string;
  description: string;
  category: string;
  categoryKey: string;
  sectionGroup: "COLLECTIONS" | "CLEANING";
  author: string;
  imageUrl: string;
  imageAlt: string;
  linkHref: string;
  badgeText: string;
  featured?: boolean;
  tags: string[];
}

const allUnifiedItems: UnifiedKitchenItem[] = [
  // 1. Recipe Collections
  ...recipeCollectionsData.map((item) => ({
    id: `col-${item.id}`,
    itemType: "collection" as const,
    title: item.title,
    description: item.description,
    category: "RECIPE COLLECTION",
    categoryKey: item.categoryKey,
    sectionGroup: "COLLECTIONS" as const,
    author: item.author,
    imageUrl: item.imageUrl,
    imageAlt: item.title,
    linkHref: "/recipes",
    badgeText: `${item.recipeCount} Recipes`,
    featured: item.featured,
    tags: [...(item.tags || []), item.categoryKey, "Recipe Collection"],
  })),

  // 2. Cleaning & Organizing Articles
  ...cleaningArticlesData.map((item) => ({
    id: `clean-${item.id}`,
    itemType: "cleaning" as const,
    title: item.title,
    description: item.description,
    category: item.category,
    categoryKey: item.categoryKey,
    sectionGroup: "CLEANING" as const,
    author: item.author,
    imageUrl: item.imageUrl,
    imageAlt: item.imageAlt,
    linkHref: `/cleaning-and-organizing#${item.slug}`,
    badgeText: `⏱ ${item.readTime}`,
    featured: item.featured,
    tags: [item.category, item.categoryKey, "Cleaning & Organizing"],
  })),
];

const categoryFilters = [
  { label: "ALL IN THE KITCHEN", key: "ALL" },
  { label: "RECIPE COLLECTIONS", key: "COLLECTIONS_ONLY" },
  { label: "CLEANING & ORGANIZING", key: "CLEANING_ONLY" },
  { label: "KITCHEN CLEANING", key: "CLEANING" },
  { label: "ORGANIZATION & STORAGE", key: "ORGANIZATION" },
  { label: "APPLIANCE CARE", key: "APPLIANCES" },
  { label: "PANTRY & FRIDGE", key: "PANTRY" },
  { label: "COOKWARE CARE", key: "COOKWARE" },
  { label: "WEEKNIGHT DINNERS", key: "WEEKNIGHT" },
  { label: "FAST & EASY", key: "FAST" },
  { label: "SUMMER & COOKOUTS", key: "SUMMER" },
  { label: "ITALIAN & MEDITERRANEAN", key: "ITALIAN" },
  { label: "COMFORT FOOD", key: "COMFORT" },
  { label: "EVERYDAY HABITS", key: "HABITS" },
];

export default function InTheKitchenPage() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "collectionsFirst" | "cleaningFirst" | "alphabetical">("featured");
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(24);

  const toggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredItems = useMemo(() => {
    return allUnifiedItems.filter((item) => {
      // Filter tab matching
      if (activeFilter !== "ALL") {
        if (activeFilter === "COLLECTIONS_ONLY") {
          if (item.sectionGroup !== "COLLECTIONS") return false;
        } else if (activeFilter === "CLEANING_ONLY") {
          if (item.sectionGroup !== "CLEANING") return false;
        } else if (activeFilter === "ITALIAN") {
          if (item.categoryKey !== "ITALIAN" && !item.tags.includes("Mediterranean") && !item.tags.includes("Greek")) {
            return false;
          }
        } else if (item.categoryKey !== activeFilter) {
          return false;
        }
      }

      // Search matching
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = item.title.toLowerCase().includes(q);
        const inDesc = item.description.toLowerCase().includes(q);
        const inAuthor = item.author.toLowerCase().includes(q);
        const inCat = item.category.toLowerCase().includes(q);
        const inTags = item.tags.some((t) => t.toLowerCase().includes(q));
        return inTitle || inDesc || inAuthor || inCat || inTags;
      }

      return true;
    });
  }, [activeFilter, searchQuery]);

  const sortedItems = useMemo(() => {
    const list = [...filteredItems];
    if (sortBy === "collectionsFirst") {
      list.sort((a, b) => (a.itemType === "collection" ? -1 : 1));
    } else if (sortBy === "cleaningFirst") {
      list.sort((a, b) => (a.itemType === "cleaning" ? -1 : 1));
    } else if (sortBy === "alphabetical") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      // Featured first
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return list;
  }, [filteredItems, sortBy]);

  const displayedItems = sortedItems.slice(0, visibleCount);

  // Spotlights for the top row (2 top collections + 2 top cleaning guides)
  const spotlightCollections = allUnifiedItems.filter((i) => i.itemType === "collection" && i.featured).slice(0, 2);
  const spotlightCleaning = allUnifiedItems.filter((i) => i.itemType === "cleaning" && i.featured).slice(0, 2);
  const spotlightAll = [...spotlightCollections, ...spotlightCleaning];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "In The Kitchen - Recipe Collections, Cleaning & Organizing - Simply Recipes",
    description: "The complete In The Kitchen hub: curated recipe collections, weeknight cooking inspiration, natural cleaning formulas, and smart home organization.",
    url: "http://localhost:3000/in-the-kitchen",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: allUnifiedItems.slice(0, 15).map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
        description: item.description,
        image: `http://localhost:3000${item.imageUrl}`,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <style jsx>{`
        .kitchen-hub-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #ffffff;
          color: #222222;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }

        .kitchen-container {
          max-width: 1320px;
          margin: 0 auto;
          padding: 24px 20px 80px;
          width: 100%;
        }

        /* ── Header ── */
        .kitchen-header {
          text-align: center;
          margin-bottom: 32px;
          padding-top: 8px;
        }

        .kitchen-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.6px;
          color: #0c5354;
          background: #e8f5f4;
          padding: 5px 14px;
          border-radius: 20px;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .kitchen-title {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 38px;
          font-weight: 700;
          letter-spacing: -0.5px;
          color: #111111;
          margin-bottom: 14px;
          line-height: 1.15;
        }

        @media (min-width: 768px) {
          .kitchen-title {
            font-size: 48px;
          }
        }

        .kitchen-desc {
          font-size: 16px;
          color: #4a4a4a;
          max-width: 840px;
          margin: 0 auto;
          line-height: 1.65;
        }

        /* ── Quick Switch Hub Banner ── */
        .hub-switch-banner {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          margin: 0 auto 32px;
          max-width: 880px;
        }

        @media (min-width: 640px) {
          .hub-switch-banner {
            grid-template-columns: 1fr 1fr;
          }
        }

        .hub-card-link {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          background: #f8faf9;
          border: 1px solid #dbeae8;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .hub-card-link:hover {
          background: #eef7f6;
          border-color: #0c5354;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(12, 83, 84, 0.08);
        }

        .hub-icon {
          font-size: 28px;
          flex-shrink: 0;
        }

        .hub-link-title {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 17px;
          font-weight: 700;
          color: #0c5354;
          margin-bottom: 3px;
        }

        .hub-link-desc {
          font-size: 12.5px;
          color: #555555;
          line-height: 1.35;
        }

        /* ── Filters ── */
        .filters-wrap {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 8px 10px;
          margin-bottom: 30px;
          padding-bottom: 16px;
          border-bottom: 1px solid #eaeaea;
        }

        .filter-btn {
          background: none;
          border: 1px solid transparent;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.7px;
          color: #333333;
          text-transform: uppercase;
          cursor: pointer;
          padding: 8px 14px;
          border-radius: 24px;
          transition: all 0.2s ease;
        }

        .filter-btn:hover {
          color: #0c5354;
          background: #f0f7f6;
          border-color: #d1e8e6;
        }

        .filter-btn.active {
          color: #ffffff;
          background: #0c5354;
          border-color: #0c5354;
          box-shadow: 0 2px 8px rgba(12, 83, 84, 0.2);
        }

        /* ── Controls Bar ── */
        .controls-bar {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 36px;
          background: #fafafa;
          border: 1px solid #eeeeee;
          padding: 14px 20px;
          border-radius: 8px;
        }

        @media (min-width: 768px) {
          .controls-bar {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        }

        .search-box {
          position: relative;
          flex: 1;
          max-width: 460px;
        }

        .search-input {
          width: 100%;
          padding: 10px 14px 10px 38px;
          font-size: 14px;
          border: 1px solid #dcdcdc;
          border-radius: 6px;
          background: #ffffff;
          outline: none;
          transition: border-color 0.2s;
        }

        .search-input:focus {
          border-color: #0c5354;
          box-shadow: 0 0 0 2px rgba(12, 83, 84, 0.1);
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #888888;
          pointer-events: none;
        }

        .results-count {
          font-size: 13.5px;
          font-weight: 600;
          color: #555555;
          white-space: nowrap;
        }

        .sort-select {
          padding: 8px 14px;
          font-size: 13px;
          font-weight: 600;
          color: #333333;
          background: #ffffff;
          border: 1px solid #dcdcdc;
          border-radius: 6px;
          cursor: pointer;
          outline: none;
        }

        /* ── Top Spotlight Grid (4 Cards: 2 Collections + 2 Cleaning) ── */
        .spotlight-section {
          margin-bottom: 40px;
        }

        .spotlight-heading {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 22px;
          font-weight: 700;
          color: #111111;
          margin-bottom: 16px;
          padding-bottom: 8px;
          border-bottom: 2px solid #0c5354;
          display: inline-block;
        }

        .spotlight-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 24px;
        }

        @media (min-width: 600px) {
          .spotlight-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 992px) {
          .spotlight-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        /* ── Main 4-Column Grid ── */
        .items-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 28px;
          margin-bottom: 48px;
        }

        @media (min-width: 540px) {
          .items-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 900px) {
          .items-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        /* ── Card ── */
        .kitchen-card {
          display: flex;
          flex-direction: column;
          background: #ffffff;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .kitchen-card:hover {
          transform: translateY(-3px);
        }

        .card-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          border-radius: 4px;
          overflow: hidden;
          background: #f3f3f3;
          margin-bottom: 12px;
        }

        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.3s ease;
        }

        .kitchen-card:hover .card-img {
          transform: scale(1.03);
        }

        .save-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.92);
          border: none;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #444444;
          font-size: 15px;
          transition: all 0.2s ease;
          z-index: 2;
        }

        .save-btn:hover {
          background: #ffffff;
          transform: scale(1.1);
        }

        .save-btn.saved {
          color: #e02424;
          background: #ffffff;
        }

        .badge-bottom {
          position: absolute;
          bottom: 10px;
          left: 10px;
          color: #ffffff;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.5px;
          padding: 3px 8px;
          border-radius: 3px;
          text-transform: uppercase;
        }

        .badge-bottom.collection {
          background: rgba(12, 83, 84, 0.9);
        }

        .badge-bottom.cleaning {
          background: rgba(0, 155, 114, 0.92);
        }

        .type-pill {
          position: absolute;
          top: 10px;
          left: 10px;
          color: #ffffff;
          font-size: 9.5px;
          font-weight: 800;
          letter-spacing: 0.8px;
          padding: 3px 8px;
          border-radius: 3px;
          text-transform: uppercase;
        }

        .type-pill.collection {
          background: #0c5354;
        }

        .type-pill.cleaning {
          background: #ba4f1c;
        }

        .card-content {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .card-cat {
          font-size: 10.5px;
          font-weight: 800;
          letter-spacing: 1px;
          color: #009b72;
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        .card-title {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 16.5px;
          font-weight: 700;
          line-height: 1.35;
          color: #1a1a1a;
          margin-bottom: 8px;
          text-decoration: none;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.15s ease;
        }

        .card-title:hover {
          color: #0c5354;
        }

        .card-desc {
          font-size: 13px;
          color: #666666;
          line-height: 1.45;
          margin-bottom: 10px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
          color: #777777;
          margin-top: auto;
          padding-top: 6px;
          border-top: 1px solid #f2f2f2;
        }

        /* ── Accent banner ── */
        .kitchen-accent-banner {
          margin: 36px 0 44px;
          background: #f7faf9;
          border: 1px dashed #49bcc3;
          border-radius: 6px;
          padding: 20px;
          text-align: center;
          font-size: 14.5px;
          color: #0c5354;
          font-weight: 600;
          line-height: 1.5;
        }

        /* ── Load More ── */
        .load-more-wrap {
          text-align: center;
          margin: 20px 0 60px;
        }

        .load-more-btn {
          background: #0c5354;
          color: #ffffff;
          border: none;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          padding: 13px 34px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 3px 8px rgba(12, 83, 84, 0.25);
        }

        .load-more-btn:hover {
          background: #083c3d;
          transform: translateY(-2px);
        }
      `}</style>

      <div className="kitchen-hub-page">
        <Header />

        <main className="kitchen-container">
          {/* Header Section */}
          <header className="kitchen-header">
            <span className="kitchen-badge">In The Kitchen</span>
            <h1 className="kitchen-title">In The Kitchen: All Guides &amp; Collections</h1>
            <p className="kitchen-desc">
              Your complete culinary and home care resource. Browse our full library of weeknight
              recipe round-ups, seasonal menus, natural cleaning formulas, appliance care routines,
              and smart pantry organization solutions.
            </p>
          </header>

          {/* Quick Hub Navigation Cards */}
          <div className="hub-switch-banner">
            <Link href="/recipe-collections" className="hub-card-link">
              <span className="hub-icon">🍳</span>
              <div>
                <div className="hub-link-title">Recipe Collections (28)</div>
                <div className="hub-link-desc">Curated meal plans, 30-minute dinners &amp; seasonal round-ups</div>
              </div>
            </Link>
            <Link href="/cleaning-and-organizing" className="hub-card-link">
              <span className="hub-icon">✨</span>
              <div>
                <div className="hub-link-title">Cleaning &amp; Organizing (24)</div>
                <div className="hub-link-desc">Pro techniques, natural formulas &amp; clutter-free systems</div>
              </div>
            </Link>
          </div>

          {/* Filter Pills */}
          <nav className="filters-wrap" aria-label="In The Kitchen Categories">
            {categoryFilters.map((cat) => (
              <button
                key={cat.key}
                className={`filter-btn${activeFilter === cat.key ? " active" : ""}`}
                onClick={() => {
                  setActiveFilter(cat.key);
                  setVisibleCount(24);
                }}
              >
                {cat.label}
              </button>
            ))}
          </nav>

          {/* Controls Bar: Search & Sort */}
          <div className="controls-bar">
            <div className="search-box">
              <svg
                className="search-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Search all recipe collections, cleaning hacks, pantry tips..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(24);
                }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <span className="results-count">
                Showing {Math.min(visibleCount, sortedItems.length)} of{" "}
                {sortedItems.length} items
              </span>

              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort in the kitchen items"
              >
                <option value="featured">Featured First</option>
                <option value="collectionsFirst">Collections First</option>
                <option value="cleaningFirst">Cleaning Guides First</option>
                <option value="alphabetical">Alphabetical (A–Z)</option>
              </select>
            </div>
          </div>

          {/* Featured Spotlight Grid (Top 4 items: Collections + Cleaning) */}
          {activeFilter === "ALL" && !searchQuery.trim() && (
            <section className="spotlight-section" aria-label="Featured In The Kitchen Spotlights">
              <h2 className="spotlight-heading">Featured Highlights</h2>
              <div className="spotlight-grid">
                {spotlightAll.map((item) => {
                  const isSaved = savedIds.includes(item.id);
                  return (
                    <article key={item.id} className="kitchen-card">
                      <div className="card-img-wrap">
                        <Link href={item.linkHref}>
                          <img
                            src={item.imageUrl}
                            alt={item.imageAlt}
                            className="card-img"
                            loading="lazy"
                          />
                        </Link>
                        <span className={`type-pill ${item.itemType}`}>
                          {item.itemType === "collection" ? "Collection" : "Guide"}
                        </span>
                        <span className={`badge-bottom ${item.itemType}`}>
                          {item.badgeText}
                        </span>
                        <button
                          className={`save-btn${isSaved ? " saved" : ""}`}
                          onClick={() => toggleSave(item.id)}
                          aria-label={isSaved ? "Unsave item" : "Save item"}
                        >
                          {isSaved ? "♥" : "♡"}
                        </button>
                      </div>

                      <div className="card-content">
                        <div className="card-cat">{item.category}</div>
                        <Link href={item.linkHref} className="card-title">
                          {item.title}
                        </Link>
                        <p className="card-desc">{item.description}</p>
                        <div className="card-meta">
                          <span>{item.author}</span>
                          <span style={{ fontWeight: 600, color: "#0c5354" }}>Explore →</span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="kitchen-accent-banner">
                🌟 <strong>Everything In The Kitchen:</strong> Discover over 50 curated recipe round-ups and household guides tested to make cooking joyful and kitchen care effortless.
              </div>
            </section>
          )}

          {/* Main 4-Column Grid */}
          {displayedItems.length > 0 ? (
            <section className="items-grid" aria-label="In The Kitchen All Items Grid">
              {displayedItems.map((item) => {
                const isSaved = savedIds.includes(item.id);
                return (
                  <article key={item.id} className="kitchen-card">
                    <div className="card-img-wrap">
                      <Link href={item.linkHref}>
                        <img
                          src={item.imageUrl}
                          alt={item.imageAlt}
                          className="card-img"
                          loading="lazy"
                        />
                      </Link>
                      <span className={`type-pill ${item.itemType}`}>
                        {item.itemType === "collection" ? "Collection" : "Guide"}
                      </span>
                      <span className={`badge-bottom ${item.itemType}`}>
                        {item.badgeText}
                      </span>
                      <button
                        className={`save-btn${isSaved ? " saved" : ""}`}
                        onClick={() => toggleSave(item.id)}
                        aria-label={isSaved ? "Unsave item" : "Save item"}
                      >
                        {isSaved ? "♥" : "♡"}
                      </button>
                    </div>

                    <div className="card-content">
                      <div className="card-cat">{item.category}</div>
                      <Link href={item.linkHref} className="card-title">
                        {item.title}
                      </Link>
                      <p className="card-desc">{item.description}</p>
                      <div className="card-meta">
                        <span>{item.author}</span>
                        <span style={{ fontWeight: 600, color: "#0c5354" }}>Read →</span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>
          ) : (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#666" }}>
              <p style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}>
                No items found matching your search.
              </p>
              <p style={{ fontSize: "14px" }}>
                Try searching for ingredients, appliances, or clearing filters.
              </p>
            </div>
          )}

          {/* Load More Button */}
          {visibleCount < sortedItems.length && (
            <div className="load-more-wrap">
              <button
                className="load-more-btn"
                onClick={() => setVisibleCount((prev) => prev + 16)}
              >
                Load More Items ({sortedItems.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}
