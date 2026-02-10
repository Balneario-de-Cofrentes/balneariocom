// Spanish name and phone validation utilities

const NAME_CONNECTORS = new Set(["de", "del", "la", "las", "los", "y", "i"]);

/**
 * Split a full Spanish name into firstName and lastName.
 * First token = firstName, rest = lastName.
 * Handles connectors: "Maria de la Cruz" -> { firstName: "Maria", lastName: "de la Cruz" }
 */
export function splitName(fullName: string): { firstName: string; lastName: string } {
  const trimmed = fullName.trim().replace(/\s+/g, " ");
  const parts = trimmed.split(" ");

  if (parts.length <= 1) {
    return { firstName: trimmed, lastName: "" };
  }

  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

/**
 * Clean phone number: remove spaces, dashes, dots, parentheses
 */
export function cleanPhone(phone: string): string {
  return phone.replace(/[\s\-\.\(\)]/g, "");
}

/**
 * Validate Spanish phone number (9 digits starting with 6/7/8/9, optional 0034 prefix)
 */
export function validatePhone(phone: string): boolean {
  const cleaned = cleanPhone(phone);
  return /^(0034)?[6789]\d{8}$/.test(cleaned);
}

/**
 * Validate a full name has at least first name and last name
 */
export function validateName(name: string): boolean {
  const trimmed = name.trim().replace(/\s+/g, " ");
  const parts = trimmed.split(" ");
  // Need at least 2 meaningful parts (ignoring connectors)
  const meaningful = parts.filter((p) => !NAME_CONNECTORS.has(p.toLowerCase()));
  return meaningful.length >= 2 && trimmed.length >= 5;
}
