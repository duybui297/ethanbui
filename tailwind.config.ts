import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

// Tailwind v4 reads most theme config from `@theme` in CSS (globals.css).
// This file is here for plugins and content scanning compatibility.
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  plugins: [typography]
};

export default config;
