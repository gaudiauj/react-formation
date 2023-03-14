import type { MetaFunction } from "@remix-run/server-runtime";
import HomeImage from "public/home.webp";

import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
  useBreakpointValue,
  Box,
  List,
  ListIcon,
  ListItem,
  Icon,
  createIcon,
  Link,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

export const meta: MetaFunction = () => {
  return {
    title: "react-formation",
    description: "Formation professionnel sur React en présentiel ou en remote",
  };
};

export function headers() {
  return {
    "Cache-Control": "max-age=3600000, stale-while-revalidate=1800000",
  };
}

export default function Index() {
  const height = useBreakpointValue({ base: "20%", md: "30%" });
  const displayPrice = useBreakpointValue({
    base: false,
    lg: true,
  });

  const color = useColorModeValue("gray.800", "gray.300");
  return (
    <Stack
      minH={"calc(100vh - 60px)"}
      direction={{ base: "column", md: "row" }}
      bg={useColorModeValue("gray.100", "gray.900")}
    >
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Heading as="h1" fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
            <Text
              as={"span"}
              position={"relative"}
              css={{
                zIndex: 1,
              }}
              _after={{
                content: "''",
                width: "full",
                height: height,
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "blue.300",
                zIndex: -1,
              }}
            >
              React
            </Text>
            <br />{" "}
            <Text color={"blue.400"} as={"span"}>
              Formation
            </Text>{" "}
          </Heading>
          <Box bg={useColorModeValue("gray.50", "gray.900")} px={6} py={10}>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={CheckIcon} color="blue.400" />
                Des formations sur React.js en présentiel ou remote
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="blue.400" />
                Enseignement des fondamentaux et des sujets expert
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="blue.400" />
                Des exercices pratique tout au long de la formation
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="blue.400" />
                Une formation sur mesure selon vos besoin
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="blue.400" />
                Typescript ou JS
              </ListItem>
            </List>
            <Stack
              direction={"column"}
              spacing={3}
              mt={4}
              align={"center"}
              alignSelf={"center"}
              position={"relative"}
            >
              <Button as={Link} rounded={"full"} href="/contact">
                Reserver
              </Button>
              <Button as={Link} variant={"link"} size={"sm"}>
                Detail des formations
              </Button>
              {displayPrice && (
                <Box position={"absolute"} right={170}>
                  <Icon
                    as={Arrow}
                    color={color}
                    w={71}
                    position={"absolute"}
                    right={-71}
                    top={"10px"}
                  />
                  <Text
                    fontSize={"md"}
                    fontFamily={"Caveat"}
                    position={"absolute"}
                    right={"-125px"}
                    top={"-15px"}
                    transform={"rotate(10deg)"}
                  >
                    à partir de 450€
                  </Text>
                </Box>
              )}
            </Stack>{" "}
          </Box>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image alt={"Login Image"} objectFit={"cover"} src={HomeImage} />
      </Flex>
    </Stack>
  );
}

const Arrow = createIcon({
  displayName: "Arrow",
  viewBox: "0 0 72 24",
  path: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.600904 7.08166C0.764293 6.8879 1.01492 6.79004 1.26654 6.82177C2.83216 7.01918 5.20326 7.24581 7.54543 7.23964C9.92491 7.23338 12.1351 6.98464 13.4704 6.32142C13.84 6.13785 14.2885 6.28805 14.4722 6.65692C14.6559 7.02578 14.5052 7.47362 14.1356 7.6572C12.4625 8.48822 9.94063 8.72541 7.54852 8.7317C5.67514 8.73663 3.79547 8.5985 2.29921 8.44247C2.80955 9.59638 3.50943 10.6396 4.24665 11.7384C4.39435 11.9585 4.54354 12.1809 4.69301 12.4068C5.79543 14.0733 6.88128 15.8995 7.1179 18.2636C7.15893 18.6735 6.85928 19.0393 6.4486 19.0805C6.03792 19.1217 5.67174 18.8227 5.6307 18.4128C5.43271 16.4346 4.52957 14.868 3.4457 13.2296C3.3058 13.0181 3.16221 12.8046 3.01684 12.5885C2.05899 11.1646 1.02372 9.62564 0.457909 7.78069C0.383671 7.53862 0.437515 7.27541 0.600904 7.08166ZM5.52039 10.2248C5.77662 9.90161 6.24663 9.84687 6.57018 10.1025C16.4834 17.9344 29.9158 22.4064 42.0781 21.4773C54.1988 20.5514 65.0339 14.2748 69.9746 0.584299C70.1145 0.196597 70.5427 -0.0046455 70.931 0.134813C71.3193 0.274276 71.5206 0.70162 71.3807 1.08932C66.2105 15.4159 54.8056 22.0014 42.1913 22.965C29.6185 23.9254 15.8207 19.3142 5.64226 11.2727C5.31871 11.0171 5.26415 10.5479 5.52039 10.2248Z"
      fill="currentColor"
    />
  ),
});
