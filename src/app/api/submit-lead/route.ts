import { NextRequest, NextResponse } from "next/server";

const CRM_ENDPOINT =
  "https://app-api-lead-collector-backend-prod.azurewebsites.net/requests";
const MAX_CONTENT_LENGTH_BYTES = 25_000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;
const PROGRAM_VALUES = new Set([
  "termalismo_basic",
  "termalismo_longevity",
  "longevity_club",
]);
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

interface CRMRequestPayload {
  ip: string;
  source: string;
  interest: string;
  campaignId: string;
  firstName: string;
  lastName: string;
  phone: string;
  interestedInComingMonths: string;
  program: string;
  gclid: string;
  gadSource: string;
  fbclid: string;
  fbp: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  browser: {
    appCodeName: string;
    appName: string;
    appVersion: string;
    language: string;
    platform: string;
    userAgent: string;
  };
  paramsUrl: Record<string, string>;
  programInterests: string[];
  objectives: string[];
  objectivesOther: string;
  diagnoses: string[];
  diagnosesOther: string;
  habits: string[];
}

function sanitizeString(value: unknown, maxLen = 255): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLen);
}

function sanitizeStringArray(value: unknown, maxItems = 12, maxLen = 120): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim().slice(0, maxLen))
    .filter(Boolean)
    .slice(0, maxItems);
}

function sanitizeRecord(value: unknown, maxEntries = 20): Record<string, string> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const entries = Object.entries(value).slice(0, maxEntries);
  return Object.fromEntries(
    entries
      .filter(([key, val]) => typeof key === "string" && typeof val === "string")
      .map(([key, val]) => [key.slice(0, 80), sanitizeString(val, 300)])
  );
}

function sanitizeBrowser(value: unknown): CRMRequestPayload["browser"] {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {
      appCodeName: "",
      appName: "",
      appVersion: "",
      language: "",
      platform: "",
      userAgent: "",
    };
  }

  const browser = value as Record<string, unknown>;
  return {
    appCodeName: sanitizeString(browser.appCodeName, 120),
    appName: sanitizeString(browser.appName, 120),
    appVersion: sanitizeString(browser.appVersion, 180),
    language: sanitizeString(browser.language, 40),
    platform: sanitizeString(browser.platform, 120),
    userAgent: sanitizeString(browser.userAgent, 500),
  };
}

function sanitizePayload(input: unknown): CRMRequestPayload | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const raw = input as Record<string, unknown>;

  const phone = sanitizeString(raw.phone, 24);
  const firstName = sanitizeString(raw.firstName, 80);
  const lastName = sanitizeString(raw.lastName, 120);
  const program = sanitizeString(raw.program, 80);

  if (!/^(0034)?[6789]\d{8}$/.test(phone)) return null;
  if (firstName.length < 2 || lastName.length < 2) return null;
  if (!PROGRAM_VALUES.has(program)) return null;

  return {
    ip: sanitizeString(raw.ip, 64),
    source: sanitizeString(raw.source, 80),
    interest: sanitizeString(raw.interest, 80),
    campaignId: sanitizeString(raw.campaignId, 80),
    firstName,
    lastName,
    phone,
    interestedInComingMonths: sanitizeString(raw.interestedInComingMonths, 8),
    program,
    gclid: sanitizeString(raw.gclid, 120),
    gadSource: sanitizeString(raw.gadSource, 120),
    fbclid: sanitizeString(raw.fbclid, 120),
    fbp: sanitizeString(raw.fbp, 120),
    utmSource: sanitizeString(raw.utmSource, 120),
    utmMedium: sanitizeString(raw.utmMedium, 120),
    utmCampaign: sanitizeString(raw.utmCampaign, 160),
    utmContent: sanitizeString(raw.utmContent, 160),
    utmTerm: sanitizeString(raw.utmTerm, 160),
    browser: sanitizeBrowser(raw.browser),
    paramsUrl: sanitizeRecord(raw.paramsUrl),
    programInterests: sanitizeStringArray(raw.programInterests),
    objectives: sanitizeStringArray(raw.objectives),
    objectivesOther: sanitizeString(raw.objectivesOther, 300),
    diagnoses: sanitizeStringArray(raw.diagnoses),
    diagnosesOther: sanitizeString(raw.diagnosesOther, 300),
    habits: sanitizeStringArray(raw.habits),
  };
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return sanitizeString(request.headers.get("x-real-ip"), 64) || "unknown";
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
    const contentLength = Number(request.headers.get("content-length") || "0");
    if (contentLength > MAX_CONTENT_LENGTH_BYTES) {
      return NextResponse.json({ error: "Payload demasiado grande" }, { status: 413 });
    }

    const clientIp = getClientIp(request);
    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: "Demasiadas solicitudes. Intentalo de nuevo en un minuto." },
        { status: 429 }
      );
    }

    const rawBody = await request.json();
    const payload = sanitizePayload(rawBody);
    if (!payload) {
      return NextResponse.json({ error: "Datos de formulario invalidos" }, { status: 400 });
    }

    if (!payload.ip) payload.ip = clientIp;
    if (!payload.source) payload.source = "form_web_balneario_com";
    if (!payload.interest) payload.interest = "termalismo";
    if (!payload.campaignId) payload.campaignId = "4fe35360-bf2d-9c0e-21f0-6710d122eacd";

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);

    const response = await fetch(CRM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
      cache: "no-store",
    }).finally(() => clearTimeout(timeout));

    if (!response.ok) {
      return NextResponse.json({ error: "No se pudo procesar la solicitud" }, { status: 502 });
    }

    const data = await response.json().catch(() => ({}));
    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Error interno al procesar la solicitud" },
      { status: 500 }
    );
  }
}
