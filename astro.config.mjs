import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import keystatic from '@keystatic/astro';
import netlify from '@astrojs/netlify';

export default defineConfig({
  integrations: [react(), keystatic()],
  adapter: netlify(),
  output: 'server', 
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      // Esto obliga a Netlify a empaquetar Keystatic correctamente
      noExternal: ['@keystatic/core', '@keystatic/astro']
    }
  },
});