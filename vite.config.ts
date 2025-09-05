import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  // Your Vite configuration options here
  plugins: [react(),tailwindcss(),],
  build: {
    outDir: 'dist',
  },
});