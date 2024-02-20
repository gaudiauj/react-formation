import {
  Box,
  Text,
  Stack,
  Flex,
  Heading,
  useColorModeValue,
  Button,
  ListItem,
  UnorderedList,
  Container,
  Link as UiLink,
  SimpleGrid,
} from "@chakra-ui/react";
import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { WarningTwoIcon } from "@chakra-ui/icons";
import Testimonial from "~/components/Testimonial";

export const meta: MetaFunction = () => {
  return [
    { title: "Plan de formation sur React en entreprise | React-Formation" },
    {
      name: "description",
      content:
        "Pourquoi suivre une formation React avec react-formation ? découvrez notre formation react sur mesure et gagner en productivité et en efficacité. Consultez notre plan de formation détaillé sur React en entreprise. Adaptez votre parcours d'apprentissage avec React-Formation et maîtrisez les concepts et les techniques avancées du développement web avec React.",
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org/",
        "@id": "https://react-formation.fr/formations/plan",
        "@type": "Course",
        name: "Formez vous sur React",
        description:
          "Une formation sur react en entreprises pour gagner en productivité et en efficacité. Contenu sur mesure adapté à tous les niveaux, du débutant à l'expert.",
        publisher: {
          "@type": "Organization",
          name: "react-formation",
          url: "react-formation.fr",
        },
        provider: {
          "@type": "Organization",
          name: "react-formation",
          url: "react-formation.fr",
        },
        image: [
          `https://react-formation.fr/resized/pourquoi-useeffect-ne-se-declenche-pas-avec-une-ref_100.png`,
          `https://react-formation.fr/resized/pourquoi-useeffect-ne-se-declenche-pas-avec-une-ref_133.png`,
          `https://react-formation.fr/resized/pourquoi-useeffect-ne-se-declenche-pas-avec-une-ref_178.png`,
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: 4.7,
          bestRating: 5,
          worstRating: 0,
          ratingCount: 1,
          reviewCount: 1,
        },
        offers: [
          {
            "@type": "Offer",
            category: "Paid",
            priceCurrency: "EUR",
            price: 500,
          },
        ],
        educationalLevel: "Advanced",
        about: [
          "React",
          "front-end",
          "javascript",
          "typescript",
          "web development",
        ],
        teaches: [
          "Les bonnes pratiques de React",
          "Les hooks avancés",
          "Les modèles (patterns) avancés",
          "Optimiser les performances",
          "Tester les applications React",
          "Les frameworks",
          "L'accessibilité",
        ],
        inLanguage: "fr",
        availableLanguage: ["fr"],
        review: [
          {
            "@type": "Review",
            author: {
              "@type": "Person",
              name: "Bastien ho",
            },
            datePublished: "2024-02-08",
            reviewRating: {
              "@type": "Rating",
              bestRating: 5,
              ratingValue: 4.7,
            },
          },
        ],
        coursePrerequisites: [
          "Connaissance sur Javascript",
          "Connaissance sur HTML/CSS",
        ],
        hasCourseInstance: [
          {
            // Online self-paced course that takes 2 days to complete.
            "@type": "CourseInstance",
            courseMode: "Online",
            courseWorkload: "P2D",
            instructor: [
              {
                "@type": "Person",
                name: "Jean Gaudiau",
                description: "Formateur expert React",
              },
            ],
          },
        ],
      },
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
    <>
      <Container as={"main"} p={{ base: 5, lg: 10 }} maxW={"3xl"}>
        <Heading
          as={"h1"}
          mb={10}
          fontSize={{ base: "4xl", md: "4xl" }}
          m={{ base: 5, md: 10, lg: 10 }}
          color={"brand.400"}
        >
          Formation React
        </Heading>
        <Heading as={"h2"} mb={4} mt={8} fontSize={"xl"} color={"brand.400"}>
          Une formation React adaptée à tous les niveaux
        </Heading>
        <Text>
          Que vous souhaitiez maîtriser les bases ou explorer des aspects plus
          complexes de React, notre formation React est structurée pour couvrir
          un large éventail de sujets. Des fondamentaux de React aux techniques
          avancées et aux meilleures pratiques, chaque module est conçu pour
          renforcer les compétences de vos équipes et améliorer la qualité de
          vos projets.
        </Text>
        <Heading as={"h2"} mb={4} mt={8} fontSize={"xl"} color={"brand.400"}>
          Une formation orientée vers la pratique !
        </Heading>
        <Text>
          Nous croyons fermement à l'apprentissage par la pratique. C'est
          pourquoi notre formation basé sur des exercices pratiques et de katas
          qui permettent de saisir en profondeur les concepts clés de React.
          Chaque sujet est abordé avec une approche orientée vers l'action,
          assurant une compréhension complète et une application immédiate des
          connaissances obtenues.
        </Text>
        <Heading as={"h2"} mb={4} mt={8} fontSize={"xl"} color={"brand.400"}>
          Une formation axée sur l'architecture logicielle
        </Heading>
        <Text>
          Notre formation met un accent particulier sur l'architecture
          logicielle, un aspect crucial pour assurer la pérennité des
          compétences acquises. En se concentrant sur les principes
          architecturaux fondamentaux, nous préparons les participants non
          seulement à exceller avec les versions actuelles de React, mais aussi
          à s'adapter aisément aux futures évolutions et même à d'autres
          frameworks. Cette approche permet une meilleure compréhension globale
          et une application efficace des connaissances dans divers contextes de
          développement.
        </Text>
        <br />
        <Text>
          De plus, en harmonisant le vocabulaire et les concepts clés au sein de
          vos équipes, notre formation favorise une communication plus fluide et
          efficace. Les développeurs, en partageant un langage commun autour des
          meilleures pratiques d'architecture en React, peuvent collaborer plus
          aisément, réduisant ainsi les malentendus et augmentant la
          productivité.
        </Text>

        <Heading
          as={"h2"}
          mb={4}
          mt={8}
          fontSize={{ base: "2xl", md: "2xl" }}
          color={"brand.400"}
        >
          Plan de la formation React
        </Heading>
        <Box
          bg={useColorModeValue("#eef9fd", "brand.700")}
          p={4}
          borderLeft="4px"
          borderColor={"brand.200"}
          borderRadius={8}
          mb={8}
        >
          <Flex gap={2} align="center" fontWeight={600} fontSize="lg" mb={2}>
            <WarningTwoIcon /> Info
          </Flex>
          Pour chaque demande de formation, nous vous proposons un plan 100% sur
          mesure, en fonction des besoins et du niveau de vos équipes. Voici les
          sujets qui sont généralement abordés lors de nos formations React :
        </Box>
        <Stack spacing={4}>
          <UnorderedList spacing={4}>
            <ListItem>
              <strong>Présentation générale</strong> - Découvrez les bases de
              React et son historique, ainsi que des frameworks web associés.
            </ListItem>
            <ListItem>
              <strong>React API from scratch</strong> - Apprenez à utiliser
              l'API de React à partir de zéro pour la création de composants.
            </ListItem>
            <ListItem>
              <strong>Introduction à JSX</strong> - Explorez JSX, une extension
              de syntaxe utilisée dans React pour décrire les composants.
            </ListItem>
            <ListItem>
              <strong>Créer ses premiers composants</strong> - Maîtrisez la
              création de composants et leur utilisation dans des applications
              React.
            </ListItem>
            <ListItem>
              <strong>Les hooks</strong> - Plongez dans les hooks, notamment
              useState, useEffect, useRef, et explorez leur utilisations
              avancée.
            </ListItem>
            <ListItem>
              <strong>Le cycle de vie d'un composant</strong> - Comprenez le
              cycle de vie d'un composant React et apprenez à le gérer
              efficacement.
            </ListItem>
            <ListItem>
              <strong>Les custom hooks</strong> - Découvrez comment créer vos
              propres hooks personnalisés pour une logique réutilisable.
            </ListItem>
            <ListItem>
              <strong>Gérer les effets de bord</strong> - Explorez les
              techniques pour gérer les effets de bord dans vos applications
              React.
            </ListItem>
            <ListItem>
              <strong>Les hooks avancés</strong> - Approfondissez vos
              connaissances des hooks avec des concepts tels que useReducer,
              useCallback, useContext, et plus encore.
            </ListItem>
            <ListItem>
              <strong>Les modèles (patterns) avancés</strong> - Découvrez des
              modèles avancés tels que le contexte dans React, les composants
              composés, les state reducers, et les composants contrôlés et non
              contrôlés.
            </ListItem>
            <ListItem>
              <strong>Optimiser les performances</strong> - Apprenez à optimiser
              les performances de vos applications React en utilisant des
              techniques telles que React Suspense, le code splitting, useMemo,
              et l'optimisation du contexte.
            </ListItem>
            <ListItem>
              <strong>Tester les applications React</strong> - Explorez les
              différentes méthodes de test pour les applications React, y
              compris les tests unitaires, fonctionnels, d'intégration et
              end-to-end. Découvrez également React Testing Library et des
              bonnes pratiques de test.
            </ListItem>
            <ListItem>
              <strong>Les frameworks</strong> - Plongez dans des librairies
              populaires tels que Redux, TypeScript, Redux Toolkit, React Query,
              GraphQL, et découvrez comment ils peuvent améliorer votre flux de
              travail de développement. Mais aussi les frameworks basé sur React
              comme Next.js ou Remix pour mettre en place le SSR.
            </ListItem>
            <ListItem>
              <strong>L'accessibilité</strong> - Comprenez l'importance de
              l'accessibilité en général dans le développement web et découvrez
              comment React facilite la création d'applications accessibles.
            </ListItem>
          </UnorderedList>
        </Stack>
        <Flex
          mt={8}
          display="flex"
          flexDirection={"column"}
          alignItems={"center"}
          gap={2}
        >
          <Button as={Link} rounded={"full"} to="/contact">
            Réservez votre formation React
          </Button>
          <Link
            to="/formations/prix"
            style={{
              textDecoration: "underline",
            }}
          >
            Voir les tarifs
          </Link>
        </Flex>
        <Stack
          display={"flex"}
          gap={4}
          marginBottom={"16px"}
          marginTop={"16px"}
        >
          <Heading
            as="h2"
            fontSize={{ base: "4xl", md: "3xl", lg: "2xl" }}
            color={"brand.400"}
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
      </Container>
      <Stack minH={"calc(100vh - 60px)"} p={8}>
        <Heading
          as="h2"
          mb={4}
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
          color={"brand.400"}
        >
          Questions fréquentes
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Box
            bg={useColorModeValue("gray.50", "gray.900")}
            px={6}
            py={10}
            rounded={"md"}
          >
            <Heading
              as="h3"
              color={"brand.400"}
              mb={4}
              fontSize={{ base: "lg", md: "lg", lg: "xl" }}
            >
              Notre équipe utilise typescript/javascript est-ce que le contenu
              sera adapté ?
            </Heading>
            <Text>
              Bien que les ateliers React ne concernent pas spécifiquement
              TypeScript, nous avons notre contenu en TypeScript mais aussi en
              javascript. Si les participants ne font pas de TS, ne vous
              inquiétez pas, nous enseignerons les bases au fur et à mesure.
            </Text>
          </Box>
          <Box
            bg={useColorModeValue("gray.50", "gray.900")}
            px={6}
            py={10}
            rounded={"md"}
          >
            <Heading
              as="h3"
              color={"brand.400"}
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
            bg={useColorModeValue("gray.50", "gray.900")}
            px={6}
            py={10}
            rounded={"md"}
          >
            <Heading
              as="h3"
              color={"brand.400"}
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
            bg={useColorModeValue("gray.50", "gray.900")}
            px={6}
            py={10}
            rounded={"md"}
          >
            <Heading
              as="h3"
              color={"brand.400"}
              mb={4}
              fontSize={{ base: "lg", md: "lg", lg: "xl" }}
            >
              Comment enseignez-vous le State React ?
            </Heading>
            <Text>
              Nous commençons par React Context. Parfois, nous recevons
              également des demandes spéciales pour Redux ou MobX. Nous faisons
              souvent une comparaison de Redux à Context.
            </Text>
          </Box>
          <Box
            bg={useColorModeValue("gray.50", "gray.900")}
            px={6}
            py={10}
            rounded={"md"}
          >
            <Heading
              as="h3"
              mb={4}
              color={"brand.400"}
              fontSize={{ base: "lg", md: "lg", lg: "xl" }}
            >
              Est-ce que vous faites des formations Next.js ?
            </Heading>
            <Text>
              Nous faisons aussi des formations sur les framework tels que{" "}
              <strong>Next</strong> ou <strong>Remix</strong>. Nous avons des
              ateliers sur les bases de Next.js, mais aussi des ateliers plus
              avancés sur les performances, le SSR, les bonnes pratiques.
            </Text>
          </Box>
          <Box
            bg={useColorModeValue("gray.50", "gray.900")}
            px={6}
            py={10}
            rounded={"md"}
          >
            <Heading
              as="h3"
              color={"brand.400"}
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
            bg={useColorModeValue("gray.50", "gray.900")}
            px={6}
            py={10}
            rounded={"md"}
          >
            <Heading
              as="h3"
              color={"brand.400"}
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
            bg={useColorModeValue("gray.50", "gray.900")}
            px={6}
            py={10}
            rounded={"md"}
          >
            <Heading
              as="h3"
              color={"brand.400"}
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
          <Box
            bg={useColorModeValue("gray.50", "gray.900")}
            px={6}
            py={10}
            rounded={"md"}
          >
            <Heading
              as="h3"
              color={"brand.400"}
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
    </>
  );
}
