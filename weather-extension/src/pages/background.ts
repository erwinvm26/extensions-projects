console.log("Server worker started");
import {
  setStorageChrome,
  WeatherApiData,
  setBadgeChrome,
  getCityFetch,
  getCity,
} from "../utils";

chrome.runtime.onInstalled.addListener(async function () {
  await setStorageChrome({ data: [] });
});

async function main() {
  try {
    const cityName = "Managua";
    const a = await getCity({
      q: cityName,
    });

    console.log({ a });

    const result = await getCityFetch({
      q: cityName,
    });

    setBadgeChrome(result.current.feelslike_c);

    await setStorageChrome<WeatherApiData[]>({
      data: [result],
      values: cityName,
    });
  } catch (error) {
    console.log(error);
  }
}

main();

export {};
