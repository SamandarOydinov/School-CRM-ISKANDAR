-- AlterTable
ALTER TABLE "admins" ALTER COLUMN "is_active" SET DEFAULT false;

-- AlterTable
ALTER TABLE "chatGroupMembers" ALTER COLUMN "is_active" SET DEFAULT false;

-- AlterTable
ALTER TABLE "classes" ALTER COLUMN "is_active" SET DEFAULT false;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "is_active" SET DEFAULT false;
