import { CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  Heading,
  useColorModeValue,
  Container,
  chakra,
  HStack,
  Icon,
  Button,
  VStack,
} from "@chakra-ui/react";
import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Prix de la formation | React-Formation" },
    {
      name: "description",
      content:
        "Découvrez nos formations React sur mesure pour entreprises, avec des tarifs flexibles à partir de 500 euros. Que ce soit pour une initiation ou une formation avancée, nos programmes sont adaptés aux besoins et au nombre de participants. Contactez-nous pour un devis personnalisé. Note : Nous n'offrons pas de certification Qualiopi, mais nous nous engageons à fournir une formation de qualité supérieure, centrée sur les résultats concrets et l'amélioration des compétences.",
    },
  ];
};

export function headers() {
  return {
    "Cache-Control": "max-age=36000, stale-while-revalidate=18000",
  };
}

export default function SimpleThreeColumns() {
  return (
    <Container as={"main"} maxW={"3xl"} py={12}>
      <Box
        w={"sm"}
        rounded="md"
        bg={useColorModeValue("gray.50", "gray.700")}
        boxShadow="lg"
        marginInline="auto"
        mb={8}
        p={6}
      >
        <Box textAlign="center">
          <chakra.h2 fontSize="2xl" fontWeight="bold">
            Formation sur mesure
          </chakra.h2>
          <Box fontSize="5xl" fontWeight="bold">
            <Text fontSize="3xl" fontWeight="normal" top="-1em">
              à partir de
            </Text>
            500
            <Text as="sup" fontSize="3xl" fontWeight="normal" top="-1em">
              €
            </Text>
          </Box>
        </Box>
        <VStack spacing={2} alignItems="flex-start" my={6}>
          <HStack spacing={3}>
            <Icon as={CheckIcon} h={4} w={4} color="green.500" />
            <Text fontSize="sm" color="gray.500">
              100% sur mesure
            </Text>
          </HStack>
          <HStack spacing={3}>
            <Icon as={CheckIcon} h={4} w={4} color="green.500" />
            <Text fontSize="sm" color="gray.500">
              Des formations sur React.js à distance où en présentiel
            </Text>
          </HStack>
          <HStack spacing={3}>
            <Icon as={CheckIcon} h={4} w={4} color="green.500" />
            <Text fontSize="sm" color="gray.500">
              Enseignement des fondamentaux et des sujets avancé
            </Text>
          </HStack>
          <HStack spacing={3}>
            <Icon as={CheckIcon} h={4} w={4} color="green.500" />
            <Text fontSize="sm" color="gray.500">
              Des exercices pratiques tout au long de la formation
            </Text>
          </HStack>
          <HStack spacing={3}>
            <Icon as={CheckIcon} h={4} w={4} color="green.500" />
            <Text fontSize="sm" color="gray.500">
              Typescript ou JS
            </Text>
          </HStack>
        </VStack>
        <Button
          colorScheme="brand"
          as={Link}
          to="/contact"
          variant="solid"
          size="md"
          rounded="md"
          w="100%"
        >
          Réservez votre formation
        </Button>
      </Box>
      <Heading
        as="h1"
        mb={4}
        fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
        color={"brand.400"}
      >
        Des tarifs flexibles
      </Heading>
      <Text>
        Chez React-formation, nous comprenons que chaque équipe a des besoins
        uniques. C'est pourquoi nous proposons une tarification à l'heure. Pas
        de soucis à vous faire, si vous lors de nos sessions nous passons 1H10
        ou même 1H20 au lieu d'une heure, nous ne vous facturerons pas 2H.
      </Text>
      <Heading
        as="h2"
        my={4}
        fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
        color={"brand.400"}
      >
        flexibilité
      </Heading>
      <Text>
        Notre objectif est de vous offrir une flexibilité maximale pour répondre
        à vos besoins en mentorat en entreprise. Si vous souhaitez discuter des
        tarifs spécifiques pour votre entreprise ou si vous avez des questions
        sur nos services, n'hésitez pas à nous contacter. Nous serions ravis de
        vous fournir un devis personnalisé et de discuter de la manière dont
        nous pouvons vous aider à atteindre vos objectifs.
      </Text>
      <Heading
        as="h2"
        my={4}
        fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
        color={"brand.400"}
      >
        Contactez-Nous
      </Heading>
    </Container>
  );
}
