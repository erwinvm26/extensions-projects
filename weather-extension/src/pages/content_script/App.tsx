// import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";

// import { WeatherApiData, getStorageChrome } from "../../utils";

function App() {
  // const [weatherData, setWeatherData] = useState<WeatherApiData[]>([]);

  // useEffect(() => {
  //   const funWeather = async () => {
  //     await getWeatherData();
  //   };

  //   funWeather();
  // }, []);

  // const getWeatherData = async () => {
  //   const result = await getStorageChrome<WeatherApiData>("data");

  //   const weatherData = result.data || [];

  //   setWeatherData(weatherData);
  // };

  return (
    <Box padding="5" width="100px" height="100px" backgroundColor="#1e90ff">
      Hello
    </Box>
  );
}

export default App;
