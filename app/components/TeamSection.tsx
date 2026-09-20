"use client";

import React, { useState } from "react";
import Link from "next/link";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  department: string;
  bgColor: string;
  avatarUrl: string;
  bio: string;
  favoriteRecipe: string;
  favoriteRecipeSlug: string;
  yearsWithUs: string;
}

const teamSlides: TeamMember[][] = [
  // Slide 1: Core Editorial & Kitchen Desks
  [
    {
      id: 1,
      name: "Editorial Desk",
      role: "RECIPE CURATION & STANDARDS",
      department: "Editorial & Strategy",
      bgColor: "#fae8a4",
      avatarUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><defs><linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%230c5354"/><stop offset="100%" stop-color="%23009b72"/></linearGradient></defs><circle cx="60" cy="60" r="60" fill="url(%23g1)"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="system-ui, -apple-system, sans-serif" font-size="38" font-weight="800">ED</text></svg>`,
      bio: "Curates approachable, seasonal home cooking guides and stress-free weeknight dinner collections for families.",
      favoriteRecipe: "4-Ingredient Old Bay Pasta",
      favoriteRecipeSlug: "4-ingredient-old-bay-pasta",
      yearsWithUs: "Editorial Desk",
    },
    {
      id: 2,
      name: "Culinary Studio",
      role: "RECIPE VISUALS & STYLING",
      department: "Art & Visuals",
      bgColor: "#c7f0db",
      avatarUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><defs><linearGradient id="g2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23059669"/><stop offset="100%" stop-color="%2310b981"/></linearGradient></defs><circle cx="60" cy="60" r="60" fill="url(%23g2)"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="system-ui, -apple-system, sans-serif" font-size="38" font-weight="800">CS</text></svg>`,
      bio: "Produces clean, step-by-step culinary imagery and clear presentations to guide home cooks through each technique.",
      favoriteRecipe: "Shortcut Cookies and Cream Ice Cream",
      favoriteRecipeSlug: "shortcut-cookies-and-cream-ice-cream",
      yearsWithUs: "Visuals Desk",
    },
    {
      id: 3,
      name: "Recipe Development",
      role: "TESTING & COOKING RATIOS",
      department: "Recipe Development",
      bgColor: "#fed7aa",
      avatarUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><defs><linearGradient id="g3" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23ea580c"/><stop offset="100%" stop-color="%23f97316"/></linearGradient></defs><circle cx="60" cy="60" r="60" fill="url(%23g3)"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="system-ui, -apple-system, sans-serif" font-size="38" font-weight="800">RD</text></svg>`,
      bio: "Verifies cooking times, ingredient ratios, oven temperatures, and visual doneness cues for home kitchens.",
      favoriteRecipe: "Shortcut Sweet Potato Cornbread",
      favoriteRecipeSlug: "shortcut-sweet-potato-cornbread",
      yearsWithUs: "Testing Desk",
    },
    {
      id: 4,
      name: "Recipe Writers",
      role: "STEP-BY-STEP GUIDES",
      department: "Editorial Writing",
      bgColor: "#bbf7d0",
      avatarUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><defs><linearGradient id="g4" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%230d9488"/><stop offset="100%" stop-color="%2314b8a6"/></linearGradient></defs><circle cx="60" cy="60" r="60" fill="url(%23g4)"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="system-ui, -apple-system, sans-serif" font-size="38" font-weight="800">RW</text></svg>`,
      bio: "Drafts clear, straightforward instructions and troubleshooting tips to help readers cook with confidence.",
      favoriteRecipe: "The One-Pan Cheeseburger Pie",
      favoriteRecipeSlug: "the-one-pan-cheeseburger-pie",
      yearsWithUs: "Writing Desk",
    },
  ],
  // Slide 2: Specialty & Focus Desks
  [
    {
      id: 5,
      name: "Dinner & Quick Meals",
      role: "WEEKNIGHT COOKING DESK",
      department: "Dinner & Meals",
      bgColor: "#fef08a",
      avatarUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><defs><linearGradient id="g5" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23d97706"/><stop offset="100%" stop-color="%23f59e0b"/></linearGradient></defs><circle cx="60" cy="60" r="60" fill="url(%23g5)"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="system-ui, -apple-system, sans-serif" font-size="38" font-weight="800">DQ</text></svg>`,
      bio: "Develops quick, practical skillet dinners, sheet-pan recipes, and family comfort foods for busy weeknights.",
      favoriteRecipe: "Cowboy Corn",
      favoriteRecipeSlug: "cowboy-corn",
      yearsWithUs: "Dinner Desk",
    },
    {
      id: 6,
      name: "Baking & Pastry",
      role: "BAKING & DESSERT DESK",
      department: "Baking & Pastry",
      bgColor: "#ddd6fe",
      avatarUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><defs><linearGradient id="g6" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%237c3aed"/><stop offset="100%" stop-color="%238b5cf6"/></linearGradient></defs><circle cx="60" cy="60" r="60" fill="url(%23g6)"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="system-ui, -apple-system, sans-serif" font-size="38" font-weight="800">BP</text></svg>`,
      bio: "Shares dependable bread, cake, and cookie recipes tailored for home bakers and everyday ovens.",
      favoriteRecipe: "Shortcut Sweet Potato Cornbread",
      favoriteRecipeSlug: "shortcut-sweet-potato-cornbread",
      yearsWithUs: "Baking Desk",
    },
    {
      id: 7,
      name: "Grocery & Pantry",
      role: "INGREDIENT SOURCING",
      department: "Market & Grocery",
      bgColor: "#bae6fd",
      avatarUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><defs><linearGradient id="g7" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%230284c7"/><stop offset="100%" stop-color="%230ea5e9"/></linearGradient></defs><circle cx="60" cy="60" r="60" fill="url(%23g7)"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="system-ui, -apple-system, sans-serif" font-size="38" font-weight="800">GP</text></svg>`,
      bio: "Verifies accessible pantry staples, supermarket brand items, and practical budget-friendly ingredient swaps.",
      favoriteRecipe: "The One-Pan Cheeseburger Pie",
      favoriteRecipeSlug: "the-one-pan-cheeseburger-pie",
      yearsWithUs: "Pantry Desk",
    },
    {
      id: 8,
      name: "Community Desk",
      role: "READER QUESTIONS & TIPS",
      department: "Community & Support",
      bgColor: "#fed7aa",
      avatarUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><defs><linearGradient id="g8" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23c2410c"/><stop offset="100%" stop-color="%23ea580c"/></linearGradient></defs><circle cx="60" cy="60" r="60" fill="url(%23g8)"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="system-ui, -apple-system, sans-serif" font-size="38" font-weight="800">CD</text></svg>`,
      bio: "Monitors feedback, reader ratings, and kitchen questions to keep published recipe notes clear and accurate.",
      favoriteRecipe: "4-Ingredient Old Bay Pasta",
      favoriteRecipeSlug: "4-ingredient-old-bay-pasta",
      yearsWithUs: "Community Desk",
    },
  ],
];

export default function TeamSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [showWhoWeAreModal, setShowWhoWeAreModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % teamSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + teamSlides.length) % teamSlides.length);
  };

  return (
    <section className="w-full bg-[#f4f7f8] py-14 sm:py-20 border-t border-gray-200">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dual Card Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          
          {/* LEFT CARD: The Dishora Culinary Team */}
          <div className="bg-white rounded-xl p-7 sm:p-9 shadow-sm border border-gray-200/90 flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
            <div>
              {/* Header */}
              <h2 className="font-serif text-2xl sm:text-[30px] font-bold text-gray-900 text-center tracking-tight mb-4">
                The Dishora Culinary Team
              </h2>

              {/* Description */}
              <p className="text-gray-700 text-[13.5px] sm:text-[14.5px] leading-relaxed text-center max-w-xl mx-auto mb-4 font-normal">
                Dishora is a culinary resource for home cooks, offering step-by-step tested recipes, seasonal guides, and weeknight meal ideas. We provide clear instructions, sensible ingredient substitutions, and reliable techniques for cooks of all levels.
              </p>

              {/* Read More Link */}
              <div className="text-center mb-7">
                <button
                  onClick={() => setShowTeamModal(true)}
                  className="inline-flex items-center gap-1.5 font-bold text-[12.5px] tracking-wider text-[#0c5354] hover:text-[#083b3c] uppercase transition-colors group cursor-pointer"
                >
                  <span>READ MORE</span>
                  <span className="text-sm transition-transform duration-200 group-hover:translate-x-1">→</span>
                </button>
              </div>

              {/* Team Members 1-col on mobile, 2-col on sm+ */}
              <div className="min-h-[220px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-y-6 gap-x-4">
                  {teamSlides[currentSlide].map((member) => (
                    <div
                      key={member.id}
                      onClick={() => setSelectedMember(member)}
                      className="flex items-center gap-3.5 p-2 rounded-lg hover:bg-teal-50/50 cursor-pointer transition-all duration-200 group"
                      title={`Click to view ${member.name}'s bio`}
                    >
                      {/* Avatar with Halo / Background Blob */}
                      <div className="relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
                        {/* Organic Colored Blob Background */}
                        <div
                          className="absolute inset-0 rounded-full transition-transform duration-300 group-hover:scale-110"
                          style={{ backgroundColor: member.bgColor }}
                        />
                        {/* Member Photo */}
                        <img
                          src={member.avatarUrl}
                          alt={member.name}
                          className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover shadow-xs border border-white"
                        />
                      </div>

                      {/* Name & Title */}
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-[13.5px] sm:text-[14.5px] text-gray-900 leading-snug group-hover:text-[#0c5354] transition-colors truncate">
                          {member.name}
                        </span>
                        <span className="text-[10px] sm:text-[10.5px] font-bold text-gray-500 uppercase tracking-wider leading-tight mt-0.5">
                          {member.role}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-6">
              <button
                onClick={prevSlide}
                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:text-[#0c5354] hover:border-[#0c5354] hover:bg-teal-50 transition-colors cursor-pointer"
                aria-label="Previous team slide"
              >
                <span className="text-base font-bold">‹</span>
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {teamSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentSlide === index
                        ? "w-6 bg-[#0c5354]"
                        : "w-2.5 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="w-9 h-9 rounded-full border border-[#0c5354] bg-[#0c5354] text-white flex items-center justify-center hover:bg-[#093f40] transition-colors cursor-pointer shadow-xs"
                aria-label="Next team slide"
              >
                <span className="text-base font-bold">›</span>
              </button>
            </div>
          </div>

          {/* RIGHT CARD: Who We Are */}
          <div className="bg-[#f2f8f8] rounded-xl p-7 sm:p-9 shadow-sm border border-teal-100 flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
            <div>
              {/* Header */}
              <h2 className="font-serif text-2xl sm:text-[30px] font-bold text-gray-900 text-center tracking-tight mb-4">
                Who We Are
              </h2>

              {/* Description */}
              <p className="text-gray-700 text-[13.5px] sm:text-[14.5px] leading-relaxed text-center max-w-xl mx-auto mb-4 font-normal">
                At Dishora, our core mission is to take the stress out of everyday home cooking. Whether you're cooking for two or a busy family, we offer trusted, foolproof recipes and practical kitchen guides to make mealtimes delicious and enjoyable.
              </p>

              {/* Read More Link */}
              <div className="text-center mb-7">
                <button
                  onClick={() => setShowWhoWeAreModal(true)}
                  className="inline-flex items-center gap-1.5 font-bold text-[12.5px] tracking-wider text-[#0c5354] hover:text-[#083b3c] uppercase transition-colors group cursor-pointer"
                >
                  <span>READ MORE</span>
                  <span className="text-sm transition-transform duration-200 group-hover:translate-x-1">→</span>
                </button>
              </div>

              {/* Core Pillars / Value Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="bg-white p-3.5 rounded-lg border border-teal-100 shadow-xs flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f8c644]/25 flex items-center justify-center shrink-0 text-[#a06d04] text-base font-bold">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-bold text-[13px] text-gray-900">Tested Recipes</h3>
                    <p className="text-[11.5px] text-gray-600 leading-snug mt-0.5">
                      Recipes reviewed and crafted with clear step-by-step guidance.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-lg border border-teal-100 shadow-xs flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#e71d73]/15 flex items-center justify-center shrink-0 text-[#e71d73] text-base font-bold">
                    ♥
                  </div>
                  <div>
                    <h3 className="font-bold text-[13px] text-gray-900">Family-Approved</h3>
                    <p className="text-[11.5px] text-gray-600 leading-snug mt-0.5">
                      Delicious crowd-pleasers with kid-friendly flavor profiles.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-lg border border-teal-100 shadow-xs flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#0c5354]/15 flex items-center justify-center shrink-0 text-[#0c5354] text-base font-bold">
                    🛒
                  </div>
                  <div>
                    <h3 className="font-bold text-[13px] text-gray-900">Accessible Ingredients</h3>
                    <p className="text-[11.5px] text-gray-600 leading-snug mt-0.5">
                      Items available at standard local grocery stores.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-lg border border-teal-100 shadow-xs flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-blue-700 text-base font-bold">
                    ⏱️
                  </div>
                  <div>
                    <h3 className="font-bold text-[13px] text-gray-900">Real-World Cook Times</h3>
                    <p className="text-[11.5px] text-gray-600 leading-snug mt-0.5">
                      Accurate prep, chop, and simmer durations you can trust.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Callout / Community Stats */}
            <div className="mt-6 pt-4 border-t border-teal-200/60 flex items-center justify-between text-xs text-[#0c5354]">
              <span className="font-medium">🌟 Everyday recipes and cooking inspiration for home cooks</span>
              <button
                onClick={() => setShowWhoWeAreModal(true)}
                className="font-bold underline hover:text-[#083b3c] cursor-pointer"
              >
                Our Story & Standards →
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* MODAL 1: Team Member Profile */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold"
            >
              ✕
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-18 h-18 rounded-full p-1 flex items-center justify-center"
                style={{ backgroundColor: selectedMember.bgColor }}
              >
                <img
                  src={selectedMember.avatarUrl}
                  alt={selectedMember.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-xs"
                />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-gray-900">
                  {selectedMember.name}
                </h3>
                <p className="text-xs font-bold text-[#0c5354] uppercase tracking-wider">
                  {selectedMember.role}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {selectedMember.department} • {selectedMember.yearsWithUs}
                </p>
              </div>
            </div>

            <div className="bg-[#f8f9fa] p-3.5 rounded-xl border border-gray-100 mb-4 text-sm text-gray-700 leading-relaxed">
              {selectedMember.bio}
            </div>

            <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-gray-500 block">Favorite Recipe Pick:</span>
                <span className="text-xs font-bold text-gray-900">
                  {selectedMember.favoriteRecipe}
                </span>
              </div>
              <Link
                href={`/recipes/${selectedMember.favoriteRecipeSlug}`}
                onClick={() => setSelectedMember(null)}
                className="px-3.5 py-1.5 bg-[#0c5354] hover:bg-[#083b3c] text-white text-xs font-bold rounded-md transition-colors"
              >
                View Recipe →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: The Dishora Culinary Team Details */}
      {showTeamModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowTeamModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full p-7 shadow-2xl relative max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowTeamModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold cursor-pointer"
            >
              ✕
            </button>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Meet the Dishora Culinary Team
            </h3>
            <p className="text-xs font-bold text-[#0c5354] uppercase tracking-wider mb-4">
              Passionate Cooks • Rigorous Testers • Culinary Storytellers
            </p>

            <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
              <p>
                Dishora was founded as a dedicated home cooking journal and digital culinary resource. Over the years, it has grown into a trusted kitchen destination for home cooks seeking reliable, foolproof recipes across North America.
              </p>
              <p>
                Our editorial team and contributors bring together experienced food writers, recipe developers, and home cooking enthusiasts. Together, we share practical recipes designed for home kitchens.
              </p>

              <div className="bg-teal-50/70 border border-teal-200 rounded-xl p-4 my-4">
                <h4 className="font-bold text-[#0c5354] text-sm mb-1.5">
                  Our Editorial & Testing Promise
                </h4>
                <ul className="space-y-1.5 text-xs text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#0c5354] font-bold">✓</span>
                    <span><strong>Real Home Equipment:</strong> We test recipes using standard consumer stoves, ovens, and cookware—not just commercial kitchen gear.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#0c5354] font-bold">✓</span>
                    <span><strong>Everyday Supermarket Brands:</strong> We verify all ingredients are easily found at regular grocery stores.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#0c5354] font-bold">✓</span>
                    <span><strong>Clear Substitution Notes:</strong> We provide dietary modifications, substitutions, and storage guidelines for every meal.</span>
                  </li>
                </ul>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setShowTeamModal(false)}
                  className="px-5 py-2 bg-[#0c5354] text-white font-bold text-xs rounded-lg hover:bg-[#083b3c] transition-colors cursor-pointer"
                >
                  Close & Explore Recipes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Who We Are Details */}
      {showWhoWeAreModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowWhoWeAreModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full p-7 shadow-2xl relative max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowWhoWeAreModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold cursor-pointer"
            >
              ✕
            </button>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Who We Are: Our Story & Mission
            </h3>
            <p className="text-xs font-bold text-[#e71d73] uppercase tracking-wider mb-4">
              Recipes &amp; Cooking Inspiration for Home Cooks
            </p>

            <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
              <p>
                At Dishora, we believe good food doesn't have to be complicated, stressful, or expensive. Our core mission is to give everyday home cooks the confidence and inspiration to prepare delicious meals at home.
              </p>
              <p>
                Whether you are cooking a 20-minute dinner after a long workday, baking your first loaf of artisan bread, or preparing a festive holiday feast for thirty people, we have clear, tested recipes and troubleshooting tips to ensure your success.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                  <h5 className="font-bold text-gray-900 text-xs mb-1">Our Core Values</h5>
                  <p className="text-xs text-gray-600">
                    Inclusivity, clarity, respect for traditions, and uncompromising commitment to recipe accuracy.
                  </p>
                </div>
                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                  <h5 className="font-bold text-gray-900 text-xs mb-1">Community First</h5>
                  <p className="text-xs text-gray-600">
                    We read and respond to reader comments, questions, and recipe ratings every single day.
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setShowWhoWeAreModal(false)}
                  className="px-5 py-2 bg-[#0c5354] text-white font-bold text-xs rounded-lg hover:bg-[#083b3c] transition-colors cursor-pointer"
                >
                  Back to Dishora
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
