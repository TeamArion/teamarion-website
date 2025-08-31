"use client";

import ApplicationForm from "@/components/forms/OnboardingForm";

export default function ApplicationFormPage() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
        Team Arion — Application Form
      </h1>
      <ApplicationForm />
    </main>
  );
}
