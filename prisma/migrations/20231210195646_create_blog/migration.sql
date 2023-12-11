-- CreateTable
CREATE TABLE "blog" (
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "tags" TEXT[],
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "blog_id_key" ON "blog"("id");
