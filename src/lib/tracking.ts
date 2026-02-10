"use client";

// UTM tracking, browser info, and GTM dataLayer utilities

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

const AD_KEYS = ["gclid", "gad_source", "fbclid"] as const;

interface TrackingData {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  gclid: string;
  gadSource: string;
  fbclid: string;
  fbp: string;
}

interface BrowserInfo {
  appCodeName: string;
  appName: string;
  appVersion: string;
  language: string;
  platform: string;
  userAgent: string;
}

/**
 * Persist UTM and ad params from the current URL into localStorage.
 * Call this once on page load.
 */
export function persistUTMParams(): void {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);

  for (const key of [...UTM_KEYS, ...AD_KEYS]) {
    const value = params.get(key);
    if (value) {
      localStorage.setItem(`bal_${key}`, value);
    }
  }

  // Store all URL params as JSON
  const allParams: Record<string, string> = {};
  params.forEach((value, key) => {
    allParams[key] = value;
  });
  if (Object.keys(allParams).length > 0) {
    localStorage.setItem("bal_paramsUrl", JSON.stringify(allParams));
  }
}

/**
 * Get stored tracking data from localStorage + cookies
 */
export function getTrackingData(): TrackingData {
  if (typeof window === "undefined") {
    return {
      utmSource: "", utmMedium: "", utmCampaign: "", utmContent: "", utmTerm: "",
      gclid: "", gadSource: "", fbclid: "", fbp: "",
    };
  }

  const get = (key: string) => localStorage.getItem(`bal_${key}`) || "";

  // Get _fbp cookie
  let fbp = "";
  try {
    const match = document.cookie.match(/_fbp=([^;]+)/);
    if (match) fbp = match[1];
  } catch {
    // ignore
  }

  return {
    utmSource: get("utm_source"),
    utmMedium: get("utm_medium"),
    utmCampaign: get("utm_campaign"),
    utmContent: get("utm_content"),
    utmTerm: get("utm_term"),
    gclid: get("gclid"),
    gadSource: get("gad_source"),
    fbclid: get("fbclid"),
    fbp: fbp || get("fbp"),
  };
}

/**
 * Get stored URL params
 */
export function getParamsUrl(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem("bal_paramsUrl") || "{}");
  } catch {
    return {};
  }
}

/**
 * Get browser information for CRM payload
 */
export function getBrowserInfo(): BrowserInfo {
  if (typeof window === "undefined") {
    return {
      appCodeName: "", appName: "", appVersion: "",
      language: "", platform: "", userAgent: "",
    };
  }

  return {
    appCodeName: navigator.appCodeName || "",
    appName: navigator.appName || "",
    appVersion: navigator.appVersion || "",
    language: navigator.language || "",
    platform: navigator.platform || "",
    userAgent: navigator.userAgent || "",
  };
}

/**
 * Fetch user IP from ipify
 */
export async function getUserIP(): Promise<string> {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    return data.ip || "";
  } catch {
    return "";
  }
}

/**
 * Push event to GTM dataLayer
 */
export function pushToDataLayer(event: string, data: Record<string, string>): void {
  if (typeof window === "undefined") return;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...data });
}
