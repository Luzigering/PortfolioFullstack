import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({

  base: process.env.GITHUB_ACTIONS === 'true'
    ? '/portfoliofullstack/'
    : '/',
  plugins: [
    react(),tailwindcss()
  ],
  build: {
    outDir: 'dist',
  },
});