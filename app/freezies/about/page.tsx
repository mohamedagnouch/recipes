import React from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const metadata = {
  title: "About The Freezies: The Premier American Frozen Food Awards",
  description: "Learn about The Freezies Awards, our mission to celebrate the renaissance of frozen foods, and our commitment to independent editorial journalism.",
};

export default function FreeziesAboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7] text-gray-900">
      <Header />

      <main className="max-w-[880px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 font-bold mb-6 uppercase tracking-wider" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#0c5354]">Home</Link>
          <span>/</span>
          <Link href="/freezies" className="hover:text-[#0c5354]">The Freezies</Link>
          <span>/</span>
          <span className="text-[#d97706]">About</span>
        </nav>

        {/* Masthead */}
        <header className="mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-[#d97706] block mb-2">
            Our Mission &amp; Philosophy
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-gray-900 leading-[1.1] mb-6">
            Celebrating the Golden Age of the American Freezer
          </h1>
          <p className="text-lg sm:text-xl font-serif text-gray-700 italic leading-relaxed border-l-4 border-[#0c5354] pl-4 sm:pl-6">
            The Freezies Awards were founded on a simple conviction: frozen food is no longer a guilty compromise—it is the front line of culinary innovation in American supermarkets.
          </p>
        </header>

        {/* Editorial Photo */}
        <div className="mb-12 rounded-xl overflow-hidden shadow-lg border border-gray-200">
          <img
            src="/images/freezies/about-editorial-board.jpg"
            alt="The Freezies culinary tasting board and editorial team"
            className="w-full aspect-[16/9] object-cover"
          />
          <div className="p-3 bg-white text-[11.5px] text-gray-500 italic text-right border-t border-gray-100">
            The Freezies Culinary Board: Over 60 collective years of food journalism, restaurant cooking, and sensory analysis.
          </div>
        </div>

        {/* Story & Philosophy */}
        <article className="space-y-8 font-serif text-lg sm:text-[18.5px] text-gray-800 leading-relaxed">
          <section>
            <h2 className="font-sans text-2xl font-bold text-gray-900 mb-3 tracking-tight">
              Why The Freezies Exist
            </h2>
            <p>
              For decades, food awards ignored the freezer aisle. Media outlets celebrated fine dining tasting menus and boutique butcher shops, while millions of hardworking American families relied on the freezer for weeknight sanity, quick school breakfasts, and late-night comfort.
            </p>
            <p className="mt-4">
              The Freezies Awards were established to bring rigorous, Michelin-grade sensory evaluation to the foods everyday Americans actually purchase. From $3 breakfast burritos to $12 Italian family lasagna trays, we celebrate the brands and food scientists elevating grocery freezers.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-2xl font-bold text-gray-900 mb-3 tracking-tight">
              Our 100% Independence Pledge
            </h2>
            <p>
              Trust is the only currency that matters in food journalism. To protect our integrity:
            </p>
            <ul className="space-y-2 mt-4 text-base font-sans text-gray-700 list-disc pl-5">
              <li><strong>Zero Paid Placements:</strong> No brand can pay to be nominated, evaluated, or awarded a Freezie.</li>
              <li><strong>Anonymous Supermarket Sourcing:</strong> All products are purchased at retail prices from neighborhood supermarkets across the United States.</li>
              <li><strong>Blind Evaluations:</strong> Judges taste samples without knowledge of brand names, packaging design, or retail prices.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-sans text-2xl font-bold text-gray-900 mb-3 tracking-tight">
              How to Nominate a Product
            </h2>
            <p>
              Do you have a favorite regional frozen pizza, artisan ice cream, or grocery find that belongs on our radar for 2027? We review reader recommendations year-round.
            </p>
            <div className="mt-6 font-sans">
              <Link
                href="/freezies/contact"
                className="inline-block px-6 py-3 bg-[#0c5354] text-white font-bold text-xs uppercase tracking-wider rounded hover:bg-[#083c3d] transition-colors"
              >
                Submit a Freezer Nomination →
              </Link>
            </div>
          </section>
        </article>

        {/* Bottom Nav */}
        <div className="mt-14 pt-8 border-t border-gray-200 flex items-center justify-between">
          <Link href="/freezies" className="text-xs font-bold text-[#0c5354] uppercase tracking-wider hover:underline">
            ← Back to Freezies Hub
          </Link>
          <Link href="/freezies/contact" className="text-xs font-bold text-[#0c5354] uppercase tracking-wider hover:underline">
            Contact &amp; Press Inquiries →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
