-- CreateTable
CREATE TABLE "leads_professionals" (
    "id" TEXT NOT NULL,
    "full_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "zip_code" VARCHAR(10) NOT NULL,
    "city" VARCHAR(100),
    "state" VARCHAR(2),
    "neighborhood" VARCHAR(100),
    "service_areas" JSONB,
    "availability" JSONB,
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "lost_reason" TEXT,
    "lost_at" TIMESTAMP(3),
    "device_type" "DeviceType",
    "browser" VARCHAR(50),
    "operating_system" VARCHAR(50),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "converted_at" TIMESTAMP(3),
    "first_contact_at" TIMESTAMP(3),
    "last_contact_at" TIMESTAMP(3),
    "qualified_at" TIMESTAMP(3),
    "consented_to_marketing" BOOLEAN NOT NULL DEFAULT false,
    "consented_at" TIMESTAMP(3),
    "ip_address" INET,
    "user_agent" TEXT,
    "notes" TEXT,

    CONSTRAINT "leads_professionals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "leads_professionals_email_key" ON "leads_professionals"("email");

-- CreateIndex
CREATE INDEX "leads_professionals_email_idx" ON "leads_professionals"("email");

-- CreateIndex
CREATE INDEX "leads_professionals_phone_idx" ON "leads_professionals"("phone");

-- CreateIndex
CREATE INDEX "leads_professionals_zip_code_idx" ON "leads_professionals"("zip_code");

-- CreateIndex
CREATE INDEX "leads_professionals_created_at_idx" ON "leads_professionals"("created_at");

-- CreateIndex
CREATE INDEX "leads_professionals_city_state_idx" ON "leads_professionals"("city", "state");
