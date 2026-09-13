import type { NextConfig } from "next";

// ─── SECURITY HEADERS ────────────────────────────────────────────────────────
// These are applied at the HTTP response level via Next.js headers API.
// The middleware also sets them — this serves as a reliable fallback.

const CSP_DIRECTIVES = [
  "default-src 'self'",
  // Scripts: Google ecosystem (AdSense, Analytics, Tag Manager)
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' fonts.googleapis.com *.googletagmanager.com *.googlesyndication.com *.google-analytics.com pagead2.googlesyndication.com adservice.google.com",
  "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
  "img-src 'self' data: blob: *.googleusercontent.com *.googlesyndication.com *.google.com *.gstatic.com",
  "font-src 'self' fonts.gstatic.com",
  "connect-src 'self' *.google-analytics.com *.analytics.google.com *.googlesyndication.com *.doubleclick.net",
  "frame-src 'self' *.googlesyndication.com *.doubleclick.net",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const SECURITY_HEADERS = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()",
  },
  { key: "Content-Security-Policy", value: CSP_DIRECTIVES },
  // Remove server fingerprinting
  { key: "X-Powered-By", value: "" },
];

const nextConfig: NextConfig = {
  // ─── SECURITY HEADERS ──────────────────────────────────────────────────────
  async headers() {
    return [
      {
        // Apply to all routes
        source: "/(.*)",
        headers: SECURITY_HEADERS.filter((h) => h.value !== ""),
      },
    ];
  },

  // ─── IMAGE OPTIMIZATION ────────────────────────────────────────────────────
  images: {
    // Only allow images from trusted domains
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "**.gstatic.com",
      },
    ],
    // Disable SVG for security (XSS vector)
    dangerouslyAllowSVG: false,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // ─── PRODUCTION OPTIMIZATIONS ──────────────────────────────────────────────
  // Compress responses
  compress: true,

  // Prevent exposure of the Next.js version in response headers
  poweredByHeader: false,

  // ─── REDIRECTS ─────────────────────────────────────────────────────────────
  async redirects() {
    return [
      // Redirect trailing slashes for canonical URLs (SEO)
      {
        source: "/:path+/",
        destination: "/:path+",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
