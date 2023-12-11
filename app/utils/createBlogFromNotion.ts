import type { Blog } from "~/models/blog.server";
import { createBlog, getBlogListFromDb } from "~/models/blog.server";
import { getDatabaseBlog } from "~/models/notion.server";
import { myCache } from "~/entry.server";

export async function createAndUpdateBlogFromNotion(): Promise<Blog[]> {
  if (myCache.get("updatedBlogList"))
    return myCache.get("updatedBlogList") as Blog[];
  const notionBlog = await getDatabaseBlog();

  if (notionBlog === undefined) return await getBlogListFromDb();

  const updatedBlog = (notionBlog || []).map(async (blog: any) => {
    return await createBlog({
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      image: blog.image,
      status: blog.status,
      tags: blog.tags,
    });
  });

  const blogList = (await Promise.all(updatedBlog)) || [];
  myCache.set("updatedBlogList", blogList, 60 * 60 * 24);
  return blogList;
}
