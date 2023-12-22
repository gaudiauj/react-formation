import type {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
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
import { countWords } from "~/utils/countWords";
import { Tag, HStack} from '@chakra-ui/react'
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
        datePublished: new Date(blogData?.date || "").toISOString(),
        dateModified: blogData?.lastChange
          ? new Date(blogData?.lastChange || "").toISOString()
          : new Date(blogData?.date || "").toISOString(),
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
  { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: allyDark },
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

  return { markdown: pageContent?.markdown || "", blogData };
};

  // ... (previous imports and code)

export default function Index() {
  const { markdown, blogData } = useLoaderData<typeof loader>();
  console.log({ markdown, blogData });
  console.log(blogData?.image);
  useEffect(() => {
    const isHighlight = document.querySelector(".hljs");
    if (!isHighlight) {
      hljs.highlightAll();
    }
  }, []);


    
  

  const formatDate = (dateString: string) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(dateString);
    // @ts-ignore
    return date.toLocaleDateString('fr-FR', options);
  };

  const wordCount = countWords(markdown);
  const readingTime = Math.round(wordCount / 200);

  console.log('nombre de mot', wordCount);
  console.log(blogData?.tags)

  return (
    <div className="blog-content">
      <img
      src={blogData?.image}
      alt="Introduction Image"
      className="intro-image"
    />
      <HStack>
      {
        blogData?.tags.map((tag) => <Tag color="white"  colorScheme="brand" key={tag}>{tag}</Tag>)
      }
       
      </HStack>
      {blogData?.date && (
        <p className="date">Publier le : {formatDate(blogData?.date)}</p>
      )}
      {blogData?.lastChange && (
        <p className="date-change">Modifié le : {formatDate(blogData?.lastChange)}</p>
      )}
      <p className="time-to-read">Temps de lecture : {readingTime} min</p>
      <Markdown className="blog">{markdown}</Markdown>
    </div>
  );
}
