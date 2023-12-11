-- CreateTable
CREATE TABLE "blogPage" (
    "id" TEXT NOT NULL,
    "blog_id" TEXT NOT NULL,
    "markdown" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blogPage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "blogPage_id_key" ON "blogPage"("id");

-- CreateIndex
CREATE UNIQUE INDEX "blogPage_blog_id_key" ON "blogPage"("blog_id");

-- AddForeignKey
ALTER TABLE "blogPage" ADD CONSTRAINT "blogPage_blog_id_fkey" FOREIGN KEY ("blog_id") REFERENCES "blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
