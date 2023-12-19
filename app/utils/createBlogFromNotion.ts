import type { Blog } from "~/models/blog.server";
import {
  createBlog,
  createMarkdown,
  getBlogListFromDb,
  getBlogPageFromSlug,
  getMarkdownFromDb,
} from "~/models/blog.server";
import { getDatabaseBlog, getPageContent } from "~/models/notion.server";
import { myCache } from "~/entry.server";
import fs from "node:fs";
import type { blogPage } from "@prisma/client";

export async function createAndUpdateBlogFromNotion(
  isAdmin = false
): Promise<Blog[]> {
  if (!isAdmin && myCache.get("updatedBlogList"))
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

  const blogList = ((await Promise.all(updatedBlog)) || []).filter((blog) => {
    if (isAdmin) return true;
    return blog.status === "Done";
  });
  if (!isAdmin) {
    myCache.set("updatedBlogList", blogList, 60 * 60 * 24);
  }
  return blogList;
}

export async function getMarkdownAndUpdateFromNotion(
  slug: string,
  isAdmin = false
): Promise<blogPage | null> {
  if (!isAdmin && myCache.get(`markdown-${slug}`))
    return myCache.get(`markdown-${slug}`) as blogPage;
  const blogData = await getBlogPageFromSlug({ slug: slug || "" });
  const markdown = await getPageContent({ id: blogData?.id || "" });

  if (markdown === undefined)
    return await getMarkdownFromDb({ blog_id: blogData?.id || "" });

  const updatedMarkdown = await createMarkdown({
    blogPostId: blogData?.id || "",
    markdown,
  });

  if (!isAdmin) {
    myCache.set(`markdown-${slug}`, updatedMarkdown, 60 * 60 * 24);
  }
  fs.writeFile(`./app/blogPost/${slug}.md`, markdown, (err) => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });
  return updatedMarkdown;
}
