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
    update: {},
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
