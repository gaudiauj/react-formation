import { Link, useLoaderData } from "@remix-run/react";
import {
  Card,
  CardBody,
  Divider,
  Heading,
  Link as UiLink,
  SimpleGrid,
  Stack,
  Img,
  Text,
  AspectRatio,
  Container,
} from "@chakra-ui/react";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { createAndUpdateBlogFromNotion } from "~/utils/createBlogFromNotion.server";
import isAdmin from "~/utils/isAdmin.server";
import { countWords } from "~/utils/countWords";

export const meta: MetaFunction = () => {
  return [
    { title: "react-formation | blog " },
    {
      name: "description",
      content:
        "Les dernières nouvelles et articles de blog de react-formation ! venez apprendre react avec nous",
    },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const isCurrentUserAdmin = await isAdmin(request);
  const blogList = await createAndUpdateBlogFromNotion(!!isCurrentUserAdmin);
  return { blogList };
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function Index() {
  const { blogList } = useLoaderData<typeof loader>();

  return (
    <Container maxW={"5xl"} py={12} px={8}>
      <Heading as="h1" color="brand.500" marginBottom={4}>
        Les derniers posts de blog
      </Heading>
      <Text>
        Les dernières nouvelles et articles de blog de react-formation !
      </Text>
      <Text>venez apprendre react avec nous</Text>
      <SimpleGrid
        columns={3}
        spacing={16}
        marginBottom={32}
        padding={16}
        minChildWidth={{
          base: "210px",
          md: "230px",
        }}
      >
        {blogList.map((blog) => (
          <Card as={Link} to={`/blog/${blog.slug}`} key={blog.id} maxW="sm">
            <CardBody>
              <AspectRatio ratio={4 / 3}>
                <Img
                  src={
                    blog.image ||
                    "https://react-formation.fr/blogEffectDependencies.webp"
                  }
                  alt=""
                  borderRadius="lg"
                  role="presentation"
                  width={"100%"}
                  height={"100%"}
                />
              </AspectRatio>

              <Stack mt="6" spacing="3">
                {!!blog.date && (
                  <Text color={"gray.600"} size="sm">
                    <time dateTime={blog.date}>{formatDate(blog.date)}</time>
                  </Text>
                )}

                <Text color={"gray.600"} size="sm">
                  Temps de lecture :{" "}
                  {Math.round(countWords(blog?.blogPage?.markdown || "") / 200)}{" "}
                  min
                </Text>
                <Heading size="md">{blog.title}</Heading>
              </Stack>
            </CardBody>
            <Divider />
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}
