import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Editorial Guidelines | Dishora - Recipe Testing & Journalism Standards",
  description:
    "Learn about Dishora's rigorous recipe testing process, fact-checking policies, ethical standards, correction protocols, and commitment to original culinary content.",
  alternates: {
    canonical: "/editorial-guidelines",
  },
  openGraph: {
    title: "Editorial Guidelines - Dishora",
    description: "Our standards for original recipe testing, transparent food journalism, and reader trust.",
    url: "/editorial-guidelines",
    type: "website",
  },
};

export default function EditorialGuidelinesPage() {
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
            Editorial Guidelines
          </li>
        </ol>
      </nav>

      {/* Header */}
      <section className="bg-gradient-to-b from-[#f3f9f8] to-white border-b border-gray-200/80 py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-black tracking-widest text-[#009b72] uppercase mb-2 block">
            TRANSPARENCY &amp; TRUST
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Our Editorial Guidelines
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Trust is the most important ingredient in any kitchen. Here is how we research, test, fact-check, and publish every recipe and food news story on Dishora.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-[960px] w-full mx-auto px-4 sm:px-6 py-12 flex-1 space-y-12 text-gray-800 leading-relaxed">
        {/* Core Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-xs space-y-2">
            <span className="text-2xl">👩‍🍳</span>
            <h3 className="font-serif text-xl font-bold text-gray-900">1. Careful Recipe Development</h3>
            <p className="text-sm text-gray-600">
              Every recipe is developed with accessible grocery ingredients, clear instructions, and practical cooking guidance for reliable home kitchen results.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-xs space-y-2">
            <span className="text-2xl">🛡️</span>
            <h3 className="font-serif text-xl font-bold text-gray-900">2. Strict Originality Policy</h3>
            <p className="text-sm text-gray-600">
              We never scrape or copy recipes, articles, or text word-for-word. All content is conceived, written, and structured by our team.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-xs space-y-2">
            <span className="text-2xl">🔍</span>
            <h3 className="font-serif text-xl font-bold text-gray-900">3. Verified Primary Sources</h3>
            <p className="text-sm text-gray-600">
              Food news and consumer advisories cite official authorities such as the USDA, FDA, Health Canada, or direct company announcements.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-xs space-y-2">
            <span className="text-2xl">⚖️</span>
            <h3 className="font-serif text-xl font-bold text-gray-900">4. Transparent Disclosures</h3>
            <p className="text-sm text-gray-600">
              Commercial sponsorships, affiliate partnerships, and advertising units are clearly demarcated from independent editorial evaluations.
            </p>
          </div>
        </div>

        {/* Section 1: Recipe Development */}
        <article className="space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 border-b border-gray-200 pb-3">
            How Recipes Are Developed &amp; Verified
          </h2>
          <p className="text-base sm:text-[17px] text-gray-700">
            A recipe on Dishora goes through multiple evaluation steps before being scheduled for publication:
          </p>
          <ol className="list-decimal pl-6 space-y-3 text-gray-700 text-sm sm:text-base">
            <li>
              <strong>Concept &amp; Practicality Review:</strong> We ask: Is this dish achievable on a weeknight? Are the ingredients accessible at standard supermarkets in the US and Canada? Does it offer genuine culinary value?
            </li>
            <li>
              <strong>Practical Development:</strong> Recipes are crafted with precise cooking times, pan temperatures, ingredient ratios, and visual cues (e.g., &ldquo;golden brown with bubbly edges,&rdquo; rather than just &ldquo;bake for 20 mins&rdquo;).
            </li>
            <li>
              <strong>Clear Measurements:</strong> Ingredients list standard US volume measurements alongside weight equivalents where precision matters (e.g., baking recipes), with Celsius/Fahrenheit oven settings.
            </li>
            <li>
              <strong>Sensory &amp; Storage Notes:</strong> We provide real-world culinary notes on make-ahead options, freezer storage duration, and sensible substitutions (e.g., gluten-free or dairy-free adjustments).
            </li>
          </ol>
        </article>

        {/* Section 2: Food News & Journalism Standards */}
        <article className="space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 border-b border-gray-200 pb-3">
            Food News &amp; Fact-Checking Standards
          </h2>
          <p className="text-base sm:text-[17px] text-gray-700">
            Our news desk reports on grocery trends, consumer recalls, product rollouts, and culinary culture. We adhere to foundational journalistic principles:
          </p>
          <ul className="list-disc pl-6 space-y-2.5 text-gray-700 text-sm sm:text-base">
            <li>
              <strong>No Fake News or Speculation:</strong> We do not publish unverified rumors, fabricated stories, or invented quotes.
            </li>
            <li>
              <strong>Attribution:</strong> When reporting on industry announcements, restaurant trends, or corporate earnings, we explicitly link to and cite primary press releases, government bulletins, or interview recordings.
            </li>
            <li>
              <strong>Headline Accuracy:</strong> We strictly avoid deceptive clickbait headlines. Headlines must accurately reflect the facts presented within the article.
            </li>
            <li>
              <strong>Date Transparency:</strong> All news stories feature clear, visible publication dates and update stamps so readers know the timeliness of the reporting.
            </li>
          </ul>
        </article>

        {/* Section 3: Corrections & Update Policy */}
        <article className="space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 border-b border-gray-200 pb-3">
            Corrections &amp; Article Updates
          </h2>
          <p className="text-base sm:text-[17px] text-gray-700">
            We are committed to swift transparency whenever an error occurs:
          </p>
          <div className="bg-[#fcf7ed] p-5 rounded-xl border border-[#eedab4] space-y-2 text-sm text-gray-800">
            <p>
              <strong>Factual or Typographical Errors:</strong> If a typographical error in an ingredient measurement, baking temperature, or factual detail is identified, our editorial staff updates the article immediately.
            </p>
            <p>
              <strong>Substantive Corrections:</strong> Significant updates or clarifications are marked with a visible correction notice detailing what was changed and when.
            </p>
          </div>
        </article>

        {/* Section 4: Advertising, Sponsorships & Affiliate Disclosure */}
        <article className="space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 border-b border-gray-200 pb-3">
            Advertising, Sponsorships &amp; Product Reviews
          </h2>
          <p className="text-base sm:text-[17px] text-gray-700">
            To keep Dishora free for readers, we accept display advertising and participate in affiliate marketing programs:
          </p>
          <ul className="list-disc pl-6 space-y-2.5 text-gray-700 text-sm sm:text-base">
            <li>
              <strong>Editorial Independence:</strong> Advertisers and sponsors have no influence over our recipe guides, culinary evaluations, or news coverage.
            </li>
            <li>
              <strong>Prominent Labeling:</strong> Any sponsored post, paid brand integration, or custom feature is prominently labeled as &ldquo;Sponsored&rdquo; or &ldquo;Partner Content&rdquo; at the top of the page.
            </li>
            <li>
              <strong>Affiliate Links:</strong> When we recommend a specific tool (such as a chef&apos;s knife or cast-iron skillet), we may include affiliate links. If you purchase through these links, we may earn a small commission at zero added cost to you. We only recommend products we believe provide genuine utility.
            </li>
          </ul>
        </article>

        {/* Section 5: Report an Error or Suggest a Topic */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#f8fbfb] border border-[#d6ebe7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <h3 className="font-serif text-xl font-bold text-[#0c5354]">
              Spotted an error or have a recipe suggestion?
            </h3>
            <p className="text-sm text-gray-600 max-w-xl">
              Our editorial desk welcomes feedback, recipe questions, and correction requests from our community.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-2.5 bg-[#0c5354] hover:bg-[#083b3c] text-white text-xs font-bold rounded-lg transition-colors whitespace-nowrap shadow-xs"
          >
            Submit Editorial Feedback →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
