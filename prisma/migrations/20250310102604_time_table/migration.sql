/*
  Warnings:

  - You are about to drop the column `team` on the `timeTables` table. All the data in the column will be lost.
  - Added the required column `theme` to the `timeTables` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "timeTables" DROP COLUMN "team",
ADD COLUMN     "theme" TEXT NOT NULL;
