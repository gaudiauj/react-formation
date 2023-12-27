import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { IoAnalyticsSharp, IoLogoBitcoin } from "react-icons/io5";
import type { ReactElement } from "react";
import type { MetaFunction } from "@remix-run/node";

interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}

export const meta: MetaFunction = () => {
  return [
    {
      title: "À propos de React-Formation | Formation en entreprise sur React",
    },
    {
      name: "description",
      content:
        "Découvrez l'expertise de React-Formation en matière de formations en entreprise sur React. Apprenez-en plus sur notre parcours et notre approche personnalisée pour vous aider à développer vos compétences en développement web.",
    },
  ];
};

export function headers() {
  return {
    "Cache-Control": "max-age=36000, stale-while-revalidate=18000",
  };
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Flex
        w={8}
        h={8}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

export default function SplitWithImage() {
  const textColor = useColorModeValue("gray.600", "gray.200");
  return (
    <Container maxW={"5xl"} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <Text
            textTransform={"uppercase"}
            color={useColorModeValue("brand.500", "brand.100")}
            fontWeight={600}
            fontSize={"sm"}
            bg={useColorModeValue("gray.50", "gray.900")}
            p={2}
            alignSelf={"flex-start"}
            rounded={"md"}
          >
            Qui somme nous ?
          </Text>
          <Heading as="h1">Une entreprise dédié à la formation</Heading>
          <Text color={textColor} fontSize={"lg"}>
            Je suis Jean fondateur de React-Formation. Mon aventure dans le
            monde du développement web commence à mes 12 ans, ou je découvre sur
            le vieil ordinateur familial, la programmation. Adepte du site du
            zéro maintenant devenu depuis{" "}
            <Link
              href="https://openclassrooms.com/fr/"
              color={useColorModeValue("brand.600", "brand.100")}
              isExternal
            >
              openclassroom
            </Link>
            , j'ai suivi les tutoriels sur le C, HMTL, Javascript et Php.
          </Text>
          <Text color={textColor} fontSize={"lg"}>
            Cette passion me suis donc depuis mon adolescence et c'est tout
            naturellement que j'en fais mon métier. En 2015 la vraie aventure
            commence et je commence mon premier travail en tant que développeur
            Full-stack PHP, js. En 2017 je me spécialise dans le front, et plus
            Particulièrement React.
          </Text>
          <Text color={textColor} fontSize={"lg"}>
            Depuis j'ai eu la chance de travailler pour de nombreuses
            entreprises; de la petite startup et ses 2 cofondateurs, à la grosse
            multinational et ses milliers de collaborateurs. Et un constat;
            j'aime échanger, partager et apprendre.
          </Text>
          <Text color={textColor} fontSize={"lg"}>
            Je me décide donc à lancer mon entreprise de formation sur mon sujet
            de prédilection, React. Mon objectif, aider les entreprises à
            construire des application, robuste, rapide et bien testé, mais
            surtout aider les développeurs à mieux comprendre le fonctionnement
            de React et d'être plus confiant, plus rapide et plus impliqué dans
            leur travail.
          </Text>
          <Stack
            spacing={8}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
          >
            <Heading fontSize={"md"}>
              Pourquoi choisir React-formation ?
            </Heading>
            <Feature
              icon={
                <Icon as={IoAnalyticsSharp} color={"yellow.500"} w={5} h={5} />
              }
              iconBg={useColorModeValue("yellow.100", "yellow.900")}
              text={"Une formation par un formateur spécialiste et passionné"}
            />
            <Feature
              icon={<Icon as={IoLogoBitcoin} color={"green.500"} w={5} h={5} />}
              iconBg={useColorModeValue("green.100", "green.900")}
              text={"Une formation sur mesure pour vos collaborateurs"}
            />
          </Stack>
        </Stack>
        <Flex>
          <Image
            rounded={"md"}
            alt={"utilisateur étant formé"}
            src={
              "https://images.unsplash.com/photo-1554200876-56c2f25224fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            }
            objectFit={"cover"}
          />
        </Flex>
      </SimpleGrid>
    </Container>
  );
}
