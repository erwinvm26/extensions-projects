import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

// Directory
const root = resolve(__dirname + "/src");
const pageDir = resolve(root + "/pages");
const outDir = resolve(__dirname + "/dist");

// contentScript: resolve(pageDir, "content_script", "main.tsx"),

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  define: {
    "process.env.NODE_ENV": '"production"',
  },

  resolve: {
    alias: {
      "@src": root,
      "@pages": pageDir,
    },
  },

  build: {
    emptyOutDir: false,
    outDir,
    lib: {
      formats: ["iife"],
      entry: resolve(pageDir, "content_script", "main.tsx"),
      name: "Vite/React/Weather Extension",
    },
    rollupOptions: {
      output: {
        entryFileNames: "js/index.global.js",
        extend: true,
      },
    },
  },
});
