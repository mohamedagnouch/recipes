import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Dishora - Data Protection & Cookie Notice",
  description:
    "Read Dishora's Privacy Policy. Learn how we collect, use, and protect your information, our use of cookies, and your privacy rights under US and Canadian laws.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy - Dishora",
    description: "Our commitment to data privacy, transparency, and consumer rights.",
    url: "/privacy-policy",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </li>
        </ol>
      </nav>

      {/* Header */}
      <section className="bg-gradient-to-b from-[#f3f9f8] to-white border-b border-gray-200/80 py-10 sm:py-14 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-black tracking-widest text-[#009b72] uppercase mb-2 block">
            DATA PROTECTION &amp; TRANSPARENCY
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-3">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500">
            Effective Date: <strong className="text-gray-700">[ENTER EFFECTIVE DATE, e.g., January 1, 2026]</strong> • Last Updated: <strong className="text-gray-700">[ENTER LAST UPDATED DATE]</strong>
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-[900px] w-full mx-auto px-4 sm:px-6 py-12 flex-1 space-y-10 text-gray-800 text-sm sm:text-base leading-relaxed">
        {/* Notice Box */}
        <div className="p-4 sm:p-5 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-950">
          <p className="font-bold mb-1">⚠️ Important Privacy &amp; Legal Notice</p>
          <p>
            This Privacy Policy provides a comprehensive template designed for a North American food publication. You must review and customize this document to reflect the specific analytics tools, advertising networks (e.g., Google AdSense), cookie consent banners, and legal entity details actively utilized by your website.
          </p>
        </div>

        {/* Section 1 */}
        <article className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
            1. Introduction &amp; Scope
          </h2>
          <p>
            <strong>Dishora</strong> (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), operated by <strong>[ENTER LEGAL BUSINESS NAME]</strong>, is committed to safeguarding your privacy. This Privacy Policy explains what information we collect when you visit our website at <strong>[ENTER WEBSITE URL, e.g., https://dishora.com]</strong>, how we use that information, how cookies are utilized, and what rights you hold as a visitor residing in the United States, Canada, or internationally.
          </p>
        </article>

        {/* Section 2 */}
        <article className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
            2. Information We Collect
          </h2>
          <p>We may collect information in two primary ways:</p>
          
          <div className="space-y-4 pt-1">
            <div className="p-4 bg-white rounded-xl border border-gray-200/80">
              <h3 className="font-bold text-gray-900 mb-1">A. Information You Voluntarily Provide</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
                <li><strong>Newsletter Subscriptions:</strong> Your email address when you voluntarily sign up for our daily/weekly recipe newsletter.</li>
                <li><strong>Contact Inquiries:</strong> Your name, email address, inquiry subject, and message content when submitting a message via our <Link href="/contact" className="text-[#0c5354] underline">Contact Form</Link>.</li>
                <li><strong>Comments &amp; Recipe Reviews:</strong> Name/handle, optional website URL, and comment text when interacting on articles.</li>
              </ul>
            </div>

            <div className="p-4 bg-white rounded-xl border border-gray-200/80">
              <h3 className="font-bold text-gray-900 mb-1">B. Information Collected Automatically</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
                <li><strong>Device &amp; Browser Information:</strong> Browser type, operating system, referring URL, device model, and screen resolution.</li>
                <li><strong>Log Data &amp; IP Addresses:</strong> Internet Protocol (IP) addresses, access dates and times, and pages visited for security and server diagnostics.</li>
                <li><strong>Saved Recipe Preferences:</strong> Recipes saved via the heart icon (stored locally on your device via standard browser localStorage).</li>
              </ul>
            </div>
          </div>
        </article>

        {/* Section 3 */}
        <article className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
            3. How We Use Your Information
          </h2>
          <p>We use the collected information for legitimate publishing purposes:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
            <li>To deliver, maintain, and optimize our recipes, articles, and website performance.</li>
            <li>To send editorial newsletters and updates you have explicitly requested (with instant one-click unsubscribe links in every email).</li>
            <li>To respond to your reader questions, feedback, and customer support requests.</li>
            <li>To monitor website security, prevent fraudulent activity, and ensure compliance with our Terms of Service.</li>
            <li>To serve relevant display advertisements through advertising partners (such as Google AdSense).</li>
          </ul>
        </article>

        {/* Section 4 */}
        <article className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
            4. Cookies, Tracking Technologies &amp; Advertising
          </h2>
          <p>
            Cookies are small text files placed on your browser. Dishora and our third-party service providers use cookies to remember preferences, analyze website traffic, and serve advertisements:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
            <li><strong>Essential Cookies:</strong> Necessary for basic website security and navigation.</li>
            <li><strong>Analytics Cookies:</strong> Provided by services like <strong>[ENTER ANALYTICS PROVIDER, e.g., Google Analytics 4]</strong> to understand aggregated visitor trends without identifying individual users.</li>
            <li><strong>Advertising Cookies &amp; Google AdSense:</strong> Third-party vendors, including Google, use cookies to serve ads based on prior visits to this website or other websites. Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on their visit to our sites and/or other sites on the Internet.</li>
          </ul>
          <p className="pt-2">
            <strong>Managing &amp; Opting Out of Cookies:</strong> You can choose to disable cookies through your browser settings. You may also opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-[#0c5354] underline font-bold">Google Ads Settings</a>, <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-[#0c5354] underline font-bold">AboutAds.info</a>, or the <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-[#0c5354] underline font-bold">Network Advertising Initiative</a>.
          </p>
        </article>

        {/* Section 5 */}
        <article className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
            5. User Privacy Rights (US &amp; Canada)
          </h2>
          
          <div className="space-y-3 text-gray-700">
            <h3 className="font-bold text-gray-900">California Consumer Privacy Act (CCPA / CPRA)</h3>
            <p>
              If you are a California resident, you have the right to request information regarding the categories of personal data collected, request deletion of your personal data, and opt-out of the sale or sharing of personal information. Dishora does not sell personal information for monetary consideration.
            </p>

            <h3 className="font-bold text-gray-900 pt-2">Canadian Residents (PIPEDA)</h3>
            <p>
              Under the Personal Information Protection and Electronic Documents Act (PIPEDA), Canadian visitors have the right to access personal information held by us, challenge its accuracy, and withdraw consent to data collection where applicable.
            </p>

            <h3 className="font-bold text-gray-900 pt-2">How to Exercise Your Rights</h3>
            <p>
              To submit a data access, correction, or deletion request, please email our privacy desk at <a href="mailto:[ENTER PRIVACY EMAIL]" className="text-[#0c5354] font-bold underline">[ENTER PRIVACY EMAIL, e.g., privacy@dishora.com]</a>. We will process your verified request in accordance with applicable law.
            </p>
          </div>
        </article>

        {/* Section 6 */}
        <article className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
            6. Children&apos;s Online Privacy (COPPA)
          </h2>
          <p>
            Dishora is a general audience digital culinary publication and is not directed to children under the age of 13. We do not knowingly collect or solicit personal information from children under 13 in compliance with the Children&apos;s Online Privacy Protection Act (COPPA). If you believe a child has provided us with personal information, please contact us immediately.
          </p>
        </article>

        {/* Section 7 */}
        <article className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
            7. Data Security &amp; Retention
          </h2>
          <p>
            We implement standard technical and organizational security measures (including SSL/HTTPS encryption) to protect your information against unauthorized access, alteration, or disclosure. We retain personal data only for as long as necessary to fulfill the purposes outlined in this policy or to comply with legal obligations.
          </p>
        </article>

        {/* Section 8: Privacy Contact Details */}
        <div className="p-6 rounded-2xl bg-[#f8fbfb] border border-[#d6ebe7] space-y-2">
          <h3 className="font-serif text-lg font-bold text-[#0c5354]">8. Contact Our Privacy Officer</h3>
          <p className="text-sm text-gray-700">
            If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact:
          </p>
          <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
            <li><strong>Data Controller:</strong> [ENTER LEGAL BUSINESS NAME]</li>
            <li><strong>Attn:</strong> Privacy &amp; Data Protection Desk</li>
            <li><strong>Address:</strong> [ENTER BUSINESS ADDRESS, CITY, STATE/PROVINCE, COUNTRY]</li>
            <li><strong>Email:</strong> <a href="mailto:[ENTER PRIVACY EMAIL]" className="text-[#0c5354] underline font-bold">[ENTER PRIVACY EMAIL, e.g., privacy@dishora.com]</a></li>
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  );
}
