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
import Testimonial from "~/components/Testimonial";

export const meta: MetaFunction = () => {
  return [
    {
      title: `Formation et mentorat en entreprise sur React | React-Formation`,
    },
    {
      name: "description",
      content:
        "Rejoignez React-Formation.fr pour des formations spécialisées et du mentorat en entreprise sur React. Profitez d'un coaching sur mesure, de revues de code et d'un support flexible. Parfait pour les équipes cherchant à exceller en React.js, avec des options de formation React à distance et en présentiel",
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
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={6} w={"full"} maxW={"full"}>
            <Box>
              <Heading
                as="h1"
                fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                display={"flex"}
                flexDirection={"column-reverse"}
              >
                <Text color={"brand.400"} as={"span"}>
                  Formation
                </Text>{" "}
                <Box>
                  <Text
                    as={"span"}
                    position={"relative"}
                    width={"100%"}
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
                </Box>
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
                  Mentorat et coaching React en entreprise sur demande
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
                    Payez seulement pour les interventions réalisées
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
                  Des Formations React sur mesures
                </Heading>
                <List spacing={3} fontSize={"xl"}>
                  <ListItem>
                    <ListIcon as={CheckIcon} color="blue.400" />
                    Des formations sur React.js à distance ou en présentiel
                  </ListItem>
                  <ListItem>
                    <ListIcon as={CheckIcon} color="blue.400" />
                    Enseignement des fondamentaux et des sujets avancés
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
        <Stack
          display={"flex"}
          alignItems={"center"}
          gap={4}
          marginBottom={"16px"}
        >
          <Heading
            as="h2"
            fontSize={{ base: "2xl", md: "lg", lg: "xl" }}
            color={"brand.400"}
            textAlign={"center"}
          >
            Témoignages
          </Heading>
          <Testimonial
            {...{
              username: "Bastien Ho",
              position: "Directeur technique",
              company: "Avec NOUS",
              link: "https://www.avecnous.eu/",
              note: 4.7,
              content:
                "Jean a su adapter sa formation à nos différents profils. NOUS avons pu ainsi bénéficier d'une formation sur mesure tant sur le contenu que pour les modalités sans  rogner sur la qualité et la précision. Je recommande vivement.",
            }}
          ></Testimonial>
        </Stack>
      </Stack>
    </>
  );
}
