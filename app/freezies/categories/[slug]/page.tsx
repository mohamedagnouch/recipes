import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import {
  freeziesCategories,
  freeziesProducts,
  FreeziesCategory,
  FreeziesProduct
} from "../../../data/freeziesData";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return freeziesCategories.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const cat = freeziesCategories.find((c) => c.slug === slug);
  if (!cat) return { title: "Category Not Found" };

  return {
    title: `${cat.title} - The 2026 Freezies Awards`,
    description: cat.editorialIntro,
    openGraph: {
      title: `${cat.title} - The 2026 Freezies Awards`,
      description: cat.tagline,
      images: [{ url: cat.heroImage }],
    },
  };
}

export default async function FreeziesCategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = freeziesCategories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  // Get all products in this category or relevant products
  const categoryProducts = freeziesProducts.filter(
    (p) => p.categorySlug === category.slug
  );

  // Fallback if small product pool
  const relatedProducts = freeziesProducts
    .filter((p) => p.categorySlug !== category.slug)
    .slice(0, 3);

  const winner = categoryProducts[0] || freeziesProducts[0];
  const runnerUps = categoryProducts.slice(1);

  // Schema.org structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: category.title,
    description: category.editorialIntro,
    url: `http://localhost:3000/freezies/categories/${category.slug}`,
    numberOfItems: categoryProducts.length,
    itemListElement: categoryProducts.map((prod, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: `${prod.brand} ${prod.name}`,
      url: `http://localhost:3000/freezies/winners/${prod.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen flex flex-col bg-[#fdfbf7] text-gray-900">
        <Header />

        <main className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-500 font-bold mb-6 uppercase tracking-wider" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#0c5354]">Home</Link>
            <span>/</span>
            <Link href="/freezies" className="hover:text-[#0c5354]">The Freezies</Link>
            <span>/</span>
            <span className="text-[#d97706]">{category.shortName}</span>
          </nav>

          {/* ── CATEGORY HERO (UNIQUE FOR EACH CATEGORY) ── */}
          <header className="relative rounded-2xl overflow-hidden mb-12 bg-[#092c2d] text-white shadow-xl">
            <img
              src={category.heroImage}
              alt={category.heroAlt}
              className="absolute inset-0 w-full h-full object-cover opacity-35 filter contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#092c2d] via-[#0c5354]/80 to-[#092c2d]/90" />
            <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-400 text-amber-300 text-xs font-black uppercase tracking-widest rounded-full mb-4">
                <span>{category.icon}</span>
                <span>The 2026 Freezies Category Guide</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl font-black text-white leading-tight mb-4">
                {category.title}
              </h1>
              <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-serif italic mb-6">
                &ldquo;{category.tagline}&rdquo;
              </p>

              {/* Testing Metrics Strip */}
              <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/20 text-xs text-gray-300 font-bold uppercase tracking-wider">
                <div>
                  <span className="text-white text-base font-black block">{category.testingStats.productsTested}</span>
                  <span>Products Tested</span>
                </div>
                <div>
                  <span className="text-white text-base font-black block">{category.testingStats.blindTasters}</span>
                  <span>Blind Tasters</span>
                </div>
                <div>
                  <span className="text-amber-400 text-base font-black block">{category.testingStats.topPickScore}/100</span>
                  <span>Top Winner Score</span>
                </div>
              </div>
            </div>
          </header>

          {/* ── EDITORIAL INTRODUCTION ── */}
          <section className="mb-14 bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-2xs">
            <h2 className="text-xs font-black uppercase tracking-widest text-[#d97706] mb-2">
              The State of {category.shortName} in 2026
            </h2>
            <p className="font-serif text-lg sm:text-xl text-gray-800 leading-relaxed">
              {category.editorialIntro}
            </p>
          </section>

          {/* ══════════════════════════════════════════════════════════
              LAYOUT PERSONALITY 1: RANKING / COMPARISON HEAVY (DINNERS, PIZZA, SUPERMARKET)
             ══════════════════════════════════════════════════════════ */}
          {(category.layoutType === "ranking" || category.layoutType === "pizza") && (
            <section className="mb-16">
              <div className="flex items-end justify-between border-b-2 border-gray-900 pb-3 mb-8">
                <div>
                  <span className="text-xs font-black text-[#d97706] uppercase tracking-wider block">Official Ranked Selections</span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
                    Category Winner &amp; Finalists
                  </h2>
                </div>
                <span className="text-xs font-bold text-gray-500">Ranked by Blind Tasting Score</span>
              </div>

              {/* Side-by-side Comparative Table */}
              <div className="overflow-x-auto mb-10 bg-white rounded-xl border border-gray-200 shadow-2xs">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-[11px] font-black uppercase tracking-wider text-gray-600">
                      <th className="p-4">Rank &amp; Brand</th>
                      <th className="p-4">Award Title</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Taste (/30)</th>
                      <th className="p-4">Texture (/20)</th>
                      <th className="p-4">Overall Score</th>
                      <th className="p-4 text-right">Review</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {categoryProducts.map((p, idx) => (
                      <tr key={p.id} className="hover:bg-amber-50/50 transition-colors">
                        <td className="p-4 font-bold text-gray-900 flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-black">
                            #{idx + 1}
                          </span>
                          <div>
                            <div className="font-serif text-base font-bold">{p.name}</div>
                            <span className="text-xs text-gray-500 font-normal">{p.brand}</span>
                          </div>
                        </td>
                        <td className="p-4 text-xs font-bold text-[#d97706] uppercase">{p.awardBadge}</td>
                        <td className="p-4 font-semibold text-gray-700">{p.price}</td>
                        <td className="p-4 font-bold text-gray-900">{p.scores.taste}/30</td>
                        <td className="p-4 font-bold text-gray-900">{p.scores.texture}/20</td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 bg-[#0c5354] text-white font-black text-xs rounded-full">
                            {p.overallScore}/100
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <Link href={`/freezies/winners/${p.slug}`} className="text-xs font-bold text-[#0c5354] hover:underline uppercase">
                            Read Scorecard →
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* ══════════════════════════════════════════════════════════
              LAYOUT PERSONALITY 2: HIGH-VISUAL SCOOP & TEXTURE (ICE CREAM, SNACKS)
             ══════════════════════════════════════════════════════════ */}
          {(category.layoutType === "visual" || category.layoutType === "new") && (
            <section className="mb-16">
              <div className="flex items-end justify-between border-b-2 border-gray-900 pb-3 mb-8">
                <div>
                  <span className="text-xs font-black text-[#d97706] uppercase tracking-wider block">Sensory Profile</span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
                    Artisan Flavor &amp; Texture Winners
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
                {categoryProducts.map((p) => (
                  <div key={p.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col">
                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                      <img src={p.imageUrl} alt={p.imageAlt} className="w-full h-full object-cover" />
                      <span className="absolute top-3 left-3 bg-[#d97706] text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                        Score: {p.overallScore}
                      </span>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{p.brand}</span>
                      <h3 className="font-serif text-2xl font-bold text-gray-900 mt-1 mb-2">{p.name}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed mb-4">{p.shortVerdict}</p>
                      <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-sm font-bold text-gray-900">{p.price}</span>
                        <Link href={`/freezies/winners/${p.slug}`} className="px-4 py-1.5 bg-[#0c5354] text-white text-xs font-bold uppercase rounded hover:bg-[#083c3d]">
                          Full Review
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ══════════════════════════════════════════════════════════
              LAYOUT PERSONALITY 3: VALUE / MACROS / BUDGET (BUDGET & HEALTHY)
             ══════════════════════════════════════════════════════════ */}
          {(category.layoutType === "budget" || category.layoutType === "healthy" || category.layoutType === "breakfast") && (
            <section className="mb-16">
              <div className="flex items-end justify-between border-b-2 border-gray-900 pb-3 mb-8">
                <div>
                  <span className="text-xs font-black text-[#d97706] uppercase tracking-wider block">Nutrition &amp; Value Breakdown</span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
                    Smart Grocery Selections
                  </h2>
                </div>
              </div>

              <div className="space-y-6 mb-10">
                {categoryProducts.map((p) => (
                  <div key={p.id} className="bg-white border-2 border-amber-200/80 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xs">
                    <img src={p.imageUrl} alt={p.imageAlt} className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg flex-shrink-0" />
                    <div className="flex-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#d97706]">{p.awardTitle}</span>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 mt-0.5 mb-1">{p.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{p.shortVerdict}</p>
                      <div className="flex flex-wrap items-center gap-3 text-xs">
                        <span className="bg-gray-100 px-2.5 py-1 rounded font-bold text-gray-800">💰 {p.price} ({p.pricePerServing})</span>
                        <span className="bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded font-bold">💪 {p.nutritionHighlights.protein}</span>
                        <span className="bg-blue-50 text-blue-800 px-2.5 py-1 rounded font-bold">🔥 {p.nutritionHighlights.calories}</span>
                      </div>
                    </div>
                    <div className="sm:border-l sm:border-gray-200 sm:pl-6 text-center sm:text-right w-full sm:w-auto">
                      <div className="text-2xl font-black text-[#0c5354] mb-2">{p.overallScore}/100</div>
                      <Link href={`/freezies/winners/${p.slug}`} className="inline-block px-4 py-2 bg-[#0c5354] text-white text-xs font-bold uppercase rounded hover:bg-[#083c3d] w-full sm:w-auto">
                        View Product
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── WHAT TO KNOW BEFORE YOU BUY ── */}
          <section className="mb-14 bg-[#fffdfa] border-l-4 border-[#d97706] p-6 sm:p-8 rounded-r-xl shadow-2xs">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>💡</span>
              <span>{category.buyersGuide.title}</span>
            </h2>
            <ul className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed font-sans">
              {category.buyersGuide.points.map((point, pIdx) => (
                <li key={pIdx} className="flex items-start gap-3">
                  <span className="text-[#d97706] font-bold text-lg leading-none mt-0.5">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── FAQ SECTION ── */}
          <section className="mb-14 p-6 sm:p-8 bg-white border border-gray-200 rounded-xl shadow-2xs">
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions: {category.shortName}
            </h2>
            <div className="space-y-4">
              {category.faq.map((f, fIdx) => (
                <div key={fIdx} className="p-4 bg-gray-50 border border-gray-200 rounded-md">
                  <h3 className="font-sans font-bold text-base text-gray-900 mb-1">
                    {f.question}
                  </h3>
                  <p className="font-sans text-sm text-gray-600 leading-relaxed">
                    {f.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── OTHER CATEGORIES TO EXPLORE ── */}
          <section className="mb-14 pt-8 border-t border-gray-200">
            <h2 className="font-serif text-xl font-bold text-gray-900 mb-6">
              Explore Other 2026 Freezies Categories
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {freeziesCategories
                .filter((c) => c.slug !== category.slug)
                .slice(0, 4)
                .map((other) => (
                  <Link
                    key={other.id}
                    href={`/freezies/categories/${other.slug}`}
                    className="p-4 bg-white border border-gray-200 rounded-lg hover:border-[#0c5354] transition-colors shadow-2xs flex flex-col items-start"
                  >
                    <span className="text-2xl mb-2">{other.icon}</span>
                    <span className="font-serif font-bold text-sm text-gray-900 hover:text-[#0c5354]">
                      {other.shortName}
                    </span>
                    <span className="text-[11px] text-gray-500 mt-1">
                      {other.testingStats.productsTested} tested
                    </span>
                  </Link>
                ))}
            </div>
          </section>

          {/* Bottom Back Button */}
          <div className="pt-6 border-t border-gray-200 text-center">
            <Link
              href="/freezies"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#0c5354] uppercase tracking-wider hover:underline"
            >
              <span>←</span>
              <span>Back to The Freezies Awards Hub</span>
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
