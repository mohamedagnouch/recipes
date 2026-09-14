"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { CollectionDetail, CollectionRecipeItem } from "../../data/collectionDetailsData";
import { recipeCollectionsData } from "../../data/recipeCollectionsData";

interface Props {
  collection: CollectionDetail;
}

export default function CollectionDetailClient({ collection }: Props) {
  const [savedRecipeIds, setSavedRecipeIds] = useState<string[]>([]);
  const [isCollectionSaved, setIsCollectionSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeSearch, setActiveSearch] = useState("");
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [expandedRecipeIds, setExpandedRecipeIds] = useState<string[]>(
    // expand first 2 by default
    collection.recipes.slice(0, 2).map((r) => r.id)
  );

  const toggleSaveRecipe = (id: string) => {
    setSavedRecipeIds((prev) =>
      prev.includes(id) ? prev.filter((rId) => rId !== id) : [...prev, id]
    );
  };

  const toggleExpandRecipe = (id: string) => {
    setExpandedRecipeIds((prev) =>
      prev.includes(id) ? prev.filter((rId) => rId !== id) : [...prev, id]
    );
  };

  const toggleCheckIngredient = (key: string) => {
    setCheckedIngredients((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const filteredRecipes = useMemo(() => {
    if (!activeSearch.trim()) return collection.recipes;
    const q = activeSearch.toLowerCase();
    return collection.recipes.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.ingredients.some((ing) => ing.toLowerCase().includes(q))
    );
  }, [collection.recipes, activeSearch]);

  // Related collections from data
  const relatedCollections = useMemo(() => {
    return recipeCollectionsData
      .filter((c) => c.slug !== collection.slug)
      .slice(0, 4);
  }, [collection.slug]);

  return (
    <>
      <style jsx global>{`
        @media print {
          header, footer, .no-print {
            display: none !important;
          }
          .collection-container {
            max-width: 100% !important;
            padding: 0 !important;
          }
          .recipe-card-box {
            break-inside: avoid;
            border: 1px solid #ccc !important;
            box-shadow: none !important;
          }
        }
      `}</style>

      <style jsx>{`
        .collection-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #ffffff;
          color: #222222;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }

        .collection-container {
          max-width: 1180px;
          margin: 0 auto;
          padding: 24px 20px 80px;
          width: 100%;
        }

        /* ── Breadcrumb ── */
        .breadcrumb-nav {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #777777;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .breadcrumb-nav a {
          color: #0c5354;
          text-decoration: none;
          font-weight: 500;
        }

        .breadcrumb-nav a:hover {
          text-decoration: underline;
        }

        .breadcrumb-sep {
          color: #bbbbbb;
        }

        /* ── Hero Header ── */
        .collection-header {
          text-align: center;
          max-width: 900px;
          margin: 0 auto 36px;
        }

        .category-badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.6px;
          color: #0c5354;
          background: #e8f5f4;
          padding: 6px 16px;
          border-radius: 20px;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .collection-h1 {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 36px;
          line-height: 1.18;
          font-weight: 800;
          color: #111111;
          margin-bottom: 16px;
          letter-spacing: -0.5px;
        }

        @media (min-width: 768px) {
          .collection-h1 {
            font-size: 46px;
          }
        }

        .collection-subtitle {
          font-size: 19px;
          line-height: 1.55;
          color: #444444;
          margin-bottom: 24px;
        }

        /* ── Author & Meta Bar ── */
        .author-meta-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
          padding: 14px 0;
          border-top: 1px solid #eeeeee;
          border-bottom: 1px solid #eeeeee;
          font-size: 13.5px;
          color: #666666;
          margin-bottom: 28px;
        }

        .author-byline {
          font-weight: 600;
          color: #111111;
        }

        .meta-dot {
          color: #cccccc;
        }

        /* ── Action Toolbar ── */
        .toolbar-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 36px;
        }

        .action-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: #ffffff;
          border: 1px solid #dddddd;
          color: #333333;
          padding: 8px 16px;
          border-radius: 24px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }

        .action-btn:hover {
          border-color: #0c5354;
          color: #0c5354;
          background: #f7faf9;
        }

        .action-btn.saved {
          background: #0c5354;
          color: #ffffff;
          border-color: #0c5354;
        }

        /* ── Hero Image ── */
        .hero-image-wrap {
          position: relative;
          width: 100%;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          margin-bottom: 40px;
        }

        .hero-img {
          width: 100%;
          height: 480px;
          object-fit: cover;
          display: block;
        }

        @media (max-width: 640px) {
          .hero-img {
            height: 280px;
          }
        }

        .hero-caption {
          position: absolute;
          bottom: 14px;
          right: 14px;
          background: rgba(0, 0, 0, 0.65);
          color: #ffffff;
          font-size: 11px;
          padding: 4px 10px;
          border-radius: 4px;
          backdrop-filter: blur(4px);
        }

        /* ── Stats Grid ── */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
          margin-bottom: 40px;
        }

        @media (min-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .stat-card {
          background: #f8faf9;
          border: 1px solid #e1ebe8;
          border-radius: 8px;
          padding: 16px;
          text-align: center;
        }

        .stat-icon {
          font-size: 24px;
          margin-bottom: 6px;
        }

        .stat-label {
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: #777777;
          margin-bottom: 4px;
        }

        .stat-value {
          font-size: 15px;
          font-weight: 700;
          color: #0c5354;
        }

        /* ── Lead Story & Rules ── */
        .editorial-section {
          background: #ffffff;
          border: 1px solid #ebebeb;
          border-radius: 12px;
          padding: 32px;
          margin-bottom: 48px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.03);
        }

        .lead-paragraph {
          font-size: 18px;
          line-height: 1.7;
          color: #333333;
          margin-bottom: 32px;
        }

        .rules-heading {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 22px;
          color: #111111;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .rules-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        @media (min-width: 768px) {
          .rules-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .rule-card {
          background: #f7faf9;
          border-left: 3px solid #0c5354;
          padding: 16px 18px;
          border-radius: 0 6px 6px 0;
        }

        .rule-title {
          font-size: 14px;
          font-weight: 700;
          color: #0c5354;
          margin-bottom: 6px;
        }

        .rule-text {
          font-size: 13.5px;
          line-height: 1.55;
          color: #555555;
          margin: 0;
        }

        /* ── Recipes Showcase Header ── */
        .recipes-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 2px solid #0c5354;
        }

        .recipes-title {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 28px;
          color: #111111;
          margin: 0;
        }

        .recipe-search-box {
          position: relative;
          min-width: 260px;
        }

        .recipe-search-input {
          width: 100%;
          padding: 9px 14px 9px 34px;
          border: 1px solid #cccccc;
          border-radius: 20px;
          font-size: 13.5px;
          outline: none;
        }

        .recipe-search-input:focus {
          border-color: #0c5354;
          box-shadow: 0 0 0 2px rgba(12, 83, 84, 0.15);
        }

        .search-icon-svg {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #888888;
        }

        /* ── Recipe Card Box ── */
        .recipe-list-wrap {
          display: flex;
          flex-direction: column;
          gap: 40px;
          margin-bottom: 60px;
        }

        .recipe-card-box {
          background: #ffffff;
          border: 1px solid #e2e8e5;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(0,0,0,0.05);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .recipe-card-box:hover {
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }

        .recipe-card-layout {
          display: grid;
          grid-template-columns: 1fr;
        }

        @media (min-width: 860px) {
          .recipe-card-layout {
            grid-template-columns: 420px 1fr;
          }
        }

        .recipe-card-img-wrap {
          position: relative;
          min-height: 280px;
          overflow: hidden;
          background: #f0f0f0;
        }

        .recipe-card-img {
          width: 100%;
          height: 100%;
          min-height: 280px;
          max-height: 380px;
          object-fit: cover;
          display: block;
          transition: transform 0.3s ease;
        }

        .recipe-card-box:hover .recipe-card-img {
          transform: scale(1.02);
        }

        .recipe-number-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          background: #0c5354;
          color: #ffffff;
          font-weight: 800;
          font-size: 13px;
          padding: 6px 12px;
          border-radius: 6px;
          letter-spacing: 0.5px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }

        .recipe-save-icon-btn {
          position: absolute;
          top: 14px;
          right: 14px;
          background: rgba(255,255,255,0.9);
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          cursor: pointer;
          color: #777777;
          transition: all 0.2s ease;
        }

        .recipe-save-icon-btn:hover {
          color: #d9383a;
          transform: scale(1.1);
        }

        .recipe-save-icon-btn.active {
          color: #d9383a;
          background: #ffffff;
        }

        .recipe-card-content {
          padding: 28px;
          display: flex;
          flex-direction: column;
        }

        .recipe-card-h2 {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 24px;
          line-height: 1.25;
          color: #111111;
          margin: 0 0 10px;
        }

        .recipe-rating-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #666666;
          margin-bottom: 12px;
        }

        .stars-gold {
          color: #e67a00;
          font-size: 14px;
        }

        .recipe-card-desc {
          font-size: 14.5px;
          line-height: 1.6;
          color: #4a4a4a;
          margin-bottom: 18px;
        }

        .recipe-quick-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          font-size: 12.5px;
          color: #555555;
          background: #f8faf9;
          padding: 10px 14px;
          border-radius: 6px;
          margin-bottom: 20px;
        }

        .quick-meta-item {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        /* ── Expandable Details ── */
        .recipe-toggle-btn {
          background: #0c5354;
          color: #ffffff;
          border: none;
          padding: 10px 18px;
          border-radius: 4px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          align-self: flex-start;
          transition: background 0.2s ease;
          margin-top: auto;
        }

        .recipe-toggle-btn:hover {
          background: #083c3d;
        }

        .expanded-details-pane {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px dashed #cccccc;
        }

        .pane-section-title {
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: #0c5354;
          margin-bottom: 12px;
        }

        .ingredients-list {
          list-style: none;
          padding: 0;
          margin: 0 0 24px;
        }

        .ingredient-check-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 6px 0;
          font-size: 14px;
          color: #333333;
          cursor: pointer;
          user-select: none;
        }

        .ingredient-check-item.checked span {
          text-decoration: line-through;
          color: #999999;
        }

        .ingredient-checkbox {
          margin-top: 3px;
          cursor: pointer;
          accent-color: #0c5354;
        }

        .instructions-ol {
          padding-left: 20px;
          margin: 0 0 24px;
          font-size: 14px;
          line-height: 1.65;
          color: #333333;
        }

        .instructions-ol li {
          margin-bottom: 10px;
        }

        .pro-tip-box {
          background: #fff8e6;
          border-left: 4px solid #e67a00;
          padding: 14px 16px;
          border-radius: 0 6px 6px 0;
          font-size: 13.5px;
          line-height: 1.5;
          color: #734000;
          margin-top: 16px;
        }

        .pro-tip-title {
          font-weight: 700;
          margin-bottom: 3px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* ── FAQ Section ── */
        .faq-section {
          background: #f8faf9;
          border: 1px solid #e1ebe8;
          border-radius: 12px;
          padding: 32px;
          margin-bottom: 48px;
        }

        .faq-title {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 24px;
          color: #111111;
          margin: 0 0 20px;
        }

        .faq-item {
          margin-bottom: 18px;
          padding-bottom: 18px;
          border-bottom: 1px solid #e2ebe8;
        }

        .faq-item:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }

        .faq-q {
          font-size: 15.5px;
          font-weight: 700;
          color: #0c5354;
          margin-bottom: 6px;
        }

        .faq-a {
          font-size: 14.5px;
          line-height: 1.6;
          color: #444444;
          margin: 0;
        }

        /* ── Related Collections ── */
        .related-section {
          margin-bottom: 60px;
        }

        .related-title {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 26px;
          color: #111111;
          margin-bottom: 24px;
        }

        .related-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 20px;
        }

        @media (min-width: 640px) {
          .related-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .related-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .related-card {
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .related-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 18px rgba(0,0,0,0.08);
        }

        .related-card-img {
          width: 100%;
          height: 180px;
          object-fit: cover;
          display: block;
        }

        .related-card-body {
          padding: 16px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .related-card-cat {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.8px;
          color: #0c5354;
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        .related-card-title {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.35;
          color: #111111;
          margin-bottom: 8px;
        }

        .related-card-count {
          font-size: 12px;
          color: #777777;
          margin-top: auto;
        }

        /* ── Back to Hub CTA ── */
        .back-hub-banner {
          background: #0c5354;
          color: #ffffff;
          border-radius: 12px;
          padding: 36px;
          text-align: center;
        }

        .back-hub-title {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 26px;
          margin-bottom: 12px;
        }

        .back-hub-desc {
          font-size: 15px;
          opacity: 0.9;
          max-width: 600px;
          margin: 0 auto 24px;
          line-height: 1.6;
        }

        .back-hub-btn {
          display: inline-block;
          background: #ffffff;
          color: #0c5354;
          font-weight: 700;
          font-size: 14px;
          padding: 12px 28px;
          border-radius: 24px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .back-hub-btn:hover {
          background: #e8f5f4;
          transform: translateY(-2px);
        }
      `}</style>

      <div className="collection-page">
        <Header />

        <main className="collection-container">
          {/* Breadcrumb Navigation */}
          <nav className="breadcrumb-nav no-print" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb-sep">/</span>
            <Link href="/recipe-collections">In The Kitchen</Link>
            <span className="breadcrumb-sep">/</span>
            <Link href="/recipe-collections">Recipe Collections</Link>
            <span className="breadcrumb-sep">/</span>
            <span>{collection.title}</span>
          </nav>

          {/* Header Section */}
          <header className="collection-header">
            <span className="category-badge-pill">
              🍳 {collection.recipeCount} Curated Recipes
            </span>
            <h1 className="collection-h1">{collection.title}</h1>
            <p className="collection-subtitle">{collection.subtitle}</p>

            {/* Author & Meta */}
            <div className="author-meta-bar">
              <span className="author-byline">By {collection.author}</span>
              <span className="meta-dot">•</span>
              <span>{collection.authorRole}</span>
              <span className="meta-dot">•</span>
              <span>{collection.date}</span>
              <span className="meta-dot">•</span>
              <span>⏱ {collection.readTime}</span>
            </div>

            {/* Action Toolbar */}
            <div className="toolbar-wrap no-print">
              <button
                className={`action-btn${isCollectionSaved ? " saved" : ""}`}
                onClick={() => setIsCollectionSaved(!isCollectionSaved)}
              >
                {isCollectionSaved ? "♥ Saved to Favorites" : "♡ Save Collection"}
              </button>
              <button className="action-btn" onClick={handlePrint}>
                🖨 Print Collection
              </button>
              <button className="action-btn" onClick={handleCopyLink}>
                {copiedLink ? "✓ Link Copied!" : "🔗 Share Link"}
              </button>
            </div>
          </header>

          {/* Hero Image */}
          <div className="hero-image-wrap">
            <img
              src={collection.heroImage}
              alt={collection.heroAlt}
              className="hero-img"
            />
            <span className="hero-caption">
              Photo: Dishora Test Kitchen / Photo Archives
            </span>
          </div>

          {/* Quick Stats Grid */}
          <section className="stats-grid" aria-label="Collection Highlights">
            {collection.highlights.map((h, i) => (
              <div key={i} className="stat-card">
                <div className="stat-icon">{h.icon}</div>
                <div className="stat-label">{h.label}</div>
                <div className="stat-value">{h.value}</div>
              </div>
            ))}
          </section>

          {/* Editorial Lead Story & Rules */}
          <section className="editorial-section">
            <p className="lead-paragraph">{collection.leadStory}</p>

            <h2 className="rules-heading">
              <span>🌟</span> Test Kitchen Golden Rules for This Collection
            </h2>
            <div className="rules-grid">
              {collection.testKitchenRules.map((rule, idx) => (
                <div key={idx} className="rule-card">
                  <div className="rule-title">{rule.title}</div>
                  <p className="rule-text">{rule.advice}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Recipes Showcase Header & Search */}
          <div className="recipes-header">
            <h2 className="recipes-title">
              The Recipes ({filteredRecipes.length} of {collection.recipes.length})
            </h2>

            <div className="recipe-search-box no-print">
              <svg
                className="search-icon-svg"
                width="14"
                height="14"
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
                className="recipe-search-input"
                placeholder="Search ingredients or dish name..."
                value={activeSearch}
                onChange={(e) => setActiveSearch(e.target.value)}
              />
            </div>
          </div>

          {/* The Recipe Cards List */}
          <section className="recipe-list-wrap">
            {filteredRecipes.map((recipe: CollectionRecipeItem) => {
              const isSaved = savedRecipeIds.includes(recipe.id);
              const isExpanded = expandedRecipeIds.includes(recipe.id);

              return (
                <article key={recipe.id} className="recipe-card-box" id={recipe.id}>
                  <div className="recipe-card-layout">
                    {/* Image Column */}
                    <div className="recipe-card-img-wrap">
                      <img
                        src={recipe.imageUrl}
                        alt={recipe.imageAlt}
                        className="recipe-card-img"
                        loading="lazy"
                      />
                      <span className="recipe-number-badge">
                        Recipe {recipe.number}
                      </span>
                      <button
                        className={`recipe-save-icon-btn no-print${isSaved ? " active" : ""}`}
                        onClick={() => toggleSaveRecipe(recipe.id)}
                        aria-label={isSaved ? "Unsave recipe" : "Save recipe"}
                      >
                        {isSaved ? "♥" : "♡"}
                      </button>
                    </div>

                    {/* Content Column */}
                    <div className="recipe-card-content">
                      <h2 className="recipe-card-h2">{recipe.title}</h2>

                      <div className="recipe-rating-row">
                        <span className="stars-gold">
                          {"★".repeat(Math.round(recipe.rating))}
                        </span>
                        <span>
                          <strong>{recipe.rating}</strong> ({recipe.reviewsCount} reviews)
                        </span>
                      </div>

                      <p className="recipe-card-desc">{recipe.description}</p>

                      <div className="recipe-quick-meta">
                        <div className="quick-meta-item">
                          <span>⏱</span>
                          <span>Prep: {recipe.prepTime}</span>
                        </div>
                        <div className="quick-meta-item">
                          <span>🔥</span>
                          <span>Cook: {recipe.cookTime}</span>
                        </div>
                        <div className="quick-meta-item">
                          <span>🍽</span>
                          <span>{recipe.servings}</span>
                        </div>
                        <div className="quick-meta-item">
                          <span>📊</span>
                          <span>{recipe.calories}</span>
                        </div>
                      </div>

                      <button
                        className="recipe-toggle-btn no-print"
                        onClick={() => toggleExpandRecipe(recipe.id)}
                      >
                        {isExpanded ? "Hide Recipe & Steps ▲" : "View Ingredients & Method ▼"}
                      </button>

                      {/* Expandable Recipe Box */}
                      {isExpanded && (
                        <div className="expanded-details-pane">
                          <div className="pane-section-title">Ingredients Checklist:</div>
                          <ul className="ingredients-list">
                            {recipe.ingredients.map((ing, ingIdx) => {
                              const checkKey = `${recipe.id}-${ingIdx}`;
                              const isChecked = !!checkedIngredients[checkKey];
                              return (
                                <li
                                  key={ingIdx}
                                  className={`ingredient-check-item${isChecked ? " checked" : ""}`}
                                  onClick={() => toggleCheckIngredient(checkKey)}
                                >
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => {}}
                                    className="ingredient-checkbox"
                                  />
                                  <span>{ing}</span>
                                </li>
                              );
                            })}
                          </ul>

                          <div className="pane-section-title">Step-by-Step Instructions:</div>
                          <ol className="instructions-ol">
                            {recipe.instructions.map((step, stepIdx) => (
                              <li key={stepIdx}>{step}</li>
                            ))}
                          </ol>

                          <div className="pro-tip-box">
                            <div className="pro-tip-title">
                              <span>💡</span> Test Kitchen Tip:
                            </div>
                            <div>{recipe.proTip}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </section>

          {/* FAQ Section */}
          <section className="faq-section" aria-label="Frequently Asked Questions">
            <h2 className="faq-title">Frequently Asked Questions</h2>
            {collection.faq.map((item, idx) => (
              <div key={idx} className="faq-item">
                <div className="faq-q">{item.question}</div>
                <p className="faq-a">{item.answer}</p>
              </div>
            ))}
          </section>

          {/* Related Collections Section */}
          <section className="related-section no-print" aria-label="Related Collections">
            <h2 className="related-title">More Collections You'll Love</h2>
            <div className="related-grid">
              {relatedCollections.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/recipe-collections/${rel.slug}`}
                  className="related-card"
                >
                  <img
                    src={rel.imageUrl}
                    alt={rel.title}
                    className="related-card-img"
                    loading="lazy"
                  />
                  <div className="related-card-body">
                    <span className="related-card-cat">{rel.category}</span>
                    <h3 className="related-card-title">{rel.title}</h3>
                    <span className="related-card-count">
                      🍳 {rel.recipeCount} Tested Recipes
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Back to Hub Banner */}
          <section className="back-hub-banner no-print">
            <h2 className="back-hub-title">Looking for More Guides and Meal Plans?</h2>
            <p className="back-hub-desc">
              Explore our complete library of 28 curated recipe collections, seasonal dinner menus,
              and 24 expert household care guides.
            </p>
            <Link href="/recipe-collections" className="back-hub-btn">
              ← Return to All In The Kitchen Collections
            </Link>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
