/*
  Warnings:

  - You are about to drop the column `userId` on the `homeWorkSubmissions` table. All the data in the column will be lost.
  - Changed the type of `score` on the `homeWorkSubmissions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "homeWorkSubmissions" DROP CONSTRAINT "homeWorkSubmissions_userId_fkey";

-- DropIndex
DROP INDEX "homeWorkSubmissions_score_key";

-- AlterTable
ALTER TABLE "homeWorkSubmissions" DROP COLUMN "userId",
ADD COLUMN     "pupilId" INTEGER,
DROP COLUMN "score",
ADD COLUMN     "score" DOUBLE PRECISION NOT NULL;

-- AddForeignKey
ALTER TABLE "homeWorkSubmissions" ADD CONSTRAINT "homeWorkSubmissions_pupilId_fkey" FOREIGN KEY ("pupilId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
