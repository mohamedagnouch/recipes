import type { NextConfig } from "next";

// ─── CONTENT SECURITY POLICY ─────────────────────────────────────────────────
//
// Based on what this project ACTUALLY uses right now:
//   - Next.js App Router (inline styles for CSS-in-JS hydration)
//   - Google Fonts via next/font/google (loads from fonts.googleapis.com + fonts.gstatic.com)
//   - Images from /public/images (self-hosted)
//   - No Google Analytics yet
//   - No Google AdSense yet
//
// When AdSense or Analytics are added, extend the relevant directives.
// NOTE: unsafe-inline is required by Next.js for style injection during hydration.
// NOTE: unsafe-eval is NOT needed for Next.js 16 production builds.
//
const CSP_DIRECTIVES = [
  "default-src 'self'",
  // Next.js requires 'unsafe-inline' for inline scripts during hydration (App Router)
  "script-src 'self' 'unsafe-inline'",
  // next/font injects inline styles; Google Fonts CSS is fetched from googleapis.com
  "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
  // Self-hosted images + data URIs for favicons/thumbnails
  "img-src 'self' data: blob:",
  // Google Fonts font files are served from gstatic.com
  "font-src 'self' fonts.gstatic.com",
  // Only self for API calls (no third-party analytics yet)
  "connect-src 'self'",
  // No iframes needed — deny all
  "frame-src 'none'",
  // Prevent this site from being embedded in any iframe (modern browsers)
  // X-Frame-Options: DENY below handles the same for legacy browsers
  "frame-ancestors 'none'",
  // Auto-upgrade any accidental http:// links to https://
  "upgrade-insecure-requests",
].join("; ");

// ─── SECURITY HEADERS ────────────────────────────────────────────────────────
const SECURITY_HEADERS = [
  // Enable DNS prefetching for performance (safe)
  { key: "X-DNS-Prefetch-Control", value: "on" },
  // Enforce HTTPS for 1 year (only active once deployed on HTTPS)
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
  // Prevent embedding in iframes — legacy browser support (CSP frame-ancestors handles modern)
  { key: "X-Frame-Options", value: "DENY" },
  // Prevent MIME-type sniffing attacks
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Send origin only on cross-origin requests; full URL on same-origin
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable browser features we don't use
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  // Full CSP
  { key: "Content-Security-Policy", value: CSP_DIRECTIVES },
];

const nextConfig: NextConfig = {
  // ─── SECURITY HEADERS ──────────────────────────────────────────────────────
  // Applied on every route at the Next.js server level.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: SECURITY_HEADERS,
      },
    ];
  },

  // ─── IMAGE OPTIMIZATION ────────────────────────────────────────────────────
  images: {
    // All images are currently self-hosted. Add remote domains only when needed.
    remotePatterns: [],
    // SVG is disabled to prevent XSS via malicious SVG files
    dangerouslyAllowSVG: false,
    contentDispositionType: "attachment",
  },

  // ─── PERFORMANCE ───────────────────────────────────────────────────────────
  compress: true,
  // Already false by default in Next.js — explicit for clarity
  poweredByHeader: false,

  // ─── REDIRECTS ─────────────────────────────────────────────────────────────
  async redirects() {
    return [
      // Remove trailing slashes for canonical URLs (SEO hygiene)
      {
        source: "/:path+/",
        destination: "/:path+",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

