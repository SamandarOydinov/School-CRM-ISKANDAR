/*
  Warnings:

  - You are about to drop the `lessonMterials` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "lessonMterials" DROP CONSTRAINT "lessonMterials_fileId_fkey";

-- DropForeignKey
ALTER TABLE "lessonMterials" DROP CONSTRAINT "lessonMterials_lessonId_fkey";

-- DropTable
DROP TABLE "lessonMterials";

-- CreateTable
CREATE TABLE "lessonMaterials" (
    "id" SERIAL NOT NULL,
    "topic_name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "uploaded_at" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fileId" INTEGER,
    "lessonId" INTEGER,

    CONSTRAINT "lessonMaterials_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "lessonMaterials" ADD CONSTRAINT "lessonMaterials_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessonMaterials" ADD CONSTRAINT "lessonMaterials_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE SET NULL ON UPDATE CASCADE;
