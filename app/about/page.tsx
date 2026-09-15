import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "About Us | Dishora - Food, Tested Recipes & Culinary Culture",
  description:
    "Learn about Dishora, our mission to bring tested recipes, trusted food news, and joyful everyday cooking to home cooks across the United States and Canada.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Dishora - Our Mission & Editorial Standards",
    description:
      "Tested recipes, trustworthy food journalism, and practical kitchen inspiration for everyday cooks across North America.",
    url: "/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fcfcfc] flex flex-col text-gray-900">
      <Header />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="max-w-[1240px] w-full mx-auto px-4 sm:px-6 pt-5 pb-2">
        <ol className="flex items-center gap-2 text-xs text-gray-500">
          <li>
            <Link href="/" className="hover:text-[#0c5354] transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true">•</li>
          <li className="font-semibold text-gray-800" aria-current="page">
            About Us
          </li>
        </ol>
      </nav>

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#f3f9f8] to-white border-b border-gray-200/80 py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-black tracking-widest text-[#009b72] uppercase mb-2 block">
            OUR STORY &amp; MISSION
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Recipes For A Better Table
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Dishora is an independent digital food publication dedicated to making home cooking delicious, accessible, and dependable for families and food lovers across the United States and Canada.
          </p>
        </div>
      </section>

      {/* Main Content Body */}
      <section className="max-w-[1000px] w-full mx-auto px-4 sm:px-6 py-12 flex-1 space-y-12">
        {/* Section 1: Who We Are */}
        <article className="prose prose-stone max-w-none">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 border-b border-gray-200 pb-3 mb-4">
            Who We Are
          </h2>
          <p className="text-gray-700 leading-relaxed text-base sm:text-[17px] mb-4">
            At <strong>Dishora</strong>, we believe that good food has the power to bring people together. Whether you are throwing together a fast 20-minute weeknight pasta, perfecting a slow-simmered weekend stew, or researching the latest grocery store finds, we are here to provide clear, tested guidance you can count on.
          </p>
          <p className="text-gray-700 leading-relaxed text-base sm:text-[17px]">
            Our digital magazine is tailored for readers throughout North America, focusing on practical pantry ingredients, seasonal produce, kitchen efficiency, and honest food news that impacts what you buy and cook every day.
          </p>
        </article>

        {/* Section 2: What We Offer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#e8f5f3] flex items-center justify-center text-2xl mb-4 text-[#0c5354]">
              🍳
            </div>
            <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">Tested Recipes</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Every recipe is crafted with straightforward steps, accurate cooking times, temperature checkpoints, and accessible ingredients found in standard grocery stores.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#e8f5f3] flex items-center justify-center text-2xl mb-4 text-[#0c5354]">
              📰
            </div>
            <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">Timely Food News</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              We cover grocery supermarket trends, product releases, food safety alerts, and supermarket savings without sensationalism or clickbait.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#e8f5f3] flex items-center justify-center text-2xl mb-4 text-[#0c5354]">
              ✨
            </div>
            <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">Practical Techniques</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              From knife skills and dry-brining to cast-iron care and pantry organization, our culinary guides help home cooks build lifelong confidence.
            </p>
          </div>
        </div>

        {/* Section 3: Our Core Commitments */}
        <article className="bg-[#f8fbfb] p-6 sm:p-8 rounded-2xl border border-[#d6ebe7]">
          <h2 className="font-serif text-2xl font-bold text-[#0c5354] mb-4">
            Our Editorial &amp; Originality Standards
          </h2>
          <ul className="space-y-3.5 text-gray-700 text-sm sm:text-base">
            <li className="flex items-start gap-3">
              <span className="text-[#009b72] font-bold text-lg leading-none">✓</span>
              <div>
                <strong>100% Original Content:</strong> We do not copy recipes or articles from third-party websites. Every guide and analysis published on Dishora is written specifically for our readers.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#009b72] font-bold text-lg leading-none">✓</span>
              <div>
                <strong>Fact-Checked Information:</strong> Food news, ingredient science, and safety recommendations are verified using primary sources, official food safety authorities, and reputable culinary references.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#009b72] font-bold text-lg leading-none">✓</span>
              <div>
                <strong>Transparent Corrections:</strong> If an error is identified in an ingredient quantity, temperature, or fact, we correct it promptly and note significant updates clearly.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#009b72] font-bold text-lg leading-none">✓</span>
              <div>
                <strong>Clear Advertising Separation:</strong> Sponsored content, brand partnerships, and affiliate links are always visibly labeled, never masquerading as independent editorial work.
              </div>
            </li>
          </ul>
        </article>

        {/* Section 4: Who We Serve */}
        <article>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 border-b border-gray-200 pb-3 mb-4">
            Who We Serve
          </h2>
          <p className="text-gray-700 leading-relaxed text-base sm:text-[17px] mb-4">
            Our audience consists of everyday home cooks across the United States and Canada. From college students learning to cook their first skillet dinners to experienced weekend bakers and families managing busy dinner schedules, our content is designed to be welcoming, inclusive, and actionable.
          </p>
          <p className="text-gray-700 leading-relaxed text-base sm:text-[17px]">
            We pay special attention to seasonal ingredients, measurement systems (including cups, ounces, grams, and Celsius/Fahrenheit conversions), and regional supermarket availability across North America.
          </p>
        </article>

        {/* Section 5: Publication & Contact Information */}
        <div className="p-6 rounded-2xl bg-teal-50/60 border border-teal-200/80 text-xs sm:text-sm text-gray-800 space-y-2">
          <p className="font-bold text-[#0c5354] text-sm flex items-center gap-1.5">
            <span>ℹ️</span> Publication &amp; Contact Information
          </p>
          <p>
            <strong>Dishora</strong> is an independent digital culinary publication dedicated to tested recipes, kitchen guides, and food journalism for home cooks across North America.
          </p>
          <p>
            For editorial inquiries, recipe feedback, corrections, or partnership proposals, please reach out via our dedicated <Link href="/contact" className="underline font-bold text-[#0c5354]">Contact Page</Link> or email our team directly at{" "}
            <a href="mailto:recip9220@gmail.com" className="font-bold text-[#0c5354] underline hover:text-[#009b72]">
              recip9220@gmail.com
            </a>.
          </p>
        </div>

        {/* Call to Action Bar */}
        <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-lg font-bold text-gray-900">Have a question or recipe suggestion?</h3>
            <p className="text-xs text-gray-600">Our editorial desk is always eager to hear from our community.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/editorial-guidelines"
              className="px-4 py-2 border border-gray-300 hover:border-[#0c5354] text-gray-700 text-xs font-bold rounded-lg transition-colors"
            >
              Editorial Guidelines
            </Link>
            <Link
              href="/contact"
              className="px-5 py-2 bg-[#0c5354] hover:bg-[#083b3c] text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
