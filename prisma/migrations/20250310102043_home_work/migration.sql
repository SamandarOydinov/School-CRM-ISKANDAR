/*
  Warnings:

  - You are about to drop the column `userId` on the `homeWorks` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "homeWorks" DROP CONSTRAINT "homeWorks_userId_fkey";

-- AlterTable
ALTER TABLE "homeWorks" DROP COLUMN "userId",
ADD COLUMN     "teacherId" INTEGER;

-- AddForeignKey
ALTER TABLE "homeWorks" ADD CONSTRAINT "homeWorks_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
