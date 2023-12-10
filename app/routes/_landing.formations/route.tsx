import type { ReactElement } from "react";
import {
  Box,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  Flex,
  Heading,
  useColorModeValue,
  Button,
  OrderedList,
  ListItem,
} from "@chakra-ui/react";
import { FcAssistant, FcDonate, FcInTransit, FcSupport } from "react-icons/fc";
import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

interface FeatureProps {
  title: string;
  text: string;
  icon: ReactElement;
}

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

const Feature = ({ title, text, icon }: FeatureProps) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  return (
    <Stack as={"article"}>
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
        bg={"gray.100"}
        mb={1}
      >
        {icon}
      </Flex>
      <Heading as={"h3"} fontWeight={600} fontSize={{ base: "md" }}>
        {title}
      </Heading>
      <Text color={textColor}>{text}</Text>
    </Stack>
  );
};

export default function SimpleThreeColumns() {
  return (
    <Box as={"main"} p={{ base: 5, lg: 10 }}>
      <Heading
        as={"h1"}
        mb={10}
        fontSize={{ base: "4xl", md: "4xl" }}
        m={{ base: 5, md: 10, lg: 10 }}
      >
        La formation React
      </Heading>
      <Heading as={"h2"} mb={5} fontSize={{ base: "2xl", md: "2xl" }}>
        Pourquoi former vos équipes sur React est-il bénéfique ?
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Feature
          icon={<Icon as={FcSupport} w={10} h={10} />}
          title={"Une meilleur qualité pour vos projets"}
          text={
            "Notres objectifs premier est de vous aider à créer des applications de qualité. Nous voulons que vous puissiez vous concentrer sur le développement de fonctionnalités, et non sur la résolution de problèmes de performance ou de bugs. C'est pourquoi nous vous proposons une formation axé autour des fondamentaux de React et sur les tests, afin que vos équipes puissent créer des applications robustes et performantes."
          }
        />
        <Feature
          icon={<Icon as={FcDonate} w={10} h={10} />}
          title={"Investir dans les compétences de vos équipes"}
          text={
            "C'est peut-être l'un des meilleurs investissements que vous puissiez faire. La formation React réduira de nombreuses heures le temps de veille des développeurs. Non seulement ils obtiendront des informations à jour, mais ils pourront rester concentrés sur des sujets de qualité et sur mesure, plutôt que de passer du temps à rechercher des informations."
          }
        />
        <Feature
          icon={<Icon as={FcInTransit} w={10} h={10} />}
          title={"Axé sur l'architecture"}
          text={
            "N'importe qui peut lire la documentation et saisir les idées de base de la syntaxe. Notre formation va bien au-delà. Nous voulons que nos participants aient l'assurance qu'ils comprennent diverses idées architecturales de React, et qu'ils peuvent commencer à coder immédiatement après avoir terminé la formation."
          }
        />
        <Feature
          icon={<Icon as={FcAssistant} w={10} h={10} />}
          title={"Une meilleur communication"}
          text={
            "Votre équipe communiquera mieux lorsqu'elle sera sur la même longueur d'onde avec les meilleures pratiques. La programmation dans React est super amusante, mais c'est un nouveau paradigme qui pourrait ne pas être familier aux développeurs même chevronnés. Les ateliers que nous organisons mettent l'accent sur la terminologie, et ainsi rend la communication plus facile."
          }
        />
      </SimpleGrid>
      <Heading as={"h2"} mb={4} mt={8} fontSize={{ base: "2xl", md: "2xl" }}>
        Plan de la formation React
      </Heading>
      <Stack spacing={4}>
        <OrderedList spacing={4}>
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
        </OrderedList>
      </Stack>
      <Flex justifyContent={"center"} mt={8}>
        <Button as={Link} rounded={"full"} to="/contact">
          Réserver votre formation React
        </Button>
      </Flex>
    </Box>
  );
}
