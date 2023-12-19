import type {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getBlogPageFromSlug } from "~/models/blog.server";
import Markdown from "markdown-to-jsx";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import styles from "./blog.css";
import { useEffect } from "react";
import { getMarkdownAndUpdateFromNotion } from "~/utils/createBlogFromNotion";
import isAdmin from "~/utils/isAdmin.server";
import allyDark from "highlight.js/styles/a11y-dark.min.css";
import { m } from "framer-motion";
// Then register the languages you need
hljs.registerLanguage("javascript", javascript);

export const meta: MetaFunction = () => {
  return [
    { title: "react-formation | blog " },
    {
      name: "robots",
      content: "noindex,nofollow",
    },
  ];
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: allyDark },
];

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const isCurrentUserAdmin = await isAdmin(request);
  const blogData = await getBlogPageFromSlug({ slug: params.slug || "" });
  const pageContent = await getMarkdownAndUpdateFromNotion(
    params.slug || "",
    !!isCurrentUserAdmin
  );
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

  return <Markdown>{markdown}</Markdown>;
}
