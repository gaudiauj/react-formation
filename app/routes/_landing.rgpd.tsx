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
  return [
    { title: "react-formation | rgpd " },
    {
      description: "comment sont traitées vos données sur react-formation ?",
    },
  ];
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
          <Heading as="h1">Vos données vous appartiennes</Heading>
          <Text mt={4}>
            Aucun cookie autre que fonctionnel n'est collecté sur ce site, pas
            de google analytics ni de Facebook pixel ou autres outils de
            tracking. Quand on vous dit que vos données vous appartiennent et
            sont importantes pour nous, on le pense vraiment.
          </Text>
          <Text mt={4}>
            L'ensemble des outils utilisé sont open source et hébergés sur des
            serveurs européens. Les données collectées lors de la demande de
            contact sont uniquement utilisées pour vous répondre, ne sont pas
            partagées avec des tiers, et ne sont gardés que pendant 3 mois.
          </Text>
          <br />
          <Text>
            Vous pouvez demander à tout moment la suppression ou l'accès à vos
            données en nous contactant à l'adresse suivante:{" "}
            <a href="mailto:contact@react-formation.fr">
              contact@react-formation.fr
            </a>
          </Text>
        </Box>
      </Stack>
    </Flex>
  );
}
