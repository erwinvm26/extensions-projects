import * as fs from "node:fs";
import { resolve } from "node:path";
import { PluginOption } from "vite";

// Where we save our manifest
const distDir = resolve(__dirname, "../../dist");
const publicDir = resolve(__dirname, "../../public");

export default function makeManifest(
  isDev: boolean,
  manifest: chrome.runtime.ManifestV3
): PluginOption {
  function make(to: string) {
    // if not exists a directory. then, we create one
    if (!fs.existsSync(to)) {
      fs.mkdirSync(to);
    }
    const pathManifest = resolve(to, "manifest.json");
    fs.writeFileSync(pathManifest, JSON.stringify(manifest));
  }

  return {
    name: "make-manifest",
    buildStart() {
      if (isDev) {
        make(distDir);
      }
    },
    buildEnd() {
      if (!isDev) {
        return;
      }
      make(publicDir);
    },
  };
}
