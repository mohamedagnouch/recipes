import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dishora.net"),
  title: {
    default: "Dishora — Easy Recipes, Kitchen Guides & Food News",
    template: "%s | Dishora",
  },
  description: "Dishora offers step-by-step recipes, grocery news, and practical cooking guides for home cooks in the US and Canada.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/dishora-icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/dishora-icon.png", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dishora.net",
    siteName: "Dishora",
    title: "Dishora — Easy Recipes, Kitchen Guides & Food News",
    description: "Step-by-step recipes, grocery news, and practical cooking guides for home cooks.",
    images: [{ url: "/images/moroccan-couscous-seven-vegetables.jpg", width: 1200, height: 630, alt: "Authentic Moroccan Couscous with Seven Vegetables — Dishora" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dishora — Easy Recipes, Kitchen Guides & Food News",
    description: "Step-by-step recipes, grocery news, and practical cooking guides for home cooks.",
    images: ["/images/moroccan-couscous-seven-vegetables.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#fdfdfd] text-[#1a1a1a]">
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7Q76ZWW5F2"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7Q76ZWW5F2');
          `}
        </Script>

        {/* Schema.org WebSite & Organization structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://dishora.net/#organization",
                  "name": "Dishora",
                  "url": "https://dishora.net",
                  "logo": {
                    "@type": "ImageObject",
                    "@id": "https://dishora.net/#logo",
                    "url": "https://dishora.net/dishora-icon.png",
                    "caption": "Dishora",
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": "https://dishora.net/#website",
                  "url": "https://dishora.net",
                  "name": "Dishora",
                  "description": "Easy Recipes, Kitchen Guides & Food News",
                  "publisher": {
                    "@id": "https://dishora.net/#organization",
                  },
                  "potentialAction": [
                    {
                      "@type": "SearchAction",
                      "target": {
                        "@type": "EntryPoint",
                        "urlTemplate":
                          "https://dishora.net/search?q={search_term_string}",
                      },
                      "query-input": "required name=search_term_string",
                    },
                  ],
                },
              ],
            }),
          }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
