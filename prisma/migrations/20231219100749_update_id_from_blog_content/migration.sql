/*
  Warnings:

  - The primary key for the `blogPage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `blogPage` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "blogPage_id_key";

-- AlterTable
ALTER TABLE "blogPage" DROP CONSTRAINT "blogPage_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "blogPage_pkey" PRIMARY KEY ("id");
