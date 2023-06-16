/*
  Warnings:

  - The `Role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "Role",
ADD COLUMN     "Role" "Role" NOT NULL DEFAULT 'USER';
