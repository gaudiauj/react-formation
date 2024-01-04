import type { MetaFunction } from "@remix-run/node";

import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  useBreakpointValue,
  Box,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/react";
import { Link } from "@remix-run/react";
import { CheckIcon } from "@chakra-ui/icons";

export const meta: MetaFunction = () => {
  return [
    {
      title: `Formation et mentorat en entreprise sur React | React-Formation`,
    },
    {
      name: "description",
      content:
        "Bénéficiez de notre expertise en TypeScript et JavaScript avec des exercices pratiques. Découvrez notre service de mentorat en entreprise : coaching personnalisé, revues de code, et support flexible sans engagement à long terme. Payez uniquement pour les interventions réalisées. Transformez votre équipe avec une formation adaptée à vos besoins en React.",
    },
  ];
};

export function headers() {
  return {
    "Cache-Control": "max-age=3600000, stale-while-revalidate=1800000",
  };
}

export default function Index() {
  const height = useBreakpointValue({ base: "20%", md: "30%" });
  return (
    <>
      <Stack
        minH={"calc(100vh - 40px)"}
        direction={{ base: "column", md: "row" }}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={6} w={"full"} maxW={"full"}>
            <Box>
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
                    bg: "brand.300",
                    zIndex: -1,
                  }}
                >
                  React
                </Text>
                <br />{" "}
                <Text color={"brand.400"} as={"span"}>
                  Formation
                </Text>{" "}
              </Heading>
              <Heading
                as="h2"
                fontSize="2xl"
                lineHeight={1.2}
                fontWeight="bold"
                bgGradient="linear(to-l, #4898E5,#1F82E0)"
                bgClip="text"
              >
                Développez vos compétences en React
              </Heading>
            </Box>

            <Flex gap={8} wrap="wrap" justifyContent="space-around">
              <Box
                bg={useColorModeValue("white", "gray.900")}
                px={6}
                py={10}
                w={"md"}
              >
                <Heading mb={8} color={"brand.400"} fontSize="2xl">
                  Mentorat en entreprise sur demande
                </Heading>
                <List spacing={3} fontSize={"xl"}>
                  <ListItem>
                    <ListIcon as={CheckIcon} color="blue.400" />
                    Coaching Personnalisé : Bénéficiez d'une aide sur mesure
                    pour vos équipes.
                  </ListItem>
                  <ListItem>
                    <ListIcon as={CheckIcon} color="blue.400" />
                    Revues de Code : Assurez-vous que votre code est optimisé,
                    propre et conforme aux meilleures pratiques.
                  </ListItem>
                  <ListItem>
                    <ListIcon as={CheckIcon} color="blue.400" />
                    Support Flexible : Nous sommes disponibles quand vous en
                    avez besoin, sans engagement à long terme.
                  </ListItem>
                  <ListItem>
                    <ListIcon as={CheckIcon} color="blue.400" />
                    Payer seulement pour les interventions réalisées
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
                  <Button as={Link} rounded={"full"} to="/contact">
                    Nous contacter
                  </Button>
                  <Button
                    as={Link}
                    variant={"link"}
                    size={"sm"}
                    to="/mentorat/index"
                  >
                    Détail du mentorat
                  </Button>
                </Stack>{" "}
              </Box>
              <Box
                bg={useColorModeValue("white", "gray.900")}
                px={6}
                py={10}
                w="md"
              >
                <Heading mb={8} color={"brand.400"} fontSize="2xl">
                  Des Formations sur mesures
                </Heading>
                <List spacing={3} fontSize={"xl"}>
                  <ListItem>
                    <ListIcon as={CheckIcon} color="blue.400" />
                    Des formations sur React.js à distance où en présentiel
                  </ListItem>
                  <ListItem>
                    <ListIcon as={CheckIcon} color="blue.400" />
                    Enseignement des fondamentaux et des sujets avancé
                  </ListItem>
                  <ListItem>
                    <ListIcon as={CheckIcon} color="blue.400" />
                    Des exercices pratiques tout au long de la formation
                  </ListItem>
                  <ListItem>
                    <ListIcon as={CheckIcon} color="blue.400" />
                    Une formation sur mesure selon vos besoins
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
                  <Button as={Link} rounded={"full"} to="/contact">
                    Réserver
                  </Button>
                  <Button
                    as={Link}
                    variant={"link"}
                    size={"sm"}
                    to="/formations"
                  >
                    Détail des formations
                  </Button>
                </Stack>{" "}
              </Box>
            </Flex>
          </Stack>
        </Flex>
      </Stack>
    </>
  );
}
