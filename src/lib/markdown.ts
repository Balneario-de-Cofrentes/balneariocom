/**
 * Clean and render MDX content extracted from Framer pages.
 *
 * The extraction process captures nav items, footer text, and fragments
 * text (Framer splits formatted text across elements). This cleans all that.
 */

const NAV_ITEMS = [
  "Programas",
  "Tratamientos",
  "Instalaciones",
  "Quiénes Somos",
  "Reservar",
  "WhatsApp Reservar",
];

const FOOTER_MARKERS = [
  "CONTACTO",
  "Llámanos",
  "Política de Cookies",
  "CONÓCENOS",
  "If you are an AI",
  "Lea nuestra",
  "Balneario Cofrentes utiliza cookies",
];

export function cleanContent(raw: string): string {
  const lines = raw.split("\n");
  const cleaned: string[] = [];
  let skipHeader = true;
  let hitFooter = false;

  for (const line of lines) {
    const trimmed = line.trim();

    // Skip nav items at the top
    if (skipHeader && NAV_ITEMS.includes(trimmed)) continue;
    if (skipHeader && trimmed && !NAV_ITEMS.includes(trimmed)) skipHeader = false;

    // Also skip nav items that appear as standalone lines anywhere
    if (!skipHeader && NAV_ITEMS.includes(trimmed)) continue;

    // Stop at footer markers
    if (FOOTER_MARKERS.some((m) => trimmed.startsWith(m))) {
      hitFooter = true;
      break;
    }

    if (!hitFooter) cleaned.push(line);
  }

  let text = cleaned.join("\n");

  // Clean Framer artifacts
  text = text.replace(/\*\*\[(.*?)\]\*\*/g, "$1"); // **[text]** -> text
  text = text.replace(/\[(.*?)\]/g, "$1"); // [text] -> text (remaining brackets)

  // Join fragmented lines (Framer splits formatted text across lines)
  // Only join when both sides are plain text (not headings, lists, or emoji lines)
  text = text
    .split("\n\n")
    .reduce((acc: string[], block, i, arr) => {
      if (i === 0) return [block];
      const prev = arr[i - 1].trim();
      const curr = block.trim();
      // Don't join if either side is a heading, list item, emoji line, or very short
      const isHeadingOrSpecial = (s: string) =>
        s.startsWith("#") || s.startsWith("- ") || s.startsWith("* ") ||
        /^\d+[.)]/.test(s) || /^[👉🏼✔️🛏👨‍⚕️🌿🚗🚆🚌📍1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣]/.test(s);
      if (isHeadingOrSpecial(prev) || isHeadingOrSpecial(curr)) {
        acc.push(block);
        return acc;
      }
      // Join if prev ends with a letter/comma and curr starts with a lowercase letter
      const prevEnd = prev.slice(-1);
      const currStart = curr.charAt(0);
      if (/[a-záéíóúñü,]/i.test(prevEnd) && /[a-záéíóúñü]/.test(currStart)) {
        acc[acc.length - 1] += " " + curr;
      } else {
        acc.push(block);
      }
      return acc;
    }, [])
    .join("\n\n");

  // Remove excessive blank lines
  text = text.replace(/\n{4,}/g, "\n\n\n");

  return text.trim();
}

/** Structured content extracted from scraped MDX */
export interface ParsedContent {
  price: string | null;
  intro: string;
  sections: ContentSection[];
  relatedPrograms: RelatedItem[];
  relatedTreatments: RelatedItem[];
  body: string; // cleaned markdown without price/related
}

export interface ContentSection {
  heading: string;
  level: number;
  content: string;
}

export interface RelatedItem {
  name: string;
  price: string | null;
}

/** Parse structured data from raw MDX content */
export function parseContent(raw: string): ParsedContent {
  const cleaned = cleanContent(raw);
  const lines = cleaned.split("\n");

  let price: string | null = null;
  const relatedPrograms: RelatedItem[] = [];
  const relatedTreatments: RelatedItem[] = [];
  const bodyLines: string[] = [];
  let inRelatedPrograms = false;
  let inRelatedTreatments = false;
  let inFormSection = false;
  let pendingRelatedName: string | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Extract price (first line matching "Desde X€" or just "X€")
    if (!price && /^(?:Desde\s+)?\d[\d.,]*\s*€/.test(trimmed)) {
      price = trimmed;
      continue;
    }

    // Detect related programs section
    if (trimmed.startsWith("Este tratamiento lo puedes encontrar como parte de estos programas")) {
      inRelatedPrograms = true;
      continue;
    }

    // Detect related treatments section
    if (trimmed.startsWith("Puedes leer más sobre los tratamientos de este programa")) {
      inRelatedTreatments = true;
      continue;
    }

    // Detect form section (skip booking forms)
    if (trimmed === "Rellene su solicitud del Imserso" || trimmed.startsWith("## Rellene su solicitud")) {
      inFormSection = true;
      continue;
    }
    if (inFormSection) {
      // Skip form fields and related content until we hit a real section
      if (trimmed.startsWith("Nombre y Apellidos") || trimmed.startsWith("Teléfono") ||
          trimmed.startsWith("¿Cuándo") || trimmed.startsWith("Quiero ir") ||
          trimmed.startsWith("le atenderemos") || trimmed.startsWith("No tengo") ||
          trimmed.startsWith("¿Qué programa") || trimmed.startsWith("Termalismo") ||
          trimmed.startsWith("Longevidad PRO") || trimmed.startsWith("Quiero que me llamen") ||
          trimmed.startsWith("Finalidad del dato") || trimmed.startsWith("Derechos:") ||
          trimmed.startsWith("Podrá ejercitar") || trimmed.startsWith("Atender y gestionar") ||
          trimmed === "") {
        continue;
      }
      inFormSection = false;
    }

    // Parse related items (name on one line, price on next)
    if (inRelatedPrograms || inRelatedTreatments) {
      if (trimmed === "") continue;
      if (/^\d[\d.,]*\s*€/.test(trimmed) || /^Desde\s+\d/.test(trimmed)) {
        if (pendingRelatedName) {
          const item = { name: pendingRelatedName, price: trimmed };
          if (inRelatedPrograms) relatedPrograms.push(item);
          else relatedTreatments.push(item);
          pendingRelatedName = null;
        }
        continue;
      }
      if (trimmed.startsWith("Programa ") || trimmed.startsWith("Balneoterapia") ||
          trimmed.startsWith("Fisioterapia") || trimmed.startsWith("Parafangos") ||
          trimmed.startsWith("Ozonoterapia") || trimmed.startsWith("Masajes") ||
          trimmed.startsWith("Terapia ") || trimmed.startsWith("Medicina ") ||
          trimmed.startsWith("Nutricion") || trimmed.startsWith("Neuromodulacion") ||
          trimmed.startsWith("Sueros") || trimmed.startsWith("Infiltraciones") ||
          trimmed.startsWith("Plasmaferesis") || trimmed.startsWith("Entrenamiento") ||
          trimmed.startsWith("Salud y Belleza")) {
        if (pendingRelatedName) {
          const item = { name: pendingRelatedName, price: null };
          if (inRelatedPrograms) relatedPrograms.push(item);
          else relatedTreatments.push(item);
        }
        pendingRelatedName = trimmed;
        continue;
      }
      // If we hit something that doesn't look like a related item, stop
      if (pendingRelatedName) {
        const item = { name: pendingRelatedName, price: null };
        if (inRelatedPrograms) relatedPrograms.push(item);
        else relatedTreatments.push(item);
        pendingRelatedName = null;
      }
      inRelatedPrograms = false;
      inRelatedTreatments = false;
    }

    bodyLines.push(line);
  }

  // Flush any pending related item
  if (pendingRelatedName) {
    const item = { name: pendingRelatedName, price: null };
    if (inRelatedPrograms) relatedPrograms.push(item);
    else relatedTreatments.push(item);
  }

  const body = bodyLines.join("\n").trim();

  // Extract intro (first meaningful paragraph, not a heading or emoji-prefixed)
  const blocks = body.split("\n\n").map((b) => b.trim()).filter(Boolean);
  let intro = "";
  for (const block of blocks) {
    if (block.startsWith("#")) continue;
    if (/^[👉🏼✔️🛏👨‍⚕️🌿🚗🚆🚌📍1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣]/.test(block)) continue;
    if (block.length < 40) continue;
    // Skip blocks that are just the page title repeated
    if (/^(Programa|Tratamiento)\s/i.test(block) && block.length < 100) continue;
    intro = block.replace(/\*\*(.*?)\*\*/g, "$1").replace(/\*(.*?)\*/g, "$1").replace(/\n/g, " ");
    break;
  }

  // Parse sections by headings
  const sections: ContentSection[] = [];
  let currentSection: ContentSection | null = null;
  for (const block of blocks) {
    const headingMatch = block.match(/^(#{1,4})\s+(.+)/);
    if (headingMatch) {
      if (currentSection) sections.push(currentSection);
      currentSection = {
        heading: headingMatch[2].trim(),
        level: headingMatch[1].length,
        content: "",
      };
    } else if (currentSection) {
      currentSection.content += (currentSection.content ? "\n\n" : "") + block;
    }
  }
  if (currentSection) sections.push(currentSection);

  return { price, intro, sections, relatedPrograms, relatedTreatments, body };
}

export function renderMarkdown(md: string): string {
  const cleaned = cleanContent(md);

  return renderCleanedMarkdown(cleaned);
}

/** Render already-cleaned markdown to HTML */
export function renderCleanedMarkdown(cleaned: string): string {
  return cleaned
    .split("\n\n")
    .map((block) => {
      block = block.trim();
      if (!block) return "";

      // Headings
      if (block.startsWith("######")) return `<h6>${block.slice(6).trim()}</h6>`;
      if (block.startsWith("#####")) return `<h5>${block.slice(5).trim()}</h5>`;
      if (block.startsWith("####")) return `<h4>${block.slice(4).trim()}</h4>`;
      if (block.startsWith("###")) return `<h3>${block.slice(3).trim()}</h3>`;
      if (block.startsWith("##")) return `<h2>${block.slice(2).trim()}</h2>`;
      if (block.startsWith("#")) return `<h1>${block.slice(1).trim()}</h1>`;

      // Emoji-prefixed items (common in Framer content)
      if (/^[👉🏼✔️🛏👨‍⚕️🌿🚗🚆🚌📍1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣]/.test(block)) {
        return `<p class="flex gap-2 items-start"><span class="shrink-0">${block.slice(0, 2)}</span><span>${inlineFormat(block.slice(2).trim())}</span></p>`;
      }

      // Lists
      if (block.startsWith("- ") || block.startsWith("* ")) {
        const items = block
          .split("\n")
          .filter((l) => l.trim())
          .map((l) => `<li>${inlineFormat(l.replace(/^[-*]\s*/, "").trim())}</li>`)
          .join("");
        return `<ul>${items}</ul>`;
      }

      // Numbered lists
      if (/^\d+\.\s/.test(block)) {
        const items = block
          .split("\n")
          .filter((l) => l.trim())
          .map((l) => `<li>${inlineFormat(l.replace(/^\d+\.\s*/, "").trim())}</li>`)
          .join("");
        return `<ol>${items}</ol>`;
      }

      // Skip very short fragments (likely nav/button remnants)
      if (block.length < 4 && !block.match(/\d/)) return "";

      return `<p>${inlineFormat(block)}</p>`;
    })
    .filter(Boolean)
    .join("\n");
}

function inlineFormat(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n/g, " ");
}
