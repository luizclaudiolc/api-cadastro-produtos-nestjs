-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'DEFAULT');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'DEFAULT';
