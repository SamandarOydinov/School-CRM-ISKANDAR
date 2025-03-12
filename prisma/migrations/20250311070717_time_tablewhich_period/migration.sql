/*
  Warnings:

  - You are about to alter the column `which_period` on the `timeTables` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "timeTables" ALTER COLUMN "which_period" SET DATA TYPE INTEGER;
