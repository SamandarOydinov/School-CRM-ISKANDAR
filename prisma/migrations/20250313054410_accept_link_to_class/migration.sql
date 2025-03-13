/*
  Warnings:

  - A unique constraint covering the columns `[accept_link_to_class]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "accept_link_to_class" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "users_accept_link_to_class_key" ON "users"("accept_link_to_class");
