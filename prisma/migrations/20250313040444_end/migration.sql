/*
  Warnings:

  - A unique constraint covering the columns `[room]` on the table `classes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "classes_room_key" ON "classes"("room");
