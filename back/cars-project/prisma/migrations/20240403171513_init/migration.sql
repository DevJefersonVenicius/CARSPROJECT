/*
  Warnings:

  - Made the column `cpf` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "users_cpf_key";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "cpf" SET NOT NULL;
