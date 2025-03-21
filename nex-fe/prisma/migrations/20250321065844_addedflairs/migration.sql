-- CreateTable
CREATE TABLE "FocusAreas" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "FocusAreas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PostFocusArea" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PostFocusArea_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "FocusAreas_name_key" ON "FocusAreas"("name");

-- CreateIndex
CREATE INDEX "_PostFocusArea_B_index" ON "_PostFocusArea"("B");

-- AddForeignKey
ALTER TABLE "_PostFocusArea" ADD CONSTRAINT "_PostFocusArea_A_fkey" FOREIGN KEY ("A") REFERENCES "FocusAreas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostFocusArea" ADD CONSTRAINT "_PostFocusArea_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
