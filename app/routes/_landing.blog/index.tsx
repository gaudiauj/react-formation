import { Link, useLoaderData } from "@remix-run/react";
import { Link as UiLink } from "@chakra-ui/react";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { createAndUpdateBlogFromNotion } from "~/utils/createBlogFromNotion";
import isAdmin from "~/utils/isAdmin.server";

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
