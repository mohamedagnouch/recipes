/**
 * security.ts — Dishora Security Utilities
 *
 * Shared helpers used by middleware.ts and API routes.
 * Compatible with both Node.js Runtime and Vercel Edge Runtime.
 *
 * ─── RATE LIMITER LIMITATION ────────────────────────────────────────────────
 * The rate limiter below uses a module-level Map (in-memory, per-process).
 * On Vercel Edge, each Edge Worker instance is isolated — state is NOT shared
 * between instances or across regions. This means:
 *   - A bot sending 10 req/s across 3 edge workers sees 10/3 req per worker
 *   - The rate limiter provides soft protection against unsophisticated bots
 *   - It is NOT a distributed rate limiter and should NOT be treated as one
 *   - It is designed fail-open: if anything goes wrong, requests are allowed
 *
 * For distributed rate limiting, use Upstash Redis with @upstash/ratelimit.
 * ─────────────────────────────────────────────────────────────────────────────
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
 * Returns the security headers to inject on every middleware response.
 * Must stay in sync with the CSP defined in next.config.ts.
 *
 * NOTE: next.config.ts is the authoritative source for headers on page routes.
 * This function is used by middleware only for headers on API/dynamic responses
 * where next.config.ts headers() may not fire (e.g., 403/429 error responses).
 */
export function getSecurityHeaders(): Record<string, string> {
  return {
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
    "X-DNS-Prefetch-Control": "on",
    // CSP — matches next.config.ts exactly
    "Content-Security-Policy": [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
      "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com",
      "font-src 'self' fonts.gstatic.com",
      "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://vitals.vercel-insights.com",
      "frame-src 'none'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  };
}
