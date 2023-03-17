import type { contactForm } from "@prisma/client";

import { prisma } from "~/db.server";

// export async function getAllUser(id: User["id"]) {
//   return prisma.user.findUnique({ where: { id } });
// }

export type GetAllProps = {
  page?: number;
};

export type CreateProps = {
  name: contactForm["name"];
  message: contactForm["message"];
  email: contactForm["email"];
  firm: contactForm["firm"];
  phone: contactForm["phone"];
};

const take = 20;
export async function getAllContact({ page = 0 }) {
  return prisma.contactForm.findMany({
    skip: page * take,
    take,
    orderBy: {
      id: "desc",
    },
  });
}

export async function createContactForm(props: CreateProps) {
  return prisma.contactForm.create({
    data: props,
  });
}
