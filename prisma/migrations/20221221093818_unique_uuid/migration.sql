/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Tag_uuid_key" ON "Tag"("uuid");
