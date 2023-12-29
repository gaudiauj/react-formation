import type {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { getBlogListFromDb, getBlogPageFromSlug } from "~/models/blog.server";
import Markdown from "markdown-to-jsx";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import styles from "./blog.css";
import { useEffect } from "react";
import { getMarkdownAndUpdateFromNotion } from "~/utils/createBlogFromNotion.server";
import isAdmin from "~/utils/isAdmin.server";
import allyDark from "highlight.js/styles/a11y-dark.min.css";
import type { blog } from "@prisma/client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  Container,
  AspectRatio,
  Img,
  useColorModeValue,
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
      name: "image",
      content: blogData.image || "https://react-formation.fr/logo.jpg",
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
  getSitemapEntries: async () => {
    const blogs = await getBlogListFromDb();
    const onlineBlogs = blogs.filter((blog) => blog.status === "Done");
    return onlineBlogs.map((blog) => ({
      url: `/blog/${blog.slug}`,
      lastmod: blog.lastChange || blog.date,
      priority: 0.7,
    }));
  },
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const isCurrentUserAdmin = await isAdmin(request);
  const pageContent = await getMarkdownAndUpdateFromNotion(
    params.slug || "",
    !!isCurrentUserAdmin
  );
  const blogData = await getBlogPageFromSlug({ slug: params.slug || "" });

  if (!blogData) {
    return redirect("/404");
  }

  return { markdown: pageContent?.markdown || "", blogData };
};

export default function Index() {
  const { markdown, blogData } = useLoaderData<typeof loader>();
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
            <Text noOfLines={1}> {blogData.title}</Text>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <AspectRatio maxW="4xl" ratio={4 / 3}>
        <Img
          src={
            blogData.image ||
            "https://react-formation.fr/blogEffectDependencies.webp"
          }
          alt=""
          borderRadius="lg"
          role="presentation"
          width={"100%"}
          height={"100%"}
        />
      </AspectRatio>
      {!!blogData.date && (
        <Text color={infoColor} size="sm">
          <time dateTime={blogData.date}>{formatDate(blogData.date)}</time>
        </Text>
      )}

      <Text color={infoColor} size="sm">
        Temps de lecture :{" "}
        {Math.round(countWords(blogData?.blogPage?.markdown || "") / 200)} min
      </Text>
      <Container maxW="3xl">
        <Markdown className="blog">{markdown}</Markdown>
      </Container>
    </Container>
  );
}
