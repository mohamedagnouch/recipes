"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { WinnerDetailedData } from "../../../data/freeziesWinnerDetailsData";
import { freeziesProducts } from "../../../data/freeziesData";

interface WinnerDetailClientProps {
  winner: WinnerDetailedData;
}

export default function WinnerDetailClient({ winner }: WinnerDetailClientProps) {
  // Sticky bar state
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Interactive ingredient checklist
  const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);
  const [servingMultiplier, setServingMultiplier] = useState<number>(1);
  const [copiedIngredients, setCopiedIngredients] = useState(false);

  // Cook Mode & Step tracking
  const [isCookMode, setIsCookMode] = useState(false);
  const [activeCookStep, setActiveCookStep] = useState(0);

  // Inline Kitchen Timer
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number | null>(null);
  const [activeTimerLabel, setActiveTimerLabel] = useState("");
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // User Save state
  const [isSaved, setIsSaved] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  // Reviews state
  const [reviews, setReviews] = useState(winner.userReviews || []);
  const [newAuthor, setNewAuthor] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Active preparation method tab
  const [activePrepMethod, setActivePrepMethod] = useState(0);

  // Scroll listener for sticky bar
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check saved state from localStorage
  useEffect(() => {
    try {
      const savedList = localStorage.getItem("simply_recipes_saved_freezies");
      if (savedList) {
        const parsed = JSON.parse(savedList);
        if (parsed.includes(winner.slug)) {
          setIsSaved(true);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [winner.slug]);

  // Toggle Save
  const toggleSave = () => {
    const nextSaved = !isSaved;
    setIsSaved(nextSaved);
    try {
      const savedList = localStorage.getItem("simply_recipes_saved_freezies");
      let list = savedList ? JSON.parse(savedList) : [];
      if (nextSaved) {
        if (!list.includes(winner.slug)) list.push(winner.slug);
      } else {
        list = list.filter((s: string) => s !== winner.slug);
      }
      localStorage.setItem("simply_recipes_saved_freezies", JSON.stringify(list));
    } catch (e) {
      console.error(e);
    }
  };

  // Timer engine
  useEffect(() => {
    if (timerRunning && timerSecondsLeft !== null && timerSecondsLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimerSecondsLeft((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(timerIntervalRef.current as NodeJS.Timeout);
            setTimerRunning(false);
            if (typeof window !== "undefined" && "Notification" in window) {
              try {
                new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3").play().catch(() => {});
              } catch {}
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [timerRunning, timerSecondsLeft]);

  const startTimerForStep = (minutes: number, label: string) => {
    setActiveTimerLabel(label);
    setTimerSecondsLeft(minutes * 60);
    setTimerRunning(true);
  };

  const formatTimer = (totalSeconds: number | null) => {
    if (totalSeconds === null) return "00:00";
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Copy ingredients
  const copyIngredients = () => {
    const text = winner.ingredients.join("\n");
    navigator.clipboard.writeText(text);
    setCopiedIngredients(true);
    setTimeout(() => setCopiedIngredients(false), 2000);
  };

  // Submit review
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;
    const rev = {
      id: `rev-user-${Date.now()}`,
      author: newAuthor.trim(),
      date: "Just now",
      rating: newRating,
      comment: newComment.trim(),
      helpfulCount: 0,
    };
    setReviews([rev, ...reviews]);
    setNewAuthor("");
    setNewComment("");
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  // Related sibling winners
  const relatedWinners = freeziesProducts
    .filter((p) => p.slug !== winner.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#fafaf9] text-gray-900 font-sans selection:bg-[#0c5354] selection:text-white">
      <Header />

      {/* ── STICKY QUICK ACTION BAR (ON SCROLL) ── */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 transition-all duration-300 shadow-sm ${
          showStickyBar ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <img
              src={winner.imageUrl}
              alt={winner.name}
              className="w-10 h-10 rounded-md object-cover flex-shrink-0 border border-gray-200"
            />
            <div className="truncate">
              <div className="text-[10.5px] font-black uppercase tracking-wider text-[#d97706] truncate">
                {winner.awardTitle}
              </div>
              <div className="font-serif font-bold text-sm text-gray-900 truncate">
                {winner.name}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {timerSecondsLeft !== null && (
              <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 rounded text-xs font-bold text-amber-900">
                <span>⏱ {formatTimer(timerSecondsLeft)}</span>
                <button
                  onClick={() => setTimerRunning(!timerRunning)}
                  className="hover:text-amber-700 underline text-[11px]"
                >
                  {timerRunning ? "Pause" : "Play"}
                </button>
              </div>
            )}

            <button
              onClick={toggleSave}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-colors flex items-center gap-1.5 ${
                isSaved
                  ? "bg-red-50 text-red-600 border border-red-200"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span>{isSaved ? "♥ Saved" : "♡ Save"}</span>
            </button>

            <button
              onClick={() => setShowShareModal(true)}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded text-xs font-bold text-gray-700 flex items-center gap-1"
            >
              ↗ Share
            </button>

            <button
              onClick={() => window.print()}
              className="hidden sm:inline-flex px-3 py-1.5 bg-[#0c5354] hover:bg-[#083c3d] text-white rounded text-xs font-bold uppercase tracking-wider"
            >
              Print Card
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-20">
        {/* ── BREADCRUMBS ── */}
        <nav aria-label="Breadcrumb" className="mb-6 text-xs font-semibold text-gray-500 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-[#0c5354] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/freezies" className="hover:text-[#0c5354] transition-colors">The 2026 Freezies Awards</Link>
          <span>/</span>
          <Link href={`/freezies/categories/${winner.categorySlug}`} className="hover:text-[#0c5354] transition-colors">
            {winner.categoryName}
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-bold truncate">{winner.name}</span>
        </nav>

        {/* ── HERO HEADER SECTION ── */}
        <header className="mb-8 border-b border-gray-200 pb-8">
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className="bg-[#d97706] text-white text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-xs">
              ★ {winner.awardTitle}
            </span>
            <span className="bg-[#0c5354] text-white text-[11px] font-black px-3 py-1 rounded-full">
              Overall Score: {winner.overallScore}/100
            </span>
            <span className="bg-gray-100 text-gray-700 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {winner.categoryName}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 tracking-tight leading-[1.15] mb-4">
            {winner.name}
          </h1>

          <div className="text-sm font-bold text-gray-600 mb-4 flex items-center gap-2">
            <span>By <strong className="text-gray-950">{winner.brand}</strong></span>
            <span>•</span>
            <span>Pack Size: <strong>{winner.size}</strong></span>
            <span>•</span>
            <span>Servings: <strong>{winner.servings}</strong></span>
          </div>

          <p className="font-serif text-lg sm:text-xl text-gray-700 leading-relaxed max-w-4xl italic mb-6">
            &ldquo;{winner.shortVerdict}&rdquo;
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
            <div className="border-r border-gray-100 last:border-0 pr-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">Prep Time</span>
              <span className="text-base font-extrabold text-gray-900">⏱ {winner.prepTime}</span>
            </div>
            <div className="border-r border-gray-100 last:border-0 pr-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">Cooking Time</span>
              <span className="text-base font-extrabold text-gray-900">♨️ {winner.cookTime}</span>
            </div>
            <div className="border-r border-gray-100 last:border-0 pr-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">Yield</span>
              <span className="text-base font-extrabold text-gray-900">🍽️ {winner.servings}</span>
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">Calories</span>
              <span className="text-base font-extrabold text-gray-900">🔥 {winner.calories}</span>
            </div>
          </div>
        </header>

        {/* ── HERO IMAGE & ACTION STRIP ── */}
        <div className="mb-12">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-gray-900 shadow-lg border border-gray-200">
            <img
              src={winner.imageUrl}
              alt={winner.imageAlt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent flex items-end p-6 sm:p-8">
              <div className="text-white max-w-3xl">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-300 block mb-1">
                  Culinary Test Kitchen Seal of Excellence
                </span>
                <p className="text-sm sm:text-base text-gray-200 leading-snug">
                  {winner.imageAlt}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={toggleSave}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                  isSaved
                    ? "bg-red-500 text-white shadow-xs"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span>{isSaved ? "♥ Saved in Favorites" : "♡ Save to Favorites"}</span>
              </button>

              <button
                onClick={() => setShowShareModal(true)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-xs font-bold uppercase tracking-wider text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <span>↗ Share Winner</span>
              </button>

              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-xs font-bold uppercase tracking-wider text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <span>🖨️ Print Recipe Card</span>
              </button>
            </div>

            <button
              onClick={() => setIsCookMode(!isCookMode)}
              className={`px-5 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
                isCookMode
                  ? "bg-amber-500 text-white shadow-md"
                  : "bg-[#0c5354] text-white hover:bg-[#083c3d]"
              }`}
            >
              <span>{isCookMode ? "✕ Exit Guided Cook Mode" : "👨‍🍳 Start Guided Cook Mode"}</span>
            </button>
          </div>
        </div>

        {/* ── GUIDED COOK MODE (IF ACTIVE) ── */}
        {isCookMode && (
          <div className="mb-12 bg-gray-950 text-white p-6 sm:p-8 rounded-2xl shadow-xl border-2 border-amber-500/80 animate-in fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-gray-800 mb-6">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-amber-400 block">
                  Interactive Test Kitchen Guide
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold">
                  Step {activeCookStep + 1} of {winner.instructions.length}: {winner.instructions[activeCookStep].title}
                </h3>
              </div>
              <span className="text-sm font-bold text-gray-400">
                {Math.round(((activeCookStep + 1) / winner.instructions.length) * 100)}% Complete
              </span>
            </div>

            <p className="text-lg text-gray-200 leading-relaxed mb-8">
              {winner.instructions[activeCookStep].text}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-800">
              <div className="flex items-center gap-2">
                <button
                  disabled={activeCookStep === 0}
                  onClick={() => setActiveCookStep((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-30 rounded text-xs font-bold uppercase tracking-wider"
                >
                  ← Previous Step
                </button>
                <button
                  disabled={activeCookStep === winner.instructions.length - 1}
                  onClick={() => setActiveCookStep((prev) => Math.min(winner.instructions.length - 1, prev + 1))}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-black rounded text-xs font-bold uppercase tracking-wider"
                >
                  Next Step →
                </button>
              </div>

              {winner.instructions[activeCookStep].timerMinutes && (
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-300">
                    Timer: {winner.instructions[activeCookStep].timerMinutes} mins
                  </span>
                  <button
                    onClick={() =>
                      startTimerForStep(
                        winner.instructions[activeCookStep].timerMinutes || 5,
                        winner.instructions[activeCookStep].title
                      )
                    }
                    className="px-3.5 py-1.5 bg-[#0c5354] hover:bg-[#0e6162] text-white rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                  >
                    ⏱ Launch Timer
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── TWO-COLUMN MAIN CONTENT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT 7 COLS: INGREDIENTS, INSTRUCTIONS, SENSORY NOTES */}
          <div className="lg:col-span-7 space-y-10">
            {/* ── INGREDIENTS SECTION ── */}
            <section className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-100 mb-6">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-[#0c5354] block">
                    Composition &amp; Deck
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-950">
                    Ingredients &amp; Elements
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center border border-gray-200 rounded-lg p-0.5 text-xs font-bold bg-gray-50">
                    <button
                      onClick={() => setServingMultiplier(1)}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        servingMultiplier === 1 ? "bg-white text-gray-900 shadow-2xs" : "text-gray-500 hover:text-gray-900"
                      }`}
                    >
                      1x
                    </button>
                    <button
                      onClick={() => setServingMultiplier(2)}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        servingMultiplier === 2 ? "bg-white text-gray-900 shadow-2xs" : "text-gray-500 hover:text-gray-900"
                      }`}
                    >
                      2x
                    </button>
                    <button
                      onClick={() => setServingMultiplier(3)}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        servingMultiplier === 3 ? "bg-white text-gray-900 shadow-2xs" : "text-gray-500 hover:text-gray-900"
                      }`}
                    >
                      3x
                    </button>
                  </div>

                  <button
                    onClick={copyIngredients}
                    className="text-xs font-bold text-gray-600 hover:text-[#0c5354] border border-gray-200 px-2.5 py-1 rounded-lg bg-gray-50 transition-colors"
                  >
                    {copiedIngredients ? "✓ Copied!" : "📋 Copy"}
                  </button>
                </div>
              </div>

              <ul className="space-y-3">
                {winner.ingredients.map((ing, idx) => {
                  const isChecked = checkedIngredients.includes(idx);
                  return (
                    <li
                      key={idx}
                      onClick={() => {
                        setCheckedIngredients((prev) =>
                          isChecked ? prev.filter((i) => i !== idx) : [...prev, idx]
                        );
                      }}
                      className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-3 select-none ${
                        isChecked
                          ? "bg-gray-50 border-gray-200 text-gray-400 line-through"
                          : "bg-white border-gray-200/80 hover:border-amber-300 text-gray-800"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-1 h-4 w-4 rounded text-[#0c5354] focus:ring-[#0c5354] border-gray-300 pointer-events-none"
                      />
                      <span className="text-sm font-medium leading-relaxed">{ing}</span>
                    </li>
                  );
                })}
              </ul>

              {/* Chef Tip Alert Box */}
              <div className="mt-6 p-4 rounded-xl bg-amber-50 border-l-4 border-amber-500 text-amber-950">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm">👨‍🍳</span>
                  <span className="text-xs font-black uppercase tracking-wider text-amber-900">
                    Test Kitchen Chef Tip
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-amber-900 font-medium">
                  {winner.chefTip}
                </p>
              </div>
            </section>

            {/* ── PREPARATION METHODS & STEP-BY-STEP INSTRUCTIONS ── */}
            <section className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs">
              <div className="pb-4 border-b border-gray-100 mb-6">
                <span className="text-[11px] font-black uppercase tracking-widest text-[#0c5354] block">
                  Cooking &amp; Tempering
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-950">
                  Preparation Instructions
                </h2>
              </div>

              {/* Method Selector Tabs */}
              {winner.prepMethods && winner.prepMethods.length > 0 && (
                <div className="mb-6">
                  <div className="flex gap-2 border-b border-gray-200 pb-2">
                    {winner.prepMethods.map((method, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActivePrepMethod(idx)}
                        className={`px-4 py-2 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                          activePrepMethod === idx
                            ? "bg-[#0c5354] text-white shadow-xs"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        <span>{method.methodName}</span>
                        {method.isRecommended && (
                          <span className="text-[9px] bg-amber-400 text-gray-950 px-1.5 py-0.5 rounded-full font-black">
                            Best
                          </span>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="mt-3 p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-700">
                    <p className="font-medium">{winner.prepMethods[activePrepMethod].description}</p>
                    {winner.prepMethods[activePrepMethod].temperature && (
                      <div className="mt-2 text-xs font-bold text-[#0c5354]">
                        Target Oven Temperature: {winner.prepMethods[activePrepMethod].temperature}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Numbered Step list */}
              <div className="space-y-6">
                {winner.instructions.map((step) => (
                  <div
                    key={step.step}
                    className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors bg-white"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#0c5354] text-white flex items-center justify-center text-sm font-black flex-shrink-0">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <h4 className="font-serif font-bold text-base text-gray-900">
                          {step.title}
                        </h4>
                        {step.timerMinutes && (
                          <button
                            onClick={() => startTimerForStep(step.timerMinutes || 5, step.title)}
                            className="px-2.5 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold rounded flex items-center gap-1 transition-colors"
                          >
                            ⏱ Start {step.timerMinutes}m Timer
                          </button>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {step.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── SENSORY EVALUATION & TASTING NOTES ── */}
            <section className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs">
              <div className="pb-4 border-b border-gray-100 mb-6">
                <span className="text-[11px] font-black uppercase tracking-widest text-[#d97706] block">
                  Blind Sensory Panel
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-950">
                  Tasting Notes &amp; Flavor Profile
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <span className="text-[10.5px] font-black uppercase tracking-wider text-gray-400 block mb-1">
                    👃 Aroma
                  </span>
                  <p className="text-sm font-medium text-gray-800 leading-relaxed">
                    {winner.tastingNotes.aroma}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <span className="text-[10.5px] font-black uppercase tracking-wider text-gray-400 block mb-1">
                    👅 First Bite
                  </span>
                  <p className="text-sm font-medium text-gray-800 leading-relaxed">
                    {winner.tastingNotes.firstBite}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <span className="text-[10.5px] font-black uppercase tracking-wider text-gray-400 block mb-1">
                    ✨ Mouthfeel &amp; Texture
                  </span>
                  <p className="text-sm font-medium text-gray-800 leading-relaxed">
                    {winner.tastingNotes.mouthfeel}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <span className="text-[10.5px] font-black uppercase tracking-wider text-gray-400 block mb-1">
                    🏁 Finish &amp; Aftertaste
                  </span>
                  <p className="text-sm font-medium text-gray-800 leading-relaxed">
                    {winner.tastingNotes.finish}
                  </p>
                </div>
              </div>
            </section>

            {/* ── PAIRINGS & SIDES ── */}
            <section className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs">
              <div className="pb-4 border-b border-gray-100 mb-4">
                <span className="text-[11px] font-black uppercase tracking-widest text-[#0c5354] block">
                  Sommelier &amp; Kitchen Pairings
                </span>
                <h3 className="font-serif text-2xl font-bold text-gray-950">
                  What to Serve With This Winner
                </h3>
              </div>
              <ul className="space-y-2.5 text-sm font-medium text-gray-700">
                {winner.pairingSuggestions.map((pair, idx) => (
                  <li key={idx} className="flex items-center gap-2.5">
                    <span className="text-amber-500 font-black">✦</span>
                    <span>{pair}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* RIGHT 5 COLS: SCORECARD, PROS & CONS, NUTRITION, STOCKISTS */}
          <div className="lg:col-span-5 space-y-8">
            {/* ── OFFICIAL TESTING SCORECARD ── */}
            <div className="bg-white rounded-2xl border-2 border-amber-300 p-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                <div>
                  <span className="text-[10.5px] font-black uppercase tracking-wider text-[#d97706] block">
                    The 2026 Freezies
                  </span>
                  <h3 className="font-serif text-xl font-bold text-gray-900">
                    Official Scorecard
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-[#0c5354]">
                    {winner.overallScore}
                    <span className="text-sm text-gray-400 font-bold">/100</span>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600">
                    Verified Winner
                  </span>
                </div>
              </div>

              {/* Rubric Score Bars */}
              <div className="space-y-4 text-xs font-bold text-gray-700">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Taste &amp; Flavor Depth</span>
                    <span className="text-gray-950">{winner.scores.taste}/30</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#0c5354] rounded-full"
                      style={{ width: `${(winner.scores.taste / 30) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Texture &amp; Mouthfeel</span>
                    <span className="text-gray-950">{winner.scores.texture}/20</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#0c5354] rounded-full"
                      style={{ width: `${(winner.scores.texture / 20) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Ingredient Integrity</span>
                    <span className="text-gray-950">{winner.scores.ingredients}/15</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{ width: `${(winner.scores.ingredients / 15) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Value &amp; Portion Satiety</span>
                    <span className="text-gray-950">{winner.scores.value}/15</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{ width: `${(winner.scores.value / 15) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Convenience &amp; Prep Speed</span>
                    <span className="text-gray-950">{winner.scores.convenience}/10</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 rounded-full"
                      style={{ width: `${(winner.scores.convenience / 10) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Culinary Innovation</span>
                    <span className="text-gray-950">{winner.scores.innovation}/10</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 rounded-full"
                      style={{ width: `${(winner.scores.innovation / 10) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ── EDITORIAL REVIEW EXCERPT ── */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-1">
                Editorial Board Tasting Notes
              </span>
              <h3 className="font-serif text-lg font-bold text-gray-900 mb-3">
                Why This Won The Gold
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {winner.editorialReview}
              </p>
              <div className="pt-3 border-t border-gray-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold text-gray-500">Evaluated in Blind Kitchen Panel</span>
              </div>
            </div>

            {/* ── PROS & CONS ── */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-emerald-700 flex items-center gap-1.5 mb-2.5">
                  <span>✓</span> What We Loved
                </h4>
                <ul className="space-y-2 text-xs font-semibold text-gray-700">
                  {winner.pros.map((pro, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">•</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-xs font-black uppercase tracking-wider text-amber-700 flex items-center gap-1.5 mb-2.5">
                  <span>!</span> Things to Keep in Mind
                </h4>
                <ul className="space-y-2 text-xs font-semibold text-gray-700">
                  {winner.cons.map((con, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-500 mt-0.5">•</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ── NUTRITIONAL FACTS & MACROS ── */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
              <h4 className="font-serif text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                Nutrition &amp; Dietary Highlights
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-400 block font-bold">Calories</span>
                  <span className="text-base font-black text-gray-900">{winner.nutritionHighlights.calories}</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-400 block font-bold">Protein</span>
                  <span className="text-base font-black text-emerald-700">{winner.nutritionHighlights.protein}</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-400 block font-bold">Sodium</span>
                  <span className="text-base font-black text-gray-900">{winner.nutritionHighlights.sodium}</span>
                </div>
                {winner.nutritionHighlights.carbs && (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-400 block font-bold">Carbohydrates</span>
                    <span className="text-base font-black text-gray-900">{winner.nutritionHighlights.carbs}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {winner.nutritionHighlights.dietaryTags.map((tag, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-emerald-50 text-emerald-800 text-[11px] font-bold rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* ── WHERE TO BUY (STOCKISTS) ── */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#0c5354] block mb-1">
                Aisle Locator
              </span>
              <h4 className="font-serif text-lg font-bold text-gray-900 mb-3">
                Where to Buy This Product
              </h4>
              <div className="flex flex-wrap gap-2">
                {winner.whereToBuy.map((store, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 flex items-center gap-1.5"
                  >
                    <span>🛒</span> {store}
                  </span>
                ))}
              </div>
            </div>

            {/* ── FREQUENTLY ASKED QUESTIONS ── */}
            {winner.faq && winner.faq.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
                <h4 className="font-serif text-lg font-bold text-gray-900 pb-2 border-b border-gray-100">
                  Frequently Asked Questions
                </h4>
                {winner.faq.map((item, idx) => (
                  <div key={idx} className="text-xs space-y-1">
                    <div className="font-extrabold text-gray-900">Q: {item.question}</div>
                    <div className="text-gray-600 leading-relaxed">{item.answer}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── READER REVIEWS & COMMUNITY RATINGS ── */}
        <section className="mt-16 bg-white rounded-2xl border border-gray-200 p-6 sm:p-10 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-100 mb-8">
            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-[#0c5354] block">
                Verified Taster Feedback
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-950">
                Reader Reviews &amp; Ratings ({reviews.length})
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-amber-500 text-lg">★★★★★</span>
              <span className="text-sm font-black text-gray-900">4.9 out of 5</span>
            </div>
          </div>

          {/* Form to submit review */}
          <form onSubmit={handleReviewSubmit} className="mb-10 bg-gray-50 p-5 sm:p-6 rounded-xl border border-gray-200">
            <h4 className="font-serif font-bold text-base text-gray-900 mb-3">
              Have you tasted this frozen award winner? Leave your review
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex M."
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#0c5354]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Your Rating</label>
                <select
                  value={newRating}
                  onChange={(e) => setNewRating(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#0c5354]"
                >
                  <option value={5}>★★★★★ (5/5 Outstanding)</option>
                  <option value={4}>★★★★☆ (4/5 Great)</option>
                  <option value={3}>★★★☆☆ (3/5 Average)</option>
                  <option value={2}>★★☆☆☆ (2/5 Below Average)</option>
                  <option value={1}>★☆☆☆☆ (1/5 Disappointing)</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-700 mb-1">Your Review &amp; Kitchen Observations</label>
              <textarea
                required
                rows={3}
                placeholder="Tell us about the texture, heating method, or flavor balance..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#0c5354]"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#0c5354] hover:bg-[#083c3d] text-white text-xs font-extrabold uppercase tracking-wider rounded-lg transition-colors"
              >
                Submit Review
              </button>

              {reviewSubmitted && (
                <span className="text-xs font-bold text-emerald-600 animate-in fade-in">
                  ✓ Thank you! Your review has been added.
                </span>
              )}
            </div>
          </form>

          {/* List of reviews */}
          <div className="space-y-4">
            {reviews.map((rev) => (
              <div key={rev.id} className="p-4 rounded-xl border border-gray-100 bg-white">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-gray-900">{rev.author}</span>
                    <span className="text-xs text-gray-400">• {rev.date}</span>
                  </div>
                  <span className="text-amber-500 text-xs tracking-wider">
                    {"★".repeat(rev.rating)}
                    {"☆".repeat(5 - rev.rating)}
                  </span>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed mb-2">
                  {rev.comment}
                </p>
                <span className="text-[11px] text-gray-400">
                  Was this review helpful? 👍 ({rev.helpfulCount})
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── RELATED SIBLING WINNERS ── */}
        <section className="mt-16">
          <div className="flex items-end justify-between border-b-2 border-gray-900 pb-3 mb-8">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-[#d97706] block">
                More From The Freezies
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
                Explore Other 2026 Gold Winners
              </h3>
            </div>
            <Link
              href="/freezies"
              className="text-xs font-bold text-[#0c5354] hover:underline uppercase tracking-wider"
            >
              All Categories →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedWinners.map((rel) => (
              <article key={rel.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col">
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                  <Link href={`/freezies/winners/${rel.slug}`}>
                    <img
                      src={rel.imageUrl}
                      alt={rel.imageAlt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <span className="absolute top-2 left-2 bg-[#d97706] text-white text-[10px] font-black px-2 py-0.5 rounded">
                    Score: {rel.overallScore}
                  </span>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    {rel.brand} • {rel.categoryName}
                  </span>
                  <Link
                    href={`/freezies/winners/${rel.slug}`}
                    className="font-serif font-bold text-base text-gray-900 mt-1 mb-2 hover:text-[#0c5354] transition-colors"
                  >
                    {rel.name}
                  </Link>
                  <p className="text-xs text-gray-600 line-clamp-2 mb-4">
                    {rel.shortVerdict}
                  </p>
                  <div className="mt-auto pt-3 border-t border-gray-100 flex justify-end">
                    <Link
                      href={`/freezies/winners/${rel.slug}`}
                      className="text-xs font-bold text-[#0c5354] hover:underline uppercase tracking-wider"
                    >
                      Read Full Review →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* ── SHARE MODAL ── */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-200 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="font-serif font-bold text-lg text-gray-900">Share This Winner</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-gray-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-gray-600 mb-4">
              Share {winner.name} with friends and family.
            </p>
            <div className="space-y-3 mb-6">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(typeof window !== "undefined" ? window.location.href : "");
                  setShareCopied(true);
                  setTimeout(() => setShareCopied(false), 2000);
                }}
                className="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-800 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <span>🔗</span> {shareCopied ? "✓ Link Copied!" : "Copy Page Link"}
              </button>
            </div>
            <button
              onClick={() => setShowShareModal(false)}
              className="w-full py-2 bg-[#0c5354] text-white text-xs font-bold uppercase rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
