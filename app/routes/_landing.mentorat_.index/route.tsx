import { Container, Heading, Text, Flex, Button } from "@chakra-ui/react";
import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Le mentorat en détail | React-Formation" },
    {
      name: "description",
      content:
        "Découvrez notre offre de mentorat en entreprise sur React. Obtenez l'assistance d'un développeur senior expérimenté pour améliorer vos compétences sur React et optimiser vos applications. Contactez-nous via Slack, Teams ou d'autres plateformes de messagerie, ou optez pour des consultations en personne. Notre équipe de mentors expérimentés est prête à vous aider. Réservez dès maintenant !",
    },
  ];
};

export function headers() {
  return {
    "Cache-Control": "max-age=36000, stale-while-revalidate=18000",
  };
}

export default function MentoratPage() {
  return (
    <Container as={"main"} maxW={"3xl"} py={12}>
      <Heading as="h1" fontSize="3xl" mb={4} color={"brand.400"}>
        Mentorat en entreprise sur React
      </Heading>
      <Heading as="h2" fontSize="2xl" mb={4} color={"brand.400"}>
        Un mentor expert React pour votre entreprise
      </Heading>
      <Text fontSize="lg" mb={6}>
        Notre offre de mentorat en entreprise vise à fournir aux start-ups et
        aux petites entreprises l'assistance d'un développeur senior expérimenté
        sur React, sans avoir à en embaucher un à temps plein. Nos services de
        mentorat sont conçus pour répondre à vos besoins spécifiques en matière
        de développement et d'amélioration de vos compétences en React.
      </Text>
      <Heading as="h2" fontSize="2xl" mb={4} color={"brand.400"}>
        Un mentor disponible directement via chat ou en personne
      </Heading>
      <Text fontSize="lg" mb={6}>
        Vous pouvez nous contacter via les plateformes de messagerie
        d'entreprise telles que Slack, Teams, ou tout autre outil de votre
        choix. Nos mentors sont disponibles pour répondre à vos questions,
        discuter des problèmes spécifiques et vous guider dans votre travail de
        développement. Nous pouvons également créer un canal de discussion dédié
        si vous préférez ne pas nous ajouter à vos propres outils. Si vous avez
        besoin d'une présence physique, nous sommes disponibles pour des visites
        sur place d'une journée ou plus pour fournir un soutien direct à votre
        équipe.
      </Text>
      <Heading as="h2" fontSize="2xl" mb={4} color={"brand.400"}>
        Des conseils d'experts pour améliorer votre application
      </Heading>
      <Text fontSize="lg">
        Si vous cherchez à améliorer la qualité de votre application, à résoudre
        des problèmes spécifiques ou à accélérer le développement de votre
        projet, notre équipe de mentors expérimentés est là pour vous guider.
        N'hésitez pas à nous contacter pour discuter de vos besoins et pour
        réserver votre session de mentorat en entreprise.
      </Text>
      <Flex justifyContent={"center"} mt={8}>
        <Button as={Link} rounded={"full"} to="/contact">
          Contactez-nous pour un devis
        </Button>
      </Flex>
    </Container>
  );
}
