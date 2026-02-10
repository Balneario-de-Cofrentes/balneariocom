import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const BASE = 'https://balneario.com';
const OUT_DIR = '/Users/juancartagena/CodeProjects/balneariocom/content';

// All pages to extract, grouped by section
const pages = {
  pages: [
    { url: '/', slug: 'home', title: 'Homepage' },
    { url: '/about', slug: 'about', title: 'About' },
    { url: '/instalaciones', slug: 'instalaciones', title: 'Instalaciones' },
    { url: '/clinicadelongevidad', slug: 'clinica', title: 'Clinica de Longevidad' },
    { url: '/programas', slug: 'programas', title: 'Programas' },
    { url: '/escapada-termal', slug: 'escapada-termal', title: 'Escapada Termal' },
    { url: '/humanlab', slug: 'humanlab', title: 'HumanLab' },
    { url: '/reserva', slug: 'reserva', title: 'Reserva' },
    { url: '/prensa', slug: 'prensa', title: 'Prensa' },
  ],
  tratamientos: [
    { url: '/clinicadelongevidad/entrenamiento-funcional', slug: 'entrenamiento-funcional' },
    { url: '/clinicadelongevidad/nutricion', slug: 'nutricion' },
    { url: '/clinicadelongevidad/salud-y-belleza-de-la-piel', slug: 'salud-y-belleza-de-la-piel' },
    { url: '/clinicadelongevidad/fisioterapia', slug: 'fisioterapia' },
    { url: '/clinicadelongevidad/sueros', slug: 'sueros' },
    { url: '/clinicadelongevidad/infiltraciones', slug: 'infiltraciones' },
    { url: '/clinicadelongevidad/balneoterapia-respiratoria', slug: 'balneoterapia-respiratoria' },
    { url: '/clinicadelongevidad/parafangos', slug: 'parafangos' },
    { url: '/clinicadelongevidad/terapia-acuatica', slug: 'terapia-acuatica' },
    { url: '/clinicadelongevidad/masajes', slug: 'masajes' },
    { url: '/clinicadelongevidad/plasmaferesis', slug: 'plasmaferesis' },
    { url: '/clinicadelongevidad/medicina-regenerativa', slug: 'medicina-regenerativa' },
    { url: '/clinicadelongevidad/ozonoterapia', slug: 'ozonoterapia' },
    { url: '/clinicadelongevidad/terapia-hipertermal-progresiva', slug: 'terapia-hipertermal-progresiva' },
    { url: '/clinicadelongevidad/neuromodulacion', slug: 'neuromodulacion' },
  ],
  programas: [
    { url: '/programas/termalismo-valenciano', slug: 'termalismo-valenciano' },
    { url: '/programas/imserso-balneario', slug: 'imserso-balneario' },
    { url: '/programas/grupos-termalismo-imserso', slug: 'grupos-termalismo-imserso' },
    { url: '/programas/programa-dolor-avanzado', slug: 'programa-dolor-avanzado' },
    { url: '/programas/programa-dolor-intensivo', slug: 'programa-dolor-intensivo' },
    { url: '/programas/programa-dolor-intensivo-plus', slug: 'programa-dolor-intensivo-plus' },
    { url: '/programas/programa-medicina-regenerativa', slug: 'programa-medicina-regenerativa' },
    { url: '/programas/programa-fortalecimiento-avanzado', slug: 'programa-fortalecimiento-avanzado' },
    { url: '/programas/programa-fortalecimiento-intensivo', slug: 'programa-fortalecimiento-intensivo' },
    { url: '/programas/programa-anti-inflamatorio-inicial', slug: 'programa-anti-inflamatorio-inicial' },
    { url: '/programas/programa-anti-inflamatorio-avanzado', slug: 'programa-anti-inflamatorio-avanzado' },
    { url: '/programas/programa-anti-inflamatorio-intensivo', slug: 'programa-anti-inflamatorio-intensivo' },
    { url: '/programas/programa-saludable-inicial', slug: 'programa-saludable-inicial' },
    { url: '/programas/programa-saludable-avanzado', slug: 'programa-saludable-avanzado' },
    { url: '/programas/programa-saludable-intensivo', slug: 'programa-saludable-intensivo' },
    { url: '/programas/programa-belleza-termal', slug: 'programa-belleza-termal' },
    { url: '/programas/programa-bienestar-termal', slug: 'programa-bienestar-termal' },
    { url: '/programas/programa-detox-molecular', slug: 'programa-detox-molecular' },
    { url: '/programas/programa-longevidad-personalizado', slug: 'programa-longevidad-personalizado' },
    { url: '/programas/escapada-termal', slug: 'escapada-termal' },
  ],
  blog: [
    { url: '/blog-ciencia/el-balneario-de-cofrentes-lidera-el-proyecto-salud-senior-6p-subvencionado-por-el-cdti', slug: 'salud-senior-6p-cdti' },
    { url: '/blog-ciencia/ayudas-2025', slug: 'ayudas-2025' },
    { url: '/blog-ciencia/ayudas-turismo-2025', slug: 'ayudas-turismo-2025' },
    { url: '/blog-ciencia/seguridad', slug: 'seguridad' },
    { url: '/blog-ciencia/aquapred-el-consorcio-europeo-utiliza-ia-para-evitar-la-contaminaci%C3%B3n-del-agua', slug: 'aquapred-ia-agua' },
    { url: '/blog-ciencia/ayudas-2024-campa%C3%B1a-de-marketing-2024-de-turismo-de-salud-del-balneario-de-cofrentes', slug: 'ayudas-2024-marketing' },
    { url: '/blog-ciencia/ayudas-2023-tecnolog%C3%ADa-de-monitorizaci%C3%B3n-y-adaptaci%C3%B3n-de-planes-de-dolor-cr%C3%B3nico-fuera-del-hogar', slug: 'ayudas-2023-monitorizacion' },
    { url: '/blog-ciencia/campa%C3%B1a-de-marketing-de-turismo-termal-del-balneario-de-cofrentes', slug: 'campana-marketing-turismo-termal' },
    { url: '/blog-ciencia/consolidaci%C3%B3n-de-la-cadena-de-valor-empresarial-balneario-de-cofrentes', slug: 'consolidacion-cadena-valor' },
    { url: '/blog-ciencia/proyecto-silverhealth-ll-en-el-balneario-de-cofrentes', slug: 'silverhealth-2' },
    { url: '/blog-ciencia/programa-silverhealth-l-en-el-balneario-de-cofrentes', slug: 'silverhealth-1' },
    { url: '/blog-ciencia/subvenciones-2018-hervideos-de-cofrentes', slug: 'subvenciones-2018' },
    { url: '/blog-ciencia/subvenciones-2017-en-el-balneario-de-cofrentes', slug: 'subvenciones-2017' },
    { url: '/blog-ciencia/el-balneario-m%C3%A1s-medicalizado-de-espa%C3%B1a-balneario-de-cofrentes-de-balneario-a-cl%C3%ADnica-de-longevidad', slug: 'balneario-mas-medicalizado' },
    { url: '/blog-ciencia/qu%C3%A9-es-lo-m%C3%A1s-importante-al-elegir-un-balneario-en-espa%C3%B1a', slug: 'elegir-balneario-espana' },
    { url: '/blog-ciencia/cual-es-la-diferencia-entre-un-balneario-y-un-spa', slug: 'diferencia-balneario-spa' },
    { url: '/blog-ciencia/aguas-minero-medicinales-del-balneario-de-cofrentes', slug: 'aguas-minero-medicinales' },
    { url: '/blog-ciencia/c%C3%B3mo-elegir-el-mejor-balneario-para-una-estancia-termal', slug: 'como-elegir-mejor-balneario' },
  ],
};

async function extractPage(page, url, section, slug) {
  const fullUrl = `${BASE}${url}`;
  console.log(`Fetching: ${fullUrl}`);

  try {
    await page.goto(fullUrl, { waitUntil: 'networkidle', timeout: 30000 });
    // Extra wait for Framer animations/rendering
    await page.waitForTimeout(2000);
  } catch (e) {
    console.error(`  Timeout/error loading ${fullUrl}, trying with domcontentloaded...`);
    try {
      await page.goto(fullUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await page.waitForTimeout(3000);
    } catch (e2) {
      console.error(`  Failed to load ${fullUrl}: ${e2.message}`);
      return null;
    }
  }

  const data = await page.evaluate(() => {
    // Get meta description
    const metaDesc = document.querySelector('meta[name="description"]')?.content || '';
    const pageTitle = document.title || '';

    // Get all text content structured by semantic elements
    const sections = [];

    // Helper to get clean text
    function cleanText(text) {
      return text.replace(/\s+/g, ' ').trim();
    }

    // Helper to check if element is visible
    function isVisible(el) {
      const style = window.getComputedStyle(el);
      return style.display !== 'none' &&
             style.visibility !== 'hidden' &&
             style.opacity !== '0' &&
             el.offsetHeight > 0;
    }

    // Walk through the body and extract structured content
    function extractFromElement(el, depth = 0) {
      if (!isVisible(el)) return;

      const tag = el.tagName?.toLowerCase();
      const text = cleanText(el.innerText || '');

      // Skip empty elements, scripts, styles, nav duplicates
      if (!text || tag === 'script' || tag === 'style' || tag === 'noscript') return;

      // Handle headings
      if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)) {
        const level = parseInt(tag[1]);
        sections.push({ type: 'heading', level, text });
        return;
      }

      // Handle paragraphs
      if (tag === 'p') {
        if (text.length > 5) {
          sections.push({ type: 'paragraph', text });
        }
        return;
      }

      // Handle list items
      if (tag === 'li') {
        sections.push({ type: 'listitem', text });
        return;
      }

      // Handle buttons and CTAs
      if (tag === 'button' || (tag === 'a' && el.classList.toString().includes('button'))) {
        if (text.length > 1 && text.length < 100) {
          sections.push({ type: 'cta', text });
        }
        return;
      }

      // Handle images
      if (tag === 'img') {
        const alt = el.getAttribute('alt');
        if (alt) {
          sections.push({ type: 'image', alt });
        }
        return;
      }

      // Recurse into children
      for (const child of el.children) {
        extractFromElement(child, depth + 1);
      }
    }

    // Also try a simpler approach: get all text nodes in order
    function getAllTextBlocks() {
      const blocks = [];
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            const parent = node.parentElement;
            if (!parent) return NodeFilter.FILTER_REJECT;
            const tag = parent.tagName.toLowerCase();
            if (['script', 'style', 'noscript'].includes(tag)) return NodeFilter.FILTER_REJECT;
            const text = node.textContent.trim();
            if (!text || text.length < 2) return NodeFilter.FILTER_REJECT;
            // Check visibility
            const style = window.getComputedStyle(parent);
            if (style.display === 'none' || style.visibility === 'hidden') return NodeFilter.FILTER_REJECT;
            return NodeFilter.FILTER_ACCEPT;
          }
        }
      );

      while (walker.nextNode()) {
        const node = walker.currentNode;
        const parent = node.parentElement;
        const tag = parent.tagName.toLowerCase();
        const text = node.textContent.trim();

        let type = 'text';
        if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)) {
          type = `h${tag[1]}`;
        } else if (tag === 'p') {
          type = 'p';
        } else if (tag === 'li') {
          type = 'li';
        } else if (tag === 'a' || tag === 'button') {
          type = 'link';
        }

        // Get computed font size to detect headings styled via CSS
        const fontSize = parseFloat(window.getComputedStyle(parent).fontSize);
        const fontWeight = window.getComputedStyle(parent).fontWeight;

        blocks.push({
          type,
          text,
          fontSize: Math.round(fontSize),
          fontWeight,
          tag
        });
      }

      return blocks;
    }

    // Get images with alt text
    const images = Array.from(document.querySelectorAll('img[alt]'))
      .map(img => img.alt)
      .filter(alt => alt && alt.length > 2);

    return {
      title: pageTitle,
      metaDescription: metaDesc,
      textBlocks: getAllTextBlocks(),
      images,
    };
  });

  return data;
}

function blocksToMarkdown(data) {
  if (!data || !data.textBlocks) return '';

  const lines = [];
  const seen = new Set();
  let lastText = '';

  for (const block of data.textBlocks) {
    const text = block.text.trim();
    if (!text || text === lastText) continue;

    // Skip very short fragments that are likely UI elements
    // But keep them if they look like headings or labels
    if (text.length < 3 && block.type === 'text') continue;

    // Deduplicate
    const key = text.substring(0, 100);
    if (seen.has(key)) continue;
    seen.add(key);

    lastText = text;

    // Determine heading level based on font size or tag
    if (block.type.startsWith('h')) {
      const level = parseInt(block.type[1]);
      lines.push('');
      lines.push('#'.repeat(level) + ' ' + text);
      lines.push('');
    } else if (block.fontSize >= 36 || (block.fontSize >= 28 && (block.fontWeight === 'bold' || parseInt(block.fontWeight) >= 600))) {
      lines.push('');
      lines.push('## ' + text);
      lines.push('');
    } else if (block.fontSize >= 22 && (block.fontWeight === 'bold' || parseInt(block.fontWeight) >= 500)) {
      lines.push('');
      lines.push('### ' + text);
      lines.push('');
    } else if (block.type === 'li') {
      lines.push('- ' + text);
    } else if (block.type === 'link' && text.length < 60) {
      // CTA or navigation link
      lines.push('');
      lines.push(`**[${text}]**`);
    } else {
      lines.push('');
      lines.push(text);
    }
  }

  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

function createMDX(data, section, slug) {
  const title = data.title.replace(/\s*[-|]\s*Balneario de Cofrentes.*$/i, '').trim() || data.title;
  const markdown = blocksToMarkdown(data);

  return `---
title: "${title.replace(/"/g, '\\"')}"
description: "${(data.metaDescription || '').replace(/"/g, '\\"')}"
slug: "${slug}"
section: "${section}"
---

${markdown}
`;
}

async function main() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    locale: 'es-ES',
  });
  const page = await context.newPage();

  let totalExtracted = 0;
  let totalFailed = 0;

  for (const [section, pageList] of Object.entries(pages)) {
    const dir = join(OUT_DIR, section);
    mkdirSync(dir, { recursive: true });

    for (const p of pageList) {
      const data = await extractPage(page, p.url, section, p.slug);
      if (data && data.textBlocks.length > 0) {
        const mdx = createMDX(data, section, p.slug);
        const filePath = join(dir, `${p.slug}.mdx`);
        writeFileSync(filePath, mdx, 'utf-8');
        console.log(`  Saved: ${filePath} (${data.textBlocks.length} text blocks)`);
        totalExtracted++;
      } else {
        console.error(`  FAILED: No content for ${p.url}`);
        totalFailed++;
      }
    }
  }

  await browser.close();
  console.log(`\nDone! Extracted: ${totalExtracted}, Failed: ${totalFailed}`);
}

main().catch(console.error);
