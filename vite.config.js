import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import {imagetools} from "vite-imagetools";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    imagetools(),
    ViteImageOptimizer({
      jpg: { quality: 75 },
      jpeg: { quality: 75 },
      png: { quality: 75 },
      webp: { quality: 75 },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // 👇 ضيف الجزء ده هنا بالظبط 👇
  server: {
    watch: {
      usePolling: true, // بيجبر Vite إنه يراقب تغييرات الملفات بنفسه
    },
  },
});
