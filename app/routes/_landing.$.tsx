import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { Link, useRouteError } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: `react-formation | 404` }];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  throw new Response(null, {
    status: 404,
    statusText: "Not Found",
  });
  return { status: "404" };
};

export const handle = {
  getSitemapEntries: () => null,
};

export function ErrorBoundary() {
  const error = useRouteError();

  //@ts-expect-error
  if (error?.status === 404) {
    return (
      <Box textAlign="center" py={10} px={6}>
        <Heading
          display="inline-block"
          as="h2"
          size="2xl"
          bgGradient="linear(to-r, brand.400, brand.600)"
          backgroundClip="text"
        >
          404
        </Heading>
        <Text fontSize="18px" mt={3} mb={2}>
          Page Not Found
        </Text>
        <Text color={"gray.500"} mb={6}>
          La page n'existe pas
        </Text>

        <Button
          as={Link}
          colorScheme="brand"
          bgGradient="linear(to-r, brand.400, brand.500, brand.600)"
          color="white"
          variant="solid"
          to="/"
        >
          Accueil
        </Button>
      </Box>
    );
  }

  throw error;
}

export default function NotFound() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, brand.400, brand.600)"
        backgroundClip="text"
      >
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text color={"gray.500"} mb={6}>
        La page n'existe pas
      </Text>

      <Button
        as={Link}
        colorScheme="brand"
        bgGradient="linear(to-r, brand.400, brand.500, brand.600)"
        color="white"
        variant="solid"
        to="/"
      >
        Accueil
      </Button>
    </Box>
  );
}
