import {
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return {
    title: "react-formation | code de conduite ",
    description: "Code de conduite des ateliers de formation",
  };
};

export default function Index() {
  return (
    <Flex p={8} flex={1} align={"center"} justify={"center"}>
      <Stack spacing={6} w={"full"} maxW={"xl"}>
        <Box
          borderColor={useColorModeValue("gray.200", "gray.700")}
          borderWidth="1px"
          borderRadius="lg"
          p={8}
        >
          <Heading as="h1">Code de conduite des ateliers</Heading>
          <Text mt={4}>
            Tous les participants, instructeurs et hôtes de notre atelier sont
            tenus d'accepter le code de conduite suivant. Les organisateurs
            appliqueront ce code tout au long des ateliers. Nous attendons la
            coopération de tous les participants pour aider à assurer un
            environnement sûr pour tout le monde.
          </Text>
          <br />
          <Text>
            Notre atelier se consacre à offrir une expérience sans harcèlement à
            tous, quels que soient le sexe, l'identité et l'expression de genre,
            l'âge, l'orientation sexuelle, le handicap, l'apparence physique, la
            taille, la race ou la religion (ou son absence). Nous ne tolérons
            aucun harcèlement des participants à l'atelier sous quelque forme
            que ce soit. Le langage et les images à caractère sexuel ne sont
            appropriés nulle part pour l'atelier, y compris les présentations,
            les questions, les commentaires, Twitter et autres médias en ligne.
            Les participants à l'atelier qui enfreignent ces règles peuvent être
            sanctionnés ou expulsés de l'atelier sans remboursement à la
            discrétion des organisateurs de l'atelier
          </Text>
        </Box>
      </Stack>
    </Flex>
  );
}
