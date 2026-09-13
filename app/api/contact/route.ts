/**
 * app/api/contact/route.ts — Secure Contact Form API Endpoint
 *
 * Replaces the client-side-only form submission with proper server-side
 * validation, rate limiting, spam detection, and input sanitization.
 *
 * To use: update the contact page to POST to /api/contact
 */

import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIp, isValidEmail, sanitizeInput, isSpamContent } from "../../utils/security";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 3;                       // Max 3 submissions per 10 minutes per IP

const ALLOWED_CATEGORIES = ["editorial", "recipe", "advertising", "technical", "partnership", "other"] as const;

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface ContactFormData {
  name: string;
  email: string;
  category: string;
  subject: string;
  message: string;
  consent: boolean;
  // Honeypot field — should always be empty for real users
  website?: string;
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function jsonError(message: string, status: number, details?: Record<string, string>) {
  return NextResponse.json(
    { success: false, error: message, ...(details && { details }) },
    { status }
  );
}

function generateTicketId(): string {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let id = "DSH-";
  for (let i = 0; i < 6; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

// ─── POST HANDLER ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);

  // 1. Rate limiting — 3 submissions per IP per 10 minutes
  const rl = checkRateLimit(`contact:${ip}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS);
  if (!rl.allowed) {
    console.log(JSON.stringify({
      t: "security",
      type: "rate_limit",
      action: "contact_form",
      ip,
      ts: new Date().toISOString(),
    }));
    return jsonError(
      "Too many requests. Please wait before submitting again.",
      429
    );
  }

  // 2. Parse body safely
  let body: ContactFormData;
  try {
    body = await req.json();
  } catch {
    return jsonError("Invalid request body.", 400);
  }

  // 3. Honeypot check — bots fill in the hidden `website` field, humans don't
  if (body.website && body.website.trim() !== "") {
    // Silently accept to not reveal to the bot that it was detected
    console.log(JSON.stringify({
      t: "security",
      type: "honeypot_triggered",
      ip,
      ts: new Date().toISOString(),
    }));
    // Return fake success to confuse the bot
    return NextResponse.json({
      success: true,
      ticketId: generateTicketId(),
    });
  }

  // 4. Validate required fields (server-side, not just client-side)
  const errors: Record<string, string> = {};

  const name = sanitizeInput(body.name || "", 100);
  const email = sanitizeInput(body.email || "", 320);
  const category = sanitizeInput(body.category || "", 50);
  const subject = sanitizeInput(body.subject || "", 200);
  const message = sanitizeInput(body.message || "", 5000);
  const consent = Boolean(body.consent);

  if (!name || name.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }
  if (!email || !isValidEmail(email)) {
    errors.email = "Please provide a valid email address.";
  }
  if (!ALLOWED_CATEGORIES.includes(category as typeof ALLOWED_CATEGORIES[number])) {
    errors.category = "Invalid category selected.";
  }
  if (!subject || subject.length < 5) {
    errors.subject = "Subject must be at least 5 characters.";
  }
  if (!message || message.length < 20) {
    errors.message = "Message must be at least 20 characters.";
  }
  if (!consent) {
    errors.consent = "You must agree to the privacy policy.";
  }

  if (Object.keys(errors).length > 0) {
    return jsonError("Validation failed.", 422, errors);
  }

  // 5. Spam detection
  if (isSpamContent(subject) || isSpamContent(message)) {
    console.log(JSON.stringify({
      t: "security",
      type: "spam_detected",
      ip,
      email: email.slice(0, 20) + "...",
      ts: new Date().toISOString(),
    }));
    // Return fake success to not reveal detection
    return NextResponse.json({ success: true, ticketId: generateTicketId() });
  }

  // 6. Process the submission
  // TODO: Integrate with your email service (Resend, SendGrid, Postmark, etc.)
  // Example with Resend:
  //
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: "noreply@dishora.com",
  //   to: "editorial@dishora.com",
  //   subject: `[Contact] ${category}: ${subject}`,
  //   text: `From: ${name} <${email}>\n\n${message}`,
  // });

  // Log successful submission (without sensitive data)
  console.log(JSON.stringify({
    t: "contact_submission",
    category,
    ip,
    ts: new Date().toISOString(),
  }));

  const ticketId = generateTicketId();

  return NextResponse.json(
    { success: true, ticketId },
    { status: 201 }
  );
}

// ─── OPTIONS — CORS preflight ─────────────────────────────────────────────────
// Reject cross-origin requests (same-site form only)

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 405,
    headers: { Allow: "POST" },
  });
}

// ─── GET — Method not allowed ─────────────────────────────────────────────────

export async function GET() {
  return jsonError("Method not allowed.", 405);
}
