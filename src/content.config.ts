import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const programas = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/programas' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    slug: z.string(),
    section: z.string().optional(),
    image: z.string().optional(),
  }),
});

const tratamientos = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/tratamientos' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    slug: z.string(),
    section: z.string().optional(),
    image: z.string().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    slug: z.string(),
    section: z.string().optional(),
    date: z.string().optional(),
    image: z.string().optional(),
    author: z.string().optional(),
  }),
});

const subvenciones = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/subvenciones' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    slug: z.string(),
    section: z.string().optional(),
    year: z.number().optional(),
    image: z.string().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    slug: z.string(),
    section: z.string().optional(),
  }),
});

export const collections = { programas, tratamientos, blog, subvenciones, pages };
