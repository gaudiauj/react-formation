import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getBlogPageFromSlug } from "~/models/blog.server";
import { getPageContent } from "~/models/notion.server";
import Markdown from "markdown-to-jsx";

export const meta: MetaFunction = () => {
  return [
    { title: "react-formation | blog " },
    {
      name: "robots",
      content: "noindex,nofollow",
    },
  ];
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  console.log(params);
  const blogData = await getBlogPageFromSlug({ slug: params.slug || "" });
  const markdown = await getPageContent({ id: blogData?.id || "" });
  return { markdown };
};

export default function Index() {
  const { markdown } = useLoaderData<typeof loader>();

  return (
    <div>
      <Markdown>{markdown}</Markdown>
    </div>
  );
}
