/*
  Warnings:

  - You are about to drop the column `latitude` on the `leads_customers` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `leads_customers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "leads_customers" DROP COLUMN "latitude",
DROP COLUMN "longitude";
