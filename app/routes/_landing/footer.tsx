import {
  Box,
  chakra,
  Container,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { Link as RemixLink } from "@remix-run/react";
import { FaYoutube, FaLinkedin } from "react-icons/fa";
import type { ReactNode } from "react";
import Logo from "../../assets/logo";

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "brand.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "brand.700"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function SmallCentered() {
  const linkColor = useColorModeValue("brand.700", "brand.100");

  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        spacing={4}
        justify={"center"}
        align={"center"}
      >
        <Logo width="200px" />
        <Stack direction={"row"} spacing={6}>
          <Link as={RemixLink} to={"/conduct"}>
            code de conduite
          </Link>
          <Link as={RemixLink} to={"/rgpd"}>
            rgpd
          </Link>
        </Stack>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text>© 2023 React Formation</Text>
          <Stack direction={"row"} spacing={6} alignItems="center">
            <Link href="mailto:contact@react-formation.fr" color={linkColor}>
              contact@react-formation.fr
            </Link>
            <SocialButton
              label={"Linkedin"}
              href={"https://fr.linkedin.com/in/jean-gaudiau-50b10439"}
            >
              <FaLinkedin />
            </SocialButton>
            <SocialButton label={"YouTube"} href={"#"}>
              <FaYoutube />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
