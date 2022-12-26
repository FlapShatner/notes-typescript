/*
  Warnings:

  - You are about to alter the column `markdown` on the `Note` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(2000)`.

*/
-- AlterTable
ALTER TABLE "Note" ALTER COLUMN "markdown" SET DATA TYPE VARCHAR(2000);
