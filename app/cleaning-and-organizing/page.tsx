"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { cleaningArticlesData } from "../data/cleaningOrganizingData";

const categoryFilters = [
  { label: "ALL ARTICLES", key: "ALL" },
  { label: "KITCHEN CLEANING", key: "CLEANING" },
  { label: "ORGANIZATION & STORAGE", key: "ORGANIZATION" },
  { label: "APPLIANCE CARE", key: "APPLIANCES" },
  { label: "PANTRY & FRIDGE", key: "PANTRY" },
  { label: "COOKWARE CARE", key: "COOKWARE" },
  { label: "EVERYDAY HABITS", key: "HABITS" },
];

export default function CleaningAndOrganizingPage() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "recent" | "readTime" | "alphabetical">("featured");
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [visibleCount, setVisibleCount] = useState(16);

  const toggleSave = (id: number) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredArticles = useMemo(() => {
    return cleaningArticlesData.filter((article) => {
      // Category filter
      if (activeFilter !== "ALL" && article.categoryKey !== activeFilter) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = article.title.toLowerCase().includes(q);
        const inDesc = article.description.toLowerCase().includes(q);
        const inAuthor = article.author.toLowerCase().includes(q);
        const inCat = article.category.toLowerCase().includes(q);
        return inTitle || inDesc || inAuthor || inCat;
      }

      return true;
    });
  }, [activeFilter, searchQuery]);

  const sortedArticles = useMemo(() => {
    const list = [...filteredArticles];
    if (sortBy === "recent") {
      list.sort((a, b) => b.id - a.id);
    } else if (sortBy === "readTime") {
      list.sort((a, b) => parseInt(a.readTime) - parseInt(b.readTime));
    } else if (sortBy === "alphabetical") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      // featured first
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return list;
  }, [filteredArticles, sortBy]);

  const displayedArticles = sortedArticles.slice(0, visibleCount);
  const featuredThree = cleaningArticlesData.filter((a) => a.featured).slice(0, 3);

  // Schema.org JSON-LD for rich snippets
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Cleaning & Organizing - Dishora",
    description: "Expert advice, practical techniques, and tested routines for maintaining an immaculate, clutter-free kitchen and serene home.",
    url: "https://dishora.net/cleaning-and-organizing",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: cleaningArticlesData.slice(0, 12).map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
        description: item.description,
        image: `https://dishora.net${item.imageUrl}`,
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
        .cleaning-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #ffffff;
          color: #222222;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }

        .cleaning-container {
          max-width: 1320px;
          margin: 0 auto;
          padding: 24px 20px 80px;
          width: 100%;
        }

        /* ── Header ── */
        .cleaning-header {
          text-align: center;
          margin-bottom: 32px;
          padding-top: 8px;
        }

        .cleaning-badge {
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

        .cleaning-title {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 38px;
          font-weight: 700;
          letter-spacing: -0.5px;
          color: #111111;
          margin-bottom: 14px;
          line-height: 1.15;
        }

        @media (min-width: 768px) {
          .cleaning-title {
            font-size: 48px;
          }
        }

        .cleaning-desc {
          font-size: 16px;
          color: #4a4a4a;
          max-width: 820px;
          margin: 0 auto;
          line-height: 1.65;
        }

        /* ── Category Filters ── */
        .filters-wrap {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 8px 12px;
          margin-bottom: 30px;
          padding-bottom: 16px;
          border-bottom: 1px solid #eaeaea;
        }

        .filter-btn {
          background: none;
          border: 1px solid transparent;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.8px;
          color: #333333;
          text-transform: uppercase;
          cursor: pointer;
          padding: 8px 16px;
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
          max-width: 440px;
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

        /* ── Top 3 Featured Grid ── */
        .featured-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 28px;
          margin-bottom: 40px;
        }

        @media (min-width: 640px) {
          .featured-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* ── Main 4-Column Grid ── */
        .articles-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 28px;
          margin-bottom: 48px;
        }

        @media (min-width: 540px) {
          .articles-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 900px) {
          .articles-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        /* ── Article Card ── */
        .article-card {
          display: flex;
          flex-direction: column;
          background: #ffffff;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .article-card:hover {
          transform: translateY(-3px);
        }

        .article-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          border-radius: 4px;
          overflow: hidden;
          background: #f3f3f3;
          margin-bottom: 12px;
        }

        .article-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.3s ease;
        }

        .article-card:hover .article-img {
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

        .read-time-badge {
          position: absolute;
          bottom: 10px;
          left: 10px;
          background: rgba(12, 83, 84, 0.88);
          color: #ffffff;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.5px;
          padding: 3px 8px;
          border-radius: 3px;
          text-transform: uppercase;
        }

        .featured-tag-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: #ba4f1c;
          color: #ffffff;
          font-size: 9.5px;
          font-weight: 800;
          letter-spacing: 0.8px;
          padding: 3px 8px;
          border-radius: 3px;
          text-transform: uppercase;
        }

        .article-content {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .article-cat {
          font-size: 10.5px;
          font-weight: 800;
          letter-spacing: 1px;
          color: #009b72;
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        .article-title {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 17px;
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

        .article-title:hover {
          color: #0c5354;
        }

        .article-desc {
          font-size: 13px;
          color: #666666;
          line-height: 1.45;
          margin-bottom: 10px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .article-meta {
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
        .cleaning-accent-banner {
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

        /* ── Newsletter Callout ── */
        .newsletter-callout {
          background: #0c5354;
          color: #ffffff;
          border-radius: 8px;
          padding: 36px 24px;
          text-align: center;
          margin: 40px 0 20px;
        }

        .newsletter-callout h3 {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 26px;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .newsletter-callout p {
          font-size: 14.5px;
          color: #e2f1f0;
          max-width: 580px;
          margin: 0 auto 20px;
          line-height: 1.5;
        }

        .newsletter-form {
          display: flex;
          max-width: 440px;
          margin: 0 auto;
          gap: 8px;
        }

        .newsletter-input {
          flex: 1;
          padding: 11px 16px;
          font-size: 13.5px;
          border: none;
          border-radius: 4px;
          outline: none;
        }

        .newsletter-submit {
          background: #009b72;
          color: #ffffff;
          border: none;
          font-weight: 700;
          font-size: 12.5px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 0 20px;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .newsletter-submit:hover {
          background: #00825f;
        }
      `}</style>

      <div className="cleaning-page">
        <Header />

        <main className="cleaning-container">
          {/* Header Section */}
          <header className="cleaning-header">
            <span className="cleaning-badge">In The Kitchen</span>
            <h1 className="cleaning-title">Cleaning &amp; Organizing</h1>
            <p className="cleaning-desc">
              Practical tips, tricks, and step-by-step ideas for keeping your kitchen and home
              sparkling clean, organized, and effortlessly manageable. From gentle non-toxic cleaning
              solutions to smart pantry storage systems, discover routines that make everyday life simpler.
            </p>
          </header>

          {/* Interactive Category Filter Pills */}
          <nav className="filters-wrap" aria-label="Cleaning and Organizing Categories">
            {categoryFilters.map((cat) => (
              <button
                key={cat.key}
                className={`filter-btn${activeFilter === cat.key ? " active" : ""}`}
                onClick={() => {
                  setActiveFilter(cat.key);
                  setVisibleCount(16);
                }}
              >
                {cat.label}
              </button>
            ))}
          </nav>

          {/* Utility Controls Bar: Search & Sort */}
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
                placeholder="Search by appliance, surface, or cleaning routine..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(16);
                }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <span className="results-count">
                Showing {Math.min(visibleCount, sortedArticles.length)} of{" "}
                {sortedArticles.length} guides
              </span>

              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "featured" | "recent" | "readTime" | "alphabetical")}
                aria-label="Sort cleaning articles"
              >
                <option value="featured">Featured First</option>
                <option value="recent">Most Recent</option>
                <option value="readTime">Quickest Reads</option>
                <option value="alphabetical">Alphabetical (A–Z)</option>
              </select>
            </div>
          </div>

          {/* Top 3 Featured Articles (Shown when ALL is active and no active search) */}
          {activeFilter === "ALL" && !searchQuery.trim() && (
            <>
              <section className="featured-grid" aria-label="Featured Cleaning Guides">
                {featuredThree.map((article) => {
                  const isSaved = savedIds.includes(article.id);
                  return (
                    <article key={article.id} className="article-card">
                      <div className="article-img-wrap">
                        <Link href={`/cleaning-and-organizing#${article.slug}`}>
                          <img
                            src={article.imageUrl}
                            alt={article.imageAlt}
                            className="article-img"
                            loading="lazy"
                          />
                        </Link>
                        <span className="featured-tag-badge">Editor&apos;s Pick</span>
                        <span className="read-time-badge">⏱ {article.readTime}</span>
                        <button
                          className={`save-btn${isSaved ? " saved" : ""}`}
                          onClick={() => toggleSave(article.id)}
                          aria-label={isSaved ? "Unsave article" : "Save article"}
                        >
                          {isSaved ? "♥" : "♡"}
                        </button>
                      </div>

                      <div className="article-content">
                        <div className="article-cat">{article.category}</div>
                        <Link href={`/cleaning-and-organizing#${article.slug}`} className="article-title">
                          {article.title}
                        </Link>
                        <p className="article-desc">{article.description}</p>
                        <div className="article-meta">
                          <span>{article.author}</span>
                          <span>{article.publishDate}</span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </section>

              <div className="cleaning-accent-banner">
                🌿 <strong>The Golden Rule of Kitchen Care:</strong> Clean as you go, sanitize cutting surfaces after every prep, and run a 10-minute nightly closing shift for effortless mornings.
              </div>
            </>
          )}

          {/* Main 4-Column Grid */}
          {displayedArticles.length > 0 ? (
            <section className="articles-grid" aria-label="Cleaning and Organizing Articles Grid">
              {displayedArticles.map((article) => {
                const isSaved = savedIds.includes(article.id);
                return (
                  <article key={article.id} className="article-card">
                    <div className="article-img-wrap">
                      <Link href={`/cleaning-and-organizing#${article.slug}`}>
                        <img
                          src={article.imageUrl}
                          alt={article.imageAlt}
                          className="article-img"
                          loading="lazy"
                        />
                      </Link>
                      <span className="read-time-badge">⏱ {article.readTime}</span>
                      <button
                        className={`save-btn${isSaved ? " saved" : ""}`}
                        onClick={() => toggleSave(article.id)}
                        aria-label={isSaved ? "Unsave article" : "Save article"}
                      >
                        {isSaved ? "♥" : "♡"}
                      </button>
                    </div>

                    <div className="article-content">
                      <div className="article-cat">{article.category}</div>
                      <Link href={`/cleaning-and-organizing#${article.slug}`} className="article-title">
                        {article.title}
                      </Link>
                      <p className="article-desc">{article.description}</p>
                      <div className="article-meta">
                        <span>{article.author}</span>
                        <span>{article.publishDate}</span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>
          ) : (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#666" }}>
              <p style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}>
                No cleaning guides found matching your search.
              </p>
              <p style={{ fontSize: "14px" }}>
                Try searching for general terms like &ldquo;sink&rdquo;, &ldquo;fridge&rdquo;, or select a different category pill.
              </p>
            </div>
          )}

          {/* Load More Button */}
          {visibleCount < sortedArticles.length && (
            <div className="load-more-wrap">
              <button
                className="load-more-btn"
                onClick={() => setVisibleCount((prev) => prev + 12)}
              >
                Load More Guides ({sortedArticles.length - visibleCount} remaining)
              </button>
            </div>
          )}

          {/* Clean Home Newsletter Callout */}
          <section className="newsletter-callout" aria-label="Cleaning Tips Newsletter">
            <h3>Get the Weekly Kitchen Care Checklist</h3>
            <p>
              Simple routines, natural stain-removal remedies, and seasonal decluttering guides
              delivered to your inbox every Sunday morning.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you for subscribing to Kitchen Care!");
              }}
              className="newsletter-form"
            >
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-submit">
                Subscribe
              </button>
            </form>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
