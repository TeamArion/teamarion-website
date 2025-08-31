"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Loader2,
  FileText,
  Link2,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

const BRANCHES = [
  "Artificial Intelligence & Data Science",
  "Artificial Intelligence & Machine Learning",
  "Aeronautical Engineering",
  "Civil Engineering",
  "Computer Science & Business Systems",
  "Computer Science & Engineering",
  "Electrical & Electronics Engineering",
  "Electronics & Communication Engineering",
  "Electronics Engineering (VLSI Design & Technology)",
  "Information Science & Engineering",
  "Mechanical Engineering",
  "Robotics and Artificial Intelligence",
] as const;

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"] as const;

const VERTICALS = ["Engineering", "Business & Management", "Social Media"] as const;

const QUESTION_TYPES = [
  "Aerodynamics",
  "Content Creation",
  "Data Acquisition & Analysis",
  "Design Engineering (CAD/CAE)",
  "Documentation & Book Keeping",
  "Electrical & Electronics Engineering",
  "Finance & Accounting",
  "Inventory Management",
  "Manufacturing (CAM/DFM/Mechanical)",
  "Material & Composites",
  "Mechanical Engineering",
  "Photo & Video Editing (GFX & VFX)",
  "Photography & Videography",
  "Procurement & Logistics",
  "Pure Sciences (Physics, Chemistry, Maths)",
  "Software Engineering",
  "Sponsorship & Public Relations",
  "Structural Engineering",
  "Simulation & Analysis",
  "Thermal Engineering",
  "Testing & Validation",
  "UI & Presentations",
] as const;

const RESIDENCE = [
  "Day scholar",
  "Hostelite(in campus)",
  "Hostelite(out of campus)",
  "PG resident",
] as const;

type Branch = typeof BRANCHES[number];
type Year = typeof YEARS[number];
type Residence = typeof RESIDENCE[number];

interface FormData {
  // Step 1
  fullName: string;
  usn: string;
  branch?: Branch;
  year?: Year;
  phone: string;
  // Step 2
  interest: string;
  verticals: string[]; // MSQ
  // Step 3
  questionTypes: string[]; // MSQ
  questionTypeOther: string;
  // Step 4
  residence?: Residence;
  experience: string;
  resumeFile?: File | null; // optional
  links: string;
  // Step 5 (Confirmations)
  consentGDPR: boolean;
  consentTerms: boolean;
}

const steps = [
  { id: "basic", title: "Basic Info" },
  { id: "motivation", title: "Motivation & Verticals" },
  { id: "interests", title: "Interest Areas" },
  { id: "background", title: "Background & Uploads" },
  { id: "confirm", title: "Confirm & Submit" },
] as const;

const fadeInUp = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };
const panelVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.25 } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.2 } },
};

function genRegistrationNumber() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `AR25-${y}${m}${d}-${rand}`;
}

export default function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [regNumber, setRegNumber] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    // Step 1
    fullName: "",
    usn: "",
    branch: undefined,
    year: undefined,
    phone: "",
    // Step 2
    interest: "",
    verticals: [],
    // Step 3
    questionTypes: [],
    questionTypeOther: "",
    // Step 4
    residence: undefined,
    experience: "",
    resumeFile: undefined,
    links: "",
    // Step 5
    consentGDPR: false,
    consentTerms: false,
  });

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const toggleInArray = (key: keyof FormData, value: string) => {
    setFormData((prev) => {
      const list = new Set((prev[key] as string[]) ?? []);
      list.has(value) ? list.delete(value) : list.add(value);
      return { ...prev, [key]: Array.from(list) as any };
    });
  };

  const isPhoneValid = useMemo(() => {
    // Simple check: 10–15 digits (allow +, spaces, dashes)
    const cleaned = formData.phone.replace(/[^\d]/g, "");
    return cleaned.length >= 10 && cleaned.length <= 15;
  }, [formData.phone]);

  const isStepValid = () => {
    switch (currentStep) {
      case 0: {
        return (
          formData.fullName.trim() !== "" &&
          formData.usn.trim() !== "" &&
          !!formData.branch &&
          !!formData.year &&
          isPhoneValid
        );
      }
      case 1: {
        return formData.interest.trim().length >= 30 && formData.verticals.length >= 1;
      }
      case 2: {
        // either at least one question type OR a non-empty "other"
        return formData.questionTypes.length > 0 || formData.questionTypeOther.trim() !== "";
      }
      case 3: {
        return !!formData.residence;
      }
      case 4: {
        return formData.consentGDPR && formData.consentTerms;
      }
      default:
        return true;
    }
  };

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const onSubmit = async () => {
    setIsSubmitting(true);

    // Simulated submit. Here you could POST to your API route.
    setTimeout(() => {
      const reg = genRegistrationNumber();
      setRegNumber(reg);
      toast.success("Application submitted! Registration number generated.");
      setIsSubmitting(false);
    }, 1200);
  };

  // When submitted, show confirmation screen
  if (regNumber) {
    return (
      <div className="max-w-2xl mx-auto py-10">
        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Application Received
            </CardTitle>
            <CardDescription>Thank you for applying to Team Arion.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-xl border p-4 bg-muted/40">
              <p className="text-sm text-muted-foreground">
                Kindly be aware that upon submitting the form, you will receive a link to join the official WhatsApp group.
                Please keep an eye out for this link as all further details will be shared on the WhatsApp group!
              </p>
              <p className="text-sm font-medium mt-2">Copy that !! ✅</p>
            </div>

            <div className="grid gap-2">
              <Label className="text-xs text-muted-foreground">Registration Number</Label>
              <div className="text-2xl font-semibold tracking-tight">{regNumber}</div>
            </div>

            <div className="grid gap-2">
              <Label className="text-xs text-muted-foreground">WhatsApp Group Link</Label>
              {/* Replace the placeholder href below with your real invite link when ready */}
              <a
                href="https://placeholder.whatsapp.invite/link"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <Link2 className="h-4 w-4" />
                Join the official WhatsApp group
              </a>
              <p className="text-xs text-muted-foreground">
                (This is a placeholder link — replace it when you have the real invite.)
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => window.location.assign("/")}>
              Back to home
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto py-8">
      {/* Progress */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between mb-3">
          {steps.map((s, i) => (
            <div key={s.id} className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => i <= currentStep && setCurrentStep(i)}
                className={cn(
                  "h-3.5 w-3.5 rounded-full transition-colors",
                  i < currentStep ? "bg-primary" : i === currentStep ? "bg-primary ring-4 ring-primary/20" : "bg-muted"
                )}
                aria-label={s.title}
              />
              <span className={cn("text-xs mt-2 hidden sm:block", i === currentStep ? "text-primary" : "text-muted-foreground")}>
                {s.title}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.25 }}
          />
        </div>
      </motion.div>

      {/* Form Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Card className="rounded-3xl">
            {/* STEP 1: BASIC */}
            {currentStep === 0 && (
              <>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Tell us a bit about you.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                  <motion.div variants={fadeInUp} className="grid gap-2 sm:col-span-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      placeholder="Your full name"
                      value={formData.fullName}
                      onChange={(e) => update("fullName", e.target.value)}
                    />
                  </motion.div>

                  <motion.div variants={fadeInUp} className="grid gap-2">
                    <Label htmlFor="usn">USN (or Temporary Student ID)</Label>
                    <Input
                      id="usn"
                      placeholder="e.g., 1NT24AR069"
                      value={formData.usn}
                      onChange={(e) => update("usn", e.target.value)}
                    />
                  </motion.div>

                  <motion.div variants={fadeInUp} className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="+91 9XXXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => update("phone", e.target.value)}
                    />
                    {!isPhoneValid && formData.phone.length > 0 && (
                      <p className="text-xs text-destructive">Enter a valid phone number (10–15 digits).</p>
                    )}
                  </motion.div>

                  <motion.div variants={fadeInUp} className="grid gap-2 sm:col-span-2">
                    <Label>Branch of Study</Label>
                    <Select
                      value={formData.branch}
                      onValueChange={(v: Branch) => update("branch", v)}
                    >
                      <SelectTrigger id="branch"><SelectValue placeholder="Select your branch" /></SelectTrigger>
                      <SelectContent className="max-h-72">
                        {BRANCHES.map((b) => (
                          <SelectItem key={b} value={b}>{b}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="grid gap-2 sm:col-span-2">
                    <Label>Year of Study</Label>
                    <RadioGroup
                      className="grid grid-cols-2 gap-2 sm:grid-cols-4"
                      value={formData.year}
                      onValueChange={(v: Year) => update("year", v)}
                    >
                      {YEARS.map((y, i) => (
                        <label key={y} htmlFor={`year-${i}`} className="flex items-center gap-2 rounded-md border p-3 cursor-pointer hover:bg-accent">
                          <RadioGroupItem id={`year-${i}`} value={y} />
                          <span>{y}</span>
                        </label>
                      ))}
                    </RadioGroup>
                  </motion.div>
                </CardContent>
              </>
            )}

            {/* STEP 2: MOTIVATION & VERTICALS */}
            {currentStep === 1 && (
              <>
                <CardHeader>
                  <CardTitle>Your Motivation</CardTitle>
                  <CardDescription>
                    Why Arion? How will you contribute to the team?
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <motion.div variants={fadeInUp} className="grid gap-2">
                    <Label htmlFor="interest">
                      Why are you interested in joining Arion?
                    </Label>
                    <Textarea
                      id="interest"
                      placeholder="Share your motivation and how you can contribute…"
                      className="min-h-[120px]"
                      value={formData.interest}
                      onChange={(e) => update("interest", e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Minimum ~30 characters recommended.
                    </p>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="grid gap-2">
                    <Label>
                      Which vertical(s) are you interested in? (You can choose multiple)
                    </Label>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {VERTICALS.map((v) => (
                        <label
                          key={v}
                          htmlFor={`vert-${v}`}
                          className="flex items-center gap-2 rounded-md border p-3 cursor-pointer hover:bg-accent"
                        >
                          <Checkbox
                            id={`vert-${v}`}
                            checked={formData.verticals.includes(v)}
                            onCheckedChange={() => toggleInArray("verticals", v)}
                          />
                          <span>{v}</span>
                        </label>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Note: If you apply for multiple verticals, you will be interviewed for each separately.
                    </p>
                  </motion.div>
                </CardContent>
              </>
            )}

            {/* STEP 3: INTEREST AREAS */}
            {currentStep === 2 && (
              <>
                <CardHeader>
                  <CardTitle>Interest Areas</CardTitle>
                  <CardDescription>
                    Help us align you with the right role.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <motion.div variants={fadeInUp} className="grid gap-2">
                    <Label>Select your interest area(s)</Label>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {QUESTION_TYPES.map((q) => (
                        <label
                          key={q}
                          htmlFor={`qt-${q}`}
                          className="flex items-center gap-2 rounded-md border p-3 cursor-pointer hover:bg-accent"
                        >
                          <Checkbox
                            id={`qt-${q}`}
                            checked={formData.questionTypes.includes(q)}
                            onCheckedChange={() => toggleInArray("questionTypes", q)}
                          />
                          <span>{q}</span>
                        </label>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="grid gap-2">
                    <Label htmlFor="qt-other">Or others (specify)</Label>
                    <Input
                      id="qt-other"
                      placeholder="Your other interest area…"
                      value={formData.questionTypeOther}
                      onChange={(e) => update("questionTypeOther", e.target.value)}
                    />
                  </motion.div>
                </CardContent>
              </>
            )}

            {/* STEP 4: BACKGROUND & UPLOADS */}
            {currentStep === 3 && (
              <>
                <CardHeader>
                  <CardTitle>Background & Uploads</CardTitle>
                  <CardDescription>Tell us about your setup & share your work.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <motion.div variants={fadeInUp} className="grid gap-2">
                    <Label>Residence Type</Label>
                    <RadioGroup
                      className="grid gap-2 sm:grid-cols-2"
                      value={formData.residence}
                      onValueChange={(v: Residence) => update("residence", v)}
                    >
                      {RESIDENCE.map((r, i) => (
                        <label key={r} htmlFor={`res-${i}`} className="flex items-center gap-2 rounded-md border p-3 cursor-pointer hover:bg-accent">
                          <RadioGroupItem id={`res-${i}`} value={r} />
                          <span>{r}</span>
                        </label>
                      ))}
                    </RadioGroup>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="grid gap-2">
                    <Label htmlFor="experience">
                      Do you have any prior experience in these domains? If yes, please specify.
                    </Label>
                    <Textarea
                      id="experience"
                      placeholder="Describe your relevant experience (if any)…"
                      className="min-h-[100px]"
                      value={formData.experience}
                      onChange={(e) => update("experience", e.target.value)}
                    />
                  </motion.div>

                  <motion.div variants={fadeInUp} className="grid gap-2">
                    <Label htmlFor="resume">Upload Resume (optional)</Label>
                    <div className="flex items-center gap-3">
                      <Input
                        id="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => update("resumeFile", e.target.files?.[0] ?? null)}
                      />
                      {formData.resumeFile && (
                        <div className="text-xs flex items-center gap-1 text-muted-foreground">
                          <FileText className="h-4 w-4" />
                          {formData.resumeFile.name}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Accepted: PDF, DOC, DOCX
                    </p>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="grid gap-2">
                    <Label htmlFor="links">
                      Share links to your previous work (CAD designs, posters, social campaigns, etc.)
                    </Label>
                    <Textarea
                      id="links"
                      placeholder="Paste links (Figma, GitHub, Drive, Instagram, YouTube, etc.) — one per line is great."
                      className="min-h-[100px]"
                      value={formData.links}
                      onChange={(e) => update("links", e.target.value)}
                    />
                  </motion.div>
                </CardContent>
              </>
            )}

            {/* STEP 5: CONFIRMATIONS */}
            {currentStep === 4 && (
              <>
                <CardHeader>
                  <CardTitle>Confirm & Submit</CardTitle>
                  <CardDescription>Please review and confirm the statements below.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="rounded-xl border p-4 bg-muted/40">
                    <p className="text-sm text-muted-foreground">
                      Kindly be aware that upon submitting the form, you will receive a link to join the official
                      WhatsApp group. Please keep an eye out for this link as all further details will be shared on the
                      WhatsApp group! <span className="font-medium">Copy that !!</span>
                    </p>
                  </div>

                  <label className="flex items-start gap-3 rounded-md border p-3 cursor-pointer hover:bg-accent">
                    <Checkbox
                      checked={formData.consentGDPR}
                      onCheckedChange={(c) => update("consentGDPR", Boolean(c))}
                    />
                    <span className="text-sm leading-relaxed">
                      I consent to the processing of my personal data (GDPR) for the purpose of recruitment to Team Arion.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 rounded-md border p-3 cursor-pointer hover:bg-accent">
                    <Checkbox
                      checked={formData.consentTerms}
                      onCheckedChange={(c) => update("consentTerms", Boolean(c))}
                    />
                    <span className="text-sm leading-relaxed">
                      I agree to the terms & conditions of Team Arion’s recruitment process.
                    </span>
                  </label>
                </CardContent>
              </>
            )}

            <CardFooter className="flex justify-between gap-3 pt-6">
              <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 0}>
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>

              <Button
                type="button"
                onClick={currentStep === steps.length - 1 ? onSubmit : nextStep}
                disabled={!isStepValid() || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting…
                  </>
                ) : currentStep === steps.length - 1 ? (
                  <>
                    Submit
                    <Check className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </AnimatePresence>

      <motion.div
        className="mt-4 text-center text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
      </motion.div>
    </div>
  );
}
