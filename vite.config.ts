import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig(({ command }) => {

  const isDeployingToGitHubPages = process.env.VITE_DEPLOY_TARGET === 'gh-pages';

  return {
  
    base: isDeployingToGitHubPages ? '/PortfolioFullstack/' : '/',
    plugins: [
      react(), tailwindcss()
    ],
    build: {
      outDir: 'dist',
    },
  };
});