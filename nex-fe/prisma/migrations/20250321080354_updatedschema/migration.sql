/*
  Warnings:

  - A unique constraint covering the columns `[label]` on the table `FocusAreas` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `label` to the `FocusAreas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FocusAreas" ADD COLUMN     "label" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FocusAreas_label_key" ON "FocusAreas"("label");
