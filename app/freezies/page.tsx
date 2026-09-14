"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  freeziesCategories,
  freeziesProducts,
  freeziesEditorialArticles,
  freeziesMethodologyRubric
} from "../data/freeziesData";

export default function FreeziesAwardsHubPage() {
  const [activeCategoryTab, setActiveCategoryTab] = useState("all");
  const [emailSubscribed, setEmailSubscribed] = useState(false);

  const grandChampion = freeziesProducts.find((p) => p.isGrandChampion) || freeziesProducts[0];
  const editorsPicks = freeziesProducts.filter((p) => p.isEditorsPick && !p.isGrandChampion).slice(0, 3);
  const iceCreamWinners = freeziesProducts.filter((p) => p.categorySlug === "best-ice-cream");
  const dinnerWinners = freeziesProducts.filter((p) => p.categorySlug === "best-frozen-dinners");
  const budgetWinners = freeziesProducts.filter((p) => p.categorySlug === "best-budget-freezer-finds" || p.pricePerServing.includes("$1.") || p.pricePerServing.includes("$2."));
  const newWinners = freeziesProducts.filter((p) => p.categorySlug === "best-new-frozen-foods" || p.isTrending);

  const displayedWinners = activeCategoryTab === "all"
    ? freeziesProducts
    : freeziesProducts.filter((p) => p.categorySlug === activeCategoryTab);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "The 2026 Freezies Awards: Best Frozen Foods of 2026",
    description: "The official 2026 Freezies Awards guide to the best frozen dinners, artisanal ice creams, deep-dish pizzas, breakfasts, and supermarket finds in America.",
    url: "http://localhost:3000/freezies",
    publisher: {
      "@type": "Organization",
      name: "Dishora & The Freezies Editorial Board",
      logo: {
        "@type": "ImageObject",
        url: "http://localhost:3000/images/simply-recipes-logo.png"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <style jsx>{`
        .freezies-hub {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #fdfbf7;
          color: #1f2937;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        .freezies-container {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 20px 80px;
          width: 100%;
        }

        /* ── HERO ── */
        .awards-hero {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          margin-top: 24px;
          margin-bottom: 56px;
          background: #092c2d;
          color: #ffffff;
          box-shadow: 0 12px 36px rgba(9, 44, 45, 0.25);
        }

        .hero-backdrop {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.38;
          filter: saturate(1.2) contrast(1.1);
        }

        .hero-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(9,44,45,0.92) 0%, rgba(12,83,84,0.75) 50%, rgba(9,44,45,0.95) 100%);
        }

        .hero-content {
          position: relative;
          z-index: 2;
          padding: 64px 32px 72px;
          max-width: 860px;
          margin: 0 auto;
          text-align: center;
        }

        @media (min-width: 768px) {
          .hero-content {
            padding: 88px 48px 96px;
          }
        }

        .hero-seal {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(217, 119, 6, 0.2);
          border: 1px solid #f59e0b;
          color: #fcd34d;
          padding: 6px 18px;
          border-radius: 30px;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 24px;
        }

        .hero-headline {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 42px;
          font-weight: 900;
          line-height: 1.08;
          letter-spacing: -1.2px;
          color: #ffffff;
          margin-bottom: 20px;
          text-transform: uppercase;
        }

        @media (min-width: 768px) {
          .hero-headline {
            font-size: 64px;
            letter-spacing: -2px;
          }
        }

        .hero-lead {
          font-size: 18px;
          line-height: 1.6;
          color: #e5e7eb;
          margin-bottom: 36px;
          font-weight: 400;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 14px;
        }

        .btn-gold {
          background: #d97706;
          color: #ffffff;
          font-weight: 800;
          font-size: 13.5px;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          padding: 15px 34px;
          border-radius: 6px;
          text-decoration: none;
          transition: all 0.2s;
          box-shadow: 0 4px 14px rgba(217, 119, 6, 0.4);
        }

        .btn-gold:hover {
          background: #b45309;
          transform: translateY(-2px);
        }

        .btn-glass {
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #ffffff;
          font-weight: 700;
          font-size: 13.5px;
          letter-spacing: 0.6px;
          padding: 15px 28px;
          border-radius: 6px;
          text-decoration: none;
          transition: all 0.2s;
        }

        .btn-glass:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
        }

        /* ── SECTION TITLE ── */
        .sec-head {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-bottom: 32px;
          border-bottom: 2px solid #111827;
          padding-bottom: 12px;
        }

        @media (min-width: 768px) {
          .sec-head {
            flex-direction: row;
            align-items: flex-end;
            justify-content: space-between;
          }
        }

        .sec-kicker {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.4px;
          text-transform: uppercase;
          color: #d97706;
          margin-bottom: 4px;
        }

        .sec-title {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 32px;
          font-weight: 900;
          color: #111827;
          line-height: 1.15;
          letter-spacing: -0.5px;
        }

        /* ── GRAND CHAMPION HERO BANNER ── */
        .grand-champ-card {
          display: grid;
          grid-template-columns: 1fr;
          background: #ffffff;
          border: 2px solid #f59e0b;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 56px;
          box-shadow: 0 8px 30px rgba(245, 158, 11, 0.15);
        }

        @media (min-width: 900px) {
          .grand-champ-card {
            grid-template-columns: 1.15fr 1fr;
          }
        }

        .grand-img-wrap {
          position: relative;
          min-height: 320px;
          overflow: hidden;
        }

        .grand-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s;
        }

        .grand-champ-card:hover .grand-img {
          transform: scale(1.03);
        }

        .grand-content {
          padding: 36px 30px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: #fffdfa;
        }

        .score-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #111827;
          color: #fcd34d;
          font-size: 13px;
          font-weight: 800;
          padding: 4px 12px;
          border-radius: 20px;
        }

        /* ── EDITORS PICKS CARDS (ASYMMETRIC) ── */
        .picks-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
          margin-bottom: 64px;
        }

        @media (min-width: 768px) {
          .picks-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .pick-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .pick-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
        }

        .pick-img-wrap {
          position: relative;
          aspect-ratio: 16 / 11;
          overflow: hidden;
        }

        .pick-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }

        .pick-card:hover .pick-img {
          transform: scale(1.05);
        }

        .badge-gold {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #d97706;
          color: #ffffff;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.8px;
          padding: 3px 10px;
          border-radius: 4px;
          text-transform: uppercase;
        }

        .pick-content {
          padding: 22px 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .pick-brand {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1px;
          color: #6b7280;
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .pick-name {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 20px;
          font-weight: 800;
          color: #111827;
          line-height: 1.25;
          margin-bottom: 8px;
          text-decoration: none;
        }

        .pick-name:hover {
          color: #0c5354;
        }

        .pick-verdict {
          font-size: 13.5px;
          color: #4b5563;
          line-height: 1.5;
          margin-bottom: 16px;
        }

        .pick-meta {
          margin-top: auto;
          padding-top: 14px;
          border-top: 1px solid #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* ── WINNERS FILTER TABS ── */
        .category-tabs {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
          scrollbar-width: none;
          padding-bottom: 16px;
          margin-bottom: 32px;
        }

        .cat-tab {
          white-space: nowrap;
          font-size: 12.5px;
          font-weight: 700;
          padding: 8px 18px;
          border-radius: 24px;
          border: 1px solid #d1d5db;
          background: #ffffff;
          color: #374151;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cat-tab.active {
          background: #0c5354;
          color: #ffffff;
          border-color: #0c5354;
          box-shadow: 0 2px 8px rgba(12, 83, 84, 0.2);
        }

        /* ── 4-COLUMN WINNERS SHOWCASE ── */
        .showcase-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          margin-bottom: 64px;
        }

        @media (min-width: 640px) {
          .showcase-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .showcase-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .showcase-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
          transition: all 0.2s;
        }

        .showcase-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
        }

        .showcase-img-wrap {
          position: relative;
          aspect-ratio: 4 / 3;
          overflow: hidden;
        }

        .showcase-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }

        .showcase-card:hover .showcase-img {
          transform: scale(1.05);
        }

        .showcase-content {
          padding: 16px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .showcase-title {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.35;
          color: #111827;
          margin-bottom: 6px;
          text-decoration: none;
        }

        .showcase-title:hover {
          color: #0c5354;
        }

        /* ── METHODOLOGY INFOGRAPHIC STRIP ── */
        .method-banner {
          background: #092c2d;
          color: #ffffff;
          border-radius: 12px;
          padding: 40px 32px;
          margin-bottom: 64px;
        }

        .method-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-top: 24px;
        }

        @media (min-width: 768px) {
          .method-grid {
            grid-template-columns: repeat(6, 1fr);
          }
        }

        .method-card {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 8px;
          padding: 16px;
          text-align: center;
        }

        .method-score {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 26px;
          font-weight: 900;
          color: #fcd34d;
        }

        .method-name {
          font-size: 11.5px;
          font-weight: 700;
          color: #e5e7eb;
          margin-top: 4px;
        }

        /* ── NEWSLETTER ── */
        .freezies-newsletter {
          background: #fef3c7;
          border: 2px solid #f59e0b;
          border-radius: 12px;
          padding: 44px 24px;
          text-align: center;
          margin-bottom: 40px;
        }
      `}</style>

      <div className="freezies-hub">
        <Header />

        <main className="freezies-container">
          {/* ── HERO BANNER ── */}
          <header className="awards-hero">
            <img
              src="/images/freezies/freezies-hero-cinematic.jpg"
              alt="The 2026 Freezies Awards banquet table with golden baked meals and artisan desserts"
              className="hero-backdrop"
            />
            <div className="hero-gradient" />
            <div className="hero-content">
              <div className="hero-seal">
                <span>❄️</span>
                <span>The 2026 Annual Editorial Awards</span>
              </div>
              <h1 className="hero-headline">The Best Frozen Foods of 2026</h1>
              <p className="hero-lead">
                Over 380 supermarket frozen products rigorously tested, tasted, and scored by our editorial board.
                Discover the pasta bakes, artisan ice creams, Detroit deep dishes, and budget-friendly heroes worth keeping in your freezer.
              </p>
              <div className="hero-actions">
                <a href="#winners" className="btn-gold">
                  Explore 2026 Winners
                </a>
                <Link href="/freezies/methodology" className="btn-glass">
                  See How We Picked Them →
                </Link>
              </div>
            </div>
          </header>

          {/* ── GRAND CHAMPION OF 2026 ── */}
          <section aria-label="Grand Champion 2026">
            <div className="sec-head">
              <div>
                <span className="sec-kicker">Overall Highest Honor</span>
                <h2 className="sec-title">2026 Grand Champion</h2>
              </div>
              <span className="text-xs font-bold text-gray-500">Unanimous 98/100 Top Score</span>
            </div>

            <article className="grand-champ-card">
              <div className="grand-img-wrap">
                <Link href={`/freezies/winners/${grandChampion.slug}`}>
                  <img
                    src={grandChampion.imageUrl}
                    alt={grandChampion.imageAlt}
                    className="grand-img"
                  />
                </Link>
              </div>
              <div className="grand-content">
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <span style={{ background: "#d97706", color: "#ffffff", fontSize: "10px", fontWeight: "900", textTransform: "uppercase", padding: "3px 10px", borderRadius: "4px", letterSpacing: "1px" }}>
                    🏆 Grand Champion
                  </span>
                  <span className="score-pill">★ {grandChampion.overallScore}/100</span>
                </div>
                <div style={{ fontSize: "12px", fontWeight: "800", color: "#6b7280", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>
                  {grandChampion.brand} • {grandChampion.categoryName}
                </div>
                <Link href={`/freezies/winners/${grandChampion.slug}`} style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "28px", fontWeight: "800", color: "#111827", textDecoration: "none", lineHeight: 1.2, marginBottom: "12px" }}>
                  {grandChampion.name}
                </Link>
                <p style={{ fontSize: "15px", color: "#4b5563", lineHeight: 1.6, marginBottom: "20px" }}>
                  {grandChampion.shortVerdict}
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", paddingTop: "16px", borderTop: "1px solid #f3f4f6" }}>
                  <Link
                    href={`/freezies/winners/${grandChampion.slug}`}
                    style={{ background: "#0c5354", color: "#ffffff", padding: "9px 20px", borderRadius: "6px", fontSize: "12px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.6px", textDecoration: "none" }}
                  >
                    Read Full Review →
                  </Link>
                </div>
              </div>
            </article>
          </section>

          {/* ── SECTION A: EDITOR'S PICKS ── */}
          <section aria-label="Editor's Picks">
            <div className="sec-head">
              <div>
                <span className="sec-kicker">Culinary Board Selections</span>
                <h2 className="sec-title">Editor&apos;s Picks: Hall of Fame</h2>
              </div>
              <Link href="/freezies/announcement" style={{ fontSize: "12px", fontWeight: "800", color: "#0c5354", textTransform: "uppercase", textDecoration: "none" }}>
                Full Announcement →
              </Link>
            </div>

            <div className="picks-grid">
              {editorsPicks.map((pick) => (
                <article key={pick.id} className="pick-card">
                  <div className="pick-img-wrap">
                    <Link href={`/freezies/winners/${pick.slug}`}>
                      <img src={pick.imageUrl} alt={pick.imageAlt} className="pick-img" loading="lazy" />
                    </Link>
                    <span className="badge-gold">Gold Winner</span>
                    <span style={{ position: "absolute", bottom: "10px", right: "10px", background: "rgba(17,24,39,0.88)", color: "#fff", fontSize: "11px", fontWeight: "800", padding: "2px 8px", borderRadius: "4px" }}>
                      Score: {pick.overallScore}
                    </span>
                  </div>
                  <div className="pick-content">
                    <span className="pick-brand">{pick.brand}</span>
                    <Link href={`/freezies/winners/${pick.slug}`} className="pick-name">
                      {pick.name}
                    </Link>
                    <p className="pick-verdict">{pick.shortVerdict}</p>
                    <div className="pick-meta" style={{ justifyContent: "flex-end" }}>
                      <Link href={`/freezies/winners/${pick.slug}`} style={{ fontSize: "12px", fontWeight: "800", color: "#0c5354", textTransform: "uppercase", textDecoration: "none" }}>
                        View Winner →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* ── SECTION B: 2026 WINNERS SHOWCASE WITH CATEGORY TABS ── */}
          <section id="winners" aria-label="All 2026 Award Winners">
            <div className="sec-head">
              <div>
                <span className="sec-kicker">Complete Directory</span>
                <h2 className="sec-title">The 2026 Freezies Award Winners</h2>
              </div>
              <span className="text-xs text-gray-500 font-bold">10 Official Categories</span>
            </div>

            {/* Filter Tabs */}
            <nav className="category-tabs" aria-label="Filter winners by category">
              <button
                className={`cat-tab${activeCategoryTab === "all" ? " active" : ""}`}
                onClick={() => setActiveCategoryTab("all")}
              >
                All Categories ({freeziesProducts.length})
              </button>
              {freeziesCategories.map((cat) => (
                <button
                  key={cat.id}
                  className={`cat-tab${activeCategoryTab === cat.slug ? " active" : ""}`}
                  onClick={() => setActiveCategoryTab(cat.slug)}
                >
                  {cat.icon} {cat.shortName}
                </button>
              ))}
            </nav>

            {/* 4-Col Grid */}
            <div className="showcase-grid">
              {displayedWinners.map((winner) => (
                <article key={winner.id} className="showcase-card">
                  <div className="showcase-img-wrap">
                    <Link href={`/freezies/winners/${winner.slug}`}>
                      <img src={winner.imageUrl} alt={winner.imageAlt} className="showcase-img" loading="lazy" />
                    </Link>
                    <span style={{ position: "absolute", top: "8px", left: "8px", background: "#d97706", color: "#fff", fontSize: "9.5px", fontWeight: "800", padding: "2px 7px", borderRadius: "3px", textTransform: "uppercase" }}>
                      Score: {winner.overallScore}
                    </span>
                  </div>
                  <div className="showcase-content">
                    <div style={{ fontSize: "10.5px", fontWeight: "800", color: "#009b72", textTransform: "uppercase", marginBottom: "4px" }}>
                      {winner.categoryName}
                    </div>
                    <Link href={`/freezies/winners/${winner.slug}`} className="showcase-title">
                      {winner.name}
                    </Link>
                    <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "auto", paddingTop: "8px", borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between" }}>
                      <span>{winner.brand}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* ── SECTION C: TRENDING RIGHT NOW IN FREEZERS ── */}
          <section aria-label="Trending in Freezers">
            <div className="sec-head">
              <div>
                <span className="sec-kicker">Market &amp; Culture Reports</span>
                <h2 className="sec-title">Trending in Freezers Right Now</h2>
              </div>
            </div>

            <div className="picks-grid">
              {freeziesEditorialArticles.map((art) => (
                <article key={art.id} className="pick-card">
                  <div className="pick-img-wrap">
                    <img src={art.imageUrl} alt={art.headline} className="pick-img" loading="lazy" />
                    <span style={{ position: "absolute", top: "10px", left: "10px", background: "#111827", color: "#fff", fontSize: "10px", fontWeight: "800", padding: "3px 8px", borderRadius: "3px" }}>
                      {art.category}
                    </span>
                  </div>
                  <div className="pick-content">
                    <h3 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "18px", fontWeight: "700", lineHeight: 1.3, color: "#111827", marginBottom: "8px" }}>
                      {art.headline}
                    </h3>
                    <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.45, marginBottom: "14px" }}>
                      {art.deck}
                    </p>
                    <div className="pick-meta">
                      <span style={{ fontSize: "11.5px", color: "#9ca3af" }}>{art.author}</span>
                      <span style={{ fontSize: "11.5px", color: "#9ca3af" }}>⏱ {art.readTime}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* ── SECTION H: THE FREEZIES 100-POINT METHODOLOGY ── */}
          <section className="method-banner" aria-label="Testing Methodology">
            <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto" }}>
              <span style={{ color: "#fcd34d", fontSize: "11px", fontWeight: "800", letterSpacing: "1.5px", textTransform: "uppercase" }}>
                Scientific &amp; Culinary Standards
              </span>
              <h2 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "36px", fontWeight: "900", marginTop: "8px", marginBottom: "12px" }}>
                How We Test &amp; Score
              </h2>
              <p style={{ fontSize: "15px", color: "#cbd5e1", lineHeight: 1.6 }}>
                Every single product is purchased at retail—no free brand samples accepted.
                Evaluated double-blind across 6 core culinary pillars totaling 100 maximum points.
              </p>
            </div>

            <div className="method-grid">
              {freeziesMethodologyRubric.map((r, i) => (
                <div key={i} className="method-card">
                  <div className="method-score">{r.weight} pts</div>
                  <div className="method-name">{r.category}</div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "32px" }}>
              <Link
                href="/freezies/methodology"
                style={{ background: "#fcd34d", color: "#111827", padding: "12px 28px", borderRadius: "6px", fontSize: "13px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.8px", textDecoration: "none" }}
              >
                Read Full 2026 Testing Protocol →
              </Link>
            </div>
          </section>

          {/* ── SECTION I: NEWSLETTER SIGNUP ── */}
          <section className="freezies-newsletter" aria-label="Freezies Newsletter">
            <h3 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "28px", fontWeight: "800", color: "#78350f", marginBottom: "8px" }}>
              Get the Best Frozen Finds in Your Inbox
            </h3>
            <p style={{ fontSize: "15px", color: "#92400e", maxWidth: "560px", margin: "0 auto 20px", lineHeight: 1.5 }}>
              Weekly supermarket freezer alerts, Trader Joe&apos;s new drops, and tested dinner rankings delivered every Thursday morning.
            </p>
            {emailSubscribed ? (
              <div style={{ color: "#065f46", fontWeight: "bold", fontSize: "15px" }}>
                ✓ You&apos;re subscribed to The Freezies Weekly Dispatch!
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setEmailSubscribed(true);
                }}
                style={{ display: "flex", maxWidth: "460px", margin: "0 auto", gap: "8px" }}
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  style={{ flex: 1, padding: "12px 16px", borderRadius: "6px", border: "1px solid #d97706", fontSize: "14px", outline: "none" }}
                />
                <button
                  type="submit"
                  style={{ background: "#78350f", color: "#ffffff", border: "none", padding: "0 22px", borderRadius: "6px", fontWeight: "800", fontSize: "12px", textTransform: "uppercase", cursor: "pointer" }}
                >
                  Subscribe
                </button>
              </form>
            )}
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
