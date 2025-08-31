-- CreateTable
CREATE TABLE "public"."Application" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "regNo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "usn" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "motivation" TEXT NOT NULL,
    "verticals" TEXT[],
    "questionTypes" TEXT[],
    "residenceType" TEXT NOT NULL,
    "experience" TEXT,
    "resumeUrl" TEXT,
    "links" TEXT,
    "gdprConsent" BOOLEAN NOT NULL,
    "termsConsent" BOOLEAN NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Application_regNo_key" ON "public"."Application"("regNo");
