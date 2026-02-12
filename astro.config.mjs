import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://balneario.com',
  adapter: node({ mode: 'standalone' }),
  integrations: [
    react(),
    mdx(),
    sitemap(),
  ],
  vite: {
    css: {
      postcss: './postcss.config.mjs',
    },
    ssr: {
      noExternal: ['framer-motion'],
    },
  },
});
