import {
  getDatabaseBlog,
  getPageContent as getPageContentFromNotion,
} from "./../models/notion.server";
import type { Blog } from "~/models/blog.server";
import {
  createBlog,
  createMarkdown,
  getBlogListFromDb,
  getBlogPageFromSlug,
} from "~/models/blog.server";
import { myCache } from "~/entry.server";
import fs from "node:fs";

export async function updateBlogFromNotion() {
  const notionBlog = await getDatabaseBlog();

  return await Promise.all(
    (notionBlog || []).map(async (blog: any) => {
      const cachedBlog = myCache.get(
        `notion-blog-${blog.id}`
      ) as typeof createBlog;
      const createdData =
        cachedBlog ||
        (await createBlog({
          id: blog.id,
          title: blog.title,
          slug: blog.slug,
          image: blog.image,
          status: blog.status,
          tags: blog.tags,
          date: blog.date,
          lastChange: blog.lastChange,
          metaDescription: blog.metaDescription,
        }));
      !cachedBlog && myCache.set(`notion-blog-${blog.id}`, createdData);
      if (!myCache.get(`notion-markdown-${blog.id}`)) {
        const markdown = await UpdateMarkdownFromNotionWithId({ id: blog.id });
        myCache.set(`notion-markdown-${blog.id}`, markdown);
      }
      myCache.set(`notion-blog-${blog.id}`, createdData);

      return createdData;
    })
  );
}

export async function getBlogList({ isAdmin = false }) {
  if (!isAdmin && myCache.get("blogList")) {
    return myCache.get("blogList") as Blog[];
  }
  updateBlogFromNotion().then(() => {
    myCache.del("blogList");
  });

  const blogList = await getBlogListFromDb(isAdmin);

  if (!isAdmin) {
    myCache.set("blogList", blogList, 60 * 60 * 24);
  }
  return blogList;
}

export async function getBlogPost({ slug = "", isAdmin = false }) {
  if (isAdmin && myCache.get(`blogPost-${slug}`)) {
    return myCache.get(`blogPost-${slug}`) as typeof getBlogPageFromSlug;
  }
  UpdateMarkdownFromNotion(slug).then(() => {
    myCache.del(`blogPost-${slug}`);
  });

  const blogList = await getBlogPageFromSlug({ slug, isAdmin });
  if (isAdmin) {
    myCache.set(`blogPost-${slug}`, blogList, 60 * 60 * 24);
  }

  return blogList;
}

export async function UpdateMarkdownFromNotionWithId({ id }: { id: string }) {
  if (myCache.get(`markdown-${id}`))
    return myCache.get(`markdown-${id}`) as ReturnType<typeof createMarkdown>;
  const markdown = await getPageContentFromNotion({ id });

  const blogPage = await createMarkdown({
    blogPostId: id,
    markdown: markdown || "",
  });

  myCache.set(`markdown-${id}`, blogPage);
  return blogPage;
}

export async function UpdateMarkdownFromNotion(slug: string) {
  if (myCache.get(`markdown-${slug}`))
    return myCache.get(`markdown-${slug}`) as ReturnType<
      typeof UpdateMarkdownFromNotionWithId
    >;
  const blogData = await getBlogPageFromSlug({
    slug: slug || "",
    withBlogPage: false,
  });
  if (!blogData) {
    return null;
  }
  const blogPage = await UpdateMarkdownFromNotionWithId({
    id: blogData?.id,
  });

  myCache.set(`markdown-${slug}`, blogPage);

  fs.writeFile(`./blogPost/${slug}.md`, blogPage?.markdown, (err) => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });
  return blogPage;
}
