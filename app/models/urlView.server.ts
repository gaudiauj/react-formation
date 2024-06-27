import type { urlView } from "@prisma/client";
import { prisma } from "~/db.server";

// export async function getAllUser(id: User["id"]) {
//   return prisma.user.findUnique({ where: { id } });
// }

export type GetAllProps = {
  page?: number;
};

export type CreateProps = {
  pathname: urlView["pathname"];
  search: urlView["search"];
};

const take = 20;
export async function getAllUrlView({ page = 0 }) {
  return await prisma.urlView.findMany({
    skip: page * take,
    take,
    orderBy: {
      id: "desc",
    },
  });
}

export async function createUrlView({ pathname, search }: CreateProps) {
  return prisma.urlView.create({
    data: {
      pathname,
      search,
    },
  });
}
