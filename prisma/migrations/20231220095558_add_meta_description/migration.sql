/*
  Warnings:

  - You are about to drop the column `metaDescription` on the `blogPage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "blog" ADD COLUMN     "metaDescription" TEXT;

-- AlterTable
ALTER TABLE "blogPage" DROP COLUMN "metaDescription";
