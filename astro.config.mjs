import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import keystatic from '@keystatic/astro';

export default defineConfig({
  // Necesario para que el panel de administración funcione
  output: 'static', 
  integrations: [
    react(), 
    keystatic()
  ],
  // Si usas Tailwind 4 con Vite (como veo en tu package.json)
 vite: {
    plugins: [tailwindcss()]
  },
});