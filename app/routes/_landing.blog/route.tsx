import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { fetchAPI } from "./blog.api.server";
import isAdmin from "~/utils/isAdmin.server";

export const meta: MetaFunction = () => {
  return {
    title: "react-formation | blog ",
  };
};
type BlogResponse = {
  data: BlogPost[];
};
type BlogPost = {
  id: string;
  attributes: {
    title: string;
    slug: string;
    isDeployed: boolean;
    content: string;
    image?: string;
    video?: string;
  };
};

export const loader = async ({ request }: LoaderArgs) => {
  const blogPosts = (await fetchAPI("/blog-posts")) as BlogResponse;
  const isCurrentUserAdmin = await isAdmin(request);
  const blogList = (blogPosts?.data || []).filter(
    (blog) => isCurrentUserAdmin || blog.attributes.isDeployed
  );
  return json({ blogs: blogList });
};

export default function Index() {
  const { blogs } = useLoaderData<typeof loader>();

  return (
    <main>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blog/${blog.attributes.slug}`}>
              {blog.attributes.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
