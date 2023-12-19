/*
  Warnings:

  - The primary key for the `blogPage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `blogPage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "blogPage" DROP CONSTRAINT "blogPage_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "blogPage_pkey" PRIMARY KEY ("blog_id");
