import { Link, useLoaderData } from "@remix-run/react";
import { Link as UiLink } from "@chakra-ui/react";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { createAndUpdateBlogFromNotion } from "~/utils/createBlogFromNotion";

export const meta: MetaFunction = () => {
  return [
    { title: "react-formation | blog " },
    {
      name: "robots",
      content: "noindex,nofollow",
    },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const blogList = await createAndUpdateBlogFromNotion();
  return { blogList };
};

export default function Index() {
  const { blogList } = useLoaderData<typeof loader>();

  return (
    <ul>
      {blogList.map((blog) => (
        <li key={blog.id}>
          <UiLink as={Link} to={`/blog/${blog.slug}`}>
            {blog.title}
          </UiLink>
        </li>
      ))}
    </ul>
  );
}
