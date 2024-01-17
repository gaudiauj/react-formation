import { WarningTwoIcon } from "@chakra-ui/icons";
import {
  List,
  ListItem,
  Container,
  Box,
  Flex,
  Heading,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import type { MetaFunction } from "@remix-run/react";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Le mentorat en détail | React-Formation" },
    {
      name: "description",
      content:
        "Découvrez notre gamme complète d'actions possibles dans le cadre de notre offre de mentorat en entreprise sur React. Nos mentors expérimentés offrent des services de review de Pull Requests, d'aide à la mise en place de tests, de conseils en architecture, de migration de bibliothèques, d'optimisation des performances, et bien plus encore. Contactez-nous pour discuter de vos besoins spécifiques",
    },
  ];
};

export default function Liste() {
  return (
    <Container as={"main"} maxW={"3xl"} py={12}>
      <Heading as="h1" fontSize="2xl" mb={4} color={"brand.400"}>
        Un mentor React pour votre entreprise
      </Heading>
      <Heading as="h2" fontSize="xl" mb={4} color={"brand.400"}>
        Liste des services possible
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
        Ceci est une liste non exhaustive des services que nous pouvons vous
        proposer. N'hésitez pas à nous contacter pour discuter de vos besoins
        spécifiques.
      </Box>
      <List spacing={3} mb={6}>
        <ListItem>
          <strong>Review de Pull Requests :</strong> Nos mentors vous aideront à
          évaluer et à améliorer les Pull Requests de votre équipe, en veillant
          à ce que votre code respecte les meilleures pratiques et les normes de
          qualité.
        </ListItem>
        <ListItem>
          <strong>
            Aide à la mise en place des tests d'intégration ou end-to-end :
          </strong>{" "}
          Nous vous guiderons dans l'élaboration de stratégies de test solides
          pour garantir la stabilité de votre application React.
        </ListItem>
        <ListItem>
          <strong>
            Aide à la mise en place de SSR (Server-Side Rendering) ou correction
            d'erreurs d'hydratation :
          </strong>{" "}
          Si vous avez besoin d'une assistance pour rendre votre application
          plus performante et améliorer le SEO, nous sommes là pour vous aider.
        </ListItem>
        <ListItem>
          <strong>Conseils sur l'architecture de l'application :</strong> Nos
          mentors vous aideront à concevoir une architecture solide et évolutive
          en fonction de vos besoins spécifiques et de votre projet.
        </ListItem>
        <ListItem>
          <strong>
            Aide à la migration ou à la mise à niveau de bibliothèques :
          </strong>{" "}
          Nous vous accompagnerons tout au long du processus de migration de
          votre application React ou de la mise à jour de bibliothèques clés.
        </ListItem>
        <ListItem>
          <strong>Conseils sur le choix des bibliothèques :</strong> Nous vous
          aiderons à choisir les meilleures bibliothèques et technologies pour
          votre projet, en fonction de vos exigences et de vos objectifs.
        </ListItem>
        <ListItem>
          <strong>Aide à la correction de bugs :</strong> Si votre application
          rencontre des problèmes, notre équipe de mentors expérimentés vous
          aidera à identifier et à résoudre rapidement les bugs.
        </ListItem>
        <ListItem>
          <strong>Aide au recrutement :</strong> Vous voulez recruter un nouveau
          developpeur React ? Nous pouvons vous aider à évaluer les compétences
          des candidats et à identifier les meilleurs profils. Nous proposons
          des tests personnalisés pour évaluer les compétences des candidats via
          des entretiens techniques et des exercices pratiques.
        </ListItem>
        <ListItem>
          <strong>Aide à l'amélioration de la performance :</strong> Nos mentors
          peuvent vous aider à optimiser les performances de votre application
          React de deux manières :
          <ul>
            <li>
              Mise en place efficace de la division de code (code splitting)
              pour réduire le temps de chargement initial de la page.
            </li>
            <li>
              Optimisation des performances de React une fois que l'application
              est chargée, en réduisant le nombre de rendus inutiles et en
              appliquant des techniques pour améliorer la réactivité de
              l'interface utilisateur.
            </li>
          </ul>
        </ListItem>
      </List>
      <Flex justifyContent={"center"} mt={8}>
        <Button as={Link} rounded={"full"} to="/contact">
          Contactez-nous pour un devis
        </Button>
      </Flex>
    </Container>
  );
}
