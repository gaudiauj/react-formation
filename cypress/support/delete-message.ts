// Use this to delete a user by their email
// Simply call this with:
// npx ts-node --require tsconfig-paths/register ./cypress/support/delete-user.ts username@example.com
// and that user will get deleted

import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { installGlobals } from "@remix-run/node";

import { prisma } from "~/db.server";

installGlobals();

async function deleteMessage(email: string) {
  if (!email) {
    throw new Error("email required for login");
  }

  try {
    await prisma.contactForm.deleteMany({ where: { email } });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      console.log("email not found, so no need to delete");
    } else {
      throw error;
    }
  } finally {
    await prisma.$disconnect();
  }
}

deleteMessage(process.argv[2]);
