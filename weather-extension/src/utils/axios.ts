import axios from "axios";
import config from "@src/config";
import { WeatherApiData } from "./interfaceq";
import { url } from "inspector";

interface City {
  q: string;
}

const baseURL = `${config.URL_API}?key=${config.API_KEY}&aqi=no`;

const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getCity({ q }: City) {
  try {
    const city = await instance.get<WeatherApiData>("", {
      params: {
        q,
      },
    });

    if (!city) {
      throw new Error("City not found");
    }

    return city.data;
  } catch (error) {
    console.log({ error });
  }
}

export async function getCityFetch({ q }: City): Promise<WeatherApiData> {
  const b = new URL(baseURL);
  b.searchParams.append("q", q);

  const response = await fetch(b, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("City not found");
  }

  return response.json();
}

export default instance;
