import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { WeatherCard } from "@src/components";

import { Message, WeatherApiData, getStorageChrome } from "../../utils";

function App() {
  const [weatherData, setWeatherData] = useState<WeatherApiData[]>([]);
  const [activeWeather, setActiveWeather] = useState<boolean>(false);

  useEffect(() => {
    const funWeather = async () => {
      await getWeatherData();
    };

    funWeather();
  }, []);

  useEffect(() => {
    console.log({ activeWeather });

    chrome.runtime.onMessage.addListener((msg) => {
      if (msg === Message.TOOGLE_OVERLAY) {
        setActiveWeather(!activeWeather);
      }
    });
  }, [activeWeather]);

  const getWeatherData = async () => {
    const result = await getStorageChrome<WeatherApiData>([
      "data",
      "activeWeatherFloting",
    ]);

    const weatherData = result.data || [];
    const activeWeatherFloting = result.activeWeatherFloting || false;

    setWeatherData(weatherData);
    setActiveWeather(activeWeatherFloting);
  };

  if (!activeWeather || weatherData.length === 0) {
    return null;
  }

  return (
    <Box
      padding="2"
      zIndex={999999}
      backgroundColor="#1e90ff"
      position="fixed"
      top="16"
      left="16"
      borderRadius="md"
      shadow="md"
    >
      <WeatherCard
        name={weatherData[0].location.name}
        feelLike={weatherData[0].current.feelslike_c}
        isContentScript={true}
      />
    </Box>
  );
}

export default App;
