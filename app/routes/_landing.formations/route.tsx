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
  return {
    title: "react-formation | formation",
    description:
      "Pourquoi suivre une formation React avec react-formation ? découvrez notre formation react sur mesure et gagner en productivité et en efficacité",
  };
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

const FeatureWithoutIcon = ({
  title,
  texts,
}: {
  title: string;
  texts: string[];
}) => {
  const textColor = useColorModeValue("gray.600", "gray.100");
  return (
    <Stack as={"article"}>
      <Box
        maxW={"320px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"md"}
        rounded={"lg"}
        p={6}
      >
        <Heading as={"h3"} fontWeight={600} fontSize={{ base: "md" }} mb={2}>
          {title}
        </Heading>
        <ul>
          {texts.map((text) => (
            <li key={text}>
              <Text color={textColor}>{text}</Text>
            </li>
          ))}
        </ul>
      </Box>
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
        Contenu de la formation :
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <FeatureWithoutIcon
          title={"Présentation générale"}
          texts={[
            "Historique de React et des framework web",
            "React API from scratch",
            "Introduction à JSX",
            "Créer ses premiers composants",
          ]}
        />
        <FeatureWithoutIcon
          title={"Les hooks"}
          texts={[
            "UseState",
            "Le cycle de vie d'un composant",
            "UseEffect",
            "UseRef",
            "Les custom hooks",
            "Gérer les effets de bord",
          ]}
        />
        <FeatureWithoutIcon
          title={"Les hooks avancé"}
          texts={[
            "UseReducer",
            "UseCallback",
            "UseContext",
            "UseLayoutEffect",
            "UseImperativeHandle",
            "UseDebugValue",
          ]}
        />
        <FeatureWithoutIcon
          title={"les modéles (patterns) avancé"}
          texts={[
            "Context dans react",
            "Coumpound components",
            "State reducer",
            "Controlled et uncontrolled components",
          ]}
        />
        <FeatureWithoutIcon
          title={"Optimiser les perfomances"}
          texts={[
            "introduction à React suspense",
            "Code spliting",
            "UseMemo",
            "Optimiser les context",
            "Introduction au SSR",
            "Introduction au server components",
          ]}
        />
        <FeatureWithoutIcon
          title={"Tester les applications React"}
          texts={[
            "Les tests unitaires, fonctionnel, d'intégration et end to end",
            "React testing library et ses bonnes pratiques",
            "Ne pas tester les détails d'implémentation",
            "Tester les formulaires",
            "Mocker les requêtes HTTP",
            "Mocker les api et modules externes",
            "Cypress",
          ]}
        />
        <FeatureWithoutIcon
          title={"les frameworks"}
          texts={[
            "Le SSR en détail",
            "CSR, SSR, SSG, ISR focus sur les différentes méthodes",
            "Focus sur Next.js ou Remix.run",
            "le routing",
          ]}
        />
        <FeatureWithoutIcon
          title={"les outils"}
          texts={[
            "Redux et ses bonnes pratiques",
            "Typescript",
            "Redux toolkit",
            "React query",
            "GraphQL",
          ]}
        />
        <FeatureWithoutIcon
          title={"l'accessibilité"}
          texts={["l'accessibilité en général", "React et l'accessibilité"]}
        />
      </SimpleGrid>
      <Flex justifyContent={"center"} mt={8}>
        <Button as={Link} rounded={"full"} to="/contact">
          Réserver
        </Button>
      </Flex>
    </Box>
  );
}
