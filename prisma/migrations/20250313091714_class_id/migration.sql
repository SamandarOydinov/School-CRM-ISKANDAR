/*
  Warnings:

  - A unique constraint covering the columns `[classId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_classId_key" ON "users"("classId");
