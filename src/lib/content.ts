import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export interface ContentMeta {
  title: string;
  description?: string;
  slug: string;
  section: string;
  image?: string;
  [key: string]: unknown;
}

export interface ContentItem {
  meta: ContentMeta;
  content: string;
  slug: string;
}

function getContentFromDir(dir: string): ContentItem[] {
  const dirPath = path.join(contentDir, dir);

  if (!fs.existsSync(dirPath)) return [];

  const files = fs
    .readdirSync(dirPath)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(dirPath, file), "utf-8");
    const { data, content } = matter(raw);
    const slug = file.replace(/\.mdx?$/, "");

    return {
      meta: {
        title: data.title || slug,
        description: data.description || "",
        slug: data.slug || slug,
        section: data.section || dir,
        image: data.image,
        ...data,
      },
      content,
      slug,
    };
  });
}

export function getAllTratamientos(): ContentItem[] {
  return getContentFromDir("tratamientos");
}

export function getTratamiento(slug: string): ContentItem | undefined {
  return getAllTratamientos().find((t) => t.slug === slug);
}

export function getAllProgramas(): ContentItem[] {
  return getContentFromDir("programas");
}

export function getPrograma(slug: string): ContentItem | undefined {
  return getAllProgramas().find((p) => p.slug === slug);
}

export function getAllBlogPosts(): ContentItem[] {
  return getContentFromDir("blog");
}

export function getBlogPost(slug: string): ContentItem | undefined {
  return getAllBlogPosts().find((p) => p.slug === slug);
}

export function getAllSubvenciones(): ContentItem[] {
  return getContentFromDir("subvenciones").sort((a, b) => {
    const yearA = (a.meta.year as number) || 0;
    const yearB = (b.meta.year as number) || 0;
    return yearB - yearA;
  });
}

export function getSubvencion(slug: string): ContentItem | undefined {
  return getAllSubvenciones().find((s) => s.slug === slug);
}

export function getPage(slug: string): ContentItem | undefined {
  const pages = getContentFromDir("pages");
  return pages.find((p) => p.slug === slug);
}
