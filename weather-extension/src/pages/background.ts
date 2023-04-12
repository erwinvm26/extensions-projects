console.log("Server worker started");
import {
  setStorageChrome,
  WeatherApiData,
  setBadgeChrome,
  getCityFetch,
} from "../utils";

// const filter = {
//   url: [{ hostSuffix: "reddit.com" }],
// };

chrome.runtime.onInstalled.addListener(async function () {
  await setStorageChrome({ data: [] });
});

// chrome.webNavigation.onCompleted.addListener((data) => {
//   const _url = data.url;

//   if (["reddit.com"].some((el) => _url.includes(el))) {
//     notificationChrome({
//       title: "Notification Extension",
//       message: `${_url}`,
//     });
//   }
// }, filter);

async function main() {
  try {
    const cityName = "Managua";
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
