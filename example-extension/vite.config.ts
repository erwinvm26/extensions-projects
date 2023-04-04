import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

import config from "./src/config";
import makeManifest from "./src/utils/make-manifest";
import { manifest } from "./manifest";

const isDev = config.VITE_ENV === "development";
const isProd = config.VITE_ENV === "production";

// Directory
const root = resolve(__dirname + "/src");
const pageDir = resolve(root + "/pages");
const assetsDir = resolve(root + "/assets");
const outDir = resolve(__dirname + "/dist");
const publicDir = resolve(__dirname + "/public");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), makeManifest(isDev, manifest)],

  resolve: {
    alias: {
      "@src": root,
      "@assets": assetsDir,
      "@pages": pageDir,
    },
  },

  publicDir,

  build: {
    outDir,
    manifest: isProd,
    reportCompressedSize: isProd,
    rollupOptions: {
      input: {
        popup: resolve(pageDir, "popup", "index.html"),
        option: resolve(pageDir, "options", "index.html"),
        background: resolve(pageDir, "background.ts"),
      },
      output: {
        chunkFileNames: "js/[name].js",
        entryFileNames: "js/[name].js",
      },
    },
  },
});
