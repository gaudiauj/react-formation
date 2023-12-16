import type {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getBlogPageFromSlug } from "~/models/blog.server";
import { getPageContent } from "~/models/notion.server";
import Markdown from "markdown-to-jsx";
import { Heading } from "@chakra-ui/react";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import styles from "./blog.css";
import { useEffect } from "react";

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
  {
    rel: "stylesheet",
    href: "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css",
  },
];

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const blogData = await getBlogPageFromSlug({ slug: params.slug || "" });
  const markdown = await getPageContent({ id: blogData?.id || "" });
  return { markdown };
};

export default function Index() {
  const { markdown } = useLoaderData<typeof loader>();
  useEffect(() => {
    console.log("coucou");
    const isHighlight = document.querySelector(".hljs");
    if (!isHighlight) {
      console.log("wesh");
      hljs.highlightAll();
    }
  }, []);

  return (
    <div>
      <Markdown
        options={{
          overrides: {
            h1: {
              component: Heading,
              props: {
                as: "h1",
              },
            },
            h2: {
              component: Heading,
              props: {
                as: "h2",
              },
            },
            h3: {
              component: Heading,
              props: {
                as: "h3",
                size: "md",
              },
            },
          },
        }}
      >
        {markdown}
      </Markdown>
    </div>
  );
}
