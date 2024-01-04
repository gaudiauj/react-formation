import {
  Box,
  SimpleGrid,
  Text,
  Stack,
  Heading,
  useColorModeValue,
  Link as UiLink,
  Container,
} from "@chakra-ui/react";
import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Questions sur la formation | React-Formation" },
    {
      name: "description",
      content:
        "Vous avez des questions sur notre formation React ? Découvrez tout ce que vous devez savoir ! De l'utilisation de TypeScript/JavaScript à la tarification flexible en passant par les avantages de la formation pour votre entreprise, trouvez les réponses ici. Contactez-nous pour en savoir plus sur la meilleure façon d'améliorer les compétences de votre équipe en développement React.",
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
    <Container
      as={"main"}
      maxW={"full"}
      py={12}
      bg={useColorModeValue("gray.50", "gray.900")}
    >
      <Stack minH={"calc(100vh - 60px)"} p={8}>
        <Heading
          as="h1"
          mb={4}
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
        >
          Questions fréquentes
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Box
            bg={useColorModeValue("white", "gray.900")}
            px={6}
            py={10}
            rounded={"md"}
          >
            <Heading
              as="h2"
              mb={4}
              fontSize={{ base: "lg", md: "lg", lg: "xl" }}
            >
              Notre équipe utilise typescript/javascript est-ce que le contenu
              sera adapté ?
            </Heading>
            <Text>
              Bien que les ateliers React ne concernent pas spécifiquement
              TypeScript, nous avons notre contenu en TypeScript car il est
              extrêmement populaire et la plupart de nos clients le demandent.
              Si les participants ne font pas de TS, ne vous inquiétez pas, nous
              enseignerons les bases au fur et à mesure.
            </Text>
          </Box>
          <Box
            bg={useColorModeValue("white", "gray.900")}
            px={6}
            py={10}
            rounded={"md"}
          >
            <Heading
              as="h2"
              mb={4}
              fontSize={{ base: "lg", md: "lg", lg: "xl" }}
            >
              Combien de personnes peuvent assister à la formation ?
            </Heading>
            <Text>
              Nous n'avons pas de limite de participants, nos formateurs peuvent
              s'adapter. Cependant la formation comportant de nombreux exercices
              pratiques et d'échange avec le formateur, nous conseillons des
              sessions de 4 à 6 personnes.
            </Text>
          </Box>
          <Box
            bg={useColorModeValue("white", "gray.900")}
            px={6}
            py={10}
            rounded={"md"}
          >
            <Heading
              as="h2"
              mb={4}
              fontSize={{ base: "lg", md: "lg", lg: "xl" }}
            >
              Est-ce que la formation est en personne ou à distance ?
            </Heading>
            <Text>
              Notre formation peut être en présentiel ou à distance. Si possible
              nous préférons la formation en présentiel car cela permet de créer
              un lien plus fort entre les participants et le formateur et de
              facilité la formation. Nous nous déplaçons gratuitement à Paris,
              un surcout sera appliqué pour les villes en région parisienne.
              Nous pouvons aussi nous déplacer ailleurs mais le logement et les
              frais de déplacement seront à la charge du client.
            </Text>
          </Box>
          <Box
            bg={useColorModeValue("white", "gray.900")}
            px={6}
            py={10}
            rounded={"md"}
          >
            <Heading
              as="h2"
              mb={4}
              fontSize={{ base: "lg", md: "lg", lg: "xl" }}
            >
              Comment enseignez-vous le State React ?
            </Heading>
            <Text>
              Nous commençons par React Context. Parfois, nous recevons
              également des demandes spéciales pour Redux ou MobX. Nous faisons
              souvent une comparaison de Redux à Context à un niveau conceptuel
              élevé.
            </Text>
          </Box>
          <Box
            bg={useColorModeValue("white", "gray.900")}
            px={6}
            py={10}
            rounded={"md"}
          >
            <Heading
              as="h2"
              mb={4}
              fontSize={{ base: "lg", md: "lg", lg: "xl" }}
            >
              Allons-nous rencontrer le formateur à l'avance ?
            </Heading>
            <Text>
              Bien sur. Il y aura un "appel logistique" entre vous et notre
              formateur pour établir les détails du programme et la date de
              début.
            </Text>
          </Box>
          <Box
            bg={useColorModeValue("white", "gray.900")}
            px={6}
            py={10}
            rounded={"md"}
          >
            <Heading
              as="h2"
              mb={4}
              fontSize={{ base: "lg", md: "lg", lg: "xl" }}
            >
              Que se passe-t-il si notre équipe a une expérience différente ?
            </Heading>
            <Text>
              Nous avons cela très souvent. Les entreprises enverront 15
              personnes suivre une formation où la moitié n'ont absolument
              aucune expérience, certaines en ont un peu, et d'autre plus de 5
              ans. Nous conseillons de faire des groupes de niveau homogène.
              Cependant même si ce n'est pas possible, en raison de la
              profondeur et des détails dans lesquels nous entrons, tout le
              monde apprendra quelque chose.
            </Text>
          </Box>
          <Box
            bg={useColorModeValue("white", "gray.900")}
            px={6}
            py={10}
            rounded={"md"}
          >
            <Heading
              as="h2"
              mb={4}
              fontSize={{ base: "lg", md: "lg", lg: "xl" }}
            >
              Comment fonctionne la tarification ?
            </Heading>
            <Text>
              Nous facturons par participant. L'accord permettra une flexibilité
              au cas où vous auriez besoin d'ajouter ou de supprimer des
              participants de dernière minute. Vous pouvez nous{" "}
              <UiLink to={"/contact"} as={Link}>
                contacter
              </UiLink>{" "}
              pour en discuter en personne.
            </Text>
          </Box>
          <Box
            bg={useColorModeValue("white", "gray.900")}
            px={6}
            py={10}
            rounded={"md"}
          >
            <Heading
              as="h2"
              mb={4}
              fontSize={{ base: "lg", md: "lg", lg: "xl" }}
            >
              La formation React est-elle utile pour mon entreprise ?
            </Heading>
            <Text>
              Former vos collaborateurs est toujours utiles. Vos projets seront
              de meilleure qualité, vos développeurs seront plus productifs. Si
              vous avez des questions, n'hésitez pas à nous{" "}
              <UiLink to={"/contact"} as={Link}>
                contacter
              </UiLink>{" "}
              pour en discuter ou à regarder le détails de la{" "}
              <UiLink to={"/formations"} as={Link}>
                formation
              </UiLink>
              .
            </Text>
          </Box>
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
