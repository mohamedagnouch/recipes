import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { foodNewsArticles } from "../../data/foodNewsData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return foodNewsArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = foodNewsArticles.find((a) => a.slug === slug);
  if (!article) return { title: "Article Not Found" };

  return {
    title: `${article.headline} - Dishora Food News`,
    description: article.deck,
    openGraph: {
      title: article.headline,
      description: article.deck,
      images: [{ url: article.imageUrl }],
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
    },
  };
}

export default async function FoodNewsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = foodNewsArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  // Related articles (same category or general news)
  const relatedArticles = foodNewsArticles
    .filter((a) => a.id !== article.id)
    .slice(0, 4);

  // Structured Data (NewsArticle or Recipe)
  const structuredData: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": article.isRecipe ? "Recipe" : "NewsArticle",
    headline: article.headline,
    description: article.deck,
    image: [`https://dishora.net${article.imageUrl}`],
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Person",
      name: article.author.replace("By ", ""),
    },
    publisher: {
      "@type": "Organization",
      name: "Dishora",
      logo: {
        "@type": "ImageObject",
        url: "https://dishora.net/images/dishora-logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://dishora.net/food-news/${article.slug}`,
    },
  };

  if (article.isRecipe && article.recipeDetails) {
    structuredData.prepTime = "PT" + article.recipeDetails.prepTime.replace(" mins", "M");
    structuredData.cookTime = "PT" + article.recipeDetails.cookTime.replace(" mins", "M").replace(" hrs", "H");
    structuredData.totalTime = "PT" + article.recipeDetails.totalTime.replace(" mins", "M").replace(" hrs", "H");
    structuredData.recipeYield = article.recipeDetails.servings;
    structuredData.recipeIngredient = article.recipeDetails.ingredients;
    structuredData.recipeInstructions = article.recipeDetails.instructions.map((step, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      text: step,
    }));
    structuredData.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: article.recipeDetails.rating,
      reviewCount: article.recipeDetails.ratingCount,
    };
    structuredData.nutrition = {
      "@type": "NutritionInformation",
      calories: article.recipeDetails.calories,
    };
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen flex flex-col bg-white text-gray-900 selection:bg-[#0c5354]/20 selection:text-[#0c5354]">
        <Header />

        <main className="max-w-[840px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-500 font-semibold mb-5" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#0c5354] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/food-news" className="hover:text-[#0c5354] transition-colors">Food News</Link>
            <span>/</span>
            <span className="text-[#0c5354] truncate">{article.category}</span>
          </nav>

          {/* Badges & Meta */}
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="text-xs font-black tracking-widest text-[#009b72] uppercase">
              {article.category}
            </span>
            <span className="text-gray-300">•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-800 text-xs font-bold">
              {article.countryBadge}
            </span>
            {article.breaking && (
              <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-wider">
                Breaking
              </span>
            )}
            {article.isRecipe && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#fdf2eb] text-[#ba4f1c] text-[10px] font-black uppercase tracking-wider border border-[#fbd5c3]">
                Popular Recipe
              </span>
            )}
          </div>

          {/* H1 Headline */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-gray-900 leading-[1.2] tracking-tight mb-4">
            {article.headline}
          </h1>

          {/* Deck / Introduction */}
          <p className="text-lg sm:text-xl font-serif text-gray-700 leading-relaxed italic mb-6">
            {article.deck}
          </p>

          {/* Byline & Dates */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-3.5 border-y border-gray-200 text-xs text-gray-600 mb-8">
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900">{article.author}</span>
              <span>•</span>
              <span>Published {article.date}</span>
              <span>•</span>
              <span>⏱ {article.readTime}</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#0c5354]">
              <span>Verified Reporting</span>
              <svg className="w-4 h-4 text-[#009b72]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8">
            <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-gray-100 shadow-xs mb-2">
              <img
                src={article.imageUrl}
                alt={article.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-[11.5px] text-gray-500 font-normal">
              Photo: Dishora Food News / Editorial Photography
            </div>
          </div>

          {/* Key Facts Box */}
          <div className="p-5 sm:p-6 bg-[#f8faf9] border-l-4 border-[#0c5354] rounded-r-md mb-10 shadow-2xs">
            <h2 className="text-xs font-black tracking-widest text-[#0c5354] uppercase mb-3 flex items-center gap-1.5">
              <span>📌</span>
              <span>Key Facts &amp; Highlights</span>
            </h2>
            <ul className="space-y-2 text-sm text-gray-800 leading-relaxed font-sans">
              {article.keyFacts.map((fact, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#009b72] font-bold">•</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Editorial Narrative */}
          <article className="space-y-8 text-[17px] sm:text-[18px] text-gray-800 leading-relaxed font-serif mb-12">
            <section>
              <h2 className="font-sans text-xl sm:text-2xl font-bold text-gray-900 mb-3 tracking-tight">
                What Happened
              </h2>
              <p>{article.content.whatHappened}</p>
            </section>

            <section>
              <h2 className="font-sans text-xl sm:text-2xl font-bold text-gray-900 mb-3 tracking-tight">
                Why It Matters
              </h2>
              <p>{article.content.whyItMatters}</p>
            </section>

            <section>
              <h2 className="font-sans text-xl sm:text-2xl font-bold text-gray-900 mb-3 tracking-tight">
                Who Is Affected
              </h2>
              <p>{article.content.whoIsAffected}</p>
            </section>

            <section>
              <h2 className="font-sans text-xl sm:text-2xl font-bold text-gray-900 mb-3 tracking-tight">
                What Readers Should Know
              </h2>
              <p>{article.content.whatReadersShouldKnow}</p>
            </section>
          </article>

          {/* ── DEDICATED RECIPE CARD (WHEN ARTICLE IS A RECIPE) ── */}
          {article.isRecipe && article.recipeDetails && (
            <div className="bg-[#fffdfa] border-2 border-[#ba4f1c]/30 rounded-xl p-6 sm:p-8 my-12 shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-200">
                <div>
                  <span className="text-xs font-black tracking-widest text-[#ba4f1c] uppercase">
                    Official Recipe Card
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                    {article.headline}
                  </h3>
                </div>
                <div className="flex items-center gap-1 text-amber-500 font-bold text-lg">
                  <span>★</span>
                  <span>{article.recipeDetails.rating.toFixed(1)}</span>
                  <span className="text-gray-400 text-xs font-normal">
                    ({article.recipeDetails.ratingCount} reviews)
                  </span>
                </div>
              </div>

              {/* Recipe Quick Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-gray-200 text-center font-sans">
                <div className="bg-white p-3 rounded-md border border-gray-100 shadow-2xs">
                  <span className="block text-[11px] uppercase font-bold text-gray-400">Prep Time</span>
                  <span className="text-sm font-bold text-gray-800">{article.recipeDetails.prepTime}</span>
                </div>
                <div className="bg-white p-3 rounded-md border border-gray-100 shadow-2xs">
                  <span className="block text-[11px] uppercase font-bold text-gray-400">Cook Time</span>
                  <span className="text-sm font-bold text-gray-800">{article.recipeDetails.cookTime}</span>
                </div>
                <div className="bg-white p-3 rounded-md border border-gray-100 shadow-2xs">
                  <span className="block text-[11px] uppercase font-bold text-gray-400">Servings</span>
                  <span className="text-sm font-bold text-gray-800">{article.recipeDetails.servings}</span>
                </div>
                <div className="bg-white p-3 rounded-md border border-gray-100 shadow-2xs">
                  <span className="block text-[11px] uppercase font-bold text-gray-400">Calories</span>
                  <span className="text-sm font-bold text-gray-800">{article.recipeDetails.calories}</span>
                </div>
              </div>

              {/* Ingredients List */}
              <div className="pt-6 pb-6 border-b border-gray-200">
                <h4 className="font-serif text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🛒</span>
                  <span>Ingredients</span>
                </h4>
                <ul className="space-y-2.5 font-sans text-sm text-gray-800">
                  {article.recipeDetails.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id={`ing-${i}`}
                        className="mt-1 accent-[#0c5354] w-4 h-4 rounded cursor-pointer"
                      />
                      <label htmlFor={`ing-${i}`} className="cursor-pointer leading-relaxed">
                        {ing}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Step-by-Step Instructions */}
              <div className="pt-6 pb-6 border-b border-gray-200">
                <h4 className="font-serif text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>👩‍🍳</span>
                  <span>Step-by-Step Instructions</span>
                </h4>
                <ol className="space-y-4 font-sans text-sm text-gray-800">
                  {article.recipeDetails.instructions.map((step, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-3.5">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0c5354] text-white text-xs font-bold flex items-center justify-center mt-0.5">
                        {sIdx + 1}
                      </span>
                      <p className="leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Chef's Notes */}
              {article.recipeDetails.notes && (
                <div className="pt-6">
                  <h4 className="font-serif text-base font-bold text-[#ba4f1c] mb-2 flex items-center gap-1.5">
                    <span>💡</span>
                    <span>Test Kitchen Chef&apos;s Tip</span>
                  </h4>
                  <p className="text-sm font-sans text-gray-700 leading-relaxed italic bg-white p-4 rounded-md border border-amber-200">
                    &ldquo;{article.recipeDetails.notes}&rdquo;
                  </p>
                </div>
              )}
            </div>
          )}

          {/* FAQ Section */}
          {article.faq && article.faq.length > 0 && (
            <section className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="font-sans text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {article.faq.map((item, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 border border-gray-200 rounded-md">
                    <h3 className="font-sans text-base font-bold text-gray-900 mb-1.5">
                      {item.question}
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed font-sans">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Official Sources & Verification Block */}
          <section className="mt-10 p-4 bg-white border border-gray-200 rounded-md text-xs text-gray-600">
            <div className="font-bold text-gray-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span>🏛</span>
              <span>Official Sources &amp; References</span>
            </div>
            <ul className="space-y-1 font-sans">
              {article.sources.map((src, idx) => (
                <li key={idx} className="flex items-center gap-1.5">
                  <span className="font-bold text-gray-800">{src.name}:</span>
                  <span>{src.detail}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Share & Feedback */}
          <div className="my-10 p-4 bg-gray-50 border border-gray-200 rounded-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-bold text-gray-700">Was this food news report helpful?</span>
            <div className="flex gap-2">
              <button className="px-3.5 py-1.5 bg-white border border-gray-300 rounded-md text-xs font-bold hover:bg-gray-100 cursor-pointer">
                👍 Yes
              </button>
              <button className="px-3.5 py-1.5 bg-white border border-gray-300 rounded-md text-xs font-bold hover:bg-gray-100 cursor-pointer">
                👎 No
              </button>
            </div>
          </div>
        </main>

        {/* Related News Stories Grid */}
        <section className="w-full bg-[#f8faf9] border-t border-gray-200 py-12 sm:py-16">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
              More From Food News &amp; Trends
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedArticles.map((rel) => (
                <article key={rel.id} className="bg-white border border-gray-200 rounded-md overflow-hidden flex flex-col group shadow-2xs hover:shadow-md transition-shadow">
                  <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
                    <img
                      src={rel.imageUrl}
                      alt={rel.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <span className="absolute top-2.5 left-2.5 bg-gray-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {rel.countryBadge}
                    </span>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#009b72] mb-1.5">
                      {rel.category}
                    </span>
                    <Link
                      href={`/food-news/${rel.slug}`}
                      className="font-serif font-bold text-gray-900 text-sm group-hover:text-[#0c5354] transition-colors line-clamp-2 leading-snug mb-2"
                    >
                      {rel.headline}
                    </Link>
                    <div className="mt-auto pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                      <span>{rel.date}</span>
                      <span>⏱ {rel.readTime}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
