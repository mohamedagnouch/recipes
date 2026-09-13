/**
 * proxy.ts — Dishora Security Proxy
 *
 * Runs at the Vercel Edge Network before every request reaches the Next.js app.
 * This is the Next.js 16 equivalent of the deprecated middleware.ts.
 *
 * What it does:
 *   1. Skips immediately for static assets (/_next/*, images, fonts)
 *   2. Allows all known legitimate crawlers (Googlebot, Bingbot, etc.) without rate limiting
 *   3. Blocks definitively malicious User-Agents (sql injection tools, scanners)
 *   4. Applies soft rate limiting to all other traffic
 *
 * ─── HONEST LIMITATIONS ────────────────────────────────────────────────────
 * Rate limiter: uses in-memory Map per Edge Worker instance.
 * On Vercel Edge, state is NOT shared across instances or regions.
 * This means a determined bot with multiple IPs or many concurrent requests
 * will not be reliably stopped by this alone. Treat this as a first layer,
 * not a complete defense. Add Cloudflare WAF or Upstash Redis for real
 * distributed protection.
 *
 * Bot blocking: based on User-Agent strings only. A bot that mimics
 * a real browser User-Agent will not be detected here.
 *
 * Design principle: fail-open. Any unexpected error lets the request through.
 * We must never block real users due to a proxy bug.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { NextRequest, NextResponse } from "next/server";
import {
  checkRateLimit,
  detectBot,
  getClientIp,
  getSecurityHeaders,
} from "./app/utils/security";

// ─── RATE LIMIT CONFIGURATION ────────────────────────────────────────────────
// These limits are intentionally generous for human browsing patterns.
// A real user does not hit /contact 10 times in 10 minutes.

const ROUTE_LIMITS: Array<{ prefix: string; limit: number; windowMs: number }> = [
  { prefix: "/api/",      limit: 20,  windowMs: 60_000 },        // 20/min
  { prefix: "/contact",   limit: 10,  windowMs: 10 * 60_000 },   // 10/10min
  { prefix: "/advertise", limit: 10,  windowMs: 10 * 60_000 },   // 10/10min
  { prefix: "/search",    limit: 60,  windowMs: 60_000 },         // 60/min
];
const DEFAULT_LIMIT = { limit: 200, windowMs: 60_000 };           // 200/min default

function shouldSkip(pathname: string): boolean {
  return (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/images/") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    /\.(png|jpe?g|webp|gif|svg|ico|woff2?|ttf|otf|eot|mp4|pdf)$/i.test(pathname)
  );
}

function getRouteLimit(pathname: string) {
  for (const route of ROUTE_LIMITS) {
    if (pathname.startsWith(route.prefix)) return route;
  }
  return DEFAULT_LIMIT;
}

// ─── PROXY FUNCTION ───────────────────────────────────────────────────────────

export function proxy(req: NextRequest) {
  try {
    const { pathname } = req.nextUrl;

    // 1. Skip static assets entirely — no cost, no false positives
    if (shouldSkip(pathname)) {
      return NextResponse.next();
    }

    const userAgent = req.headers.get("user-agent") ?? "";
    const ip = getClientIp(req.headers);
    const secHeaders = getSecurityHeaders();

    function withHeaders(res: NextResponse): NextResponse {
      for (const [key, value] of Object.entries(secHeaders)) {
        res.headers.set(key, value);
      }
      return res;
    }

    // 2. Bot detection
    const bot = detectBot(userAgent);

    // 2a. Legitimate crawlers — always allow immediately
    if (bot.isLegitimateBot) {
      return withHeaders(NextResponse.next());
    }

    // 2b. Confirmed malicious tools (SQLmap, Nikto, curl, Scrapy, headless, etc.)
    //     Score ≥ 85 to minimise false positives
    if (bot.score >= 85) {
      console.log(
        JSON.stringify({ t: "security", type: "block_bot", ip, path: pathname, reason: bot.reason, ts: new Date().toISOString() })
      );
      return new NextResponse("Forbidden", {
        status: 403,
        headers: { "Content-Type": "text/plain", "Cache-Control": "no-store" },
      });
    }

    // 3. Rate limiting — applied to all remaining traffic
    //    Suspicious (score 60-84) gets half the normal limit
    const routeLimit = getRouteLimit(pathname);
    const effectiveLimit =
      bot.score >= 60
        ? Math.max(1, Math.floor(routeLimit.limit / 2))
        : routeLimit.limit;

    const rl = checkRateLimit(
      `${ip}:${pathname.split("/")[1] ?? "root"}`,
      effectiveLimit,
      routeLimit.windowMs
    );

    if (!rl.allowed) {
      console.log(
        JSON.stringify({ t: "security", type: "rate_limit", ip, path: pathname, ts: new Date().toISOString() })
      );
      const retryAfter = Math.ceil((rl.resetAt - Date.now()) / 1000);
      return new NextResponse("Too Many Requests", {
        status: 429,
        headers: {
          "Content-Type": "text/plain",
          "Retry-After": String(retryAfter),
          "Cache-Control": "no-store",
        },
      });
    }

    // 4. Normal request — allow with security headers
    return withHeaders(NextResponse.next());
  } catch {
    // Fail-open: any unexpected error must never block a real user
    return NextResponse.next();
  }
}

// ─── MATCHER ──────────────────────────────────────────────────────────────────

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|images/).*)",
  ],
};
