/*
  Warnings:

  - You are about to drop the `classs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `homeWorkfiles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "chatGroups" DROP CONSTRAINT "chatGroups_classId_fkey";

-- DropForeignKey
ALTER TABLE "classs" DROP CONSTRAINT "classs_courseId_fkey";

-- DropForeignKey
ALTER TABLE "homeWorkfiles" DROP CONSTRAINT "homeWorkfiles_fileId_fkey";

-- DropForeignKey
ALTER TABLE "homeWorkfiles" DROP CONSTRAINT "homeWorkfiles_homeWorkId_fkey";

-- DropForeignKey
ALTER TABLE "lessons" DROP CONSTRAINT "lessons_groupId_fkey";

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_groupId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_classId_fkey";

-- DropTable
DROP TABLE "classs";

-- DropTable
DROP TABLE "homeWorkfiles";

-- CreateTable
CREATE TABLE "classes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lessonStartDate" TIMESTAMP(3) NOT NULL,
    "lessonEndDate" TIMESTAMP(3) NOT NULL,
    "room" INTEGER NOT NULL,
    "roomFloor" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "totalPupil" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "courseId" INTEGER,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "homeWorkFiles" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "homeWorkId" INTEGER,
    "fileId" INTEGER,

    CONSTRAINT "homeWorkFiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "classes_name_key" ON "classes"("name");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "classes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "homeWorkFiles" ADD CONSTRAINT "homeWorkFiles_homeWorkId_fkey" FOREIGN KEY ("homeWorkId") REFERENCES "homeWorks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "homeWorkFiles" ADD CONSTRAINT "homeWorkFiles_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chatGroups" ADD CONSTRAINT "chatGroups_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "classes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
