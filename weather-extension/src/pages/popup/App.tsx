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
  Text,
  IconButton,
} from "@chakra-ui/react";
import { MdPictureInPicture, MdOutlinePictureInPicture } from "react-icons/md";
import { WeatherCard } from "@src/components";
import {
  getCity,
  WeatherApiData,
  setStorageChrome,
  getStorageChrome,
  notificationChrome,
  Message,
  tabsQueryChrome,
} from "@src/utils";

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
  const [activePopup, setActivePopup] = useState(false);

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

      const result = [...weatherData, city];

      const store = await setStorageChrome<WeatherApiData>({ data: result });

      notificationChrome({
        title: "Weather Notification",
        message: `Add new city: ${city?.location.name ?? ""}`,
      });

      setWeatherData(store.data ?? []);

      reset({
        search: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getWeatherData = async () => {
    const result = await getStorageChrome<WeatherApiData>([
      "data",
      "activeWeatherFloting",
    ]);

    const weatherData = result.data || [];
    const activePopup = result.activeWeatherFloting || false;

    setWeatherData(weatherData);
    setActivePopup(activePopup);
  };

  const handleDelete = async (index: number) => {
    weatherData.splice(index, 1);

    const store = await setStorageChrome<WeatherApiData>({
      data: [...weatherData],
    });

    setWeatherData(store.data ?? []);
  };

  const handlePopup = () => {
    tabsQueryChrome({
      fn: (tabs) => {
        if (tabs.length > 0) {
          chrome.tabs.sendMessage(tabs[0].id ?? 0, Message.TOOGLE_OVERLAY);
          setActivePopup(false);
        }
      },
    });
  };

  return (
    <Box padding="5" position="absolute" width="full" backgroundColor="#1e90ff">
      <Card mb="2" shadow="md" maxW="full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardBody>
            <FormControl>
              <FormLabel
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text>Search city</Text>
                <IconButton
                  variant="ghost"
                  aria-label="Picture in Picture"
                  colorScheme="blue"
                  padding="0"
                  icon={
                    activePopup ? (
                      <MdPictureInPicture size="20px" />
                    ) : (
                      <MdOutlinePictureInPicture size="20px" />
                    )
                  }
                  onClick={() => handlePopup()}
                />
              </FormLabel>
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
