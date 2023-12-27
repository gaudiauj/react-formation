import { PhoneIcon, EmailIcon } from "@chakra-ui/icons";
import {
  VStack,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
  Textarea,
  Button,
  Alert,
  AlertIcon,
  Input,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { Form, Link as RemixLink } from "@remix-run/react";
import { BsFillBuildingFill, BsPerson } from "react-icons/bs";

export type ContactFormProps = {
  isLoading: boolean;
  actionData?: {
    name: string;
    email: string;
    message: string;
    success: boolean;
  };
};

export default function ({ isLoading, actionData }: ContactFormProps) {
  const linkColor = useColorModeValue("brand.700", "brand.100");
  return (
    <Form method="post" autoComplete="on">
      <VStack spacing={5}>
        <FormControl id="firm">
          <FormLabel>Société (facultatif)</FormLabel>

          <InputGroup>
            <InputLeftElement children={<BsFillBuildingFill />} />
            <Input
              type="text"
              name="firm"
              autoComplete="organization"
              placeholder="Votre Société"
            />
          </InputGroup>
        </FormControl>
        <FormControl id="phone">
          <FormLabel>Numéro de téléphone (facultatif)</FormLabel>

          <InputGroup>
            <InputLeftElement children={<PhoneIcon />} />
            <Input
              type="phone"
              name="phone"
              autoComplete="phone"
              placeholder="Votre numéro de téléphone"
            />
          </InputGroup>
        </FormControl>
        <FormControl isRequired isInvalid={!!actionData?.name} id="name">
          <FormLabel>Nom</FormLabel>

          <InputGroup>
            <InputLeftElement children={<BsPerson />} />
            <Input
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Votre nom"
            />
          </InputGroup>
          <FormErrorMessage>{actionData?.name}</FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={!!actionData?.email} id="email">
          <FormLabel>Email</FormLabel>

          <InputGroup>
            <InputLeftElement children={<EmailIcon />} />
            <Input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Votre Email"
            />
          </InputGroup>
          <FormErrorMessage>{actionData?.email}</FormErrorMessage>
        </FormControl>

        <FormControl isRequired id="message">
          <FormLabel>Message</FormLabel>

          <Textarea
            name="message"
            placeholder="Votre Message"
            rows={6}
            resize="none"
          />
        </FormControl>

        <Button
          colorScheme="blue"
          type="submit"
          bg="brand.500"
          color="white"
          _hover={{
            bg: "brand.600",
          }}
          isDisabled={isLoading}
          isLoading={isLoading}
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
        <Link as={RemixLink} to="/rgpd" color={linkColor}>
          comment sont traitées vos données ?
        </Link>
      </VStack>
    </Form>
  );
}
