/*
  Warnings:

  - You are about to drop the column `clientId` on the `favorite_cars` table. All the data in the column will be lost.
  - Added the required column `userId` to the `favorite_cars` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "favorite_cars" DROP CONSTRAINT "favorite_cars_clientId_fkey";

-- AlterTable
ALTER TABLE "favorite_cars" DROP COLUMN "clientId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "favorite_cars" ADD CONSTRAINT "favorite_cars_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
