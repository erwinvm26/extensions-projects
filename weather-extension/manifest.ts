import packageJson from "./package.json";

export const icons = {
  16: "icons/cloudy_16.png",
  24: "icons/cloudy_24.png",
  32: "icons/cloudy_32.png",
  48: "icons/cloudy_48.png",
  128: "icons/cloudy_128.png",
  256: "icons/cloudy_256.png",
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
  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: ["js/index.global.js"],
      run_at: "document_end",
    },
  ],
  permissions: ["notifications", "tabs", "webNavigation", "storage"],
};
