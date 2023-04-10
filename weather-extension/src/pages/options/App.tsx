import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";

import { setStorage, getStorage, getCity, WeatherApiData } from "@src/utils";

interface Form {
  cityName: string;
}

function App() {
  const [qAlert, setQAlert] = useState<boolean>(false);
  const [value, setValue] = useState("");
  const { register, handleSubmit, reset } = useForm<Form>();

  useEffect(() => {
    const funTemp = async () => {
      const response = await getStorage("values");

      setValue(response.values ?? "");
    };

    funTemp();
  }, []);

  const onSubmit: SubmitHandler<Form> = async ({ cityName }) => {
    try {
      const dataCity = await getCity({
        q: cityName,
      });

      const result = [dataCity];

      const store = await setStorage<WeatherApiData[]>({
        data: result,
        values: cityName,
      });

      if (store.values !== "") {
        setQAlert(true);
        setTimeout(() => {
          setQAlert(false);
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card width="500px">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody>
          <FormControl>
            <FormLabel>City Default</FormLabel>
            <Input
              type="text"
              {...register("cityName", {
                required: true,
                pattern: /^[A-Za-z]+$/i,
                maxLength: 100,
                minLength: 3,
              })}
              value={value}
              onChange={(prev) => setValue(prev.target.value)}
              placeholder="Write to here"
            />
            {qAlert && <FormHelperText>It is saved</FormHelperText>}
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full" mt="4">
            Save
          </Button>
        </CardBody>
      </form>
    </Card>
  );
}

export default App;
