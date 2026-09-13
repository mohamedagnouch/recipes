import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

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
  description: "Dishora offers over 3,600 triple-tested recipes, grocery news, and foolproof cooking guides for home cooks in the US and Canada.",
  icons: {
    icon: "/images/dishora-logo.png",
    apple: "/images/dishora-logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dishora.net",
    siteName: "Dishora",
    title: "Dishora — Easy Recipes, Kitchen Guides & Food News",
    description: "Triple-tested recipes, grocery news, and foolproof cooking guides for home cooks.",
    images: [{ url: "/images/cheeseburger-pie.jpg", width: 1200, height: 630, alt: "Dishora Home Cooking" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dishora — Easy Recipes, Kitchen Guides & Food News",
    description: "Triple-tested recipes, grocery news, and foolproof cooking guides.",
    images: ["/images/cheeseburger-pie.jpg"],
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
        {children}
      </body>
    </html>
  );
}
