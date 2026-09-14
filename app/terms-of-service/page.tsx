import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Dishora - User Agreement & Disclaimers",
  description:
    "Review the Terms of Service for Dishora. Learn about website usage, intellectual property, recipe disclaimers, and user responsibilities.",
  alternates: {
    canonical: "/terms-of-service",
  },
  openGraph: {
    title: "Terms of Service - Dishora",
    description: "Terms and conditions governing the access and use of the Dishora website.",
    url: "/terms-of-service",
    type: "website",
  },
};

export default function TermsOfServicePage() {
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
            Terms of Service
          </li>
        </ol>
      </nav>

      {/* Header */}
      <section className="bg-gradient-to-b from-[#f3f9f8] to-white border-b border-gray-200/80 py-10 sm:py-14 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-black tracking-widest text-[#009b72] uppercase mb-2 block">
            LEGAL AGREEMENT
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-3">
            Terms of Service
          </h1>
          <p className="text-sm text-gray-500">
            Effective Date: <strong className="text-gray-700">January 1, 2026</strong> • Last Updated: <strong className="text-gray-700">March 14, 2026</strong>
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-[900px] w-full mx-auto px-4 sm:px-6 py-12 flex-1 space-y-10 text-gray-800 text-sm sm:text-base leading-relaxed">

        {/* Section 1 */}
        <article className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using <strong>Dishora</strong> (the &ldquo;Website&rdquo;), operated by Dishora Digital Media (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;) and our <Link href="/privacy-policy" className="text-[#0c5354] font-bold underline">Privacy Policy</Link>. If you do not agree with any part of these Terms, you must discontinue your use of the Website immediately.
          </p>
        </article>

        {/* Section 2 */}
        <article className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
            2. Permitted Use &amp; Intellectual Property
          </h2>
          <p>
            All original text, written articles, recipe instructions, graphics, logos, layouts, and compilation content published on Dishora are the property of Dishora or its respective content licensors and are protected under applicable copyright, trademark, and intellectual property laws of the United States, Canada, and international conventions.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
            <li>
              You may view, download, and print individual recipe cards or articles solely for your personal, non-commercial home use.
            </li>
            <li>
              You may not systematically scrape, reproduce, republish, syndicate, redistribute, or sell any recipe, article, or photograph from this Website without prior written authorization from Dishora.
            </li>
            <li>
              Short quotations with explicit attribution and a direct clickable link back to the original article on Dishora are permitted under fair use principles.
            </li>
          </ul>
        </article>

        {/* Section 3 */}
        <article className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
            3. Recipe, Nutrition &amp; Health Disclaimer
          </h2>
          <p>
            The recipes, cooking guidance, food safety notes, and nutritional estimates on Dishora are published in good faith for general culinary inspiration and education:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
            <li>
              <strong>Food Safety &amp; Preparation:</strong> You are solely responsible for ensuring proper food safety protocols, including safe internal cooking temperatures (e.g., poultry cooked to 165&deg;F / 74&deg;C), clean food preparation surfaces, and safe food storage.
            </li>
            <li>
              <strong>Allergies &amp; Dietary Restrictions:</strong> You are responsible for inspecting ingredient labels for allergens (e.g., nuts, gluten, dairy, eggs, soy, shellfish). Dishora cannot guarantee that any recipe is allergen-free.
            </li>
            <li>
              <strong>Nutritional Information:</strong> Nutritional calculations provided on recipe cards are computer-generated approximations based on standard ingredient databases and should not be used as medical or specialized dietary advice.
            </li>
          </ul>
        </article>

        {/* Section 4 */}
        <article className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
            4. User Conduct, Submissions &amp; Comments
          </h2>
          <p>
            If you submit comments, reviews, feedback, or messages through our contact forms or community sections:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
            <li>
              You agree not to post content that is unlawful, defamatory, abusive, harassing, deceptive, infringing upon intellectual property rights, or containing malicious software or unsolicited commercial spam.
            </li>
            <li>
              We reserve the right, but have no obligation, to monitor, edit, or remove user comments at our sole discretion.
            </li>
            <li>
              By submitting feedback or recipe reviews, you grant Dishora a non-exclusive, royalty-free, perpetual license to display and publish that feedback on the Website.
            </li>
          </ul>
        </article>

        {/* Section 5 */}
        <article className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
            5. External Links &amp; Third-Party Services
          </h2>
          <p>
            Dishora may contain links to third-party websites, retailers, grocery providers, and advertisers. We do not control or endorse external websites and are not responsible for their privacy practices, terms, or content. Your interactions with third-party sites are governed solely by their respective terms.
          </p>
        </article>

        {/* Section 6 */}
        <article className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
            6. Advertising &amp; Affiliate Disclosure
          </h2>
          <p>
            In accordance with Federal Trade Commission (FTC) guidelines in the United States and Competition Bureau standards in Canada, Dishora discloses that this Website may display advertisements and affiliate links. We may earn a modest commission when readers purchase products through qualified links at no additional cost to you. All sponsored or affiliate content is clearly labeled in accordance with our <Link href="/editorial-guidelines" className="text-[#0c5354] font-bold underline">Editorial Guidelines</Link>.
          </p>
        </article>

        {/* Section 7 */}
        <article className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
            7. Disclaimer of Warranties &amp; Limitation of Liability
          </h2>
          <p>
            THE WEBSITE AND ALL CONTENT ARE PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMISSIBLE BY LAW, DISHORA AND ITS OPERATORS DISCLAIM ALL WARRANTIES, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          </p>
          <p>
            UNDER NO CIRCUMSTANCES SHALL DISHORA, ITS OWNERS, DIRECTORS, OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF OR INABILITY TO USE THIS WEBSITE OR ITS RECIPES.
          </p>
        </article>

        {/* Section 8 */}
        <article className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
            8. Governing Law &amp; Jurisdiction
          </h2>
          <p>
            These Terms of Service shall be governed by and construed in accordance with applicable laws, without giving effect to any conflict of law principles. Any legal action arising from these Terms shall be resolved in a court of competent jurisdiction.
          </p>
        </article>

        {/* Section 9 */}
        <article className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
            9. Changes to These Terms
          </h2>
          <p>
            We reserve the right to revise or update these Terms of Service at any time. Changes will take effect immediately upon posting to this page with an updated &ldquo;Last Updated&rdquo; date. Your continued use of Dishora following any modification constitutes your acceptance of the revised terms.
          </p>
        </article>

        {/* Section 10: Contact Information Box */}
        <div className="p-6 rounded-2xl bg-[#f8fbfb] border border-[#d6ebe7] space-y-2">
          <h3 className="font-serif text-lg font-bold text-[#0c5354]">10. Legal &amp; Business Inquiries</h3>
          <p className="text-sm text-gray-700">
            For questions regarding these Terms of Service or to submit a formal inquiry, please contact:
          </p>
          <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
            <li><strong>Publication:</strong> Dishora Digital Media</li>
            <li><strong>Website:</strong> <span className="font-mono text-xs">https://dishora.net</span></li>
            <li><strong>Email:</strong> <a href="mailto:recip9220@gmail.com" className="text-[#0c5354] underline font-bold hover:text-[#009b72]">recip9220@gmail.com</a></li>
            <li><strong>Online Form:</strong> <Link href="/contact" className="text-[#0c5354] underline font-bold">Dishora Contact Page</Link></li>
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  );
}
