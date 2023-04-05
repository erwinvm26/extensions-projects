console.log("Server worker started");

import { setStorage } from "../utils";

chrome.runtime.onInstalled.addListener(async function () {
  await setStorage({ data: [] });
  chrome.action.setBadgeText({
    text: "90",
  });
});

export {};
