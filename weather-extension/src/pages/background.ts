console.log("Server worker started");
import { setStorage, WeatherApiData, setBadge, getCityFetch } from "../utils";

chrome.runtime.onInstalled.addListener(async function () {
  await setStorage({ data: [] });
});

async function main() {
  try {
    const cityName = "Managua";
    const result = await getCityFetch({
      q: cityName,
    });

    setBadge(result.current.feelslike_c);

    await setStorage<WeatherApiData[]>({
      data: [result],
      values: cityName,
    });
  } catch (error) {
    console.log(error);
  }
}

main();

export {};
