import { log } from "console";
import { WeatherApiData } from "./interfaceq";

interface Storage<T = any> {
  data?: T[];
  values?: T;
}

export function setStorage({ data }: Storage) {
  chrome.storage.local.set({ data });
}

export function getStorage<T = unknown>(key: keyof Storage) {
  return chrome.storage.local.get([key]) as T;
}

async function hola() {
  const data = await getStorage<WeatherApiData[]>("data");
}
