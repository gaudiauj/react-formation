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
} from "@chakra-ui/react";
import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { WarningTwoIcon } from "@chakra-ui/icons";

export const meta: MetaFunction = () => {
  return [
    { title: "Plan de formation sur React en entreprise | React-Formation" },
    {
      name: "description",
      content:
        "Pourquoi suivre une formation React avec react-formation ? découvrez notre formation react sur mesure et gagner en productivité et en efficacité. Consultez notre plan de formation détaillé sur React en entreprise. Adaptez votre parcours d'apprentissage avec React-Formation et maîtrisez les concepts et les techniques avancées du développement web avec React.",
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
        complexes de React, notre formation React est structurée pour couvrir un
        large éventail de sujets. Des fondamentaux de React aux techniques
        avancées et aux meilleures pratiques, chaque module est conçu pour
        renforcer les compétences de vos équipes et améliorer la qualité de vos
        projets.
      </Text>
      <Heading as={"h2"} mb={4} mt={8} fontSize={"xl"} color={"brand.400"}>
        Une formation orientée vers la pratique !
      </Heading>
      <Text>
        Nous croyons fermement à l'apprentissage par la pratique. C'est pourquoi
        notre formation basé sur des exercices pratiques et de katas qui
        permettent de saisir en profondeur les concepts clés de React. Chaque
        sujet est abordé avec une approche orientée vers l'action, assurant une
        compréhension complète et une application immédiate des connaissances
        acquises.
      </Text>
      <Heading as={"h2"} mb={4} mt={8} fontSize={"xl"} color={"brand.400"}>
        Une formation axée sur l'architecture logicielle
      </Heading>
      <Text>
        Notre formation met un accent particulier sur l'architecture logicielle,
        un aspect crucial pour assurer la pérennité des compétences acquises. En
        se concentrant sur les principes architecturaux fondamentaux, nous
        préparons les participants non seulement à exceller avec les versions
        actuelles de React, mais aussi à s'adapter aisément aux futures
        évolutions et même à d'autres frameworks. Cette approche permet une
        meilleure compréhension globale et une application efficace des
        connaissances dans divers contextes de développement.
      </Text>
      <br />
      <Text>
        De plus, en harmonisant le vocabulaire et les concepts clés au sein de
        vos équipes, notre formation favorise une communication plus fluide et
        efficace. Les développeurs, en partageant un langage commun autour des
        meilleures pratiques d'architecture en React, peuvent collaborer plus
        aisément, réduisant ainsi les malentendus et augmentant la productivité.
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
            <strong>React API from scratch</strong> - Apprenez à utiliser l'API
            de React à partir de zéro pour la création de composants.
          </ListItem>
          <ListItem>
            <strong>Introduction à JSX</strong> - Explorez JSX, une extension de
            syntaxe utilisée dans React pour décrire les composants.
          </ListItem>
          <ListItem>
            <strong>Créer ses premiers composants</strong> - Maîtrisez la
            création de composants et leur utilisation dans des applications
            React.
          </ListItem>
          <ListItem>
            <strong>Les hooks</strong> - Plongez dans les hooks, notamment
            useState, useEffect, useRef, et explorez leur utilisation avancée.
          </ListItem>
          <ListItem>
            <strong>Le cycle de vie d'un composant</strong> - Comprenez le cycle
            de vie d'un composant React et apprenez à le gérer efficacement.
          </ListItem>
          <ListItem>
            <strong>Les custom hooks</strong> - Découvrez comment créer vos
            propres hooks personnalisés pour une logique réutilisable.
          </ListItem>
          <ListItem>
            <strong>Gérer les effets de bord</strong> - Explorez les techniques
            pour gérer les effets de bord dans vos applications React.
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
            techniques telles que React Suspense, le code splitting, useMemo, et
            l'optimisation du contexte.
          </ListItem>
          <ListItem>
            <strong>Tester les applications React</strong> - Explorez les
            différentes méthodes de test pour les applications React, y compris
            les tests unitaires, fonctionnels, d'intégration et end-to-end.
            Découvrez également React Testing Library et des bonnes pratiques de
            test.
          </ListItem>
          <ListItem>
            <strong>Les frameworks</strong> - Plongez dans des frameworks
            populaires tels que Redux, TypeScript, Redux Toolkit, React Query,
            GraphQL, et découvrez comment ils peuvent améliorer votre flux de
            travail de développement.
          </ListItem>
          <ListItem>
            <strong>L'accessibilité</strong> - Comprenez l'importance de
            l'accessibilité en général dans le développement web et découvrez
            comment React facilite la création d'applications accessibles.
          </ListItem>
        </UnorderedList>
      </Stack>
      <Flex justifyContent={"center"} mt={8}>
        <Button as={Link} rounded={"full"} to="/contact">
          Réservez votre formation React
        </Button>
      </Flex>
    </Container>
  );
}
