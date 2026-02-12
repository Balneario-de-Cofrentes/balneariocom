import { NextRequest, NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 8;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const memorySubscriptions = new Set<string>();

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const existing = rateLimitStore.get(ip);

  if (!existing || now > existing.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) return true;
  existing.count += 1;
  rateLimitStore.set(ip, existing);
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Demasiadas solicitudes. Intentalo en un minuto." },
        { status: 429 }
      );
    }

    const rawBody = await request.json();
    const email = typeof rawBody?.email === "string" ? rawBody.email.trim().toLowerCase() : "";
    const source = typeof rawBody?.source === "string" ? rawBody.source.trim().slice(0, 120) : "web_footer";

    if (!email || email.length > 180 || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Email invalido" }, { status: 400 });
    }

    const webhookUrl = process.env.NEWSLETTER_WEBHOOK_URL?.trim();
    if (webhookUrl) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10_000);

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source,
          subscribedAt: new Date().toISOString(),
        }),
        signal: controller.signal,
      }).finally(() => clearTimeout(timeout));

      if (!response.ok) {
        return NextResponse.json(
          { error: "No se pudo guardar la suscripcion" },
          { status: 502 }
        );
      }

      return NextResponse.json({ ok: true, mode: "webhook" }, { status: 200 });
    }

    // Fallback without provider to avoid 404/failed UX in local and staging.
    memorySubscriptions.add(email);
    return NextResponse.json(
      { ok: true, mode: "memory", total: memorySubscriptions.size },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "No se pudo procesar la suscripcion" },
      { status: 500 }
    );
  }
}
