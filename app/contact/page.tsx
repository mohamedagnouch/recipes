"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "editorial",
    subject: "",
    message: "",
    consent: false,
  });
  // Honeypot: hidden field — bots fill it in, humans don't see it
  const [honeypot, setHoneypot] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation (server re-validates too)
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setErrorMessage("Please enter your full name (at least 2 characters).");
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!formData.subject.trim() || formData.subject.trim().length < 5) {
      setErrorMessage("Please enter a subject (at least 5 characters).");
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 20) {
      setErrorMessage("Please enter a message (at least 20 characters).");
      return;
    }
    if (!formData.consent) {
      setErrorMessage("Please agree to the privacy policy to submit your message.");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, website: honeypot }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          setErrorMessage("Too many submissions. Please wait a few minutes before trying again.");
        } else if (data?.error) {
          setErrorMessage(data.error);
        } else {
          setErrorMessage("Something went wrong. Please try again shortly.");
        }
        setIsSubmitting(false);
        return;
      }

      setTicketId(data.ticketId ?? "");
      setSubmitted(true);
      setFormData({ name: "", email: "", category: "editorial", subject: "", message: "", consent: false });
      setHoneypot("");
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqList = [
    {
      q: "Can I submit a recipe to Dishora?",
      a: "Yes! We welcome original recipe pitches from home cooks and professional recipe developers. Please review our Careers & Freelance page for submission requirements.",
    },
    {
      q: "How do I report a mistake or typo in a recipe?",
      a: "Please select 'Recipe Correction / Typo' in the contact form below and include the exact recipe URL and ingredient/step in question. Our editorial team reviews corrections promptly.",
    },
    {
      q: "How do I inquire about advertising or brand partnerships?",
      a: "Select 'Advertising & Partnerships' below or visit our dedicated Advertise page to request our current Media Kit and campaign options.",
    },
    {
      q: "How do I unsubscribe from the newsletter?",
      a: "Every email newsletter sent by Dishora contains an instant one-click 'Unsubscribe' link in the footer.",
    },
  ];

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
            Contact Us
          </li>
        </ol>
      </nav>

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#f3f9f8] to-white border-b border-gray-200/80 py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-black tracking-widest text-[#009b72] uppercase mb-2 block">
            WE WOULD LOVE TO HEAR FROM YOU
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Contact Dishora
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Have a question about a recipe, feedback for our editorial team, or a partnership inquiry? Our team is here to help.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-[1140px] w-full mx-auto px-4 sm:px-6 py-12 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-gray-200 shadow-xs">
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">
              Send Us a Message
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mb-6">
              Fill out the form below and we will direct your note to the appropriate department.
            </p>

            {submitted ? (
              <div className="p-8 bg-[#f0f9f7] border border-[#86d0c2] rounded-2xl text-center space-y-3 animate-fadeIn">
                <div className="w-14 h-14 bg-[#0c5354] text-white text-3xl rounded-full flex items-center justify-center mx-auto mb-2">
                  ✓
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#0c5354]">
                  Message Sent Successfully!
                </h3>
                <p className="text-sm text-gray-700 max-w-md mx-auto">
                  Thank you for reaching out. Your message has been received with Reference ID:{" "}
                  <strong className="font-mono text-gray-900 bg-white px-2 py-0.5 rounded border border-gray-200">
                    {ticketId}
                  </strong>.
                </p>
                <p className="text-xs text-gray-500">
                  Our editorial and support team typically replies within 1–2 business days.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-5 py-2.5 bg-[#0c5354] hover:bg-[#093f40] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot — hidden from real users, traps bots */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  autoComplete="off"
                  tabIndex={-1}
                  aria-hidden="true"
                  style={{ display: "none" }}
                />
                {errorMessage && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold text-gray-700 mb-1">
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      maxLength={100}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Alex Morgan"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#0c5354] focus:ring-1 focus:ring-[#0c5354]"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      maxLength={320}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#0c5354] focus:ring-1 focus:ring-[#0c5354]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="category" className="block text-xs font-bold text-gray-700 mb-1">
                      Inquiry Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#0c5354] focus:ring-1 focus:ring-[#0c5354] bg-white"
                    >
                      <option value="editorial">Recipe Question / Feedback</option>
                      <option value="correction">Recipe Correction / Typo Report</option>
                      <option value="advertising">Advertising &amp; Partnerships</option>
                      <option value="press">Press &amp; Media Inquiry</option>
                      <option value="privacy">Privacy &amp; Data Request</option>
                      <option value="general">General Support</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-xs font-bold text-gray-700 mb-1">
                      Subject Line <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="subject"
                      type="text"
                      required
                      maxLength={200}
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g., Question about Lemon Spaghetti"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#0c5354] focus:ring-1 focus:ring-[#0c5354]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-gray-700 mb-1">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    maxLength={3000}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we help? Please include recipe links or specific details if applicable..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#0c5354] focus:ring-1 focus:ring-[#0c5354]"
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    id="consent"
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-[#0c5354] focus:ring-[#0c5354]"
                  />
                  <label htmlFor="consent" className="text-xs text-gray-600 leading-snug">
                    I agree to the processing of my contact information in accordance with Dishora&apos;s{" "}
                    <Link href="/privacy-policy" className="text-[#0c5354] underline font-bold">
                      Privacy Policy
                    </Link>.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#0c5354] hover:bg-[#093f40] text-white font-bold text-sm rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? "Sending Message..." : "Send Message to Dishora →"}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct Department Directory & FAQ */}
          <div className="lg:col-span-5 space-y-6">
            {/* Department Directory */}
            <div className="p-6 rounded-3xl bg-[#f8fbfb] border border-[#d6ebe7] space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#0c5354]">
                Direct Contact Directory
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-gray-700">
                <li className="border-b border-gray-200/60 pb-2">
                  <span className="block font-bold text-gray-900">👩‍🍳 Editorial &amp; Recipe Corrections:</span>
                  <a href="mailto:recip9220@gmail.com" className="text-[#0c5354] font-medium hover:underline">recip9220@gmail.com</a>
                </li>
                <li className="border-b border-gray-200/60 pb-2">
                  <span className="block font-bold text-gray-900">💼 Brand Partnerships &amp; Advertising:</span>
                  <a href="mailto:recip9220@gmail.com" className="text-[#0c5354] font-medium hover:underline">recip9220@gmail.com</a>
                </li>
                <li className="border-b border-gray-200/60 pb-2">
                  <span className="block font-bold text-gray-900">🔒 Privacy, Support &amp; Legal Desk:</span>
                  <a href="mailto:recip9220@gmail.com" className="text-[#0c5354] font-medium hover:underline">recip9220@gmail.com</a>
                </li>
                <li>
                  <span className="block font-bold text-gray-900">🌐 Official Website:</span>
                  <span className="text-gray-600 font-mono text-xs">https://dishora.net</span>
                </li>
              </ul>
            </div>

            {/* Quick FAQ Accordion */}
            <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs space-y-4">
              <h3 className="font-serif text-xl font-bold text-gray-900">
                Frequently Asked Questions
              </h3>
              <div className="space-y-3 divide-y divide-gray-100 text-xs sm:text-sm">
                {faqList.map((item, idx) => (
                  <div key={idx} className="pt-2.5 first:pt-0">
                    <p className="font-bold text-gray-900 mb-1">{item.q}</p>
                    <p className="text-gray-600 leading-relaxed text-xs">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
