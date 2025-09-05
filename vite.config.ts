import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig(({ command }) => {
  const isProductionForGitHubPages = command === 'build' && process.env.VITE_DEPLOY_TARGET === 'gh-pages';

  return {
    base: isProductionForGitHubPages ? '/portfoliofullstack/' : '/',
    plugins: [
      react(),tailwindcss()
    ],
    build: {
      outDir: 'dist',
    },
  };
});