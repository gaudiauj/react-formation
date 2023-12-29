import {
  Box,
  Flex,
  Heading,
  IconButton,
  Link,
  Stack,
  Tooltip,
  useClipboard,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import invariant from "tiny-invariant";
import { useActionData, useNavigation } from "@remix-run/react";
import { BsLinkedin } from "react-icons/bs";
import { EmailIcon } from "@chakra-ui/icons";
import { json } from "@remix-run/node";
import { sendContactMail } from "~/utils/email.server";

import type { MetaFunction, ActionFunctionArgs } from "@remix-run/node"; // or cloudflare/deno
import { createContactForm } from "~/models/contact";
import Form from "./Form";

export const meta: MetaFunction = () => {
  return [
    { title: "Contactez React-Formation | Formation en entreprise sur React" },
    {
      name: "description",
      content:
        "Contactez l'équipe de React-Formation pour obtenir des informations supplémentaires sur nos formations en entreprise sur React. Réservez dès maintenant votre session de formation personnalisée et développez les compétences de vos équipes en développement web.",
    },
  ];
};

export function headers() {
  return {
    "Cache-Control": "max-age=36000, stale-while-revalidate=18000",
  };
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");
  const firm = formData.get("firm");
  const phone = formData.get("phone");

  const errors = {
    name: name ? "" : "Le nom est obligatoire",
    email: email ? "" : "L'email est obligatoire",
    message: message ? "" : "Le message est obligatoire",
  };
  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);
  invariant(typeof name === "string", "name must be a string");
  invariant(typeof email === "string", "email must be a string");
  invariant(typeof message === "string", "message must be a string");
  invariant(typeof phone === "string", "phone must be a string");
  invariant(
    typeof firm === "string" || typeof firm === "undefined",
    "firm must be a string or undefined"
  );
  let success = !hasErrors;
  if (!hasErrors) {
    try {
      await Promise.allSettled([
        sendContactMail({ name, email, message, firm, phone }),
        createContactForm({ name, email, message, firm, phone }),
      ]);
    } catch (e) {
      console.log(e);
      success = false;
    }
  }

  return json({
    ...errors,
    success,
  });
};

export default function ContactFormWithSocialButtons() {
  const { hasCopied, onCopy } = useClipboard("contact@react-formation.fr");
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isCreating = navigation.state === "submitting";

  return (
    <Flex
      bg={useColorModeValue("gray.50", "gray.900")}
      align="center"
      justify="center"
      id="contact"
      as="main"
    >
      <Box
        borderRadius="lg"
        m={{ base: 5, md: 16, lg: 10 }}
        p={{ base: 5, lg: 16 }}
        as="article"
      >
        <Box>
          <VStack spacing={{ base: 4, md: 8, lg: 20 }}>
            <Heading
              as="h1"
              fontSize={{
                base: "4xl",
                md: "5xl",
              }}
            >
              Nous contacter
            </Heading>
            <Stack
              spacing={{ base: 4, md: 8, lg: 12 }}
              direction={{ base: "column", md: "row" }}
            >
              <Stack align="center" direction={{ base: "row", md: "column" }}>
                <Tooltip
                  label={hasCopied ? "Email copié!" : "Copier l'email"}
                  closeOnClick={false}
                  hasArrow
                >
                  <IconButton
                    aria-label="mail"
                    variant="ghost"
                    size="lg"
                    fontSize="3xl"
                    icon={<EmailIcon />}
                    _hover={{
                      bg: "blue.500",
                      color: useColorModeValue("white", "gray.700"),
                    }}
                    onClick={onCopy}
                    isRound
                  />
                </Tooltip>

                <Link
                  href="https://www.linkedin.com/in/jean-gaudiau-50b10439/"
                  isExternal
                >
                  <IconButton
                    aria-label="linkedin"
                    variant="ghost"
                    size="lg"
                    icon={<BsLinkedin size="28px" />}
                    _hover={{
                      bg: "blue.500",
                      color: useColorModeValue("white", "gray.700"),
                    }}
                    isRound
                  />
                </Link>
              </Stack>

              <Box
                bg={useColorModeValue("white", "gray.700")}
                borderRadius="lg"
                p={8}
                color={useColorModeValue("gray.700", "whiteAlpha.900")}
                shadow="base"
                w="80vw"
              >
                <Heading
                  fontSize={{
                    base: "l",
                  }}
                  mb={4}
                >
                  Faites-nous savoir vos besoins, demandes de formation, ou
                  questions générales. Nous répondons généralement dans un délai
                  d'un jour.
                </Heading>
                <Form isLoading={isCreating} actionData={actionData} />
              </Box>
            </Stack>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
}
