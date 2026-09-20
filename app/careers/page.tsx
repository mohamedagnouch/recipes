import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Careers & Freelance Submissions | Dishora - Work With Us",
  description:
    "Explore career and freelance opportunities at Dishora. Learn how to pitch original recipes, food news stories, and culinary photography.",
  alternates: {
    canonical: "/careers",
  },
  openGraph: {
    title: "Careers & Freelance Submissions - Dishora",
    description: "Write, test recipes, or photograph for Dishora.",
    url: "/careers",
    type: "website",
  },
};

export default function CareersPage() {
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
            Careers &amp; Freelance
          </li>
        </ol>
      </nav>

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#f3f9f8] to-white border-b border-gray-200/80 py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-black tracking-widest text-[#009b72] uppercase mb-2 block">
            JOIN OUR CULINARY CONTRIBUTORS
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Create &amp; Write For Dishora
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            We collaborate with passionate recipe developers, food journalists, culinary writers, and food photographers across the United States and Canada.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-[960px] w-full mx-auto px-4 sm:px-6 py-12 flex-1 space-y-12 leading-relaxed text-gray-800">
        {/* Current Openings Status Banner (Honest & Compliant) */}
        <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#f0f9f7] text-[#0c5354] text-2xl flex items-center justify-center shrink-0">
            📌
          </div>
          <div className="space-y-1 flex-1">
            <h2 className="font-serif text-lg font-bold text-gray-900">
              Current Hiring Status
            </h2>
            <p className="text-sm text-gray-600">
              <strong>We do not currently have any open full-time salaried positions. Please check back later.</strong> However, we actively review freelance pitches for original tested recipes, regional food trends, and culinary photography portfolios.
            </p>
          </div>
        </div>

        {/* Freelance Roles We Work With */}
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">
            Freelance &amp; Contributor Opportunities
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-xs">
              <span className="text-3xl mb-3 block">🍲</span>
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">Recipe Developers</h3>
              <p className="text-sm text-gray-600">
                Create original, thoroughly tested weeknight dinners, holiday bakes, and pantry meals with clear instructions and ingredient tips.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-xs">
              <span className="text-3xl mb-3 block">✍️</span>
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">Food Writers &amp; Reporters</h3>
              <p className="text-sm text-gray-600">
                Pitch well-researched stories on grocery price trends, supermarket product comparisons, kitchen science, and culinary history.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-xs">
              <span className="text-3xl mb-3 block">📸</span>
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">Food Photographers</h3>
              <p className="text-sm text-gray-600">
                Capture high-resolution, naturally lit step-by-step process shots and hero food photography that inspire home cooks.
              </p>
            </div>
          </div>
        </div>

        {/* Pitching Guidelines */}
        <article className="space-y-4 bg-[#f8fbfb] p-6 sm:p-8 rounded-2xl border border-[#d6ebe7]">
          <h2 className="font-serif text-2xl font-bold text-[#0c5354]">
            How to Pitch an Original Story or Recipe
          </h2>
          <p className="text-sm sm:text-base text-gray-700">
            To ensure your pitch aligns with our editorial mission, please include the following in your email:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-700">
            <li><strong>Working Title &amp; Angle:</strong> What makes this dish or article unique, timely, and genuinely helpful to everyday cooks?</li>
            <li><strong>Testing Methodology:</strong> Confirm that recipes have been kitchen-tested with standard supermarket ingredients.</li>
            <li><strong>Writing or Photography Samples:</strong> Links to 2–3 published clips, a personal food blog, or your photography portfolio.</li>
            <li><strong>Short Bio:</strong> A brief background on your culinary experience, kitchen background, or journalism credentials.</li>
          </ul>
        </article>

        {/* Submission Instructions & Privacy Protection */}
        <div className="p-6 rounded-2xl bg-white border border-gray-200 space-y-3">
          <h3 className="font-serif text-xl font-bold text-gray-900">
            How to Submit Your Pitch
          </h3>
          <p className="text-sm text-gray-600">
            Send your pitch directly to our editorial team at:
          </p>
          <div className="p-3 bg-gray-50 rounded-xl font-mono text-sm text-[#0c5354] font-bold border border-gray-200 w-fit">
            <a href="mailto:recip9220@gmail.com" className="hover:underline">recip9220@gmail.com</a>
          </div>
          <p className="text-xs text-gray-500">
            <strong>Privacy Guarantee:</strong> We do not request sensitive personal data (e.g., social security numbers or banking details) during initial pitch reviews. Information submitted is handled strictly in accordance with our <Link href="/privacy-policy" className="text-[#0c5354] underline">Privacy Policy</Link>.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
