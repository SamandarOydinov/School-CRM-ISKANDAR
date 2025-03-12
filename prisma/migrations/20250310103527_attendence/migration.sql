/*
  Warnings:

  - You are about to drop the column `studentId` on the `attendances` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `examResults` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "attendances" DROP CONSTRAINT "attendances_studentId_fkey";

-- DropForeignKey
ALTER TABLE "examResults" DROP CONSTRAINT "examResults_studentId_fkey";

-- AlterTable
ALTER TABLE "attendances" DROP COLUMN "studentId",
ADD COLUMN     "pupilId" INTEGER;

-- AlterTable
ALTER TABLE "examResults" DROP COLUMN "studentId",
ADD COLUMN     "pupilId" INTEGER;

-- AddForeignKey
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_pupilId_fkey" FOREIGN KEY ("pupilId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "examResults" ADD CONSTRAINT "examResults_pupilId_fkey" FOREIGN KEY ("pupilId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
