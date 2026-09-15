"use client";

import React, { useState, use, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { recipesData, Recipe, ReviewItem } from "../../data/recipes";
import { isFavorite, toggleFavorite } from "../../utils/favorites";

// Helper function to scale ingredient quantities
function scaleIngredient(text: string, factor: number): string {
  if (factor === 1) return text;

  // Fraction & decimal regex replacer
  return text.replace(
    /(\d+\s*\/\s*\d+|\d+\.?\d*|\d+)/g,
    (match, p1, offset, original) => {
      // Don't scale if it looks like temperature (e.g., 375°F, 400°F) or package size (8.5 oz, 9x13)
      const surrounding = original.slice(Math.max(0, offset - 2), offset + match.length + 4);
      if (surrounding.includes("°") || surrounding.includes("x") || surrounding.includes("X")) {
        return match;
      }

      if (match.includes("/")) {
        const [num, den] = match.split("/").map((n: string) => parseFloat(n.trim()));
        if (!isNaN(num) && !isNaN(den) && den !== 0) {
          const val = (num / den) * factor;
          return formatScaledNumber(val);
        }
      }

      const val = parseFloat(match) * factor;
      if (!isNaN(val)) {
        return formatScaledNumber(val);
      }
      return match;
    }
  );
}

function formatScaledNumber(val: number): string {
  const rounded = Math.round(val * 100) / 100;
  if (rounded === 0.25) return "1/4";
  if (rounded === 0.33 || rounded === 0.34) return "1/3";
  if (rounded === 0.5) return "1/2";
  if (rounded === 0.66 || rounded === 0.67) return "2/3";
  if (rounded === 0.75) return "3/4";
  if (rounded === 1.25) return "1 1/4";
  if (rounded === 1.33 || rounded === 1.34) return "1 1/3";
  if (rounded === 1.5) return "1 1/2";
  if (rounded === 1.67) return "1 2/3";
  if (rounded === 1.75) return "1 3/4";
  if (Number.isInteger(rounded)) return rounded.toString();
  return rounded.toFixed(1).replace(/\.0$/, "");
}

export default function RecipeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const recipe = recipesData.find((r) => r.slug === slug);

  if (!recipe) {
    notFound();
  }

  // Interactive States
  const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);
  const [isSaved, setIsSaved] = useState(false);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [showRateModal, setShowRateModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [printMode, setPrintMode] = useState<"full" | "ingredients">("full");
  const [showShareToast, setShowShareToast] = useState(false);
  const [keepScreenAwake, setKeepScreenAwake] = useState(false);
  const [wakeLock, setWakeLock] = useState<any>(null);
  const [savedRelated, setSavedRelated] = useState<number[]>([]);
  
  // Scaling & Serving state
  const baseServingsCount = recipe.servingsCount || 2;
  const [servingMultiplier, setServingMultiplier] = useState<number>(1);
  
  // Cook Mode state
  const [isCookMode, setIsCookMode] = useState(false);
  const [activeCookStep, setActiveCookStep] = useState(0);

  // Inline Timer State
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number | null>(null);
  const [activeTimerLabel, setActiveTimerLabel] = useState<string>("");
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Reviews state
  const [reviews, setReviews] = useState<ReviewItem[]>(recipe.userReviews || [
    {
      id: "rev-default-1",
      author: "Sarah M.",
      date: "2 days ago",
      rating: 5,
      comment: "This has completely replaced my normal avocado toast! The beans blend so well you cannot even tell, and I stay full until lunchtime!",
      helpfulCount: 14,
    },
    {
      id: "rev-default-2",
      author: "David K.",
      date: "1 week ago",
      rating: 5,
      comment: "Great trick for adding protein without cooking eggs on busy mornings. Added a pinch of red pepper flakes and lemon zest—delicious.",
      helpfulCount: 9,
    },
  ]);
  const [newReviewAuthor, setNewReviewAuthor] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Sticky Bar Trigger State
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Load persistent saved items
  useEffect(() => {
    setIsSaved(isFavorite(recipe.slug));
    const handleFavUpdate = () => {
      setIsSaved(isFavorite(recipe.slug));
    };
    window.addEventListener("dishora_favorites_updated", handleFavUpdate);

    try {
      const savedRel = localStorage.getItem("simply_recipes_saved_ids");
      if (savedRel) {
        setSavedRelated(JSON.parse(savedRel));
      }
    } catch (_e) {
      // silently ignore localStorage parse errors
    }

    return () => {
      window.removeEventListener("dishora_favorites_updated", handleFavUpdate);
    };
  }, [recipe.slug]);

  // Scroll listener for sticky quick-action bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Timer Interval Engine
  useEffect(() => {
    if (timerRunning && timerSecondsLeft !== null && timerSecondsLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimerSecondsLeft((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(timerIntervalRef.current as NodeJS.Timeout);
            setTimerRunning(false);
            playBeepSound();
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

  // Web Audio chime for timer finish
  const playBeepSound = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    } catch (_err) {
      // silently ignore audio context errors
    }
  };

  const startInlineTimer = (minutes: number, label: string) => {
    setActiveTimerLabel(label);
    setTimerSecondsLeft(minutes * 60);
    setTimerRunning(true);
  };

  const pauseInlineTimer = () => {
    setTimerRunning(false);
  };

  const resetInlineTimer = () => {
    setTimerRunning(false);
    setTimerSecondsLeft(null);
  };

  // Toggle Keep Screen Awake (WakeLock API)
  useEffect(() => {
    let lock: any = null;
    const requestWakeLock = async () => {
      if (keepScreenAwake && "wakeLock" in navigator) {
        try {
          lock = await (navigator as any).wakeLock.request("screen");
          setWakeLock(lock);
        } catch (_err) {
          // silently ignore WakeLock errors (unsupported browsers)
        }
      } else if (!keepScreenAwake && wakeLock) {
        wakeLock.release().then(() => setWakeLock(null));
      }
    };
    requestWakeLock();
    return () => {
      if (lock) lock.release();
    };
  }, [keepScreenAwake]);

  const toggleSaveRecipe = () => {
    const newState = toggleFavorite(recipe.slug);
    setIsSaved(newState);
  };

  const toggleIngredient = (index: number) => {
    setCheckedIngredients((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const toggleSaveRelated = (id: number) => {
    setSavedRelated((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id];
      try {
        localStorage.setItem("simply_recipes_saved_ids", JSON.stringify(updated));
      } catch (_e) {
        // silently ignore localStorage write errors
      }
      return updated;
    });
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 3000);
    }
  };

  const executePrint = (mode: "full" | "ingredients") => {
    setPrintMode(mode);
    setShowPrintModal(false);
    setTimeout(() => {
      window.print();
    }, 150);
  };

  const scrollToRecipe = () => {
    const el = document.getElementById("recipe-card");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToNutrition = () => {
    const el = document.getElementById("nutrition-card");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToReviews = () => {
    const el = document.getElementById("reviews-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor.trim(),
      date: "Just now",
      rating: newReviewRating,
      comment: newReviewComment.trim(),
      helpfulCount: 0,
    };

    setReviews([newRev, ...reviews]);
    setNewReviewAuthor("");
    setNewReviewComment("");
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  const formattedTimer = useMemo(() => {
    if (timerSecondsLeft === null) return "00:00";
    const mins = Math.floor(timerSecondsLeft / 60);
    const secs = timerSecondsLeft % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, [timerSecondsLeft]);

  // Scaled Ingredients
  const scaledIngredients = useMemo(() => {
    return recipe.ingredients.map((ing) => scaleIngredient(ing, servingMultiplier));
  }, [recipe.ingredients, servingMultiplier]);

  const ingredientsProgress = Math.round(
    (checkedIngredients.length / recipe.ingredients.length) * 100
  );

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-white text-gray-900 flex flex-col justify-between selection:bg-[#0c5354]/20 selection:text-[#0c5354]">
      {/* Web Header (Hidden during print) */}
      <div className="no-print">
        <Header />
      </div>

      {/* PRINT-ONLY HEADER BANNER */}
      <div className="print-only border-b-2 border-black pb-3 mb-4">
        <div className="flex justify-between items-end mb-1">
          <div>
            <h2 className="text-xl font-bold font-serif text-[#0c5354]">Dishora</h2>
            <span className="text-[10px] text-gray-600">www.dishora.net</span>
          </div>
          <span className="text-[10px] text-gray-600">
            {printMode === "ingredients" ? "🛒 INGREDIENTS LIST" : "🍽️ FULL RECIPE CARD"}
          </span>
        </div>
      </div>

      {/* Floating Sticky Quick Action Bar (Hidden during print) */}
      <div
        className={`no-print fixed top-0 left-0 right-0 w-full max-w-full overflow-hidden z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 transition-all duration-300 transform shadow-xs ${
          showStickyBar ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-[1280px] w-full mx-auto px-3 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-4 overflow-hidden">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 overflow-hidden">
            <span className="text-[10px] sm:text-xs font-black uppercase text-[#0c5354] tracking-wider hidden md:inline shrink-0">
              {recipe.badge || "RECIPE"}
            </span>
            <span className="text-gray-300 hidden md:inline shrink-0">|</span>
            <h4 className="font-serif font-bold text-xs sm:text-sm md:text-base text-gray-900 truncate min-w-0">
              {recipe.title}
            </h4>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <button
              onClick={() => setIsCookMode(true)}
              className="px-2.5 sm:px-3.5 py-1.5 bg-[#ba4f1c] hover:bg-[#a14316] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-xs flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
              title="Cook Mode"
            >
              <span>👨‍🍳</span>
              <span className="hidden sm:inline">Cook Mode</span>
            </button>

            <button
              onClick={scrollToRecipe}
              className="px-2.5 sm:px-3.5 py-1.5 bg-[#0c5354] hover:bg-[#093f40] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
            >
              Recipe ↓
            </button>

            <button
              onClick={() => setShowPrintModal(true)}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
            >
              Print 🖨️
            </button>

            <button
              onClick={toggleSaveRecipe}
              className={`p-1.5 sm:px-3 sm:py-1.5 border border-gray-300 rounded-xs text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer ${
                isSaved ? "bg-red-50 border-red-200 text-red-600" : "hover:bg-gray-50 text-gray-700"
              }`}
              title="Save Recipe"
            >
              <span>{isSaved ? "♥" : "♡"}</span>
              <span className="hidden sm:inline">{isSaved ? "Saved" : "Save"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-[760px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 overflow-hidden">
        
        {/* Breadcrumbs (Hidden during print) */}
        <nav className="no-print flex items-center gap-1.5 text-xs text-gray-500 mb-4 max-w-full overflow-x-auto whitespace-nowrap scrollbar-none">
          <Link href="/" className="hover:text-[#0c5354] transition-colors shrink-0">Home</Link>
          <span className="shrink-0">/</span>
          <Link href="/" className="hover:text-[#0c5354] transition-colors shrink-0">{recipe.category || "Recipes"}</Link>
          <span className="shrink-0">/</span>
          <span className="text-gray-900 font-medium truncate min-w-0 max-w-[170px] sm:max-w-none">{recipe.recipeCardTitle || recipe.title}</span>
        </nav>

        {/* Article Header */}
        <header className="mb-6">
          {recipe.badge && (
            <div className="inline-block mb-2.5 px-2.5 py-0.5 bg-[#0c5354]/10 text-[#0c5354] font-black text-[11px] uppercase tracking-widest rounded-xs">
              {recipe.badge}
            </div>
          )}

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-gray-900 leading-[1.16] tracking-tight mb-3">
            {recipe.title}
          </h1>

          {/* Rating & Reviews Bar */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-700 mb-3">
            <div className="flex text-[#0c5354] text-[18px] tracking-tight">
              {"★".repeat(recipe.rating)}
            </div>
            <span className="font-bold text-gray-900">
              {recipe.rating}.0 ({recipe.ratingsCount || recipe.reviewCount + 15})
            </span>
            <span className="text-gray-300">|</span>
            <button
              onClick={scrollToReviews}
              className="font-bold text-xs uppercase tracking-wider text-gray-800 hover:text-[#0c5354] underline cursor-pointer no-print"
            >
              {reviews.length} REVIEW{reviews.length > 1 ? "S" : ""}
            </button>
            <span className="print-only text-xs font-bold text-gray-700">
              ({reviews.length} Reviews)
            </span>
          </div>

          {/* Lead subtitle */}
          {recipe.leadText && (
            <p className="text-[17px] sm:text-[18px] text-gray-700 font-serif leading-relaxed mb-4">
              {recipe.leadText}
            </p>
          )}

          {/* Author & Publication Date */}
          <div className="flex items-center gap-3 text-xs text-gray-600 mb-5 pb-4 border-b border-gray-100">
            <div className="w-8 h-8 rounded-full bg-[#0c5354]/10 text-[#0c5354] font-bold flex items-center justify-center text-xs uppercase no-print">
              {recipe.author.charAt(0)}
            </div>
            <div>
              <span>By </span>
              <span className="font-bold text-gray-900">
                {recipe.author}
              </span>
              {recipe.authorRole && (
                <span className="text-gray-500"> ({recipe.authorRole})</span>
              )}
              <span className="text-gray-400 mx-1.5">•</span>
              <span>Published {recipe.date}</span>
            </div>
          </div>

          {/* Action Toolbar (SAVE, RATE, PRINT, SHARE, COOK MODE) (Hidden during print) */}
          <div className="no-print grid grid-cols-2 sm:grid-cols-5 gap-1.5 sm:gap-2 p-1.5 bg-[#f4faf9] border border-[#d8ece9] rounded-xs text-xs font-bold uppercase tracking-wider text-[#0c5354] select-none text-center">
            {/* SAVE */}
            <button
              onClick={toggleSaveRecipe}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xs transition-colors cursor-pointer ${
                isSaved ? "bg-[#0c5354] text-white" : "hover:bg-[#e3f4f1] text-[#0c5354]"
              }`}
            >
              <span>{isSaved ? "♥ SAVED" : "♡ SAVE"}</span>
            </button>

            {/* RATE */}
            <button
              onClick={() => setShowRateModal(true)}
              className="flex items-center justify-center gap-1.5 py-2 px-2 hover:bg-[#e3f4f1] rounded-xs transition-colors cursor-pointer"
            >
              <span>RATE</span>
              <span className="text-sm">★</span>
            </button>

            {/* PRINT */}
            <button
              onClick={() => setShowPrintModal(true)}
              className="flex items-center justify-center gap-1.5 py-2 px-2 hover:bg-[#e3f4f1] rounded-xs transition-colors cursor-pointer"
            >
              <span>PRINT</span>
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/>
              </svg>
            </button>

            {/* SHARE */}
            <button
              onClick={() => setShowShareModal(true)}
              className="flex items-center justify-center gap-1.5 py-2 px-2 hover:bg-[#e3f4f1] rounded-xs transition-colors cursor-pointer"
            >
              <span>SHARE</span>
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M14 9V5l7 7-7 7v-4.1c-5 0-8.5 1.6-11 5.1 1-5 4-10 11-11z"/>
              </svg>
            </button>

            {/* COOK MODE */}
            <button
              onClick={() => setIsCookMode(true)}
              className="col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5 py-2 px-2 bg-[#ba4f1c] hover:bg-[#a14316] text-white rounded-xs transition-colors cursor-pointer shadow-2xs font-extrabold"
            >
              <span>👨‍🍳 COOK</span>
            </button>
          </div>

          {showShareToast && (
            <div className="no-print mt-2 text-center text-xs font-semibold text-[#0c5354] bg-[#eef7f6] py-2 rounded-xs border border-[#0c5354]/20 animate-fade-in">
              ✓ Recipe link copied to clipboard!
            </div>
          )}
        </header>

        {/* Hero Photo with Credit */}
        <div className={`mb-6 ${printMode === "ingredients" ? "no-print" : ""}`}>
          <div className="relative w-full aspect-[4/3] rounded-xs overflow-hidden bg-gray-100 shadow-xs mb-2 group">
            <img
              src={recipe.imageUrl}
              alt={recipe.imageAlt}
              className="w-full h-full object-cover"
            />
            <div className="no-print absolute top-3 left-3 bg-black/65 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-xs uppercase tracking-wider">
              ⏱ {recipe.totalTime}
            </div>
          </div>
          <div className="text-[11.5px] text-gray-500 font-normal flex justify-between items-center">
            <span>{recipe.imageCredit || `Photo & Styling: Dishora Studio / ${recipe.author}`}</span>
            <span className="text-gray-400 text-[11px]">🔥 {recipe.calories}</span>
          </div>
        </div>

        {/* JUMP TO RECIPE Button (Hidden during print) */}
        <div className="no-print flex flex-wrap items-center justify-center gap-3 my-6">
          <button
            onClick={scrollToRecipe}
            className="px-8 py-3 bg-[#0c5354] hover:bg-[#093f40] text-white font-black text-xs uppercase tracking-widest rounded-xs shadow-xs transition-all duration-200 cursor-pointer flex items-center gap-2 hover:translate-y-[-1px]"
          >
            <span>JUMP TO RECIPE</span>
            <span>↓</span>
          </button>

          <button
            onClick={() => setIsCookMode(true)}
            className="px-6 py-3 bg-[#fdf2eb] hover:bg-[#fde7d9] text-[#ba4f1c] border border-[#ba4f1c]/30 font-black text-xs uppercase tracking-widest rounded-xs shadow-2xs transition-all duration-200 cursor-pointer flex items-center gap-2"
          >
            <span>START COOK MODE</span>
            <span>👨‍🍳</span>
          </button>
        </div>

        {/* Active Timer Widget (if running) (Hidden during print) */}
        {timerSecondsLeft !== null && (
          <div className="no-print my-6 p-4 bg-[#0c5354] text-white rounded-xs flex items-center justify-between shadow-md animate-fade-in">
            <div className="flex items-center gap-3">
              <span className="text-2xl animate-pulse">⏱</span>
              <div>
                <div className="text-xs uppercase tracking-wider text-teal-200 font-bold">
                  {activeTimerLabel || "Active Cooking Timer"}
                </div>
                <div className="text-2xl font-mono font-black">{formattedTimer}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {timerRunning ? (
                <button
                  onClick={pauseInlineTimer}
                  className="px-3 py-1.5 bg-white text-[#0c5354] font-bold text-xs uppercase tracking-wider rounded-xs cursor-pointer hover:bg-gray-100"
                >
                  Pause
                </button>
              ) : (
                <button
                  onClick={() => setTimerRunning(true)}
                  className="px-3 py-1.5 bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xs cursor-pointer hover:bg-emerald-600"
                >
                  Resume
                </button>
              )}
              <button
                onClick={resetInlineTimer}
                className="px-2.5 py-1.5 bg-black/30 hover:bg-black/40 text-white text-xs font-bold rounded-xs cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* WHY MAKE THIS Box (Hidden during print) */}
        {recipe.whyMakeThis && recipe.whyMakeThis.length > 0 && (
          <div className="no-print relative my-8 p-6 sm:p-7 border-2 border-[#ba4f1c] bg-[#fffcf9] rounded-xs shadow-2xs">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#fffcf9] px-4 text-xs font-black tracking-widest text-[#ba4f1c] uppercase border-l-2 border-r-2 border-[#ba4f1c]">
              WHY MAKE THIS
            </div>

            <ul className="space-y-3 text-[15px] sm:text-[16px] text-gray-800 leading-relaxed list-disc list-inside">
              {recipe.whyMakeThis.map((point, idx) => (
                <li key={idx} className="pl-1">
                  <span className="font-medium text-gray-900">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Editorial Story Content (Hidden during print) */}
        {recipe.storyParagraphs && (
          <div className="no-print space-y-5 text-[17px] sm:text-[18px] text-gray-800 leading-relaxed font-serif my-8">
            {recipe.storyParagraphs.map((para, idx) => (
              <p key={idx} className="first-letter:text-4xl first-letter:font-bold first-letter:mr-1 first-letter:float-left first-letter:text-[#0c5354] first:first-letter:leading-none">
                {para}
              </p>
            ))}
          </div>
        )}

        {/* RELATED Callout Link (Hidden during print) */}
        {recipe.relatedLink && (
          <div className="no-print my-7 p-4 bg-[#f8faf9] border-l-4 border-[#0c5354] rounded-r-xs text-sm sm:text-[15px]">
            <span className="font-black text-gray-900 tracking-wide uppercase text-xs block mb-1">
              DON&apos;T MISS
            </span>
            <Link
              href={recipe.relatedLink.href}
              className="font-serif font-bold text-base text-[#0c5354] underline hover:text-[#009b72] transition-colors"
            >
              {recipe.relatedLink.title} →
            </Link>
          </div>
        )}

        {/* Second Photo (Hidden during print) */}
        {recipe.image2Url && (
          <div className="no-print my-8">
            <div className="relative w-full aspect-[4/3] rounded-xs overflow-hidden bg-gray-100 shadow-xs mb-1.5">
              <img
                src={recipe.image2Url}
                alt="Recipe step preparation photo"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="text-[11.5px] text-gray-500 font-normal">
              {recipe.image2Credit || `Photo & Styling: Dishora Studio / ${recipe.author}`}
            </div>
          </div>
        )}

        {/* Editorial Sections (Hidden during print) */}
        {recipe.editorialSections && (
          <div className="no-print space-y-8 my-8">
            {recipe.editorialSections.map((sec, idx) => (
              <div key={idx} className="p-5 bg-white border border-gray-200 rounded-xs">
                <h2 className="font-serif text-2xl sm:text-[25px] font-bold text-gray-900 mb-2.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#ba4f1c]"></span>
                  {sec.title}
                </h2>
                <p className="text-[16px] sm:text-[17px] text-gray-700 leading-relaxed font-serif">
                  {sec.content}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Third Photo (Hidden during print) */}
        {recipe.image3Url && (
          <div className="no-print my-8">
            <div className="relative w-full aspect-[4/3] rounded-xs overflow-hidden bg-gray-100 shadow-xs mb-1.5">
              <img
                src={recipe.image3Url}
                alt="Plated recipe close-up"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="text-[11.5px] text-gray-500 font-normal">
              {recipe.image3Credit || `Photo & Styling: Dishora Studio / ${recipe.author}`}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* RECIPE CARD SECTION (PRINTABLE) */}
        {/* ========================================================================= */}
        <section
          id="recipe-card"
          className="my-10 p-6 sm:p-8 bg-[#f4faf9] border-2 border-[#0c5354]/30 rounded-xs scroll-mt-24 shadow-sm"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4 pb-4 border-b border-[#0c5354]/20">
            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-[#ba4f1c] block mb-1">
                {recipe.badge || "OFFICIAL RECIPE"}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
                {recipe.recipeCardTitle || recipe.title}
              </h2>
            </div>

            <div className="no-print flex items-center gap-2">
              <button
                onClick={() => setShowPrintModal(true)}
                className="px-3.5 py-2 bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 font-bold text-xs uppercase tracking-wider rounded-xs cursor-pointer shadow-2xs transition-colors flex items-center gap-1.5"
              >
                <span>🖨️ Print</span>
              </button>

              <button
                onClick={() => setIsCookMode(true)}
                className="px-4 py-2 bg-[#ba4f1c] hover:bg-[#a14316] text-white font-bold text-xs uppercase tracking-wider rounded-xs cursor-pointer shadow-xs transition-colors flex items-center gap-1.5"
              >
                <span>👨‍🍳 Cook Mode</span>
              </button>
            </div>
          </div>

          <p className={`text-sm text-gray-700 mb-6 font-serif leading-relaxed ${printMode === "ingredients" ? "no-print" : ""}`}>
            {recipe.description}
          </p>

          {/* Timing & Servings Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-white border border-[#d2ebe7] rounded-xs text-sm mb-6">
            <div>
              <span className="block font-bold text-xs uppercase text-gray-500 mb-0.5">Prep Time</span>
              <span className="font-bold text-gray-900 text-base">{recipe.prepTime}</span>
            </div>
            <div>
              <span className="block font-bold text-xs uppercase text-gray-500 mb-0.5">Cook Time</span>
              <span className="font-bold text-gray-900 text-base">{recipe.cookTime}</span>
            </div>
            <div>
              <span className="block font-bold text-xs uppercase text-gray-500 mb-0.5">Total Time</span>
              <span className="font-bold text-gray-900 text-base">{recipe.totalTime}</span>
            </div>
            <div>
              <span className="block font-bold text-xs uppercase text-gray-500 mb-0.5">Servings</span>
              <span className="font-bold text-[#0c5354] text-base">{baseServingsCount * servingMultiplier} servings</span>
            </div>
          </div>

          {/* Servings Multiplier Scaler & Jump to Nutrition (Hidden during print) */}
          <div className="no-print flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[#0c5354]/20">
            {/* Scaler */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                Scale Recipe:
              </span>
              <div className="inline-flex border border-gray-300 rounded-xs bg-white overflow-hidden shadow-2xs">
                {[1, 2, 3].map((f) => (
                  <button
                    key={f}
                    onClick={() => setServingMultiplier(f)}
                    className={`px-3 py-1 text-xs font-bold cursor-pointer transition-colors ${
                      servingMultiplier === f
                        ? "bg-[#0c5354] text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {f}x
                  </button>
                ))}
              </div>
            </div>

            {/* Jump Link */}
            <div>
              <button
                onClick={scrollToNutrition}
                className="text-xs font-bold text-[#0c5354] underline hover:text-[#009b72] cursor-pointer"
              >
                Jump to Nutrition Facts ↓
              </button>
            </div>
          </div>

          {/* Keep Screen Awake Switch (Hidden during print) */}
          <div className="no-print flex items-center justify-between p-3 bg-white border border-[#d2ebe7] rounded-xs mb-8 select-none">
            <div className="flex items-center gap-2">
              <span className="text-base">📱</span>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-800">
                Keep Screen Awake While Cooking
              </span>
            </div>
            <button
              role="switch"
              aria-checked={keepScreenAwake}
              onClick={() => setKeepScreenAwake(!keepScreenAwake)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                keepScreenAwake ? "bg-[#0c5354]" : "bg-gray-300"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  keepScreenAwake ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* ========================================================================= */}
          {/* INGREDIENTS CHECKLIST (PRINTABLE) */}
          {/* ========================================================================= */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-serif text-2xl font-bold text-gray-900">
                Ingredients {servingMultiplier > 1 && `(${servingMultiplier}x scaled)`}
              </h3>
              {checkedIngredients.length > 0 && (
                <button
                  onClick={() => setCheckedIngredients([])}
                  className="no-print text-xs font-bold text-gray-500 hover:text-red-500 underline cursor-pointer"
                >
                  Clear Checklist
                </button>
              )}
            </div>

            {/* Progress bar (Hidden during print) */}
            {checkedIngredients.length > 0 && (
              <div className="no-print mb-4">
                <div className="flex justify-between text-[11px] font-semibold text-gray-600 mb-1">
                  <span>{checkedIngredients.length} of {recipe.ingredients.length} items checked</span>
                  <span>{ingredientsProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#0c5354] h-full transition-all duration-300"
                    style={{ width: `${ingredientsProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            <ul className="space-y-2.5">
              {scaledIngredients.map((ing, idx) => {
                const isChecked = checkedIngredients.includes(idx);
                return (
                  <li
                    key={idx}
                    onClick={() => toggleIngredient(idx)}
                    className={`flex items-start gap-3 p-2.5 rounded-xs border transition-all cursor-pointer select-none ${
                      isChecked
                        ? "bg-gray-100/70 border-gray-200 text-gray-400 line-through"
                        : "bg-white border-gray-200/80 hover:border-[#0c5354]/40 hover:bg-[#fcfdfd] text-gray-800"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="mt-1 w-4 h-4 rounded-xs text-[#0c5354] focus:ring-[#0c5354] cursor-pointer"
                    />
                    <span className="text-[15.5px] leading-snug flex-1 font-medium">{ing}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ========================================================================= */}
          {/* DIRECTIONS & STEP-BY-STEP */}
          {/* ========================================================================= */}
          <div className={printMode === "ingredients" ? "no-print" : ""}>
            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-6">
              Directions
            </h3>

            <div className="space-y-6">
              {recipe.instructions.map((step) => (
                <div
                  key={step.step}
                  className="flex items-start gap-4 p-4 bg-white border border-gray-200/80 rounded-xs shadow-2xs group hover:border-[#0c5354]/40 transition-colors"
                >
                  <div className="shrink-0 w-8 h-8 rounded-full bg-[#0c5354] text-white font-bold flex items-center justify-center text-sm shadow-2xs">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <h4 className="font-bold text-base text-gray-900">
                        {step.title}
                      </h4>
                      {step.timerMinutes && (
                        <button
                          onClick={() => startInlineTimer(step.timerMinutes || 2, step.title)}
                          className="no-print px-2.5 py-1 bg-[#eef7f6] hover:bg-[#0c5354] text-[#0c5354] hover:text-white text-xs font-bold rounded-xs transition-colors cursor-pointer flex items-center gap-1 border border-[#0c5354]/20"
                        >
                          <span>⏱</span>
                          <span>Set {step.timerMinutes}m Timer</span>
                        </button>
                      )}
                    </div>
                    <p className="text-[15.5px] text-gray-700 leading-relaxed font-serif">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chef Tips */}
          {recipe.tips && recipe.tips.length > 0 && (
            <div className={`mt-8 p-4 bg-[#fff9f0] border-l-4 border-amber-500 rounded-r-xs ${printMode === "ingredients" ? "no-print" : ""}`}>
              <h4 className="text-xs font-black uppercase tracking-wider text-amber-900 mb-2 flex items-center gap-1.5">
                <span>💡</span> CHEF&apos;S PRO TIPS
              </h4>
              <ul className="space-y-1.5 text-xs text-amber-900 leading-relaxed list-disc list-inside">
                {recipe.tips.map((tip, idx) => (
                  <li key={idx}>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Nutrition Facts Card */}
        <section
          id="nutrition-card"
          className={`my-10 p-6 bg-white border border-gray-200 rounded-xs scroll-mt-24 shadow-xs ${printMode === "ingredients" ? "no-print" : ""}`}
        >
          <div className="flex items-center justify-between pb-3 border-b-2 border-black mb-4">
            <h3 className="font-serif text-xl font-black text-gray-900 uppercase tracking-tight">
              Nutrition Facts
            </h3>
            <span className="text-xs text-gray-500">Per Serving</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div className="p-3 bg-gray-50 rounded-xs border border-gray-100">
              <span className="block text-xs uppercase font-bold text-gray-500">Calories</span>
              <span className="text-xl font-serif font-bold text-gray-900">{recipe.nutrition.calories}</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-xs border border-gray-100">
              <span className="block text-xs uppercase font-bold text-gray-500">Protein</span>
              <span className="text-xl font-serif font-bold text-[#0c5354]">{recipe.nutrition.protein}</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-xs border border-gray-100">
              <span className="block text-xs uppercase font-bold text-gray-500">Carbs</span>
              <span className="text-xl font-serif font-bold text-gray-900">{recipe.nutrition.carbs}</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-xs border border-gray-100">
              <span className="block text-xs uppercase font-bold text-gray-500">Total Fat</span>
              <span className="text-xl font-serif font-bold text-gray-900">{recipe.nutrition.fat}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-4 pt-3 border-t border-gray-200 text-xs text-gray-600">
            <div>
              <span className="font-bold">Sodium:</span> {recipe.nutrition.sodium}
            </div>
            <div>
              <span className="font-bold">Fiber:</span> {recipe.nutrition.fiber || "4g"}
            </div>
            <div>
              <span className="font-bold">Sugar:</span> {recipe.nutrition.sugar || "2g"}
            </div>
          </div>
        </section>

        {/* Explore more Tags Bar (Hidden during print) */}
        {recipe.tags && recipe.tags.length > 0 && (
          <div className="no-print my-10 pt-6 border-t border-gray-200 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold text-gray-700 mr-1">Explore more:</span>
            {recipe.tags.map((tag, idx) => (
              <Link
                key={idx}
                href={`#tag-${tag.toLowerCase().replace(/\s+/g, "-")}`}
                className="px-3.5 py-1.5 border border-gray-900 rounded-full font-bold text-gray-900 hover:bg-[#0c5354] hover:text-white hover:border-[#0c5354] transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}

        {/* ========================================================================= */}
        {/* REVIEWS & RATINGS SECTION (Hidden during print) */}
        {/* ========================================================================= */}
        <section id="reviews-section" className="no-print my-12 pt-8 border-t-2 border-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
                Community Reviews & Ratings
              </h3>
              <p className="text-xs text-gray-600">
                {reviews.length} cooks have shared their thoughts on this recipe
              </p>
            </div>

            <button
              onClick={() => setShowRateModal(true)}
              className="px-4 py-2 bg-[#0c5354] hover:bg-[#093f40] text-white font-bold text-xs uppercase tracking-wider rounded-xs cursor-pointer transition-colors"
            >
              Write a Review ✍️
            </button>
          </div>

          {/* Add Review Form */}
          <form onSubmit={handleAddReview} className="p-5 bg-[#f8faf9] border border-gray-200 rounded-xs mb-8">
            <h4 className="font-bold text-sm text-gray-900 uppercase tracking-wider mb-3">
              Leave your rating & comment
            </h4>

            {reviewSubmitted && (
              <div className="mb-4 p-3 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xs border border-emerald-200">
                ✓ Thank you! Your review has been submitted and posted below.
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  placeholder="e.g. Jessica Baker"
                  className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-xs focus:ring-1 focus:ring-[#0c5354] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Rating
                </label>
                <div className="flex gap-1 text-2xl text-amber-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewReviewRating(star)}
                      className="cursor-pointer hover:scale-120 transition-transform"
                    >
                      {star <= newReviewRating ? "★" : "☆"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                Your Review or Cooking Note
              </label>
              <textarea
                required
                rows={3}
                value={newReviewComment}
                onChange={(e) => setNewReviewComment(e.target.value)}
                placeholder="How did this recipe turn out? Any modifications you loved?"
                className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-xs focus:ring-1 focus:ring-[#0c5354] focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#ba4f1c] hover:bg-[#a14316] text-white font-bold text-xs uppercase tracking-wider rounded-xs cursor-pointer transition-colors shadow-2xs"
            >
              Post Review
            </button>
          </form>

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.map((rev) => (
              <div key={rev.id} className="p-4 bg-white border border-gray-200/80 rounded-xs shadow-2xs">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gray-200 text-gray-700 font-bold flex items-center justify-center text-xs">
                      {rev.author.charAt(0)}
                    </div>
                    <span className="font-bold text-sm text-gray-900">{rev.author}</span>
                  </div>
                  <span className="text-xs text-gray-400">{rev.date}</span>
                </div>

                <div className="flex text-amber-500 text-sm mb-2">
                  {"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}
                </div>

                <p className="text-sm text-gray-700 font-serif leading-relaxed mb-3">
                  {rev.comment}
                </p>

                <div className="flex items-center gap-4 text-xs text-gray-500 pt-2 border-t border-gray-100">
                  <button className="hover:text-[#0c5354] flex items-center gap-1 cursor-pointer">
                    <span>👍 Helpful</span>
                    <span>({rev.helpfulCount || 1})</span>
                  </button>
                  <button className="hover:text-red-500 cursor-pointer">
                    Report
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* ========================================================================= */}
      {/* RELATED ARTICLES SECTION (Hidden during print) */}
      {/* ========================================================================= */}
      {recipe.relatedArticles && recipe.relatedArticles.length > 0 && (
        <section className="no-print w-full bg-[#f8faf9] border-t border-gray-200 py-12 sm:py-16">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-baseline justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-black uppercase text-[#ba4f1c] tracking-widest block mb-1">
                  MORE TO LOVE
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
                  Related Articles & Recipes
                </h2>
              </div>
              <p className="text-xs text-gray-500 font-medium">
                Showing {recipe.relatedArticles.length} curated recipes
              </p>
            </div>

            {/* 4x4 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {recipe.relatedArticles.map((article) => {
                const isItemSaved = savedRelated.includes(article.id);
                return (
                  <article
                    key={article.id}
                    className="bg-white border border-gray-200/80 rounded-xs overflow-hidden flex flex-col group shadow-2xs hover:shadow-md transition-shadow relative"
                  >
                    {/* Thumbnail & Heart Save */}
                    <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
                      <Link href={`/recipes/${article.slug}`} className="block w-full h-full">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </Link>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleSaveRelated(article.id);
                        }}
                        className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-gray-700 hover:text-red-500 hover:bg-white shadow-xs transition-colors cursor-pointer z-10"
                        aria-label="Save article"
                      >
                        <span className={`text-base ${isItemSaved ? "text-red-500 font-bold" : ""}`}>
                          {isItemSaved ? "♥" : "♡"}
                        </span>
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-black tracking-widest text-[#009b72] uppercase block mb-1.5">
                          {article.category}
                        </span>

                        <Link href={`/recipes/${article.slug}`}>
                          <h3 className="font-serif text-[15px] font-bold text-gray-900 leading-snug group-hover:text-[#0c5354] transition-colors mb-2">
                            {article.title}
                          </h3>
                        </Link>

                        {/* Stars & Time */}
                        <div className="flex items-center gap-2 mb-2 text-xs text-gray-600">
                          {article.rating && (
                            <div className="flex text-[#009b72] text-[13px] tracking-tight">
                              {"★".repeat(article.rating)}
                            </div>
                          )}
                          {article.time && (
                            <div className="flex items-center gap-1 font-medium">
                              <span>⏱</span>
                              <span>{article.time}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="text-xs text-gray-500 pt-2 border-t border-gray-100 flex items-center justify-between">
                        <span>{article.author}</span>
                        <Link
                          href={`/recipes/${article.slug}`}
                          className="text-[#0c5354] font-bold hover:underline"
                        >
                          View →
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* PRINT OPTIONS MODAL */}
      {/* ========================================================================= */}
      {showPrintModal && (
        <div className="no-print fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
              <h3 className="font-serif text-lg font-bold text-gray-900 flex items-center gap-2">
                <span>🖨️</span> Options d&apos;impression
              </h3>
              <button
                onClick={() => setShowPrintModal(false)}
                className="text-gray-400 hover:text-gray-700 font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-gray-600 mb-5">
              Choisissez ce que vous souhaitez imprimer pour {recipe.recipeCardTitle || recipe.title} :
            </p>

            <div className="space-y-3 mb-6">
              <button
                onClick={() => executePrint("full")}
                className="w-full p-4 bg-[#f4faf9] hover:bg-[#e4f4f1] border-2 border-[#0c5354] rounded-xs text-left cursor-pointer transition-all flex items-start gap-3 group"
              >
                <span className="text-2xl mt-0.5">📄</span>
                <div>
                  <h4 className="font-bold text-sm text-[#0c5354] group-hover:underline">
                    Fiche Recette Complète
                  </h4>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Imprime les temps, portions, ingrédients, instructions pas-à-pas et nutrition.
                  </p>
                </div>
              </button>

              <button
                onClick={() => executePrint("ingredients")}
                className="w-full p-4 bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-xs text-left cursor-pointer transition-all flex items-start gap-3 group"
              >
                <span className="text-2xl mt-0.5">🛒</span>
                <div>
                  <h4 className="font-bold text-sm text-gray-900 group-hover:underline">
                    Ingrédients Uniquement (Liste de courses)
                  </h4>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Format compact avec cases à cocher pour faire vos courses facilement.
                  </p>
                </div>
              </button>
            </div>

            <button
              onClick={() => setShowPrintModal(false)}
              className="w-full py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-bold uppercase tracking-wider rounded-xs cursor-pointer"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* COOK MODE FULLSCREEN OVERLAY MODAL */}
      {/* ========================================================================= */}
      {isCookMode && (
        <div className="no-print fixed inset-0 z-50 bg-[#0c5354] text-white flex flex-col justify-between p-4 sm:p-8 animate-fade-in overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-teal-700 max-w-3xl w-full mx-auto">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-teal-200">
                👨‍🍳 Step-by-Step Cook Mode
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-bold truncate max-w-md">
                {recipe.recipeCardTitle || recipe.title}
              </h3>
            </div>

            <button
              onClick={() => setIsCookMode(false)}
              className="p-2 bg-teal-800 hover:bg-teal-700 text-white rounded-full font-bold text-sm cursor-pointer"
            >
              ✕ Exit Cook Mode
            </button>
          </div>

          {/* Stepper Center */}
          <div className="max-w-2xl w-full mx-auto my-auto py-8">
            <div className="flex items-center justify-between text-xs uppercase tracking-widest text-teal-200 font-bold mb-3">
              <span>Step {activeCookStep + 1} of {recipe.instructions.length}</span>
              <span>{Math.round(((activeCookStep + 1) / recipe.instructions.length) * 100)}% Complete</span>
            </div>

            {/* Stepper Progress Bar */}
            <div className="w-full bg-teal-900 h-2 rounded-full overflow-hidden mb-8">
              <div
                className="bg-emerald-400 h-full transition-all duration-300"
                style={{ width: `${((activeCookStep + 1) / recipe.instructions.length) * 100}%` }}
              ></div>
            </div>

            {/* Current Step Content */}
            <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-xl border border-teal-600/50 shadow-xl mb-6">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mb-3">
                {recipe.instructions[activeCookStep].title}
              </h2>
              <p className="text-lg sm:text-xl text-teal-50 font-serif leading-relaxed">
                {recipe.instructions[activeCookStep].text}
              </p>

              {recipe.instructions[activeCookStep].timerMinutes && (
                <div className="mt-6 pt-4 border-t border-teal-700 flex items-center gap-3">
                  <button
                    onClick={() =>
                      startInlineTimer(
                        recipe.instructions[activeCookStep].timerMinutes || 2,
                        recipe.instructions[activeCookStep].title
                      )
                    }
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider rounded-xs cursor-pointer flex items-center gap-2"
                  >
                    <span>⏱ Start {recipe.instructions[activeCookStep].timerMinutes}m Timer</span>
                  </button>
                </div>
              )}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between gap-4">
              <button
                disabled={activeCookStep === 0}
                onClick={() => setActiveCookStep((prev) => Math.max(0, prev - 1))}
                className="px-6 py-3 bg-teal-800 hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed font-bold text-sm uppercase tracking-wider rounded-xs cursor-pointer transition-colors"
              >
                ← Previous Step
              </button>

              {activeCookStep < recipe.instructions.length - 1 ? (
                <button
                  onClick={() => setActiveCookStep((prev) => prev + 1)}
                  className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm uppercase tracking-wider rounded-xs cursor-pointer transition-colors shadow-md"
                >
                  Next Step →
                </button>
              ) : (
                <button
                  onClick={() => setIsCookMode(false)}
                  className="px-8 py-3 bg-[#ba4f1c] hover:bg-[#a14316] text-white font-black text-sm uppercase tracking-wider rounded-xs cursor-pointer transition-colors shadow-md"
                >
                  🎉 Complete & Finish!
                </button>
              )}
            </div>
          </div>

          {/* Footer note */}
          <div className="text-center text-xs text-teal-300">
            Screen stays awake automatically while in Cook Mode.
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* RATE MODAL */}
      {/* ========================================================================= */}
      {showRateModal && (
        <div className="no-print fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-2xl text-center border border-gray-100">
            <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">
              Rate this Recipe
            </h3>
            <p className="text-xs text-gray-600 mb-4">
              How would you rate your experience making {recipe.recipeCardTitle || recipe.title}?
            </p>
            <div className="flex justify-center gap-2 text-3xl text-amber-400 mb-6 cursor-pointer">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setUserRating(star)}
                  className="hover:scale-125 transition-transform"
                >
                  {star <= (userRating || 5) ? "★" : "☆"}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowRateModal(false)}
                className="w-1/2 py-2.5 bg-gray-200 text-gray-800 font-bold text-xs uppercase tracking-wider rounded-xs hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowRateModal(false);
                  scrollToReviews();
                }}
                className="w-1/2 py-2.5 bg-[#0c5354] text-white font-bold text-xs uppercase tracking-wider rounded-xs hover:bg-[#093f40]"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SHARE MODAL */}
      {/* ========================================================================= */}
      {showShareModal && (
        <div className="no-print fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
              <h3 className="font-serif text-lg font-bold text-gray-900">
                Share this Recipe
              </h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-gray-700 font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <button
                onClick={() => {
                  handleShare();
                  setShowShareModal(false);
                }}
                className="p-3 bg-gray-50 hover:bg-[#eef7f6] border border-gray-200 rounded-xs text-xs font-bold text-gray-800 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>📋</span> Copy URL Link
              </button>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${recipe.title} - ${typeof window !== "undefined" ? window.location.href : ""}`)}`}
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-gray-50 hover:bg-emerald-50 border border-gray-200 rounded-xs text-xs font-bold text-gray-800 flex items-center gap-2 transition-colors"
              >
                <span>💬</span> WhatsApp
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(recipe.title)}&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-gray-50 hover:bg-sky-50 border border-gray-200 rounded-xs text-xs font-bold text-gray-800 flex items-center gap-2 transition-colors"
              >
                <span>🐦</span> Twitter / X
              </a>
              <a
                href={`mailto:?subject=${encodeURIComponent(recipe.title)}&body=${encodeURIComponent(`Check out this delicious recipe: ${typeof window !== "undefined" ? window.location.href : ""}`)}`}
                className="p-3 bg-gray-50 hover:bg-amber-50 border border-gray-200 rounded-xs text-xs font-bold text-gray-800 flex items-center gap-2 transition-colors"
              >
                <span>✉️</span> Email
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Web Footer (Hidden during print) */}
      <div className="no-print">
        <Footer />
      </div>
    </div>
  );
}
