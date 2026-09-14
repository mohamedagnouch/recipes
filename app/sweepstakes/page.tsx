import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Sweepstakes & Official Rules | Dishora - Contests & Giveaways",
  description:
    "Review active promotions, sweepstakes announcements, and official rules governing Dishora giveaways for residents of the United States and Canada.",
  alternates: {
    canonical: "/sweepstakes",
  },
  openGraph: {
    title: "Sweepstakes & Official Rules - Dishora",
    description: "Official rules and terms for giveaways and sweepstakes on Dishora.",
    url: "/sweepstakes",
    type: "website",
  },
};

export default function SweepstakesPage() {
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
            Sweepstakes &amp; Rules
          </li>
        </ol>
      </nav>

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#f3f9f8] to-white border-b border-gray-200/80 py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-black tracking-widest text-[#009b72] uppercase mb-2 block">
            PROMOTIONS &amp; GIVEAWAYS
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Sweepstakes &amp; Official Rules
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            From cookware packages to supermarket grocery cards, explore our promotional giveaways and standard official rules for North American residents.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-[920px] w-full mx-auto px-4 sm:px-6 py-12 flex-1 space-y-10 leading-relaxed text-gray-800">
        {/* Active Status Box (Honest Notice) */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-xs text-center space-y-3">
          <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-1">
            🎁
          </div>
          <h2 className="font-serif text-2xl font-bold text-gray-900">
            Current Sweepstakes Status
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-lg mx-auto">
            <strong>There are currently no active sweepstakes or contests running at this time.</strong>
          </p>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            New giveaways and seasonal culinary contests are announced via our website and editorial newsletters. Please check back regularly!
          </p>
        </div>

        {/* Legal Warning Notice */}
        <div className="p-4 sm:p-5 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-950">
          <p className="font-bold mb-1">⚖️ Legal Disclaimers &amp; Official Rules Framework</p>
          <p>
            The rules outlined below represent the general standard framework governing future promotions on Dishora. Specific active sweepstakes will include tailored details (prize ARV, entry periods, sponsor names) and must be reviewed by legal counsel for full state, provincial, and federal compliance prior to launch.
          </p>
        </div>

        {/* Standard Official Rules Framework */}
        <article className="space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/90 text-sm sm:text-base">
          <h2 className="font-serif text-2xl font-bold text-gray-900 border-b border-gray-200 pb-3">
            Standard Official Rules &amp; Eligibility Framework
          </h2>

          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-bold text-gray-900 mb-1">1. NO PURCHASE NECESSARY</h3>
              <p className="text-sm">
                NO PURCHASE OR PAYMENT OF ANY KIND IS NECESSARY TO ENTER OR WIN ANY DISHORA PROMOTION. A PURCHASE WILL NOT INCREASE YOUR CHANCES OF WINNING. VOID WHERE PROHIBITED BY LAW.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-1">2. ELIGIBILITY</h3>
              <p className="text-sm">
                Unless otherwise specified in a specific promotion, sweepstakes are open only to legal residents of the 50 United States and the District of Columbia, and legal residents of Canada (excluding the Province of Quebec), who are at least eighteen (18) years of age at the time of entry. Employees, contractors, and immediate family members of Dishora and its affiliates are not eligible.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-1">3. CANADIAN RESIDENTS SKILL-TESTING REQUIREMENT</h3>
              <p className="text-sm">
                In compliance with Canadian contest regulations, if a selected potential winner is a Canadian resident, they must first correctly answer, unaided, a mathematical skill-testing question before being declared an official winner.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-1">4. WINNER SELECTION &amp; NOTIFICATION</h3>
              <p className="text-sm">
                Potential winners will be selected in a random drawing conducted from among all eligible entries received during the entry period. Winners will be notified via email within five (5) business days following the drawing. If a potential winner does not respond within the timeframe specified in the notification, an alternate winner may be selected.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-1">5. PRIZES &amp; ODDS</h3>
              <p className="text-sm">
                Prizes are non-transferable, and no cash redemption or substitution is permitted except at the Sponsor&apos;s sole discretion. The Approximate Retail Value (ARV) and specific prize description will be explicitly detailed in each contest announcement. Odds of winning depend on the total number of eligible entries received.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-1">6. SPONSOR INFORMATION</h3>
              <p className="text-sm">
                Promotions are sponsored by <strong>Dishora Digital Media</strong>. Inquiries regarding official rules or winner lists may be directed to <a href="mailto:recip9220@gmail.com" className="text-[#0c5354] underline font-bold hover:text-[#009b72]">recip9220@gmail.com</a>.
              </p>
            </div>
          </div>
        </article>
      </section>

      <Footer />
    </main>
  );
}
