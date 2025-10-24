-- CreateEnum
CREATE TYPE "DeviceType" AS ENUM ('MOBILE', 'DESKTOP', 'TABLET');

-- CreateEnum
CREATE TYPE "ServiceFrequency" AS ENUM ('WEEKLY', 'BIWEEKLY', 'MONTHLY', 'ONE_TIME');

-- CreateEnum
CREATE TYPE "Urgency" AS ENUM ('THIS_WEEK', 'THIS_MONTH', 'JUST_CHECKING');

-- CreateEnum
CREATE TYPE "Period" AS ENUM ('MORNING', 'AFTERNOON', 'EVENING', 'FLEXIBLE');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'LOST', 'SPAM');

-- CreateEnum
CREATE TYPE "LeadPriority" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- CreateTable
CREATE TABLE "leads_customers" (
    "id" TEXT NOT NULL,
    "full_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "zip_code" VARCHAR(10) NOT NULL,
    "city" VARCHAR(100),
    "state" VARCHAR(2),
    "neighborhood" VARCHAR(100),
    "latitude" DECIMAL(10,8),
    "longitude" DECIMAL(11,8),
    "service_types" JSONB,
    "desired_frequency" "ServiceFrequency",
    "preferred_days" JSONB,
    "preferred_period" "Period",
    "urgency" "Urgency",
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "lead_score" INTEGER NOT NULL DEFAULT 0,
    "priority" "LeadPriority" NOT NULL DEFAULT 'MEDIUM',
    "lost_reason" TEXT,
    "device_type" "DeviceType",
    "browser" VARCHAR(50),
    "operating_system" VARCHAR(50),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "converted_at" TIMESTAMP(3),
    "first_contact_at" TIMESTAMP(3),
    "last_contact_at" TIMESTAMP(3),
    "qualified_at" TIMESTAMP(3),
    "lost_at" TIMESTAMP(3),
    "consented_to_marketing" BOOLEAN NOT NULL DEFAULT false,
    "consented_at" TIMESTAMP(3),
    "ip_address" INET,
    "user_agent" TEXT,
    "notes" TEXT,

    CONSTRAINT "leads_customers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "leads_customers_email_key" ON "leads_customers"("email");

-- CreateIndex
CREATE INDEX "leads_customers_email_idx" ON "leads_customers"("email");

-- CreateIndex
CREATE INDEX "leads_customers_phone_idx" ON "leads_customers"("phone");

-- CreateIndex
CREATE INDEX "leads_customers_zip_code_idx" ON "leads_customers"("zip_code");

-- CreateIndex
CREATE INDEX "leads_customers_status_idx" ON "leads_customers"("status");

-- CreateIndex
CREATE INDEX "leads_customers_priority_idx" ON "leads_customers"("priority");

-- CreateIndex
CREATE INDEX "leads_customers_lead_score_idx" ON "leads_customers"("lead_score");

-- CreateIndex
CREATE INDEX "leads_customers_created_at_idx" ON "leads_customers"("created_at");

-- CreateIndex
CREATE INDEX "leads_customers_urgency_idx" ON "leads_customers"("urgency");

-- CreateIndex
CREATE INDEX "leads_customers_city_state_idx" ON "leads_customers"("city", "state");
