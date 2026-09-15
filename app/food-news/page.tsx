"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { foodNewsArticles } from "../data/foodNewsData";

const categoryNavItems = [
  { id: "news-trends", label: "News & Trends", filterKey: "NEWS_TRENDS" },
  { id: "celebrity", label: "Celebrity", filterKey: "CELEBRITY" },
  { id: "popular-recipes", label: "Recipes", filterKey: "RECIPES" },
  { id: "food-trends", label: "Food Trends", filterKey: "TRENDS" },
  { id: "restaurant-news", label: "Restaurant News", filterKey: "RESTAURANTS" },
  { id: "grocery-news", label: "Grocery News", filterKey: "GROCERIES" },
  { id: "most-popular", label: "Most Popular", filterKey: "POPULAR" },
  { id: "all", label: "View All", filterKey: "ALL" },
];

export default function FoodNewsAndTrendsPage() {
  const [activeNav, setActiveNav] = useState("news-trends");
  const [selectedCountry, setSelectedCountry] = useState<"ALL" | "USA" | "CANADA">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "recent" | "readTime" | "rating">("featured");
  const [archiveVisibleCount, setArchiveVisibleCount] = useState(12);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"magazine" | "archive">("magazine");

  const toggleSave = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Switch navigation
  const handleNavClick = (navId: string, _filterKey: string) => {
    setActiveNav(navId);
    if (navId === "all") {
      setViewMode("archive");
      window.scrollTo({ top: 400, behavior: "smooth" });
    } else {
      setViewMode("magazine");
      const element = document.getElementById(navId);
      if (element) {
        const yOffset = -140;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  // Quick tag search
  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    setViewMode("archive");
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  // Filtered list for the comprehensive archive
  const filteredArticles = useMemo(() => {
    return foodNewsArticles.filter((article) => {
      // Country filter
      if (selectedCountry === "USA" && article.country === "CANADA") return false;
      if (selectedCountry === "CANADA" && article.country === "USA") return false;

      // Category filter if in specific filter mode
      if (viewMode === "archive" && activeNav !== "all") {
        const item = categoryNavItems.find((n) => n.id === activeNav);
        if (item && item.filterKey !== "ALL" && item.filterKey !== "POPULAR") {
          if (article.categoryKey !== item.filterKey && !article.category.toUpperCase().includes(item.label.toUpperCase())) {
            return false;
          }
        } else if (item?.filterKey === "POPULAR" && !article.mostPopular) {
          return false;
        }
      }

      // Search matching
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inHeadline = article.headline.toLowerCase().includes(q);
        const inDeck = article.deck.toLowerCase().includes(q);
        const inCat = article.category.toLowerCase().includes(q);
        const inCountry = article.countryBadge.toLowerCase().includes(q);
        const inAuthor = article.author.toLowerCase().includes(q);
        return inHeadline || inDeck || inCat || inCountry || inAuthor;
      }

      return true;
    });
  }, [selectedCountry, searchQuery, viewMode, activeNav]);

  const sortedArticles = useMemo(() => {
    const list = [...filteredArticles];
    if (sortBy === "recent") {
      list.sort((a, b) => b.id - a.id);
    } else if (sortBy === "readTime") {
      list.sort((a, b) => parseInt(a.readTime) - parseInt(b.readTime));
    } else if (sortBy === "rating") {
      list.sort((a, b) => (b.recipeDetails?.rating || 0) - (a.recipeDetails?.rating || 0));
    } else {
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return list;
  }, [filteredArticles, sortBy]);

  // Section-specific article lists
  const leadStory = foodNewsArticles.find((a) => a.id === 1) || foodNewsArticles[0];

  const latestNews = useMemo(() => {
    return foodNewsArticles
      .filter((a) => a.id !== 1 && (a.categoryKey === "RESTAURANTS" || a.categoryKey === "RECALLS" || a.categoryKey === "GROCERIES"))
      .slice(0, 4);
  }, []);

  const trendingStories = useMemo(() => {
    return foodNewsArticles.filter((a) => a.trending && !a.isCelebrity && a.id !== 1).slice(0, 4);
  }, []);

  const celebrityStories = useMemo(() => {
    return foodNewsArticles.filter((a) => a.isCelebrity).slice(0, 6);
  }, []);

  const popularRecipes = useMemo(() => {
    return foodNewsArticles.filter((a) => a.isRecipe);
  }, []);

  const usaStories = useMemo(() => {
    return foodNewsArticles.filter((a) => a.country === "USA" && !a.isCelebrity && a.id !== 1).slice(0, 4);
  }, []);

  const canadaStories = useMemo(() => {
    return foodNewsArticles.filter((a) => a.country === "CANADA");
  }, []);

  const mostPopularLeaderboard = useMemo(() => {
    return foodNewsArticles.filter((a) => a.mostPopular).slice(0, 5);
  }, []);

  // Schema.org structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Food News & Trends: USA & Canada - Dishora",
    description: "Verified food news, restaurant openings, grocery store finds, viral TikTok food trends, celebrity chef stories, and popular recipes across the United States and Canada.",
    url: "http://localhost:3000/food-news",
    publisher: {
      "@type": "Organization",
      name: "Dishora",
      logo: {
        "@type": "ImageObject",
        url: "http://localhost:3000/images/simply-recipes-logo.png",
      },
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: foodNewsArticles.slice(0, 15).map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.headline,
        description: item.deck,
        image: `http://localhost:3000${item.imageUrl}`,
        url: `http://localhost:3000/food-news/${item.slug}`,
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
        .news-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #fafafa;
          color: #1f2937;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }

        .news-container {
          max-width: 1320px;
          margin: 0 auto;
          padding: 24px 20px 80px;
          width: 100%;
        }

        /* ── Masthead ── */
        .masthead {
          text-align: center;
          padding: 24px 0 20px;
          border-bottom: 2px solid #111827;
          margin-bottom: 20px;
        }

        .masthead-topline {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          color: #6b7280;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .masthead-title {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 42px;
          font-weight: 900;
          letter-spacing: -1px;
          color: #111827;
          line-height: 1.1;
          margin-bottom: 12px;
          text-transform: uppercase;
        }

        @media (min-width: 768px) {
          .masthead-title {
            font-size: 56px;
            letter-spacing: -1.5px;
          }
        }

        .masthead-sub {
          font-size: 16px;
          color: #4b5563;
          max-width: 860px;
          margin: 0 auto 20px;
          line-height: 1.6;
        }

        /* ── Country Selector Bar ── */
        .country-selector {
          display: inline-flex;
          align-items: center;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 30px;
          padding: 4px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          gap: 4px;
        }

        .country-btn {
          padding: 7px 18px;
          border-radius: 24px;
          font-size: 13px;
          font-weight: 700;
          border: none;
          background: transparent;
          color: #4b5563;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .country-btn.active {
          background: #0c5354;
          color: #ffffff;
          box-shadow: 0 2px 6px rgba(12, 83, 84, 0.25);
        }

        /* ── Sticky Category Navigation Bar ── */
        .category-nav-sticky {
          position: sticky;
          top: 60px;
          z-index: 40;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid #e5e7eb;
          margin-bottom: 32px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
        }

        .category-nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          overflow-x: auto;
          scrollbar-width: none;
          padding: 10px 0;
          gap: 6px;
        }

        .category-nav-inner::-webkit-scrollbar {
          display: none;
        }

        .cat-nav-btn {
          white-space: nowrap;
          font-size: 12.5px;
          font-weight: 700;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          color: #374151;
          background: transparent;
          border: 1px solid transparent;
          padding: 8px 16px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .cat-nav-btn:hover {
          color: #0c5354;
          background: #f0fdf9;
          border-color: #d1fae5;
        }

        .cat-nav-btn.active {
          color: #ffffff;
          background: #0c5354;
          border-color: #0c5354;
          box-shadow: 0 2px 6px rgba(12, 83, 84, 0.2);
        }

        /* ── Quick Tags Bar ── */
        .quick-tags-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
          scrollbar-width: none;
          padding: 8px 0 20px;
          margin-bottom: 16px;
        }

        .tag-pill {
          white-space: nowrap;
          font-size: 11.5px;
          font-weight: 600;
          color: #4b5563;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          padding: 5px 12px;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.15s;
        }

        .tag-pill:hover {
          color: #ba4f1c;
          border-color: #fbd5c3;
          background: #fff8f5;
        }

        /* ── HERO SECTION ── */
        .hero-section {
          margin-bottom: 48px;
        }

        .hero-card {
          display: grid;
          grid-template-columns: 1fr;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        @media (min-width: 900px) {
          .hero-card {
            grid-template-columns: 1.15fr 1fr;
          }
        }

        .hero-img-wrap {
          position: relative;
          min-height: 320px;
          overflow: hidden;
          background: #f3f4f6;
        }

        @media (min-width: 900px) {
          .hero-img-wrap {
            min-height: 440px;
          }
        }

        .hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .hero-card:hover .hero-img {
          transform: scale(1.03);
        }

        .hero-content {
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        @media (min-width: 1024px) {
          .hero-content {
            padding: 44px 40px;
          }
        }

        .hero-badges {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }

        .breaking-badge {
          background: #dc2626;
          color: #ffffff;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 4px;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        .country-tag {
          background: #f3f4f6;
          color: #374151;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 4px;
        }

        .category-tag {
          font-size: 11.5px;
          font-weight: 800;
          letter-spacing: 1px;
          color: #009b72;
          text-transform: uppercase;
        }

        .hero-headline {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 28px;
          font-weight: 800;
          line-height: 1.25;
          color: #111827;
          margin-bottom: 14px;
          text-decoration: none;
          transition: color 0.15s;
        }

        @media (min-width: 768px) {
          .hero-headline {
            font-size: 36px;
          }
        }

        .hero-headline:hover {
          color: #0c5354;
        }

        .hero-deck {
          font-size: 16px;
          color: #4b5563;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .hero-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 24px;
        }

        .read-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #0c5354;
          color: #ffffff;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          padding: 12px 26px;
          border-radius: 6px;
          text-decoration: none;
          width: fit-content;
          transition: all 0.2s;
          box-shadow: 0 2px 8px rgba(12, 83, 84, 0.25);
        }

        .read-btn:hover {
          background: #083c3d;
          transform: translateY(-1px);
        }

        /* ── SECTION HEADER ── */
        .sec-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          border-bottom: 2px solid #111827;
          padding-bottom: 10px;
          margin-bottom: 24px;
        }

        .sec-title-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .sec-title {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 26px;
          font-weight: 800;
          color: #111827;
          letter-spacing: -0.5px;
          text-transform: uppercase;
        }

        .sec-badge {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1px;
          color: #ba4f1c;
          background: #fdf2eb;
          padding: 3px 10px;
          border-radius: 12px;
          text-transform: uppercase;
        }

        .sec-link {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: #0c5354;
          text-decoration: none;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 4px;
          transition: color 0.15s;
        }

        .sec-link:hover {
          color: #ba4f1c;
        }

        /* ── CARD GRIDS ── */
        .grid-4 {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          margin-bottom: 48px;
        }

        @media (min-width: 640px) {
          .grid-4 {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .grid-4 {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .grid-3 {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          margin-bottom: 48px;
        }

        @media (min-width: 640px) {
          .grid-3 {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .grid-3 {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* ── ARTICLE CARD ── */
        .art-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .art-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
        }

        .art-img-wrap {
          position: relative;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: #f3f4f6;
        }

        .art-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.3s ease;
        }

        .art-card:hover .art-img {
          transform: scale(1.05);
        }

        .save-pill-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 15px;
          color: #4b5563;
          transition: all 0.15s;
          z-index: 2;
        }

        .save-pill-btn:hover {
          background: #ffffff;
          transform: scale(1.1);
        }

        .save-pill-btn.saved {
          color: #dc2626;
          background: #ffffff;
        }

        .art-content {
          padding: 18px 16px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .art-cat-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          color: #009b72;
          margin-bottom: 8px;
        }

        .art-title {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 17px;
          font-weight: 700;
          line-height: 1.35;
          color: #111827;
          margin-bottom: 8px;
          text-decoration: none;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.15s;
        }

        .art-title:hover {
          color: #0c5354;
        }

        .art-deck {
          font-size: 13px;
          color: #6b7280;
          line-height: 1.45;
          margin-bottom: 12px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .art-meta {
          margin-top: auto;
          padding-top: 10px;
          border-top: 1px solid #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 11.5px;
          color: #9ca3af;
        }

        /* ── RECIPE CARD DESIGN ── */
        .recipe-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .recipe-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.09);
        }

        .recipe-img-wrap {
          position: relative;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          background: #f3f4f6;
        }

        .recipe-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.3s ease;
        }

        .recipe-card:hover .recipe-img {
          transform: scale(1.05);
        }

        .recipe-time-pill {
          position: absolute;
          bottom: 10px;
          left: 10px;
          background: rgba(17, 24, 39, 0.85);
          color: #ffffff;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 20px;
          backdrop-filter: blur(4px);
        }

        .recipe-content {
          padding: 20px 18px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .recipe-rating-row {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12.5px;
          color: #f59e0b;
          font-weight: 700;
          margin-bottom: 6px;
        }

        .rating-count {
          color: #9ca3af;
          font-size: 11.5px;
          font-weight: 500;
        }

        .recipe-title {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 18px;
          font-weight: 700;
          line-height: 1.3;
          color: #111827;
          margin-bottom: 8px;
          text-decoration: none;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.15s;
        }

        .recipe-title:hover {
          color: #0c5354;
        }

        .recipe-desc {
          font-size: 13px;
          color: #6b7280;
          line-height: 1.45;
          margin-bottom: 16px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .view-recipe-btn {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: #fdf2eb;
          color: #ba4f1c;
          border: 1px solid #fbd5c3;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          padding: 9px 16px;
          border-radius: 6px;
          text-decoration: none;
          transition: all 0.2s;
        }

        .recipe-card:hover .view-recipe-btn {
          background: #ba4f1c;
          color: #ffffff;
          border-color: #ba4f1c;
        }

        /* ── CELEBRITY SPOTLIGHT CARD ── */
        .celeb-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .celeb-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
        }

        .celeb-img-wrap {
          position: relative;
          aspect-ratio: 16 / 10;
          overflow: hidden;
        }

        .celeb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.3s ease;
        }

        .celeb-card:hover .celeb-img {
          transform: scale(1.05);
        }

        .celeb-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: #111827;
          color: #ffffff;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.7px;
          padding: 3px 8px;
          border-radius: 4px;
          text-transform: uppercase;
        }

        /* ── LEADERBOARD (MOST POPULAR) ── */
        .popular-board {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 48px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
        }

        @media (min-width: 768px) {
          .popular-board {
            grid-template-columns: repeat(5, 1fr);
            gap: 20px;
          }
        }

        .leader-item {
          display: flex;
          flex-direction: column;
          position: relative;
          padding-bottom: 12px;
        }

        @media (max-width: 767px) {
          .leader-item {
            flex-direction: row;
            align-items: center;
            gap: 16px;
            border-bottom: 1px solid #f3f4f6;
          }
        }

        .leader-rank {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 32px;
          font-weight: 900;
          color: #d1d5db;
          line-height: 1;
          margin-bottom: 8px;
        }

        .leader-thumb {
          width: 100%;
          aspect-ratio: 16 / 10;
          object-fit: cover;
          border-radius: 6px;
          margin-bottom: 10px;
        }

        @media (max-width: 767px) {
          .leader-thumb {
            width: 80px;
            height: 60px;
            margin-bottom: 0;
            flex-shrink: 0;
          }
        }

        .leader-title {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 14.5px;
          font-weight: 700;
          line-height: 1.35;
          color: #111827;
          text-decoration: none;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.15s;
        }

        .leader-title:hover {
          color: #0c5354;
        }

        /* ── REGIONAL COMPARISON ROW ── */
        .regional-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          margin-bottom: 48px;
        }

        @media (min-width: 1024px) {
          .regional-row {
            grid-template-columns: 1fr 1fr;
          }
        }

        .regional-box {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
        }

        .reg-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-bottom: 12px;
          border-bottom: 2px solid #0c5354;
          margin-bottom: 20px;
        }

        .reg-flag {
          font-size: 24px;
        }

        .reg-title {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 20px;
          font-weight: 800;
          color: #111827;
        }

        /* ── ARCHIVE CONTROLS & SEARCH ── */
        .archive-controls {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px 20px;
          margin-bottom: 28px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        @media (min-width: 768px) {
          .archive-controls {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }

        .search-input-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
          background: #f9fafb;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          padding: 8px 14px;
        }

        .search-input {
          border: none;
          background: transparent;
          width: 100%;
          font-size: 14px;
          outline: none;
          color: #111827;
        }

        .sort-select {
          padding: 8px 14px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          background: #ffffff;
          font-size: 13px;
          font-weight: 600;
          color: #374151;
          outline: none;
          cursor: pointer;
        }

        /* ── SPONSORED DISCLOSURE BOX ── */
        .ad-disclosure-bar {
          text-align: center;
          margin: 40px auto;
          padding: 14px;
          max-width: 728px;
          background: #f9fafb;
          border: 1px dashed #d1d5db;
          border-radius: 6px;
          font-size: 11px;
          color: #9ca3af;
          letter-spacing: 0.8px;
          text-transform: uppercase;
        }

        /* ── LOAD MORE & VIEW ALL BUTTONS ── */
        .view-all-cta-wrap {
          text-align: center;
          margin: 32px 0 60px;
        }

        .view-all-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #111827;
          color: #ffffff;
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          padding: 14px 36px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .view-all-cta-btn:hover {
          background: #0c5354;
          transform: translateY(-2px);
        }

        /* ── NEWSLETTER SIGNUP ── */
        .newsletter-card {
          background: #0c5354;
          color: #ffffff;
          border-radius: 12px;
          padding: 40px 24px;
          text-align: center;
          margin: 48px 0 20px;
        }

        .newsletter-card h3 {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 28px;
          font-weight: 800;
          margin-bottom: 10px;
        }

        .newsletter-card p {
          font-size: 15px;
          color: #d1fae5;
          max-width: 580px;
          margin: 0 auto 20px;
          line-height: 1.5;
        }

        .newsletter-form {
          display: flex;
          max-width: 460px;
          margin: 0 auto;
          gap: 8px;
        }

        .newsletter-input {
          flex: 1;
          padding: 12px 16px;
          font-size: 14px;
          border-radius: 6px;
          border: none;
          outline: none;
          color: #111827;
        }

        .newsletter-btn {
          background: #ba4f1c;
          color: #ffffff;
          border: none;
          font-weight: 800;
          font-size: 12.5px;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          padding: 0 22px;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .newsletter-btn:hover {
          background: #9a3e14;
        }
      `}</style>

      <div className="news-page">
        <Header />

        <main className="news-container">
          {/* ── MASTHEAD & EDITORIAL HEADER ── */}
          <header className="masthead">
            <div className="masthead-topline">
              <span>Daily Culinary Journalism</span>
              <span>Updated: Sept 8, 2026</span>
              <span>USA &amp; Canada Edition</span>
            </div>

            <h1 className="masthead-title">FOOD NEWS &amp; TRENDS</h1>

            <p className="masthead-sub">
              Your verified guide to North American food culture: breaking restaurant developments,
              Costco and Trader Joe&apos;s product releases, celebrity chef secrets, viral culinary trends,
              and weeknight dinner recipes tailored for home cooks across the United States and Canada.
            </p>

            {/* Region Filter Switcher */}
            <div className="country-selector" role="radiogroup" aria-label="Filter by Country">
              <button
                className={`country-btn${selectedCountry === "ALL" ? " active" : ""}`}
                onClick={() => setSelectedCountry("ALL")}
                aria-pressed={selectedCountry === "ALL"}
              >
                🌎 North America
              </button>
              <button
                className={`country-btn${selectedCountry === "USA" ? " active" : ""}`}
                onClick={() => setSelectedCountry("USA")}
                aria-pressed={selectedCountry === "USA"}
              >
                🇺🇸 United States
              </button>
              <button
                className={`country-btn${selectedCountry === "CANADA" ? " active" : ""}`}
                onClick={() => setSelectedCountry("CANADA")}
                aria-pressed={selectedCountry === "CANADA"}
              >
                🇨🇦 Canada
              </button>
            </div>
          </header>

          {/* ── STICKY CATEGORY NAVIGATION (8 REQUIRED CATEGORIES) ── */}
          <nav className="category-nav-sticky" aria-label="Food News Navigation">
            <div className="category-nav-inner">
              {categoryNavItems.map((item) => (
                <button
                  key={item.id}
                  className={`cat-nav-btn${activeNav === item.id ? " active" : ""}`}
                  onClick={() => handleNavClick(item.id, item.filterKey)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>

          {/* ── TRENDING SEARCH TAGS ── */}
          <div className="quick-tags-bar" aria-label="Trending Topics">
            <span style={{ fontSize: "11px", fontWeight: "800", color: "#6b7280", textTransform: "uppercase" }}>
              Trending Now:
            </span>
            <button className="tag-pill" onClick={() => handleTagClick("Costco")}>#CostcoFinds</button>
            <button className="tag-pill" onClick={() => handleTagClick("Trader Joe's")}>#TraderJoesFall</button>
            <button className="tag-pill" onClick={() => handleTagClick("Dubai Chocolate")}>#DubaiChocolate</button>
            <button className="tag-pill" onClick={() => handleTagClick("Ina Garten")}>#InaGarten</button>
            <button className="tag-pill" onClick={() => handleTagClick("Stanley Tucci")}>#SpaghettiNerano</button>
            <button className="tag-pill" onClick={() => handleTagClick("Air Fryer")}>#AirFryerWings</button>
            <button className="tag-pill" onClick={() => handleTagClick("Smash Burgers")}>#SmashBurgers</button>
            <button className="tag-pill" onClick={() => handleTagClick("Tim Hortons")}>#TimHortonsMenu</button>
          </div>

          {/* ══════════ IF IN ARCHIVE / SEARCH VIEW ══════════ */}
          {viewMode === "archive" ? (
            <section aria-label="Complete Food News Archive">
              <div className="archive-controls">
                <div className="search-input-wrap">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search articles, recipes, stores (Costco, Trader Joe's, Tim Hortons)..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setArchiveVisibleCount(12);
                    }}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", fontWeight: "bold" }}
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "12.5px", color: "#6b7280" }}>
                    Showing {Math.min(archiveVisibleCount, sortedArticles.length)} of {sortedArticles.length} stories
                  </span>

                  <select
                    className="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as "featured" | "recent" | "readTime" | "rating")}
                    aria-label="Sort articles"
                  >
                    <option value="featured">Featured First</option>
                    <option value="recent">Most Recent</option>
                    <option value="readTime">Quickest Reads</option>
                    <option value="rating">Top Rated Recipes</option>
                  </select>

                  <button
                    onClick={() => {
                      setViewMode("magazine");
                      setActiveNav("news-trends");
                    }}
                    style={{
                      background: "#f3f4f6",
                      border: "1px solid #d1d5db",
                      padding: "8px 14px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: "700",
                      cursor: "pointer",
                    }}
                  >
                    Back to Magazine
                  </button>
                </div>
              </div>

              {sortedArticles.length > 0 ? (
                <div className="grid-3">
                  {sortedArticles.slice(0, archiveVisibleCount).map((article) => {
                    const isSaved = savedIds.includes(article.id);
                    return (
                      <article key={article.id} className="art-card">
                        <div className="art-img-wrap">
                          <Link href={`/food-news/${article.slug}`}>
                            <img
                              src={article.imageUrl}
                              alt={article.imageAlt}
                              className="art-img"
                              loading="lazy"
                            />
                          </Link>
                          <span style={{ position: "absolute", top: 10, left: 10, background: "rgba(17,24,39,0.85)", color: "#fff", fontSize: "10px", fontWeight: "700", padding: "3px 8px", borderRadius: "3px" }}>
                            {article.countryBadge}
                          </span>
                          <button
                            className={`save-pill-btn${isSaved ? " saved" : ""}`}
                            onClick={(e) => toggleSave(article.id, e)}
                            aria-label="Save story"
                          >
                            {isSaved ? "♥" : "♡"}
                          </button>
                        </div>
                        <div className="art-content">
                          <div className="art-cat-row">
                            <span>{article.category}</span>
                            <span>⏱ {article.readTime}</span>
                          </div>
                          <Link href={`/food-news/${article.slug}`} className="art-title">
                            {article.headline}
                          </Link>
                          <p className="art-deck">{article.deck}</p>
                          <div className="art-meta">
                            <span>{article.author}</span>
                            <span>{article.date}</span>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "60px 20px", color: "#6b7280" }}>
                  <p style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}>
                    No food news stories found matching your criteria.
                  </p>
                  <p style={{ fontSize: "14px" }}>
                    Try clearing search terms or changing your region filter.
                  </p>
                </div>
              )}

              {archiveVisibleCount < sortedArticles.length && (
                <div style={{ textAlign: "center", margin: "30px 0" }}>
                  <button
                    className="view-all-cta-btn"
                    onClick={() => setArchiveVisibleCount((prev) => prev + 9)}
                  >
                    Load More Stories ({sortedArticles.length - archiveVisibleCount} remaining)
                  </button>
                </div>
              )}
            </section>
          ) : (
            /* ══════════ MAGAZINE EDITORIAL LAYOUT ══════════ */
            <>
              {/* ── 1. HERO SECTION (FEATURED STORY) ── */}
              <section className="hero-section" aria-label="Featured Lead Story">
                <article className="hero-card">
                  <div className="hero-img-wrap">
                    <Link href={`/food-news/${leadStory.slug}`}>
                      <img
                        src={leadStory.imageUrl}
                        alt={leadStory.imageAlt}
                        className="hero-img"
                      />
                    </Link>
                  </div>
                  <div className="hero-content">
                    <div className="hero-badges">
                      <span className="breaking-badge">Featured Lead</span>
                      <span className="country-tag">{leadStory.countryBadge}</span>
                      <span className="category-tag">{leadStory.category}</span>
                    </div>

                    <Link href={`/food-news/${leadStory.slug}`} className="hero-headline">
                      {leadStory.headline}
                    </Link>

                    <p className="hero-deck">{leadStory.deck}</p>

                    <div className="hero-meta">
                      <span>{leadStory.author}</span>
                      <span>•</span>
                      <span>{leadStory.date}</span>
                      <span>•</span>
                      <span>⏱ {leadStory.readTime}</span>
                    </div>

                    <Link href={`/food-news/${leadStory.slug}`} className="read-btn">
                      <span>Read Full Story</span>
                      <span>→</span>
                    </Link>
                  </div>
                </article>
              </section>

              {/* ── 2. LATEST NEWS (NEWS & TRENDS GRID) ── */}
              <section id="news-trends" aria-label="Latest News Grid">
                <div className="sec-header">
                  <div className="sec-title-wrap">
                    <h2 className="sec-title">Latest News &amp; Trends</h2>
                    <span className="sec-badge">Verified Reporting</span>
                  </div>
                  <button
                    className="sec-link"
                    onClick={() => {
                      setViewMode("archive");
                      setActiveNav("news-trends");
                    }}
                  >
                    View All News →
                  </button>
                </div>

                <div className="grid-4">
                  {latestNews.map((article) => (
                    <article key={article.id} className="art-card">
                      <div className="art-img-wrap">
                        <Link href={`/food-news/${article.slug}`}>
                          <img
                            src={article.imageUrl}
                            alt={article.imageAlt}
                            className="art-img"
                            loading="lazy"
                          />
                        </Link>
                        <span style={{ position: "absolute", top: 10, left: 10, background: "rgba(17,24,39,0.85)", color: "#fff", fontSize: "10px", fontWeight: "700", padding: "3px 8px", borderRadius: "3px" }}>
                          {article.countryBadge}
                        </span>
                      </div>
                      <div className="art-content">
                        <div className="art-cat-row">
                          <span>{article.category}</span>
                          <span>⏱ {article.readTime}</span>
                        </div>
                        <Link href={`/food-news/${article.slug}`} className="art-title">
                          {article.headline}
                        </Link>
                        <p className="art-deck">{article.deck}</p>
                        <div className="art-meta">
                          <span>{article.author}</span>
                          <span>{article.date}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              {/* ── 3. TRENDING NOW (VIRAL FOOD TRENDS) ── */}
              <section id="food-trends" aria-label="Viral Food Trends">
                <div className="sec-header">
                  <div className="sec-title-wrap">
                    <h2 className="sec-title">Trending Now</h2>
                    <span className="sec-badge" style={{ background: "#fef3c7", color: "#d97706" }}>
                      🔥 Viral Sensations
                    </span>
                  </div>
                  <button
                    className="sec-link"
                    onClick={() => {
                      setViewMode("archive");
                      setActiveNav("food-trends");
                    }}
                  >
                    Explore Trends →
                  </button>
                </div>

                <div className="grid-4">
                  {trendingStories.map((article) => (
                    <article key={article.id} className="art-card" style={{ borderTop: "3px solid #ba4f1c" }}>
                      <div className="art-img-wrap">
                        <Link href={`/food-news/${article.slug}`}>
                          <img
                            src={article.imageUrl}
                            alt={article.imageAlt}
                            className="art-img"
                            loading="lazy"
                          />
                        </Link>
                        <span style={{ position: "absolute", top: 10, left: 10, background: "#ba4f1c", color: "#fff", fontSize: "10px", fontWeight: "800", padding: "3px 8px", borderRadius: "3px" }}>
                          Viral Hit
                        </span>
                      </div>
                      <div className="art-content">
                        <div className="art-cat-row">
                          <span style={{ color: "#ba4f1c" }}>{article.category}</span>
                          <span>⏱ {article.readTime}</span>
                        </div>
                        <Link href={`/food-news/${article.slug}`} className="art-title">
                          {article.headline}
                        </Link>
                        <p className="art-deck">{article.deck}</p>
                        <div className="art-meta">
                          <span>{article.author}</span>
                          <span>{article.date}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              {/* ── SPONSORED CONTENT ZONE (AD-FRIENDLY) ── */}
              <div className="ad-disclosure-bar" role="complementary" aria-label="Advertisement Banner">
                <span>Advertisement • Modern Food Journalism Partner Network</span>
              </div>

              {/* ── 4. POPULAR RECIPES SECTION (HIGH SEARCH INTENT) ── */}
              <section id="popular-recipes" aria-label="Popular Recipes">
                <div className="sec-header">
                  <div className="sec-title-wrap">
                    <h2 className="sec-title">Popular Recipes</h2>
                    <span className="sec-badge" style={{ background: "#ecfdf5", color: "#059669" }}>
                      ★ Test Kitchen Certified
                    </span>
                  </div>
                  <button
                    className="sec-link"
                    onClick={() => {
                      setViewMode("archive");
                      setActiveNav("popular-recipes");
                    }}
                  >
                    View All Recipes →
                  </button>
                </div>

                <div className="grid-4">
                  {popularRecipes.map((recipe) => (
                    <article key={recipe.id} className="recipe-card">
                      <div className="recipe-img-wrap">
                        <Link href={`/food-news/${recipe.slug}`}>
                          <img
                            src={recipe.imageUrl}
                            alt={recipe.imageAlt}
                            className="recipe-img"
                            loading="lazy"
                          />
                        </Link>
                        <span className="recipe-time-pill">
                          ⏱ {recipe.recipeDetails?.totalTime || recipe.recipeDetails?.cookTime}
                        </span>
                        <span style={{ position: "absolute", top: 10, left: 10, background: "rgba(17,24,39,0.85)", color: "#fff", fontSize: "10px", fontWeight: "700", padding: "3px 8px", borderRadius: "3px" }}>
                          {recipe.recipeDetails?.difficulty || "Easy"}
                        </span>
                      </div>
                      <div className="recipe-content">
                        <div className="recipe-rating-row">
                          <span>★ {recipe.recipeDetails?.rating.toFixed(1)}</span>
                          <span className="rating-count">
                            ({recipe.recipeDetails?.ratingCount} ratings)
                          </span>
                        </div>
                        <Link href={`/food-news/${recipe.slug}`} className="recipe-title">
                          {recipe.headline}
                        </Link>
                        <p className="recipe-desc">{recipe.deck}</p>
                        <Link href={`/food-news/${recipe.slug}`} className="view-recipe-btn">
                          <span>View Recipe</span>
                          <span>→</span>
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              {/* ── 5. CELEBRITY FOOD SECTION ── */}
              <section id="celebrity" aria-label="Celebrity Food Stories">
                <div className="sec-header">
                  <div className="sec-title-wrap">
                    <h2 className="sec-title">Celebrity Food &amp; Chefs</h2>
                    <span className="sec-badge">Verified Sources</span>
                  </div>
                  <button
                    className="sec-link"
                    onClick={() => {
                      setViewMode("archive");
                      setActiveNav("celebrity");
                    }}
                  >
                    All Celebrity Stories →
                  </button>
                </div>

                <div className="grid-3">
                  {celebrityStories.map((article) => (
                    <article key={article.id} className="celeb-card">
                      <div className="celeb-img-wrap">
                        <Link href={`/food-news/${article.slug}`}>
                          <img
                            src={article.imageUrl}
                            alt={article.imageAlt}
                            className="celeb-img"
                            loading="lazy"
                          />
                        </Link>
                        <span className="celeb-badge">Celebrity</span>
                      </div>
                      <div className="art-content">
                        <div className="art-cat-row">
                          <span>{article.category}</span>
                          <span>⏱ {article.readTime}</span>
                        </div>
                        <Link href={`/food-news/${article.slug}`} className="art-title">
                          {article.headline}
                        </Link>
                        <p className="art-deck">{article.deck}</p>
                        <div className="art-meta">
                          <span>{article.author}</span>
                          <span>{article.date}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              {/* ── 6. RESTAURANT NEWS & GROCERY NEWS ── */}
              <section id="restaurant-news" aria-label="Restaurant and Grocery News">
                <div className="sec-header">
                  <div className="sec-title-wrap">
                    <h2 className="sec-title">Restaurant &amp; Grocery News</h2>
                    <span className="sec-badge">Supermarket &amp; Dining Intel</span>
                  </div>
                  <button
                    className="sec-link"
                    onClick={() => {
                      setViewMode("archive");
                      setActiveNav("grocery-news");
                    }}
                  >
                    View All Retail News →
                  </button>
                </div>

                <div className="grid-4">
                  {[...latestNews, ...usaStories].slice(0, 4).map((article) => (
                    <article key={article.id} className="art-card">
                      <div className="art-img-wrap">
                        <Link href={`/food-news/${article.slug}`}>
                          <img
                            src={article.imageUrl}
                            alt={article.imageAlt}
                            className="art-img"
                            loading="lazy"
                          />
                        </Link>
                        <span style={{ position: "absolute", top: 10, left: 10, background: "rgba(17,24,39,0.85)", color: "#fff", fontSize: "10px", fontWeight: "700", padding: "3px 8px", borderRadius: "3px" }}>
                          {article.countryBadge}
                        </span>
                      </div>
                      <div className="art-content">
                        <div className="art-cat-row">
                          <span>{article.category}</span>
                          <span>⏱ {article.readTime}</span>
                        </div>
                        <Link href={`/food-news/${article.slug}`} className="art-title">
                          {article.headline}
                        </Link>
                        <p className="art-deck">{article.deck}</p>
                        <div className="art-meta">
                          <span>{article.author}</span>
                          <span>{article.date}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              {/* ── 7. USA VS CANADA REGIONAL FOOD NEWS ── */}
              <section aria-label="Regional News: USA and Canada">
                <div className="regional-row">
                  {/* USA News Box */}
                  <div className="regional-box">
                    <div className="reg-header">
                      <span className="reg-flag">🇺🇸</span>
                      <h3 className="reg-title">USA Food News</h3>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      {usaStories.map((story) => (
                        <div key={story.id} style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                          <Link href={`/food-news/${story.slug}`} style={{ flexShrink: 0 }}>
                            <img
                              src={story.imageUrl}
                              alt={story.imageAlt}
                              style={{ width: "90px", height: "65px", objectFit: "cover", borderRadius: "6px" }}
                              loading="lazy"
                            />
                          </Link>
                          <div>
                            <span style={{ fontSize: "10.5px", fontWeight: "800", color: "#ba4f1c", textTransform: "uppercase" }}>
                              {story.category}
                            </span>
                            <Link href={`/food-news/${story.slug}`} className="leader-title" style={{ WebkitLineClamp: 2 }}>
                              {story.headline}
                            </Link>
                            <span style={{ fontSize: "11px", color: "#9ca3af" }}>{story.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Canada News Box */}
                  <div className="regional-box">
                    <div className="reg-header">
                      <span className="reg-flag">🇨🇦</span>
                      <h3 className="reg-title">Canada Food News</h3>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      {canadaStories.map((story) => (
                        <div key={story.id} style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                          <Link href={`/food-news/${story.slug}`} style={{ flexShrink: 0 }}>
                            <img
                              src={story.imageUrl}
                              alt={story.imageAlt}
                              style={{ width: "90px", height: "65px", objectFit: "cover", borderRadius: "6px" }}
                              loading="lazy"
                            />
                          </Link>
                          <div>
                            <span style={{ fontSize: "10.5px", fontWeight: "800", color: "#0c5354", textTransform: "uppercase" }}>
                              {story.category}
                            </span>
                            <Link href={`/food-news/${story.slug}`} className="leader-title" style={{ WebkitLineClamp: 2 }}>
                              {story.headline}
                            </Link>
                            <span style={{ fontSize: "11px", color: "#9ca3af" }}>{story.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* ── 8. MOST POPULAR LEADERBOARD ── */}
              <section id="most-popular" aria-label="Most Popular Stories">
                <div className="sec-header">
                  <div className="sec-title-wrap">
                    <h2 className="sec-title">Most Popular Stories</h2>
                    <span className="sec-badge">Top-Read This Week</span>
                  </div>
                </div>

                <div className="popular-board">
                  {mostPopularLeaderboard.map((item, index) => (
                    <div key={item.id} className="leader-item">
                      <span className="leader-rank">0{index + 1}</span>
                      <Link href={`/food-news/${item.slug}`}>
                        <img
                          src={item.imageUrl}
                          alt={item.imageAlt}
                          className="leader-thumb"
                          loading="lazy"
                        />
                      </Link>
                      <div>
                        <span style={{ fontSize: "10px", fontWeight: "800", color: "#009b72", textTransform: "uppercase" }}>
                          {item.category}
                        </span>
                        <Link href={`/food-news/${item.slug}`} className="leader-title">
                          {item.headline}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── 9. VIEW ALL BUTTON (COMPLETE ARCHIVE TRIGGER) ── */}
              <div className="view-all-cta-wrap">
                <button
                  className="view-all-cta-btn"
                  onClick={() => {
                    setViewMode("archive");
                    setActiveNav("all");
                    window.scrollTo({ top: 400, behavior: "smooth" });
                  }}
                >
                  <span>Explore Complete Food News Archive (32 Articles)</span>
                  <span>→</span>
                </button>
              </div>

              {/* ── NEWSLETTER SUBSCRIPTION ── */}
              <section className="newsletter-card" aria-label="Food News Newsletter">
                <h3>Stay Ahead of Food Trends &amp; Safety Recalls</h3>
                <p>
                  Get verified morning briefings on restaurant menus, Costco and Trader Joe&apos;s finds,
                  and tested weeknight recipes delivered to your inbox every Thursday.
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Thank you for subscribing to Dishora Food News & Trends!");
                  }}
                  className="newsletter-form"
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    className="newsletter-input"
                  />
                  <button type="submit" className="newsletter-btn">
                    Subscribe Free
                  </button>
                </form>
              </section>
            </>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}
