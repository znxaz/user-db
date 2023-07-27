/*
  Warnings:

  - You are about to drop the column `createdAT` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAT` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `createdAT`,
    DROP COLUMN `updatedAT`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `FirstName` VARCHAR(191) NULL,
    MODIFY `LastName` VARCHAR(191) NULL,
    MODIFY `role` VARCHAR(191) NULL,
    MODIFY `isAdmin` BOOLEAN NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);
