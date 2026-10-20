import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Built into the main Next.js site as a gated static product.
// Output lands in public/products/owner-copilot/ and is served at /products/owner-copilot.
// The Gemini key is NOT bundled: lib/ai.ts calls the site's /api/owner-copilot/ask route.
export default defineConfig({
  plugins: [react()],
  base: '/products/owner-copilot/',
  build: {
    outDir: '../../public/products/owner-copilot',
    emptyOutDir: true,
  },
  server: {
    // `npm run dev` here: forward the AI route to the Next.js dev server.
    proxy: { '/api': 'http://localhost:3000' },
  },
});
