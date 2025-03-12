/*
  Warnings:

  - You are about to drop the column `teacherId` on the `homeWorks` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "homeWorks" DROP CONSTRAINT "homeWorks_teacherId_fkey";

-- AlterTable
ALTER TABLE "homeWorks" DROP COLUMN "teacherId";
