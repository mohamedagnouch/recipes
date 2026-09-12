import React from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { freeziesCategories, freeziesProducts } from "../../data/freeziesData";

export const metadata = {
  title: "Meet the 2026 Freezies Winners: Official Awards Announcement",
  description: "Official announcement of the 2026 Freezies Awards winners across 10 categories, honoring the greatest supermarket frozen foods in America.",
};

export default function FreeziesAnnouncementPage() {
  const grandChampion = freeziesProducts.find((p) => p.isGrandChampion) || freeziesProducts[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7] text-gray-900">
      <Header />

      <main className="max-w-[920px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 font-bold mb-6 uppercase tracking-wider" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#0c5354]">Home</Link>
          <span>/</span>
          <Link href="/freezies" className="hover:text-[#0c5354]">The Freezies 2026</Link>
          <span>/</span>
          <span className="text-[#d97706]">Announcement</span>
        </nav>

        {/* Announcement Masthead */}
        <header className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 border border-amber-300 text-amber-900 text-xs font-black uppercase tracking-widest rounded-full mb-4">
            <span>🏆</span>
            <span>Official Press Announcement</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-gray-900 leading-[1.1] mb-6">
            Meet the 2026 Freezies Winners: The Golden Era of the American Freezer
          </h1>
          <p className="text-lg sm:text-xl font-serif text-gray-700 italic leading-relaxed border-l-4 border-[#0c5354] pl-4 sm:pl-6 my-6">
            After 8 months of blind taste tests, 380 supermarket products, and hundreds of kitchen appliance cycles, the editorial board is thrilled to unveil the definitive winners of the 2026 Freezies Awards.
          </p>
          <div className="flex items-center justify-between text-xs text-gray-500 py-3 border-y border-gray-200">
            <span>By The Freezies Culinary Board</span>
            <span>Published: September 8, 2026</span>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-12 rounded-xl overflow-hidden shadow-lg border border-gray-200">
          <img
            src="/images/freezies/freezies-hero-cinematic.jpg"
            alt="The Freezies 2026 Awards tasting kitchen banquet"
            className="w-full aspect-[16/9] object-cover"
          />
          <div className="p-3 bg-white text-[11.5px] text-gray-500 italic text-right border-t border-gray-100">
            The 2026 Freezies testing table: Over 380 products evaluated across 10 official categories.
          </div>
        </div>

        {/* Editorial Narrative */}
        <article className="space-y-8 font-serif text-lg sm:text-[19px] text-gray-800 leading-relaxed">
          <section>
            <h2 className="font-sans text-2xl font-bold text-gray-900 mb-3 tracking-tight">
              A Watershed Year for Frozen Convenience
            </h2>
            <p>
              In 2026, the American freezer case completed its historic transition. What was once viewed as an emergency backup plan for rushed weeknights has become the single most dynamic incubator of culinary innovation in modern supermarkets.
            </p>
            <p className="mt-4">
              Driven by advances in rapid flash-freezing technology and chef-led consumer packaged goods, frozen foods now offer textures, aromatic herbs, and complex culinary techniques that consistently rival or surpass takeout meals.
            </p>
          </section>

          {/* Grand Champion Spotlight Banner */}
          <div className="my-10 p-6 sm:p-8 bg-gradient-to-br from-[#092c2d] to-[#0c5354] text-white rounded-xl shadow-xl font-sans">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400 block mb-2">
              The 2026 Grand Champion
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
              {grandChampion.name}
            </h3>
            <div className="text-sm text-gray-300 font-semibold mb-4">
              {grandChampion.brand} • Overall Score: {grandChampion.overallScore}/100
            </div>
            <p className="text-sm text-gray-200 leading-relaxed mb-6 font-serif">
              &ldquo;{grandChampion.shortVerdict}&rdquo;
            </p>
            <Link
              href={`/freezies/winners/${grandChampion.slug}`}
              className="inline-block px-6 py-2.5 bg-amber-500 text-gray-900 font-bold text-xs uppercase tracking-wider rounded hover:bg-amber-400 transition-colors"
            >
              Read Grand Champion Scorecard →
            </Link>
          </div>

          <section>
            <h2 className="font-sans text-2xl font-bold text-gray-900 mb-3 tracking-tight">
              Highlights by Category
            </h2>
            <p>
              From Detroit-style deep-dish pizzas with caramelized cheese rims to French custard honeycomb ice creams, our category winners represent the absolute peak of American grocery freezer aisles:
            </p>
          </section>
        </article>

        {/* Winners Gallery Table */}
        <div className="my-10 space-y-4">
          {freeziesProducts.map((p) => (
            <div
              key={p.id}
              className="p-4 sm:p-5 bg-white border border-gray-200 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#0c5354] transition-colors shadow-2xs"
            >
              <div className="flex items-center gap-4">
                <img
                  src={p.imageUrl}
                  alt={p.imageAlt}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md flex-shrink-0"
                />
                <div>
                  <span className="text-[10.5px] font-black uppercase tracking-wider text-[#d97706] block mb-0.5">
                    {p.awardTitle}
                  </span>
                  <Link
                    href={`/freezies/winners/${p.slug}`}
                    className="font-serif font-bold text-gray-900 text-base sm:text-lg hover:text-[#0c5354] transition-colors line-clamp-1"
                  >
                    {p.name}
                  </Link>
                  <span className="text-xs text-gray-500">{p.brand} • {p.price}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-gray-100">
                <span className="text-sm font-black text-gray-900">Score: {p.overallScore}</span>
                <Link
                  href={`/freezies/winners/${p.slug}`}
                  className="px-3.5 py-1.5 bg-[#0c5354] text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-[#083c3d] transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/freezies" className="text-xs font-bold text-[#0c5354] uppercase tracking-wider hover:underline">
            ← Back to Freezies Hub
          </Link>
          <Link href="/freezies/methodology" className="text-xs font-bold text-[#0c5354] uppercase tracking-wider hover:underline">
            Explore 100-Point Methodology →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
