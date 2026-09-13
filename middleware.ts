/**
 * middleware.ts — Dishora Security Middleware
 *
 * Runs on every request at the Vercel Edge before hitting the Next.js app.
 * Provides: security headers, rate limiting, bot detection.
 *
 * Compatible with Next.js 16 Edge Runtime.
 */

import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, detectBot, getClientIp, getSecurityHeaders } from "./app/utils/security";

// ─── RATE LIMIT CONFIGURATION ────────────────────────────────────────────────

interface RouteLimit {
  limit: number;   // Max requests
  windowMs: number; // Window in milliseconds
}

const RATE_LIMITS: Record<string, RouteLimit> = {
  // Contact & advertise forms — strictest limits to prevent spam
  "/contact":   { limit: 5,   windowMs: 10 * 60 * 1000 }, // 5 req / 10 min
  "/advertise": { limit: 5,   windowMs: 10 * 60 * 1000 }, // 5 req / 10 min
  // Search endpoint — moderate limit
  "/search":    { limit: 30,  windowMs: 60 * 1000 },       // 30 req / min
  // API routes — tightest limits
  "/api/":      { limit: 15,  windowMs: 60 * 1000 },       // 15 req / min
  // Default for all other pages
  default:      { limit: 120, windowMs: 60 * 1000 },       // 120 req / min
};

// ─── PATHS TO SKIP ────────────────────────────────────────────────────────────
// Static assets, Next.js internals, and favicons skip all security checks.

function shouldSkip(pathname: string): boolean {
  return (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/images/") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".jpeg") ||
    pathname.endsWith(".webp") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".ico") ||
    pathname.endsWith(".woff") ||
    pathname.endsWith(".woff2") ||
    pathname.endsWith(".ttf")
  );
}

// ─── GET APPLICABLE RATE LIMIT ───────────────────────────────────────────────

function getRateLimit(pathname: string): RouteLimit {
  // Check specific routes first (longer strings first to be more specific)
  if (pathname.startsWith("/api/")) return RATE_LIMITS["/api/"];
  if (pathname.startsWith("/contact")) return RATE_LIMITS["/contact"];
  if (pathname.startsWith("/advertise")) return RATE_LIMITS["/advertise"];
  if (pathname.startsWith("/search")) return RATE_LIMITS["/search"];
  return RATE_LIMITS.default;
}

// ─── SECURITY LOG ─────────────────────────────────────────────────────────────

function logSecurityEvent(
  type: "block_bot" | "rate_limit" | "suspicious",
  ip: string,
  pathname: string,
  reason: string,
  userAgent: string
) {
  // In production, replace this with your logging service (e.g. Axiom, Logtail, Datadog)
  console.log(
    JSON.stringify({
      t: "security",
      type,
      ip,
      path: pathname,
      reason,
      ua: userAgent?.slice(0, 100) || "empty",
      ts: new Date().toISOString(),
    })
  );
}

// ─── MIDDLEWARE ───────────────────────────────────────────────────────────────

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Skip static assets — no processing needed
  if (shouldSkip(pathname)) {
    return NextResponse.next();
  }

  const ip = getClientIp(req.headers);
  const userAgent = req.headers.get("user-agent") || "";
  const secHeaders = getSecurityHeaders();

  // 2. Bot Detection
  const botCheck = detectBot(userAgent);

  if (botCheck.isLegitimateBot) {
    // Legitimate crawlers (Googlebot, Bingbot, etc.) — allow immediately with headers
    const res = NextResponse.next();
    for (const [key, value] of Object.entries(secHeaders)) {
      if (value) res.headers.set(key, value);
    }
    return res;
  }

  if (botCheck.isBot && !botCheck.isLegitimateBot && botCheck.score >= 80) {
    // Definite malicious bot — block outright
    logSecurityEvent("block_bot", ip, pathname, botCheck.reason, userAgent);
    return new NextResponse("Forbidden", {
      status: 403,
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "no-store",
        ...Object.fromEntries(
          Object.entries(secHeaders).filter(([, v]) => v !== "")
        ),
      },
    });
  }

  if (botCheck.isBot && botCheck.score >= 60 && botCheck.score < 80) {
    // Suspicious bot — apply very strict rate limit (5 req/min)
    logSecurityEvent("suspicious", ip, pathname, botCheck.reason, userAgent);
    const rl = checkRateLimit(`suspicious:${ip}`, 5, 60 * 1000);
    if (!rl.allowed) {
      return new NextResponse("Too Many Requests", {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)),
          "Cache-Control": "no-store",
        },
      });
    }
  }

  // 3. Rate Limiting for all other traffic (humans + mild suspicion)
  const routeLimit = getRateLimit(pathname);
  const rl = checkRateLimit(`${ip}:${pathname.split("/")[1] || "root"}`, routeLimit.limit, routeLimit.windowMs);

  if (!rl.allowed) {
    logSecurityEvent("rate_limit", ip, pathname, "rate_limit_exceeded", userAgent);
    return new NextResponse("Too Many Requests", {
      status: 429,
      headers: {
        "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)),
        "X-RateLimit-Limit": String(routeLimit.limit),
        "X-RateLimit-Remaining": "0",
        "Cache-Control": "no-store",
        "Content-Type": "text/plain",
      },
    });
  }

  // 4. Allow — add security headers to the response
  const res = NextResponse.next();

  for (const [key, value] of Object.entries(secHeaders)) {
    if (value) {
      res.headers.set(key, value);
    } else if (key === "X-Powered-By") {
      // Explicitly remove X-Powered-By
      res.headers.delete(key);
    }
  }

  // Add rate limit info headers for debugging (remove in prod if preferred)
  res.headers.set("X-RateLimit-Limit", String(routeLimit.limit));
  res.headers.set("X-RateLimit-Remaining", String(rl.remaining));

  return res;
}

// ─── MATCHER ──────────────────────────────────────────────────────────────────
// Apply middleware to all routes EXCEPT Next.js internals.

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, robots.txt, sitemap.xml
     * - images directory
     */
    "/((?!_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|images/).*)",
  ],
};
