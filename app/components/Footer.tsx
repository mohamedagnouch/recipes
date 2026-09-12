"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
        setShowModal(false);
      }, 3500);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#f6f8f8] border-t border-gray-200 text-gray-800 transition-colors">
      {/* Main Footer Links & Brand Section (Matches Reference) */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Brand, Newsletters Button & Social Icons */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col items-start space-y-6">
            
            {/* Simply Recipes Logo */}
            <Link href="/" className="flex items-center gap-3.5 group select-none">
              {/* Flower / Sunburst Icon */}
              <div className="relative flex items-center justify-center w-11 h-11 transition-transform duration-300 group-hover:scale-105">
                <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                  {/* Outer Petal Dots (Teal #49bcc3) */}
                  <circle cx="50" cy="16" r="6.8" fill="#49bcc3" />
                  <circle cx="74" cy="26" r="6.8" fill="#49bcc3" />
                  <circle cx="84" cy="50" r="6.8" fill="#49bcc3" />
                  <circle cx="74" cy="74" r="6.8" fill="#49bcc3" />
                  <circle cx="50" cy="84" r="6.8" fill="#49bcc3" />
                  <circle cx="26" cy="74" r="6.8" fill="#49bcc3" />
                  <circle cx="16" cy="50" r="6.8" fill="#49bcc3" />
                  <circle cx="26" cy="26" r="6.8" fill="#49bcc3" />

                  {/* Mid Petal Dots */}
                  <circle cx="50" cy="31" r="5" fill="#49bcc3" />
                  <circle cx="63.5" cy="36.5" r="5" fill="#49bcc3" />
                  <circle cx="69" cy="50" r="5" fill="#49bcc3" />
                  <circle cx="63.5" cy="63.5" r="5" fill="#49bcc3" />
                  <circle cx="50" cy="69" r="5" fill="#49bcc3" />
                  <circle cx="36.5" cy="63.5" r="5" fill="#49bcc3" />
                  <circle cx="31" cy="50" r="5" fill="#49bcc3" />
                  <circle cx="36.5" cy="36.5" r="5" fill="#49bcc3" />

                  {/* Center Core Circle (Light Aqua #9fe2e5) */}
                  <circle cx="50" cy="50" r="6.5" fill="#a0e1e4" />
                </svg>
              </div>

              {/* Typography */}
              <div className="flex flex-col leading-none">
                <span className="font-serif text-[32px] sm:text-[36px] font-bold text-[#0c5354] tracking-tight -mb-1">
                  Simply
                </span>
                <span className="font-sans text-[11px] font-black tracking-[0.28em] text-[#009b72] uppercase pl-0.5">
                  Recipes
                </span>
              </div>
            </Link>

            {/* Newsletters Button (Box outline matching reference) */}
            <div className="w-full max-w-[260px]">
              <button
                onClick={() => setShowModal(true)}
                className="w-full py-2.5 px-6 border-2 border-[#0c5354] text-[#0c5354] hover:bg-[#0c5354] hover:text-white font-extrabold text-[12.5px] uppercase tracking-widest text-center transition-all duration-200 rounded-xs shadow-2xs cursor-pointer block"
              >
                NEWSLETTERS
              </button>
            </div>

            {/* Follow Us & Social Icons */}
            <div className="flex flex-col space-y-2.5 pt-1">
              <span className="text-[12px] font-bold text-gray-700 uppercase tracking-wider">
                Follow Us
              </span>
              <div className="flex items-center gap-4 text-gray-700">
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Instagram"
                  className="p-1.5 rounded-full hover:text-[#0c5354] hover:bg-teal-50 transition-colors duration-200"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Facebook"
                  className="p-1.5 rounded-full hover:text-[#0c5354] hover:bg-teal-50 transition-colors duration-200"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on YouTube"
                  className="p-1.5 rounded-full hover:text-[#0c5354] hover:bg-teal-50 transition-colors duration-200"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>

                {/* Pinterest */}
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Pinterest"
                  className="p-1.5 rounded-full hover:text-[#0c5354] hover:bg-teal-50 transition-colors duration-200"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0a12 12 0 0 0-4.37 23.18c-.07-.94-.13-2.39.03-3.42.14-.94.94-6.4 1.1-7.46.06-.44-.22-.87-.22-1.45 0-1.36.79-2.38 1.77-2.38.83 0 1.24.63 1.24 1.38 0 .84-.53 2.1-1.04 3.26-.23.99.5 1.79 1.48 1.79 1.78 0 3.15-1.88 3.15-4.59 0-2.4-1.72-4.08-4.19-4.08-2.86 0-4.54 2.14-4.54 4.36 0 .86.33 1.79.74 2.3.08.1.09.19.07.29-.08.32-.25 1.01-.28 1.15-.05.18-.15.22-.35.13-1.31-.61-2.13-2.52-2.13-4.06 0-3.3 2.4-6.34 6.93-6.34 3.64 0 6.47 2.6 6.47 6.07 0 3.62-2.28 6.53-5.45 6.53-1.06 0-2.06-.55-2.41-1.21l-.66 2.51c-.24.92-.88 2.07-1.31 2.77A12 12 0 1 0 12 0z"/>
                  </svg>
                </a>
              </div>
            </div>

          </div>

          {/* Right Columns: Links matching reference exactly */}
          <div className="md:col-span-7 lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 pt-2">
            
            {/* Column 1: Primary Recipe Sections (Bold Uppercase) */}
            <div className="flex flex-col space-y-3.5">
              <Link
                href="/recipes"
                className="font-sans text-[13px] font-black tracking-wider text-gray-900 hover:text-[#0c5354] transition-colors uppercase"
              >
                RECIPES
              </Link>
              <Link
                href="#quick-and-easy"
                className="font-sans text-[13px] font-black tracking-wider text-gray-900 hover:text-[#0c5354] transition-colors uppercase"
              >
                QUICK &amp; EASY
              </Link>
              <Link
                href="#in-the-kitchen"
                className="font-sans text-[13px] font-black tracking-wider text-gray-900 hover:text-[#0c5354] transition-colors uppercase"
              >
                IN THE KITCHEN
              </Link>
              <Link
                href="#buying-guides"
                className="font-sans text-[13px] font-black tracking-wider text-gray-900 hover:text-[#0c5354] transition-colors uppercase"
              >
                BUYING GUIDES
              </Link>
              <Link
                href="#holidays-seasons"
                className="font-sans text-[13px] font-black tracking-wider text-gray-900 hover:text-[#0c5354] transition-colors uppercase"
              >
                HOLIDAYS &amp; SEASONS
              </Link>
            </div>

            {/* Column 2: Legal & About */}
            <div className="flex flex-col space-y-3.5 text-[13.5px] text-gray-700 font-medium">
              <Link
                href="#about-us"
                className="hover:text-[#0c5354] transition-colors"
              >
                About Us
              </Link>
              <Link
                href="#terms-of-service"
                className="hover:text-[#0c5354] transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="#editorial-guidelines"
                className="hover:text-[#0c5354] transition-colors"
              >
                Editorial Guidelines
              </Link>
              <Link
                href="#privacy-policy"
                className="hover:text-[#0c5354] transition-colors"
              >
                Privacy Policy
              </Link>
            </div>

            {/* Column 3: Business, Careers & Contact */}
            <div className="flex flex-col space-y-3.5 text-[13.5px] text-gray-700 font-medium">
              <Link
                href="#advertise"
                className="hover:text-[#0c5354] transition-colors"
              >
                Advertise
              </Link>
              <Link
                href="#careers"
                className="hover:text-[#0c5354] transition-colors"
              >
                Careers
              </Link>
              <Link
                href="#sweepstakes"
                className="hover:text-[#0c5354] transition-colors"
              >
                Sweepstakes
              </Link>
              <Link
                href="#contact"
                className="hover:text-[#0c5354] transition-colors"
              >
                Contact
              </Link>
            </div>

          </div>

        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="mt-12 pt-8 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span>
              Simply Recipes is part of the <span className="font-semibold text-gray-700">Dotdash Meredith</span> publishing family.
            </span>
            <span className="hidden sm:inline text-gray-300">•</span>
            <span>&copy; {new Date().getFullYear()} Simply Recipes. All rights reserved.</span>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs font-bold text-[#0c5354] hover:text-[#009b72] transition-colors cursor-pointer group"
          >
            <span>Back to top</span>
            <svg
              className="w-4 h-4 transition-transform group-hover:-translate-y-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Interactive Newsletter Signup Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-lg max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-gray-100">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 cursor-pointer"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Header */}
            <div className="text-center mb-6">
              <span className="text-xs font-black tracking-widest text-[#009b72] uppercase block mb-1">
                FREE NEWSLETTER
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0c5354]">
                Get the Best Recipes
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                Delivered straight to your inbox every morning. Quick 20-minute dinners, seasonal baking, and chef tips.
              </p>
            </div>

            {/* Modal Form */}
            {isSubscribed ? (
              <div className="p-4 bg-[#eef7f6] text-[#0c5354] rounded-md text-center font-bold text-sm">
                🎉 Thank you for subscribing! Check your inbox soon.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-[#0c5354] focus:ring-1 focus:ring-[#0c5354]"
                    autoFocus
                  />
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <input type="checkbox" id="modal-consent" defaultChecked required className="accent-[#0c5354]" />
                  <label htmlFor="modal-consent">
                    I agree to receive recipe recommendations &amp; news.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#0c5354] hover:bg-[#093f40] text-white font-extrabold text-xs uppercase tracking-widest rounded-sm transition-colors cursor-pointer shadow-md"
                >
                  SUBSCRIBE NOW
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </footer>
  );
}
