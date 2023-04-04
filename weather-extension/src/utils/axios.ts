import axios from "axios";
import config from "@src/config";
import { WeatherApiData } from "./interfaceq";

interface City {
  q: string;
}

const instance = axios.create({
  baseURL: `${config.URL_API}?key=${config.API_KEY}&aqi=no`,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getCity({ q }: City) {
  const city = await instance.get<WeatherApiData>("", {
    params: {
      q,
    },
  });

  if (!city) {
    throw new Error("City not found");
  }

  return city.data;
}

export default instance;
