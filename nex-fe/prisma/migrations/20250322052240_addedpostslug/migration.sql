/*
  Warnings:

  - You are about to drop the `FocusAreas` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_PostFocusArea" DROP CONSTRAINT "_PostFocusArea_A_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "slug" TEXT NOT NULL;

-- DropTable
DROP TABLE "FocusAreas";

-- CreateTable
CREATE TABLE "FocusArea" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "FocusArea_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FocusArea_name_key" ON "FocusArea"("name");

-- CreateIndex
CREATE UNIQUE INDEX "FocusArea_label_key" ON "FocusArea"("label");

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");

-- AddForeignKey
ALTER TABLE "_PostFocusArea" ADD CONSTRAINT "_PostFocusArea_A_fkey" FOREIGN KEY ("A") REFERENCES "FocusArea"("id") ON DELETE CASCADE ON UPDATE CASCADE;
