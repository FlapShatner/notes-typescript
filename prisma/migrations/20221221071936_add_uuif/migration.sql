/*
  Warnings:

  - Added the required column `uuid` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "uuid" VARCHAR(255) NOT NULL;
