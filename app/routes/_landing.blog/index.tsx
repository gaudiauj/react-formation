import { Link, useLoaderData } from "@remix-run/react";
import { Link as UiLink } from "@chakra-ui/react";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { createAndUpdateBlogFromNotion } from "~/utils/createBlogFromNotion";
import isAdmin from "~/utils/isAdmin.server";

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
  const isCurrentUserAdmin = await isAdmin(request);
  const blogList = await createAndUpdateBlogFromNotion(!!isCurrentUserAdmin);
  return { blogList };
};

export default function Index() {
  const { blogList } = useLoaderData<typeof loader>();

  console.log({ blogList });
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
