import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { WeatherCard } from "@src/components";

import { WeatherApiData, getStorageChrome } from "../../utils";

function App() {
  const [weatherData, setWeatherData] = useState<WeatherApiData[]>([]);

  useEffect(() => {
    const funWeather = async () => {
      await getWeatherData();
    };

    funWeather();
  }, []);

  const getWeatherData = async () => {
    const result = await getStorageChrome<WeatherApiData>("data");

    const weatherData = result.data || [];

    setWeatherData(weatherData);
  };

  if (weatherData.length === 0) {
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
