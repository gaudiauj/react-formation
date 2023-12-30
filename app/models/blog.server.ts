import { prisma } from "~/db.server";

// export async function getAllUser(id: User["id"]) {
//   return prisma.user.findUnique({ where: { id } });
// }

export type Blog = {
  id: string;
  title: string;
  slug: string;
  image: string;
  status: string;
  tags: string[];
  date: Date | null;
  lastChange: Date | null;
  metaDescription: string | null;
  blogPage?: {
    markdown: string;
  } | null;
};

export async function createBlog({
  id,
  title,
  slug,
  tags,
  image,
  status,
  date,
  lastChange,
  metaDescription,
}: Blog) {
  const updateObject: any = {
    id,
    title,
    slug,
    tags,
    image,
    status,
    metaDescription,
  };
  updateObject.date = date ? date : null;
  updateObject.lastChange = lastChange ? lastChange : null;

  return prisma.blog.upsert({
    where: {
      id,
    },
    update: updateObject,
    create: updateObject,
    include: {
      blogPage: true,
    },
  });
}

export async function getBlogListFromDb(isAdmin = false) {
  return prisma.blog.findMany({
    where: isAdmin
      ? {}
      : {
          status: "Done",
        },
    orderBy: {
      date: "desc",
    },
    include: {
      blogPage: true,
    },
  });
}

export async function getBlogPageFromSlug({
  slug,
  withBlogPage = true,
  isAdmin = false,
}: {
  slug: string;
  withBlogPage?: boolean;
  isAdmin?: boolean;
}) {
  return prisma.blog.findFirst({
    where: {
      slug,
      ...(isAdmin
        ? {}
        : {
            status: "Done",
          }),
    },
    include: {
      blogPage: withBlogPage,
    },
  });
}

export async function createMarkdown({
  markdown,
  blogPostId,
}: {
  markdown: string;
  blogPostId: string;
}) {
  return prisma.blogPage.upsert({
    where: {
      blog_id: blogPostId,
    },
    update: {
      markdown,
    },
    create: {
      markdown,
      blog_id: blogPostId,
    },
  });
}

export async function getMarkdownFromDb({ blog_id }: { blog_id: string }) {
  return prisma.blogPage.findUnique({
    where: {
      blog_id,
    },
  });
}
