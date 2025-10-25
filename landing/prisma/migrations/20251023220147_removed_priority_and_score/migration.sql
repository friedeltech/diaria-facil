/*
  Warnings:

  - You are about to drop the column `lead_score` on the `leads_customers` table. All the data in the column will be lost.
  - You are about to drop the column `preferred_days` on the `leads_customers` table. All the data in the column will be lost.
  - You are about to drop the column `preferred_period` on the `leads_customers` table. All the data in the column will be lost.
  - You are about to drop the column `priority` on the `leads_customers` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."leads_customers_lead_score_idx";

-- DropIndex
DROP INDEX "public"."leads_customers_priority_idx";

-- AlterTable
ALTER TABLE "leads_customers" DROP COLUMN "lead_score",
DROP COLUMN "preferred_days",
DROP COLUMN "preferred_period",
DROP COLUMN "priority";

-- DropEnum
DROP TYPE "public"."LeadPriority";

-- DropEnum
DROP TYPE "public"."Period";
