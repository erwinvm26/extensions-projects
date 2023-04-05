console.log("Server worker started");

import { setStorage, WeatherApiData, getStorage } from "../utils";

chrome.runtime.onInstalled.addListener(async function () {
  await setStorage({ data: [] });
});

async function main() {
  const result = await getStorage<WeatherApiData>("data");

  if (result.data?.length ?? 0 > 0) {
    chrome.action.setBadgeText({
      text: `${result.data?.length ?? 0}`,
    });
  }
}

main();

export {};
