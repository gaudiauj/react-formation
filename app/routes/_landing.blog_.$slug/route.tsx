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
import { getMarkdownAndUpdateFromNotion } from "~/utils/createBlogFromNotion";
import isAdmin from "~/utils/isAdmin.server";
import allyDark from "highlight.js/styles/a11y-dark.min.css";
import type { blog } from "@prisma/client";
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

export default function Index() {
  const { markdown, blogData } = useLoaderData<typeof loader>();
  console.log({ markdown, blogData });
  useEffect(() => {
    const isHighlight = document.querySelector(".hljs");
    if (!isHighlight) {
      hljs.highlightAll();
    }
  }, []);

  return <Markdown className="blog">{markdown}</Markdown>;
}
