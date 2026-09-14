"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// Primary Food & Recipe hubs with active path matching
const PRIMARY_SECTIONS = [
  { label: "RECIPES", href: "/recipes", match: ["/recipes", "/appetizers", "/breakfast", "/lunch", "/desserts", "/freezies"] },
  { label: "DINNER & MEALS", href: "/dinner", match: ["/dinner"] },
  { label: "IN THE KITCHEN", href: "/in-the-kitchen", match: ["/in-the-kitchen", "/cleaning-and-organizing", "/cleaning-organizing"] },
  { label: "RECIPE ROUND-UPS", href: "/recipe-round-up", match: ["/recipe-round-up", "/recipe-collections"] },
  { label: "FOOD NEWS & TRENDS", href: "/food-news", match: ["/food-news"] },
];

// Editorial & Legal links
const ABOUT_LEGAL_SECTIONS = [
  { label: "About Us", href: "/about" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Editorial Guidelines", href: "/editorial-guidelines" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

// Business, Partnership & Contact links
const BUSINESS_SECTIONS = [
  { label: "Advertise", href: "/advertise" },
  { label: "Careers", href: "/careers" },
  { label: "Sweepstakes", href: "/sweepstakes" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const isPrimaryActive = (section: typeof PRIMARY_SECTIONS[0]) => {
    if (!pathname) return false;
    if (pathname === section.href) return true;
    return section.match.some((p) => pathname.startsWith(p));
  };

  const isLinkActive = (href: string) => {
    if (!pathname) return false;
    return pathname === href || pathname.startsWith(href + "/");
  };

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
    <footer className="w-full max-w-full overflow-x-hidden bg-[#f6f8f8] border-t border-gray-200 text-gray-800 transition-colors">
      {/* Main Footer Links & Brand Section */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-9 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Brand, Newsletters Button & Social Icons */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col items-start space-y-5">
            
            {/* Dishora Logo */}
            <Link href="/" className="flex items-center group select-none py-0.5">
              <Image
                src="/images/dishora-logo.png"
                alt="Dishora - Recipes for a better table"
                width={190}
                height={84}
                className="h-8 sm:h-9.5 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Newsletters Button */}
            <div className="w-full max-w-[240px]">
              <button
                onClick={() => setShowModal(true)}
                className="w-full py-2 px-5 border-2 border-[#0c5354] text-[#0c5354] hover:bg-[#0c5354] hover:text-white font-extrabold text-[12px] uppercase tracking-widest text-center transition-all duration-200 rounded-xs shadow-2xs cursor-pointer block"
              >
                NEWSLETTERS
              </button>
            </div>

            {/* Follow Us & Social Icons */}
            <div className="flex flex-col space-y-2 pt-0.5">
              <span className="text-[11.5px] font-bold text-gray-700 uppercase tracking-wider">
                Follow Us
              </span>
              <div className="flex items-center gap-3.5 text-gray-700">
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

                {/* Threads */}
                <a
                  href="https://threads.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Threads"
                  className="p-1.5 rounded-full hover:text-[#0c5354] hover:bg-teal-50 transition-colors duration-200"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.186 24C5.466 24 0 18.534 0 11.814 0 5.094 5.466 0 12.186 0c6.642 0 11.954 5.234 12.014 11.874l.004.306h-3.64c-.056-4.646-3.83-8.4-8.378-8.4-4.664 0-8.448 3.784-8.448 8.448 0 4.664 3.784 8.448 8.448 8.448 3.444 0 6.42-2.08 7.728-5.088l3.324 1.488C21.848 20.89 17.382 24 12.186 24zm4.184-12.756c-.368-2.618-2.316-4.14-4.57-4.14-2.736 0-4.814 2.194-4.814 5.082 0 2.888 2.078 5.082 4.814 5.082 1.942 0 3.65-1.12 4.358-2.84l-2.05-.88c-.466 1.036-1.34 1.54-2.308 1.54-1.636 0-2.634-1.29-2.634-2.902 0-.256.03-.508.086-.754h7.118v-.188zm-3.67-1.84c.83 0 1.492.518 1.69 1.344h-3.41c.21-.818.88-1.344 1.72-1.344z"/>
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

          {/* Right Columns: Links */}
          <div className="md:col-span-7 lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-5 pt-1">
            
            {/* Column 1: Primary Recipe Sections (Bold Uppercase with Dynamic Active & Hover state) */}
            <div className="flex flex-col space-y-3">
              {PRIMARY_SECTIONS.map((section) => {
                const active = isPrimaryActive(section);
                return (
                  <Link
                    key={section.href}
                    href={section.href}
                    className={`font-sans text-[12.5px] font-black tracking-wider uppercase transition-all duration-200 flex items-center group ${
                      active
                        ? "text-[#0c5354] translate-x-1 font-extrabold"
                        : "text-gray-900 hover:text-[#0c5354] hover:translate-x-1"
                    }`}
                  >
                    <span className={`inline-block transition-transform duration-200 ${active ? "text-[#009b72] font-black mr-1.5" : "text-transparent group-hover:text-[#009b72] mr-0 group-hover:mr-1.5"}`}>
                      ▸
                    </span>
                    <span>{section.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Column 2: Legal & About (Dynamic Active & Hover State) */}
            <div className="flex flex-col space-y-3 text-[13px] font-medium">
              {ABOUT_LEGAL_SECTIONS.map((item) => {
                const active = isLinkActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`transition-colors duration-200 ${
                      active
                        ? "text-[#0c5354] font-bold underline decoration-[#009b72] decoration-2 underline-offset-4"
                        : "text-gray-700 hover:text-[#0c5354]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Column 3: Business, Careers & Contact (Dynamic Active & Hover State) */}
            <div className="flex flex-col space-y-3 text-[13px] font-medium">
              {BUSINESS_SECTIONS.map((item) => {
                const active = isLinkActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`transition-colors duration-200 ${
                      active
                        ? "text-[#0c5354] font-bold underline decoration-[#009b72] decoration-2 underline-offset-4"
                        : "text-gray-700 hover:text-[#0c5354]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

          </div>

        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="mt-9 pt-6 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span>
              Dishora is an independent digital food &amp; lifestyle publication.
            </span>
            <span className="hidden sm:inline text-gray-300">•</span>
            <span>&copy; {new Date().getFullYear()} Dishora. All rights reserved.</span>
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
