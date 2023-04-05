import { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Card,
  CardBody,
  Button,
} from "@chakra-ui/react";

import { WeatherCard } from "../../components";
import { getCity, WeatherApiData, setStorage, getStorage } from "../../utils";

import { useForm, SubmitHandler } from "react-hook-form";

interface Form {
  search: string;
}

function App() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Form>();
  const [weatherData, setWeatherData] = useState<WeatherApiData[]>([]);

  useEffect(() => {
    const funWeather = async () => {
      await getWeatherData();
    };

    funWeather();
  }, []);

  const onSubmit: SubmitHandler<Form> = async ({ search }) => {
    try {
      const city = await getCity({
        q: search,
      });

      if (!city) {
        throw new Error("City not found");
      }

      const result = [...weatherData, city];

      const store = await setStorage<WeatherApiData[]>({ data: result });

      setWeatherData(store);

      reset({
        search: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getWeatherData = async () => {
    const result = await getStorage<WeatherApiData>("data");

    const weatherData = result.data || [];

    setWeatherData(weatherData);
  };

  const handleDelete = async (index: number) => {
    weatherData.splice(index, 1);

    const store = await setStorage<WeatherApiData[]>({
      data: [...weatherData],
    });

    setWeatherData(store);
  };

  return (
    <Box padding="5" position="absolute" width="full" backgroundColor="#1e90ff">
      <Card mb="2" shadow="md" maxW="full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardBody>
            <FormControl>
              <FormLabel>Search city</FormLabel>
              <Input
                type="text"
                {...register("search", {
                  required: true,
                  pattern: /^[A-Za-z]+$/i,
                  maxLength: 100,
                  minLength: 3,
                })}
                placeholder="Press Enter or Add from it button"
              />
              <FormErrorMessage>
                {errors.search?.message ?? ""}
              </FormErrorMessage>
            </FormControl>
          </CardBody>
          <Button
            type="submit"
            borderTopLeftRadius="0"
            borderTopRightRadius="0"
            width="full"
          >
            Add Weather
          </Button>
        </form>
      </Card>

      {weatherData.map((data, idx) => (
        <WeatherCard
          key={idx}
          name={data.location.name}
          feelLike={data.current.feelslike_c}
          onDelete={() => handleDelete(idx)}
        />
      ))}
    </Box>
  );
}

export default App;
