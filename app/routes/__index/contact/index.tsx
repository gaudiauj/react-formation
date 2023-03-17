import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Stack,
  Textarea,
  Tooltip,
  useClipboard,
  useColorModeValue,
  VStack,
  Alert,
  AlertIcon,
  FormErrorMessage,
} from "@chakra-ui/react";
import invariant from "tiny-invariant";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { BsLinkedin, BsPerson, BsFillBuildingFill } from "react-icons/bs";
import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import type { ActionArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/node";
import { sendContactMail } from "~/utils/email.server";

import type { MetaFunction } from "@remix-run/node"; // or cloudflare/deno
import { createContactForm } from "~/models/contact";

export const meta: MetaFunction = () => {
  return {
    title: "react-formation | contact",
    description:
      "Contactez nous sur linkedin ou mail pour reserver une formation React sur mesure",
  };
};

export function headers() {
  return {
    "Cache-Control": "max-age=3600000, stale-while-revalidate=1800000",
  };
}

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();

  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");
  const firm = formData.get("firm");
  const phone = formData.get("phone");

  const errors = {
    name: name ? false : "Le nom est obligatoire",
    email: email ? false : "L'email est obligatoire",
    message: message ? false : "Le message est obligatoire",
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
      bg={useColorModeValue("gray.100", "gray.900")}
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
                    aria-label="email"
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

                <Link href="https://www.linkedin.com/in/jean-gaudiau-50b10439/">
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
                <Form method="post" autoComplete="on">
                  <VStack spacing={5}>
                    <FormControl>
                      <FormLabel>Société (facultatif)</FormLabel>

                      <InputGroup>
                        <InputLeftElement children={<BsFillBuildingFill />} />
                        <Input
                          type="text"
                          name="firm"
                          autoComplete="organization"
                          id="firm"
                          placeholder="Votre Société"
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Numéro de téléphone (facultatif)</FormLabel>

                      <InputGroup>
                        <InputLeftElement children={<PhoneIcon />} />
                        <Input
                          type="phone"
                          name="phone"
                          autoComplete="phone"
                          id="phone"
                          placeholder="Votre numéro de téléphone"
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl isRequired isInvalid={!!actionData?.name}>
                      <FormLabel>Nom</FormLabel>

                      <InputGroup>
                        <InputLeftElement children={<BsPerson />} />
                        <Input
                          type="text"
                          name="name"
                          id="name"
                          autoComplete="name"
                          placeholder="Votre nom"
                        />
                      </InputGroup>
                      <FormErrorMessage>{actionData?.name}</FormErrorMessage>
                    </FormControl>

                    <FormControl isRequired isInvalid={!!actionData?.email}>
                      <FormLabel>Email</FormLabel>

                      <InputGroup>
                        <InputLeftElement children={<EmailIcon />} />
                        <Input
                          type="email"
                          name="email"
                          autoComplete="email"
                          id="email"
                          placeholder="Votre Email"
                        />
                      </InputGroup>
                      <FormErrorMessage>{actionData?.email}</FormErrorMessage>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>Message</FormLabel>

                      <Textarea
                        name="message"
                        id="message"
                        placeholder="Votre Message"
                        rows={6}
                        resize="none"
                      />
                    </FormControl>

                    <Button
                      colorScheme="blue"
                      type="submit"
                      bg="blue.400"
                      color="white"
                      _hover={{
                        bg: "blue.500",
                      }}
                      isDisabled={isCreating}
                      isLoading={isCreating}
                    >
                      Envoyer
                    </Button>
                    {actionData?.success && (
                      <Alert status="success">
                        <AlertIcon />
                        Le message a bien été envoyé
                      </Alert>
                    )}
                    {actionData && !actionData?.success && (
                      <Alert status="error">
                        <AlertIcon />
                        Le message n'a pas pu être envoyé
                      </Alert>
                    )}
                  </VStack>
                </Form>
              </Box>
            </Stack>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
}
