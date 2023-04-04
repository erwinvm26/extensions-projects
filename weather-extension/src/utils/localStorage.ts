import { WeatherApiData } from "./interfaceq";

interface Storage {
  data: WeatherApiData[];
}

export const setStorage = ({ data }: Storage) => {
  chrome.storage.local.set({ data });
};

export const getStorage = (key: string) => {
  return chrome.storage.local.get([key]);
};
