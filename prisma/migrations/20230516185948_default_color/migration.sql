/*
  Warnings:

  - Made the column `color` on table `Note` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Note" ALTER COLUMN "color" SET NOT NULL,
ALTER COLUMN "color" SET DEFAULT 'inherit';
