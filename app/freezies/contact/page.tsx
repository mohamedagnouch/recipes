"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function FreeziesContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7] text-gray-900">
      <Header />

      <main className="max-w-[760px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 font-bold mb-6 uppercase tracking-wider" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#0c5354]">Home</Link>
          <span>/</span>
          <Link href="/freezies" className="hover:text-[#0c5354]">The Freezies</Link>
          <span>/</span>
          <span className="text-[#d97706]">Contact</span>
        </nav>

        <header className="mb-10 text-center">
          <span className="text-xs font-black uppercase tracking-widest text-[#d97706] block mb-2">
            Nominations &amp; Media Inquiries
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-black text-gray-900 leading-[1.1] mb-3">
            Contact The Freezies Board
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-lg mx-auto">
            Submit a product nomination for the 2027 awards cycle, request media press kits, or contact our test kitchen editors.
          </p>
        </header>

        <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-10 shadow-sm">
          {submitted ? (
            <div className="text-center py-10">
              <span className="text-4xl mb-4 block">❄️</span>
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">
                Thank You for Your Submission!
              </h2>
              <p className="text-sm text-gray-600 max-w-md mx-auto mb-6">
                Our culinary testing editors review reader nominations and media requests on a rolling basis.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-5 py-2 bg-[#0c5354] text-white text-xs font-bold uppercase tracking-wider rounded"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-5"
            >
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-md text-sm outline-none focus:border-[#0c5354] focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-md text-sm outline-none focus:border-[#0c5354] focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Inquiry Type
                </label>
                <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-md text-sm outline-none focus:border-[#0c5354] focus:bg-white transition-colors cursor-pointer">
                  <option>Product Nomination for 2027</option>
                  <option>Press &amp; Media Inquiry</option>
                  <option>Brand Question / Correction</option>
                  <option>General Editorial Feedback</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Message / Product Details
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Tell us about the product name, brand, retailer where you bought it, and why it deserves a Freezie award..."
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-md text-sm outline-none focus:border-[#0c5354] focus:bg-white transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#0c5354] text-white font-bold text-xs uppercase tracking-wider rounded-md hover:bg-[#083c3d] transition-colors shadow-sm cursor-pointer"
                >
                  Submit to The Freezies Board
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Back Link */}
        <div className="mt-10 text-center">
          <Link href="/freezies" className="text-xs font-bold text-[#0c5354] uppercase tracking-wider hover:underline">
            ← Return to The 2026 Freezies Hub
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
