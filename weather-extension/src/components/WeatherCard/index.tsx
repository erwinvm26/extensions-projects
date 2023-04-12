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
  onDelete?: MouseEventHandler<HTMLButtonElement>;
  isContentScript?: boolean;
}

export const WeatherCard = ({
  name,
  feelLike,
  onDelete,
  isContentScript = false,
}: WeatherCardProps) => {
  return (
    <Card mb={isContentScript ? "0" : "2"} shadow="md" maxW="full">
      <CardBody>
        <Flex>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Box>
              <Heading size={isContentScript ? "md" : "sm"}>{name}</Heading>
              <Text>
                Feel like: <b>{feelLike}</b>
              </Text>
            </Box>
          </Flex>
          {!isContentScript && (
            <IconButton
              variant="ghost"
              colorScheme="gray"
              aria-label="See menu"
              icon={<IoCloseOutline />}
              onClick={onDelete}
            />
          )}
        </Flex>
      </CardBody>
    </Card>
  );
};
