import React from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { freeziesMethodologyRubric } from "../../data/freeziesData";

export const metadata = {
  title: "The Freezies 100-Point Scoring Methodology & Testing Protocol",
  description: "How The Freezies Awards evaluate frozen foods: blind taste testing, standardized home appliances, and the weighted 100-point culinary rubric.",
};

export default function FreeziesMethodologyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7] text-gray-900">
      <Header />

      <main className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 font-bold mb-6 uppercase tracking-wider" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#0c5354]">Home</Link>
          <span>/</span>
          <Link href="/freezies" className="hover:text-[#0c5354]">The Freezies</Link>
          <span>/</span>
          <span className="text-[#d97706]">Methodology</span>
        </nav>

        {/* Masthead */}
        <header className="mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-[#d97706] block mb-2">
            Standards &amp; Integrity
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-gray-900 leading-[1.1] mb-4">
            The Freezies 100-Point Testing Protocol
          </h1>
          <p className="text-lg sm:text-xl font-serif text-gray-700 italic leading-relaxed max-w-3xl">
            How we test, score, and evaluate frozen supermarket foods across the United States. No brand sponsorships, no free manufacturer samples, and 100% blind evaluations.
          </p>
        </header>

        {/* Hero Photo */}
        <div className="mb-12 rounded-xl overflow-hidden shadow-lg border border-gray-200">
          <img
            src="/images/freezies/methodology-test-kitchen.jpg"
            alt="The Freezies test kitchen prep station with timers, thermometers, and blind tasting trays"
            className="w-full aspect-[16/9] object-cover"
          />
          <div className="p-3 bg-white text-[11.5px] text-gray-500 italic text-right border-t border-gray-100">
            The Freezies Test Kitchen: Standardized home appliances and calibrated digital thermal probes.
          </div>
        </div>

        {/* The 3 Core Pillars of Independence */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-2xs">
            <span className="text-2xl mb-2 block">🛒</span>
            <h3 className="font-serif font-bold text-lg text-gray-900 mb-2">100% Retail Sourced</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Every single product is bought off supermarket shelves by our mystery shoppers. We never accept gifted boxes or manufacturer PR samples.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-2xs">
            <span className="text-2xl mb-2 block">🕶️</span>
            <h3 className="font-serif font-bold text-lg text-gray-900 mb-2">Double-Blind Tasting</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Tasting panels never see packaging, branding, or retail prices during evaluation rounds to prevent unconscious bias.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-2xs">
            <span className="text-2xl mb-2 block">⏱️</span>
            <h3 className="font-serif font-bold text-lg text-gray-900 mb-2">Real Home Appliances</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              We test using ordinary 1000W microwaves, standard kitchen ovens, and 4-quart air fryers—strictly adhering to printed package directions.
            </p>
          </div>
        </section>

        {/* The 100-Point Rubric Breakdown */}
        <section className="mb-14">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            The Weighted 100-Point Scoring Rubric
          </h2>
          <div className="space-y-4">
            {freeziesMethodologyRubric.map((item, idx) => (
              <div key={idx} className="p-5 bg-white border border-gray-200 rounded-lg shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-serif font-bold text-lg text-gray-900">{item.category}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
                <div className="flex-shrink-0 bg-[#0c5354] text-white font-black text-sm px-4 py-2 rounded-full">
                  {item.weight} Points Max
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ on Methodology */}
        <section className="mb-14 p-6 sm:p-8 bg-white border border-gray-200 rounded-xl shadow-2xs">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            Methodology FAQ
          </h2>
          <div className="space-y-6 text-sm text-gray-700 leading-relaxed font-sans">
            <div>
              <h3 className="font-bold text-base text-gray-900 mb-1">
                Who sits on The Freezies judging panel?
              </h3>
              <p>
                Our testing panel includes professional recipe developers, food journalists, registered dietitians, sensory analysts, and everyday home cooks across the United States.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-base text-gray-900 mb-1">
                Can food brands pay to enter The Freezies?
              </h3>
              <p>
                No. The Freezies does not charge entry fees, nomination fees, or licensing fees. Editorial independence is our foundational principle.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-base text-gray-900 mb-1">
                How do you handle dietary restrictions?
              </h3>
              <p>
                Products labeled gluten-free, vegan, kosher, or allergen-friendly are evaluated within specialized sub-panels to ensure appropriate context and comparison.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom Nav */}
        <div className="pt-8 border-t border-gray-200 flex items-center justify-between">
          <Link href="/freezies" className="text-xs font-bold text-[#0c5354] uppercase tracking-wider hover:underline">
            ← Explore Award Winners
          </Link>
          <Link href="/freezies/about" className="text-xs font-bold text-[#0c5354] uppercase tracking-wider hover:underline">
            About The Freezies Organization →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
