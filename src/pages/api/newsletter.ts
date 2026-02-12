import type { APIRoute } from 'astro';

export const prerender = false;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 8;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const memorySubscriptions = new Set<string>();

function getClientIp(request: Request): string {
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

export const POST: APIRoute = async ({ request }) => {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return new Response(
        JSON.stringify({ error: "Demasiadas solicitudes. Intentalo en un minuto." }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }

    const rawBody = await request.json();
    const email = typeof rawBody?.email === "string" ? rawBody.email.trim().toLowerCase() : "";
    const source = typeof rawBody?.source === "string" ? rawBody.source.trim().slice(0, 120) : "web_footer";

    if (!email || email.length > 180 || !EMAIL_REGEX.test(email)) {
      return new Response(JSON.stringify({ error: "Email invalido" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const webhookUrl = import.meta.env.NEWSLETTER_WEBHOOK_URL?.trim();
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
        return new Response(
          JSON.stringify({ error: "No se pudo guardar la suscripcion" }),
          { status: 502, headers: { "Content-Type": "application/json" } }
        );
      }

      return new Response(JSON.stringify({ ok: true, mode: "webhook" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Fallback without provider
    memorySubscriptions.add(email);
    return new Response(
      JSON.stringify({ ok: true, mode: "memory", total: memorySubscriptions.size }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch {
    return new Response(
      JSON.stringify({ error: "No se pudo procesar la suscripcion" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
