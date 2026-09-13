"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AdvertisePage() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    partnershipType: "display_ads",
    budgetRange: "under_5k",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    // Simulate API network submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        companyName: "",
        contactName: "",
        email: "",
        partnershipType: "display_ads",
        budgetRange: "under_5k",
        message: "",
      });
    }, 900);
  };

  return (
    <main className="min-h-screen bg-[#fcfcfc] flex flex-col text-gray-900">
      <Header />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="max-w-[1240px] w-full mx-auto px-4 sm:px-6 pt-5 pb-2">
        <ol className="flex items-center gap-2 text-xs text-gray-500">
          <li>
            <Link href="/" className="hover:text-[#0c5354] transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true">•</li>
          <li className="font-semibold text-gray-800" aria-current="page">
            Advertise With Us
          </li>
        </ol>
      </nav>

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#f3f9f8] to-white border-b border-gray-200/80 py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-black tracking-widest text-[#009b72] uppercase mb-2 block">
            BRAND PARTNERSHIPS &amp; SPONSORSHIPS
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Connect With Passionate Home Cooks
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Partner with Dishora to reach engaged food lovers, grocery decision-makers, and home chefs across the United States and Canada.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-[1060px] w-full mx-auto px-4 sm:px-6 py-12 flex-1 space-y-14">
        {/* Audience & Reach Section */}
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-center">
            Our Audience &amp; Editorial Focus
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto text-sm sm:text-base mb-8">
            Dishora readers are active home cooks seeking tested recipes, grocery recommendations, kitchen tools, and honest food news to feed their families and entertain with confidence.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 rounded-2xl bg-white border border-gray-200/80 text-center shadow-xs">
              <div className="text-2xl mb-2">🍽️</div>
              <h3 className="font-bold text-gray-900 text-base mb-1">High Cooking Intent</h3>
              <p className="text-xs text-gray-500">Readers actively preparing shopping lists and cooking meals daily.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-gray-200/80 text-center shadow-xs">
              <div className="text-2xl mb-2">🇺🇸 🇨🇦</div>
              <h3 className="font-bold text-gray-900 text-base mb-1">US &amp; Canada Focus</h3>
              <p className="text-xs text-gray-500">Tailored to North American supermarkets, ingredients, and seasons.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-gray-200/80 text-center shadow-xs">
              <div className="text-2xl mb-2">🛒</div>
              <h3 className="font-bold text-gray-900 text-base mb-1">Grocery Buyers</h3>
              <p className="text-xs text-gray-500">Primary household shoppers making pantry and appliance decisions.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-gray-200/80 text-center shadow-xs">
              <div className="text-2xl mb-2">✨</div>
              <h3 className="font-bold text-gray-900 text-base mb-1">Brand-Safe Quality</h3>
              <p className="text-xs text-gray-500">Clean, original, family-friendly editorial environment.</p>
            </div>
          </div>
        </div>

        {/* Advertising Opportunities */}
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">
            Partnership Opportunities
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-black uppercase text-[#0c5354] tracking-wider block mb-2">
                  DISPLAY ADVERTISING
                </span>
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">Programmatic &amp; Direct Ads</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Standard IAB banner placements, leaderboard units, and high-impact sticky in-content placements optimized for mobile and desktop.
                </p>
              </div>
              <span className="text-xs font-bold text-[#0c5354]">CPM &amp; Fixed Placements Available</span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-black uppercase text-[#0c5354] tracking-wider block mb-2">
                  SPONSORED EDITORIAL
                </span>
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">Custom Recipe Integration</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Feature your culinary ingredient, cookware, or kitchen appliance naturally within original, tested recipes developed specifically for your brand.
                </p>
              </div>
              <span className="text-xs font-bold text-[#0c5354]">Includes High-Res Photography</span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-black uppercase text-[#0c5354] tracking-wider block mb-2">
                  NEWSLETTER SPONSORSHIP
                </span>
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">Direct Inbox Reach</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Place your brand front-and-center in our recipe of the day and weekend menu newsletters sent directly to active subscriber inboxes.
                </p>
              </div>
              <span className="text-xs font-bold text-[#0c5354]">Dedicated &amp; Banner Placements</span>
            </div>
          </div>
        </div>

        {/* Editorial Disclosure Box */}
        <div className="p-5 rounded-2xl bg-[#f8fbfb] border border-[#d6ebe7] text-xs sm:text-sm text-gray-700 space-y-1.5">
          <p className="font-bold text-[#0c5354]">⚖️ FTC &amp; Transparency Compliance</p>
          <p>
            Dishora strictly adheres to US Federal Trade Commission (FTC) guidelines and Canadian advertising standards. All paid promotions, sponsored articles, and gifted items are clearly labeled for transparency. Advertisers do not dictate editorial reviews or test kitchen ratings.
          </p>
        </div>

        {/* Partnership Inquiry Form */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-sm max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Request Media Kit &amp; Rates
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Tell us about your campaign goals, and our partnership desk will respond within 1–2 business days.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 bg-[#f0f9f7] border border-[#86d0c2] rounded-2xl text-center space-y-2 animate-fadeIn">
              <div className="w-12 h-12 bg-[#0c5354] text-white text-2xl rounded-full flex items-center justify-center mx-auto mb-2">
                ✓
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0c5354]">Inquiry Received!</h3>
              <p className="text-sm text-gray-700">
                Thank you for your interest in advertising with Dishora. Our partnerships team will review your message and provide our Media Kit &amp; rate card shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 bg-[#0c5354] text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="companyName" className="block text-xs font-bold text-gray-700 mb-1">
                    Company / Brand Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="companyName"
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g., Acme Kitchen Co."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#0c5354] focus:ring-1 focus:ring-[#0c5354]"
                  />
                </div>

                <div>
                  <label htmlFor="contactName" className="block text-xs font-bold text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    id="contactName"
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    placeholder="e.g., Jane Smith"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#0c5354] focus:ring-1 focus:ring-[#0c5354]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="businessEmail" className="block text-xs font-bold text-gray-700 mb-1">
                  Business Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="businessEmail"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jane@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#0c5354] focus:ring-1 focus:ring-[#0c5354]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="partnershipType" className="block text-xs font-bold text-gray-700 mb-1">
                    Partnership Type
                  </label>
                  <select
                    id="partnershipType"
                    value={formData.partnershipType}
                    onChange={(e) => setFormData({ ...formData, partnershipType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#0c5354] focus:ring-1 focus:ring-[#0c5354] bg-white"
                  >
                    <option value="display_ads">Display / Banner Advertising</option>
                    <option value="sponsored_recipe">Sponsored Recipe / Content</option>
                    <option value="newsletter">Newsletter Sponsorship</option>
                    <option value="seasonal_campaign">Seasonal Campaign</option>
                    <option value="other">Other Collaboration</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="budgetRange" className="block text-xs font-bold text-gray-700 mb-1">
                    Estimated Budget (USD)
                  </label>
                  <select
                    id="budgetRange"
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#0c5354] focus:ring-1 focus:ring-[#0c5354] bg-white"
                  >
                    <option value="under_5k">Under $5,000</option>
                    <option value="5k_15k">$5,000 – $15,000</option>
                    <option value="15k_50k">$15,000 – $50,000</option>
                    <option value="50k_plus">$50,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="campaignDetails" className="block text-xs font-bold text-gray-700 mb-1">
                  Campaign Goals &amp; Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="campaignDetails"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your brand, target timeline, and what you would like to achieve..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#0c5354] focus:ring-1 focus:ring-[#0c5354]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#0c5354] hover:bg-[#093f40] text-white font-bold text-sm rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? "Submitting Inquiry..." : "Submit Advertising Inquiry →"}
              </button>

              <p className="text-[11px] text-gray-400 text-center">
                Or email directly: <strong className="text-gray-600">[ENTER ADVERTISING EMAIL, e.g., advertise@dishora.com]</strong>
              </p>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
