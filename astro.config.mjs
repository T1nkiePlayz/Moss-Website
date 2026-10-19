import { defineConfig } from 'astro/config';

// BASE_PATH / SITE_URL come from the deploy workflow (GitHub Pages); locally the site lives at "/".
const base = (process.env.BASE_PATH || '/').replace(/\/?$/, '/');

export default defineConfig({
  site: process.env.SITE_URL || 'https://t1nkieplayz.github.io',
  base,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
});
