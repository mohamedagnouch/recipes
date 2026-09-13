/**
 * security.ts — Dishora Security Utilities
 * Shared security helpers for middleware and API routes.
 * Compatible with Next.js Edge Runtime and Node.js runtime.
 */

// ─── TYPES ─────────────────────────────────────────────────────────────────

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

export interface BotCheckResult {
  isBot: boolean;
  isLegitimateBot: boolean;
  score: number;
  reason: string;
}

// ─── IN-MEMORY RATE LIMITER ─────────────────────────────────────────────────
// Uses a sliding window algorithm. Works in Edge Runtime (no Redis needed).
// Note: resets on cold starts — for production scale, upgrade to Upstash Redis.

interface RateLimitEntry {
  count: number;
  windowStart: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up stale entries every 5 minutes to prevent memory leaks
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanupStore(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup > CLEANUP_INTERVAL_MS) {
    lastCleanup = now;
    for (const [key, entry] of rateLimitStore.entries()) {
      if (now - entry.windowStart > windowMs * 2) {
        rateLimitStore.delete(key);
      }
    }
  }
}

/**
 * Check and update rate limit for a given key (typically IP + route).
 * @param key      Unique identifier (e.g. "ip:route")
 * @param limit    Max requests allowed in the window
 * @param windowMs Time window in milliseconds
 */
export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  cleanupStore(windowMs);

  const now = Date.now();
  const entry = rateLimitStore.get(key);

  // New entry or expired window — reset
  if (!entry || now - entry.windowStart > windowMs) {
    rateLimitStore.set(key, { count: 1, windowStart: now });
    return { allowed: true, remaining: limit - 1, resetAt: now + windowMs };
  }

  // Within the window
  if (entry.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.windowStart + windowMs,
    };
  }

  entry.count++;
  return {
    allowed: true,
    remaining: limit - entry.count,
    resetAt: entry.windowStart + windowMs,
  };
}

// ─── LEGITIMATE CRAWLERS WHITELIST ─────────────────────────────────────────
// These are whitelisted and NEVER blocked. Essential for SEO.

const LEGITIMATE_BOT_PATTERNS: RegExp[] = [
  /Googlebot/i,
  /Google-InspectionTool/i,
  /Googlebot-Image/i,
  /Googlebot-Video/i,
  /Google-Extended/i,
  /AdsBot-Google/i,
  /Mediapartners-Google/i, // Google AdSense crawler — must never be blocked
  /Bingbot/i,
  /MicrosoftPreview/i,
  /DuckDuckBot/i,
  /Applebot/i,
  /Twitterbot/i,
  /LinkedInBot/i,
  /facebookexternalhit/i,
  /Slurp/i,              // Yahoo Search
  /ia_archiver/i,         // Internet Archive / Wayback Machine
  /Embedly/i,
  /WhatsApp/i,
  /Slack-ImgProxy/i,
  /GPTBot/i,              // OpenAI — remove this line if you want to block it
  /ClaudeBot/i,           // Anthropic — remove if you want to block it
];

// ─── MALICIOUS BOT PATTERNS ─────────────────────────────────────────────────
// Definite bad actors — score +80 or instant block

const MALICIOUS_BOT_PATTERNS: RegExp[] = [
  /curl\//i,
  /wget\//i,
  /python-requests/i,
  /python-urllib/i,
  /scrapy/i,
  /Scrapy/,
  /Go-http-client/i,
  /Java\//i,
  /libwww-perl/i,
  /LWP::/i,
  /PHP\//i,
  /masscan/i,
  /nikto/i,
  /sqlmap/i,
  /nmap/i,
  /zgrab/i,
  /semrushbot/i,
  /AhrefsBot/i,
  /MJ12bot/i,
  /DotBot/i,
  /SemrushBot/i,
  /DataForSeoBot/i,
  /BLEXBot/i,
  /serpstatbot/i,
];

// ─── SUSPICIOUS / HEADLESS PATTERNS ─────────────────────────────────────────
// Headless browsers and automation frameworks — score +50-70

const HEADLESS_PATTERNS: RegExp[] = [
  /HeadlessChrome/i,
  /PhantomJS/i,
  /Playwright/i,
  /Puppeteer/i,
  /Selenium/i,
  /WebDriver/i,
  /wkhtmltopdf/i,
  /htmlunit/i,
  /mechanize/i,
];

// ─── BOT DETECTION ───────────────────────────────────────────────────────────

/**
 * Analyse a User-Agent string and return a bot check result.
 * Score 0 = definitely human, 100 = definitely bot.
 */
export function detectBot(userAgent: string | null): BotCheckResult {
  // Empty UA is a strong bot signal
  if (!userAgent || userAgent.trim() === "") {
    return {
      isBot: true,
      isLegitimateBot: false,
      score: 85,
      reason: "empty_user_agent",
    };
  }

  // Check if it's a known legitimate crawler — always allow
  for (const pattern of LEGITIMATE_BOT_PATTERNS) {
    if (pattern.test(userAgent)) {
      return {
        isBot: true,
        isLegitimateBot: true,
        score: 0,
        reason: "legitimate_crawler",
      };
    }
  }

  // Check for definite malicious bots
  for (const pattern of MALICIOUS_BOT_PATTERNS) {
    if (pattern.test(userAgent)) {
      return {
        isBot: true,
        isLegitimateBot: false,
        score: 90,
        reason: "malicious_bot_ua",
      };
    }
  }

  // Check for headless browsers / automation
  for (const pattern of HEADLESS_PATTERNS) {
    if (pattern.test(userAgent)) {
      return {
        isBot: true,
        isLegitimateBot: false,
        score: 75,
        reason: "headless_browser",
      };
    }
  }

  // Generic "bot" or "crawler" in UA (not in legitimate list above)
  if (/\bbot\b/i.test(userAgent) || /\bcrawler\b/i.test(userAgent) || /\bspider\b/i.test(userAgent)) {
    return {
      isBot: true,
      isLegitimateBot: false,
      score: 65,
      reason: "generic_bot_ua",
    };
  }

  return {
    isBot: false,
    isLegitimateBot: false,
    score: 0,
    reason: "appears_human",
  };
}

// ─── INPUT SANITIZATION ──────────────────────────────────────────────────────

/**
 * Sanitize a string input against XSS and injection attacks.
 * For use in server-side form handlers.
 */
export function sanitizeInput(input: string, maxLength = 2000): string {
  return input
    .trim()
    .slice(0, maxLength)
    // Remove null bytes
    .replace(/\0/g, "")
    // Strip HTML tags
    .replace(/<[^>]*>/g, "")
    // Remove script-related patterns
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    // Normalize whitespace
    .replace(/\s+/g, " ");
}

/**
 * Validate an email address format.
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 320;
}

/**
 * Check if a string looks like a spam message.
 */
export function isSpamContent(text: string): boolean {
  const spamPatterns = [
    /\b(casino|poker|viagra|cialis|payday loan|crypto profit|investment opportunity)\b/i,
    /\b(click here|free money|earn \$|make money fast|work from home)\b/i,
    /(https?:\/\/[^\s]{4,}\s*){3,}/i, // 3+ URLs = spam
    /(.)\1{15,}/,                       // 15+ repeated characters
  ];
  return spamPatterns.some((p) => p.test(text));
}

// ─── IP UTILITIES ────────────────────────────────────────────────────────────

/**
 * Extract the real client IP from Next.js request headers.
 * Handles Vercel, Cloudflare, and direct connections.
 */
export function getClientIp(headers: Headers): string {
  return (
    headers.get("x-real-ip") ||
    headers.get("cf-connecting-ip") ||           // Cloudflare
    headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    "unknown"
  );
}

// ─── SECURITY HEADERS ────────────────────────────────────────────────────────

/**
 * Returns the full set of security headers to add to every response.
 * CSP is permissive enough for Google AdSense and Analytics.
 */
export function getSecurityHeaders(): Record<string, string> {
  return {
    // Prevent clickjacking
    "X-Frame-Options": "DENY",
    // Prevent MIME sniffing
    "X-Content-Type-Options": "nosniff",
    // Enforce HTTPS for 1 year, including subdomains
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
    // Control referrer information
    "Referrer-Policy": "strict-origin-when-cross-origin",
    // Restrict powerful browser features
    "Permissions-Policy":
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()",
    // Enable DNS prefetching for performance
    "X-DNS-Prefetch-Control": "on",
    // Remove X-Powered-By to avoid fingerprinting
    "X-Powered-By": "",
    // Content Security Policy — AdSense + Analytics compatible
    "Content-Security-Policy": [
      "default-src 'self'",
      // Scripts: self + Google ecosystem (Analytics, AdSense, Tag Manager)
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' fonts.googleapis.com *.googletagmanager.com *.googlesyndication.com *.google-analytics.com pagead2.googlesyndication.com adservice.google.com",
      // Styles: self + Google Fonts
      "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
      // Images: self + data URIs + Google domains
      "img-src 'self' data: blob: *.googleusercontent.com *.googlesyndication.com *.google.com *.gstatic.com",
      // Fonts: self + Google Fonts CDN
      "font-src 'self' fonts.gstatic.com",
      // Network requests: self + Analytics
      "connect-src 'self' *.google-analytics.com *.analytics.google.com *.googlesyndication.com *.doubleclick.net",
      // iFrames: AdSense + DoubleClick
      "frame-src 'self' *.googlesyndication.com *.doubleclick.net",
      // Prevent embedding in foreign frames
      "frame-ancestors 'none'",
      // Upgrade HTTP to HTTPS automatically
      "upgrade-insecure-requests",
    ].join("; "),
  };
}
