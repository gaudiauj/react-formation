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
};

export async function createBlog({
  id,
  title,
  slug,
  tags,
  image,
  status,
}: Blog) {
  return prisma.blog.upsert({
    where: {
      id,
    },
    update: {
      id,
      title,
      slug,
      tags,
      image,
      status,
    },
    create: {
      id,
      title,
      slug,
      tags,
      image,
      status,
    },
  });
}

export async function getBlogListFromDb() {
  return prisma.blog.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getBlogPageFromSlug({ slug }: { slug: string }) {
  return prisma.blog.findFirst({
    where: {
      slug,
    },
    include: {
      blogPage: true,
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
