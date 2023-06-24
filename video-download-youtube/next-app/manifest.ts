export const icons = {
  16: "icons/favicon-16.png",
  32: "icons/favicon-32.png",
  48: "icons/favicon-48.png",
  128: "icons/favicon-128.png",
}
export const manifest: chrome.runtime.ManifestV3 = {
  manifest_version: 3,
  version: "1.0.0",
  name: "Next App",
  author: "Erwin Vargas",
  icons: {
    "16": icons[16],
    "32": icons[32],
    "48": icons[48],
    "128": icons[128],
  },
  action: {
    default_popup: "index.html"
  },
  content_scripts: [
    {
      all_frames: true,
      run_at: "document_start",
      js: ["content.js"]
    }
  ],
  
} 