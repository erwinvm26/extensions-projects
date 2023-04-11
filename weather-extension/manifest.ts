import packageJson from "./package.json";

export const icons = {
  16: "icons/document_16.png",
  24: "icons/document_24.png",
  32: "icons/document_32.png",
  48: "icons/document_48.png",
  128: "icons/document_128.png",
  256: "icons/document_256.png",
};

export const manifest: chrome.runtime.ManifestV3 = {
  manifest_version: 3,
  version: packageJson.version,
  name: packageJson.name,
  description: packageJson.description,
  author: packageJson.author.name,
  icons: {
    "16": icons[16],
    "48": icons[48],
    "128": icons[128],
    "256": icons[256],
  },
  action: {
    default_icon: {
      "16": icons[16],
      "24": icons[24],
      "32": icons[32],
    },
    default_popup: "./src/pages/popup/index.html",
  },
  options_page: "./src/pages/options/index.html",
  background: {
    type: "module",
    service_worker: "js/background.js",
  },
  permissions: ["notifications", "tabs", "webNavigation", "storage"],
};
