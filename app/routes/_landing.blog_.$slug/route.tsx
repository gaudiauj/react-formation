import type {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { getBlogListFromDb } from "~/models/blog.server";
import Markdown from "markdown-to-jsx";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import styles from "./blog.css?url";
import { useEffect } from "react";
import { getBlogPost } from "~/utils/createBlogFromNotion.server";
import isAdmin from "~/utils/isAdmin.server";
import allyDark from "highlight.js/styles/a11y-dark.min.css?url";
import type { blog } from "@prisma/client";
import { serverOnly$ } from "vite-env-only/macros";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  Container,
  AspectRatio,
  Img,
  useColorModeValue,
  Card,
  Avatar,
  Box,
  CardBody,
  CardHeader,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { countWords } from "~/utils/countWords";
import { formatDate } from "../_landing.blog";

// Then register the languages you need
hljs.registerLanguage("javascript", javascript);

export const meta: MetaFunction = ({ data }) => {
  const blogData = (data as any).blogData as blog;
  return [
    { title: `${blogData.title} | react-formation` },
    {
      name: "description",
      content: blogData.metaDescription || blogData.title,
    },
    {
      property: "og:title",
      content: blogData.metaDescription || blogData.title,
    },
    {
      property: "og:image",
      content: blogData.image || "https://react-formation.fr/logo.jpg",
    },
    {
      property: "og:type",
      content: `article`,
    },
    {
      property: "og:description",
      content: blogData.metaDescription,
    },
    {
      property: "og:image",
      content: blogData.image || "https://react-formation.fr/logo.jpg",
    },
    {
      property: "og:site_name",
      content: "react-formation",
    },
    {
      name: "twitter:title",
      content: blogData.metaDescription || blogData.title,
    },
    {
      name: "twitter:image",
      content: blogData.image || "https://react-formation.fr/logo.jpg",
    },
    {
      name: "twitter:card",
      content: `summary_large_image`,
    },
    {
      name: "twitter:description",
      content: blogData.metaDescription,
    },
    {
      name: "og:image",
      content: blogData.image || "https://react-formation.fr/logo.jpg",
    },
    {
      name: "image",
      content: blogData.image || "https://react-formation.fr/logo.jpg",
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "blog",
            item: "https://react-formation.fr/blog",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: blogData.title,
            item: `https://react-formation.fr/blog/${blogData.slug}`,
          },
        ],
      },
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org/",
        "@type": "BlogPosting",
        headline: blogData.title,
        description: blogData.metaDescription || blogData.title,
        datePublished: new Date(blogData?.date || Date.now()).toISOString(),
        dateModified: blogData?.lastChange
          ? new Date(blogData?.lastChange).toISOString()
          : new Date(blogData?.date || Date.now()).toISOString(),
        author: {
          "@type": "Person",
          name: "Jean Gaudiau",
          url: "https://www.linkedin.com/in/jean-gaudiau-50b10439/",
        },
        images: [
          `https://react-formation.fr/resized/${blogData?.slug}_100.png`,
          `https://react-formation.fr/resized/${blogData?.slug}_133.png`,
          `https://react-formation.fr/resized/${blogData?.slug}_178.png`,
        ],
        publisher: {
          "@type": "Organization",
          name: "react-formation",
          logo: "https://react-formation.fr/logo.jpg",
        },
        image: [blogData?.image || "https://react-formation.fr/logo.jpg"],
        keywords: blogData?.tags || [],
      },
    },
  ];
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles, defer: true },
  { rel: "stylesheet", href: allyDark, defer: true },
];

export const handle = {
  getSitemapEntries: serverOnly$(async () => {
    const blogs = await getBlogListFromDb();
    return blogs.map((blog) => ({
      url: `/blog/${blog.slug}`,
      lastmod: blog.lastChange || blog.date,
      priority: 0.7,
    }));
  }),
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const isCurrentUserAdmin = await isAdmin(request);

  const blogData = await getBlogPost({
    slug: params.slug || "",
    isAdmin: !!isCurrentUserAdmin,
  });

  if (!blogData) {
    return redirect("/404");
  }

  return { blogData };
};

export default function Index() {
  const { blogData } = useLoaderData<typeof loader>();
  const markdown = blogData?.blogPage?.markdown;
  const infoColor = useColorModeValue("gray.600", "gray.300");
  const BreadcrumbColor = useColorModeValue("brand.700", "brand.300");
  useEffect(() => {
    const isHighlight = document.querySelector(".hljs");
    if (!isHighlight) {
      hljs.highlightAll();
    }
  }, []);

  return (
    <Container maxW={"5xl"} py={12} px={8} color={BreadcrumbColor}>
      <Breadcrumb separator={<ChevronRightIcon color="brand.400" />}>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/blog">
            blog
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink as={Link} to="#">
            <Text noOfLines={1}> {blogData?.title}</Text>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <AspectRatio maxW="4xl" ratio={4 / 3}>
        <Img
          src={
            blogData?.image ||
            "https://react-formation.fr/blogEffectDependencies.webp"
          }
          alt=""
          borderRadius="lg"
          role="presentation"
          width={"100%"}
          height={"100%"}
        />
      </AspectRatio>
      {!!blogData?.date && (
        <Text color={infoColor} size="sm">
          <time dateTime={blogData.date}>{formatDate(blogData.date)}</time>
        </Text>
      )}

      <Text color={infoColor} size="sm">
        Temps de lecture :{" "}
        {Math.round(countWords(blogData?.blogPage?.markdown || "") / 200)} min
      </Text>
      <Container maxW="3xl" padding={0}>
        <Markdown className="blog">{markdown || ""}</Markdown>
        <Card display="flex">
          <CardHeader>
            <Heading size="md" as="h3">
              A propos de l'auteur
            </Heading>
          </CardHeader>
          <CardBody padding={"0 16px 16px 16px"}>
            <Flex>
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Avatar
                  name="Jean Gaudiau"
                  src="https://media.licdn.com/dms/image/C4D03AQFOmF3pgFBkKQ/profile-displayphoto-shrink_400_400/0/1530119054708?e=1709769600&v=beta&t=se54yp3ALhoBVMCyMLGt7K_-HvECoRbFj4Un8v8EKGM"
                />
                <Box>
                  <Heading size="sm" as="h3">
                    Jean Gaudiau
                  </Heading>
                  <Text color={infoColor} margin={0}>
                    freelance, formateur
                  </Text>
                </Box>
              </Flex>
            </Flex>
            <Text>
              Je suis un expert React.js pour qui la qualité et la fiabilité des
              applications est ma priorité. Je suis disponible en tant que
              freelance pour renforcer vos équipes, ou bien en tant que
              formateur sur React tout niveau. Vous pouvez me contacter via mon{" "}
              <Link to={"https://www.linkedin.com/in/jean-gaudiau-50b10439/"}>
                Linkedin
              </Link>{" "}
              ou la page de <Link to={"/contact"}>contact</Link>
            </Text>
          </CardBody>
        </Card>
      </Container>
    </Container>
  );
}
