/*
  Warnings:

  - You are about to drop the column `hashedToken` on the `parents` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "admins" ALTER COLUMN "hashedRefreshToken" SET DEFAULT '';

-- AlterTable
ALTER TABLE "chatGroupMembers" ADD COLUMN     "chatGroupId" INTEGER,
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "parents" DROP COLUMN "hashedToken",
ADD COLUMN     "hashedRefreshToken" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "hashedRefreshToken" SET DEFAULT '';

-- AddForeignKey
ALTER TABLE "chatGroupMembers" ADD CONSTRAINT "chatGroupMembers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chatGroupMembers" ADD CONSTRAINT "chatGroupMembers_chatGroupId_fkey" FOREIGN KEY ("chatGroupId") REFERENCES "chatGroups"("id") ON DELETE SET NULL ON UPDATE CASCADE;
