/*
  Warnings:

  - A unique constraint covering the columns `[name,address]` on the table `Station` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `Station` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Station_name_key";

-- AlterTable
ALTER TABLE "Station" ADD COLUMN     "address" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Station_name_address_key" ON "Station"("name", "address");
