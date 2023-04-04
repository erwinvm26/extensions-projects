import { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Card,
  CardBody,
} from "@chakra-ui/react";

import { WeatherCard } from "../../components";
import { getCity, WeatherApiData, setStorage } from "../../utils";

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
  const [datas, setDatas] = useState<WeatherApiData[]>([]);

  const onSubmit: SubmitHandler<Form> = ({ search }) => {
    getCity({
      q: search,
    })
      .then((d) => {
        setStorage({
          data: [...datas, d],
        });
        setDatas([...datas, d]);
      })
      .catch((error) => console.log(error));

    reset({
      search: "",
    });
  };

  return (
    <Box padding="5" position="absolute" width="full" backgroundColor="#1e90ff">
      <Card mb="2" shadow="md" maxW="full">
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
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
              />
              <FormErrorMessage>
                {errors.search?.message ?? ""}
              </FormErrorMessage>
            </FormControl>
          </form>
        </CardBody>
      </Card>

      {datas.map((data, idx) => (
        <WeatherCard
          key={idx}
          name={data.location.name}
          feelLike={data.current.feelslike_c}
        />
      ))}
    </Box>
  );
}

export default App;
