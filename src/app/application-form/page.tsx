"use client";

import ApplicationForm from "@/components/forms/OnboardingForm";

export default function ApplicationFormPage() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
        Team Arion — Application Form
      </h1>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        Please fill out the form below carefully. Once submitted, you’ll receive
        your registration number and a link to join the official WhatsApp group
        where all further updates will be shared.
      </p>
      <ApplicationForm />
    </main>
  );
}
