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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
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

type Branch = (typeof BRANCHES)[number];
type Year = (typeof YEARS)[number];
type Residence = (typeof RESIDENCE)[number];

interface FormData {
  fullName: string;
  email: string;
  usn: string;
  branch?: Branch;
  year?: Year;
  phone: string;
  interest: string;
  verticals: string[];
  questionTypes: string[];
  questionTypeOther: string;
  residence?: Residence;
  experience: string;
  resumeFile?: File | null;
  links: string;
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

const fadeInUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};
const panelVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.25 } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.2 } },
};

export default function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [regNumber, setRegNumber] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    usn: "",
    branch: undefined,
    year: undefined,
    phone: "",
    interest: "",
    verticals: [],
    questionTypes: [],
    questionTypeOther: "",
    residence: undefined,
    experience: "",
    resumeFile: undefined,
    links: "",
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
    const cleaned = formData.phone.replace(/[^\d]/g, "");
    return cleaned.length >= 10 && cleaned.length <= 15;
  }, [formData.phone]);

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return (
          formData.fullName.trim() !== "" &&
          formData.email.trim() !== "" &&
          formData.usn.trim() !== "" &&
          !!formData.branch &&
          !!formData.year &&
          isPhoneValid
        );
      case 1:
        return formData.interest.trim().length >= 30 && formData.verticals.length >= 1;
      case 2:
        return formData.questionTypes.length > 0 || formData.questionTypeOther.trim() !== "";
      case 3:
        return !!formData.residence;
      case 4:
        return formData.consentGDPR && formData.consentTerms;
      default:
        return true;
    }
  };

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 0));

  // ✅ Submit handler
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error(`Server error ${res.status}`);

      const result = await res.json();
      if (result.success) {
        setRegNumber(result.regNo);
        toast.success(`Application submitted! Your registration number: ${result.regNo}`);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Form submit error:", err);
      toast.error("Network or server error while submitting form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ Confirmation screen
  if (regNumber) {
    return (
      <div className="max-w-2xl mx-auto py-10">
        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Application Received
            </CardTitle>
            <CardDescription>
              Thank you for applying to Team Arion.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-xl border p-4 bg-muted/40">
              <p className="text-sm text-muted-foreground">
                Kindly be aware that upon submitting the form, you will receive a link to join the official WhatsApp group. Please keep an eye out for this link as all further details will be shared there.
              </p>
              <p className="text-sm font-medium mt-2">Copy that !! ✅</p>
            </div>
            <div className="grid gap-2">
              <Label className="text-xs text-muted-foreground">Registration Number</Label>
              <div className="text-2xl font-semibold tracking-tight">{regNumber}</div>
            </div>
            <div className="grid gap-2">
              <Label className="text-xs text-muted-foreground">WhatsApp Group Link</Label>
              <a
                href="https://placeholder.whatsapp.invite/link"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <Link2 className="h-4 w-4" />
                Join the official WhatsApp group
              </a>
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
  // ✅ Main form UI
  return (
    <div className="w-full max-w-3xl mx-auto py-8">
      {/* Progress bar */}
      <motion.div className="mb-8" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex justify-between mb-3">
          {steps.map((s, i) => (
            <div key={s.id} className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => i <= currentStep && setCurrentStep(i)}
                className={cn(
                  "h-3.5 w-3.5 rounded-full transition-colors",
                  i < currentStep
                    ? "bg-primary"
                    : i === currentStep
                    ? "bg-primary ring-4 ring-primary/20"
                    : "bg-muted"
                )}
                aria-label={s.title}
              />
              <span
                className={cn(
                  "text-xs mt-2 hidden sm:block",
                  i === currentStep ? "text-primary" : "text-muted-foreground"
                )}
              >
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

      {/* Steps */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Card className="rounded-3xl">
            {/* STEP 1: BASIC INFO */}
            {currentStep === 0 && (
              <>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Tell us a bit about you.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2 sm:col-span-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      placeholder="Your full name"
                      value={formData.fullName}
                      onChange={(e) => update("fullName", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2 sm:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => update("email", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="usn">USN</Label>
                    <Input
                      id="usn"
                      placeholder="e.g., 1NT24AR069"
                      value={formData.usn}
                      onChange={(e) => update("usn", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      placeholder="+91 9XXXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => update("phone", e.target.value)}
                    />
                    {!isPhoneValid && formData.phone.length > 0 && (
                      <p className="text-xs text-destructive">Enter a valid phone number.</p>
                    )}
                  </div>
                  <div className="grid gap-2 sm:col-span-2">
                    <Label>Branch</Label>
                    <Select value={formData.branch} onValueChange={(v: Branch) => update("branch", v)}>
                      <SelectTrigger><SelectValue placeholder="Select your branch" /></SelectTrigger>
                      <SelectContent className="max-h-72">
                        {BRANCHES.map((b) => (
                          <SelectItem key={b} value={b}>{b}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2 sm:col-span-2">
                    <Label>Year</Label>
                    <RadioGroup value={formData.year} onValueChange={(v: Year) => update("year", v)} className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {YEARS.map((y, i) => (
                        <label key={y} htmlFor={`year-${i}`} className="flex items-center gap-2 border p-3 rounded-md cursor-pointer">
                          <RadioGroupItem id={`year-${i}`} value={y} />
                          <span>{y}</span>
                        </label>
                      ))}
                    </RadioGroup>
                  </div>
                </CardContent>
              </>
            )}

            {/* STEP 2: MOTIVATION */}
            {currentStep === 1 && (
              <>
                <CardHeader>
                  <CardTitle>Motivation & Verticals</CardTitle>
                  <CardDescription>Why Arion? How will you contribute?</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="interest">Why are you interested?</Label>
                    <Textarea
                      id="interest"
                      value={formData.interest}
                      onChange={(e) => update("interest", e.target.value)}
                      className="min-h-[120px]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Which vertical(s) are you applying for?</Label>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {VERTICALS.map((v) => (
                        <label key={v} htmlFor={`v-${v}`} className="flex items-center gap-2 border p-3 rounded-md cursor-pointer">
                          <Checkbox
                            id={`v-${v}`}
                            checked={formData.verticals.includes(v)}
                            onCheckedChange={() => toggleInArray("verticals", v)}
                          />
                          <span>{v}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </>
            )}

            {/* STEP 3: INTEREST AREAS */}
            {currentStep === 2 && (
              <>
                <CardHeader>
                  <CardTitle>Interest Areas</CardTitle>
                  <CardDescription>Select the areas you’re passionate about.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid gap-2">
                    <Label>Select your interest area(s)</Label>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {QUESTION_TYPES.map((q) => (
                        <label key={q} htmlFor={`qt-${q}`} className="flex items-center gap-2 border p-3 rounded-md cursor-pointer">
                          <Checkbox
                            id={`qt-${q}`}
                            checked={formData.questionTypes.includes(q)}
                            onCheckedChange={() => toggleInArray("questionTypes", q)}
                          />
                          <span>{q}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="qt-other">Other (specify)</Label>
                    <Input
                      id="qt-other"
                      value={formData.questionTypeOther}
                      onChange={(e) => update("questionTypeOther", e.target.value)}
                    />
                  </div>
                </CardContent>
              </>
            )}

            {/* STEP 4: BACKGROUND */}
            {currentStep === 3 && (
              <>
                <CardHeader>
                  <CardTitle>Background & Uploads</CardTitle>
                  <CardDescription>Tell us about your experience.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid gap-2">
                    <Label>Residence Type</Label>
                    <RadioGroup value={formData.residence} onValueChange={(v: Residence) => update("residence", v)} className="grid sm:grid-cols-2 gap-2">
                      {RESIDENCE.map((r, i) => (
                        <label key={r} htmlFor={`res-${i}`} className="flex items-center gap-2 border p-3 rounded-md cursor-pointer">
                          <RadioGroupItem id={`res-${i}`} value={r} />
                          <span>{r}</span>
                        </label>
                      ))}
                    </RadioGroup>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="experience">Do you have prior experience?</Label>
                    <Textarea
                      id="experience"
                      value={formData.experience}
                      onChange={(e) => update("experience", e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="resume">Upload Resume (optional)</Label>
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
                  <div className="grid gap-2">
                    <Label htmlFor="links">Portfolio Links</Label>
                    <Textarea
                      id="links"
                      value={formData.links}
                      onChange={(e) => update("links", e.target.value)}
                    />
                  </div>
                </CardContent>
              </>
            )}

            {/* STEP 5: CONFIRM */}
            {currentStep === 4 && (
              <>
                <CardHeader>
                  <CardTitle>Confirm & Submit</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <label className="flex items-start gap-3 border p-3 rounded-md cursor-pointer">
                    <Checkbox
                      checked={formData.consentGDPR}
                      onCheckedChange={(c) => update("consentGDPR", Boolean(c))}
                    />
                    <span>I consent to GDPR data processing.</span>
                  </label>
                  <label className="flex items-start gap-3 border p-3 rounded-md cursor-pointer">
                    <Checkbox
                      checked={formData.consentTerms}
                      onCheckedChange={(c) => update("consentTerms", Boolean(c))}
                    />
                    <span>I agree to the terms & conditions.</span>
                  </label>
                </CardContent>
              </>
            )}
                        {/* Footer with navigation */}
            <CardFooter className="flex justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </Button>
              <Button
                type="button"
                onClick={currentStep === steps.length - 1 ? handleSubmit : nextStep}
                disabled={!isStepValid() || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
                  </>
                ) : currentStep === steps.length - 1 ? (
                  <>
                    Submit <Check className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Next <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
