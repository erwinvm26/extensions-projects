import { MouseEventHandler } from "react";
import {
  Card,
  CardBody,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { IoCloseOutline } from "react-icons/io5";

interface WeatherCardProps {
  name: string;
  feelLike: number;
  onDelete: MouseEventHandler<HTMLButtonElement>;
}

export const WeatherCard = ({ name, feelLike, onDelete }: WeatherCardProps) => {
  return (
    <Card mb="2" shadow="md" maxW="full">
      <CardBody>
        <Flex>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Box>
              <Heading size="sm">{name}</Heading>
              <Text>
                Feel like: <b>{feelLike}</b>
              </Text>
            </Box>
          </Flex>
          <IconButton
            variant="ghost"
            colorScheme="gray"
            aria-label="See menu"
            icon={<IoCloseOutline />}
            onClick={onDelete}
          />
        </Flex>
      </CardBody>
    </Card>
  );
};
