/*
  Warnings:

  - You are about to drop the column `email` on the `pupilParents` table. All the data in the column will be lost.
  - You are about to drop the column `hashedPassword` on the `pupilParents` table. All the data in the column will be lost.
  - You are about to drop the column `hashedToken` on the `pupilParents` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `pupilParents` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `pupilParents` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "pupilParents_email_key";

-- AlterTable
ALTER TABLE "pupilParents" DROP COLUMN "email",
DROP COLUMN "hashedPassword",
DROP COLUMN "hashedToken",
DROP COLUMN "name",
DROP COLUMN "phone";
