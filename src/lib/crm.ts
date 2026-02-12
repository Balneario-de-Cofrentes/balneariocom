"use client";

import { splitName, cleanPhone } from "./validation";
import {
  getTrackingData,
  getParamsUrl,
  getBrowserInfo,
  pushToDataLayer,
} from "./tracking";

const CRM_CAMPAIGN_ID = "4fe35360-bf2d-9c0e-21f0-6710d122eacd";
const CRM_SOURCE = "form_web_balneario_com";
const CRM_INTEREST = "termalismo";

export interface CRMPayload {
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
  browser: { appCodeName: string; appName: string; appVersion: string; language: string; platform: string; userAgent: string };
  paramsUrl: Record<string, string>;
  programInterests: string[];
  objectives: string[];
  objectivesOther: string;
  diagnoses?: string[];
  diagnosesOther?: string;
  habits?: string[];
}

/**
 * Build complete CRM payload with tracking data
 */
export async function buildCRMPayload(fields: {
  fullName: string;
  phone: string;
  program: string;
  interestedInComingMonths?: string;
  programInterests?: string[];
  objectives?: string[];
  objectivesOther?: string;
  diagnoses?: string[];
  diagnosesOther?: string;
  habits?: string[];
}): Promise<CRMPayload> {
  const { firstName, lastName } = splitName(fields.fullName);
  const tracking = getTrackingData();

  return {
    ip: "",
    source: CRM_SOURCE,
    interest: CRM_INTEREST,
    campaignId: CRM_CAMPAIGN_ID,
    firstName,
    lastName,
    phone: cleanPhone(fields.phone),
    interestedInComingMonths: fields.interestedInComingMonths || "0",
    program: fields.program,
    ...tracking,
    browser: getBrowserInfo(),
    paramsUrl: getParamsUrl(),
    programInterests: fields.programInterests || ["no_se_necesito_ayuda"],
    objectives: fields.objectives || ["otros"],
    objectivesOther: fields.objectivesOther || "Pendiente de especificar en llamada",
    diagnoses: fields.diagnoses || [],
    diagnosesOther: fields.diagnosesOther || "",
    habits: fields.habits || [],
  };
}

/**
 * Submit payload to CRM via our proxy API
 */
export async function submitToCRM(payload: CRMPayload): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch("/api/submit-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      return { ok: false, error: text || `Error ${res.status}` };
    }

    // Push to GTM dataLayer
    const tracking = getTrackingData();
    pushToDataLayer("form_submit", {
      program: payload.program,
      utm_source: tracking.utmSource,
      utm_medium: tracking.utmMedium,
      utm_campaign: tracking.utmCampaign,
    });

    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Error de red" };
  }
}

/**
 * Wizard goal -> CRM program mapping
 */
export function mapWizardGoalToProgram(goal: string, hasImserso: boolean): string {
  if (hasImserso || goal === "basic") return "termalismo_basic";
  return "termalismo_longevity";
}

export function mapRecommendationToProgram(recommendation: string): string {
  const normalized = recommendation.toLowerCase();

  if (normalized.includes("longevidad pro")) return "longevity_club";
  if (normalized.includes("imserso")) return "termalismo_basic";
  if (normalized.includes("escapada termal")) return "termalismo_basic";

  return "termalismo_longevity";
}

/**
 * Submit simplified form (nombre + tel + programa radio)
 * Fills missing fields with defaults
 */
export async function submitSimplifiedForm(fields: {
  fullName: string;
  phone: string;
  program: string;
}): Promise<{ ok: boolean; error?: string }> {
  const payload = await buildCRMPayload({
    fullName: fields.fullName,
    phone: fields.phone,
    program: fields.program,
    interestedInComingMonths: "0",
    programInterests: ["no_se_necesito_ayuda"],
    objectives: ["otros"],
    objectivesOther: "Pendiente de especificar en llamada",
  });

  return submitToCRM(payload);
}

/**
 * Submit wizard form with goal-to-program mapping
 */
export async function submitWizardForm(fields: {
  fullName: string;
  phone: string;
  goal: string;
  hasImserso: boolean;
  recommendedProgram?: string;
  conditions?: string[];
}): Promise<{ ok: boolean; error?: string }> {
  const program = fields.recommendedProgram
    ? mapRecommendationToProgram(fields.recommendedProgram)
    : mapWizardGoalToProgram(fields.goal, fields.hasImserso);

  const payload = await buildCRMPayload({
    fullName: fields.fullName,
    phone: fields.phone,
    program,
    interestedInComingMonths: "0",
    programInterests: [program],
    objectives: [fields.goal || "otros"],
    objectivesOther: "Pendiente de especificar en llamada",
    diagnoses: fields.conditions || [],
  });

  return submitToCRM(payload);
}
