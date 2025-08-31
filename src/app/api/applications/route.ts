import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Generate registration number
    const now = new Date();
    const regNo = `AR25-${now.getFullYear()}${String(
      now.getMonth() + 1
    ).padStart(2, "0")}${String(now.getDate()).padStart(
      2,
      "0"
    )}-${Math.floor(1000 + Math.random() * 9000)}`;

    const application = await prisma.application.create({
      data: {
        regNo,
        name: data.fullName,       // ✅ maps form fullName → schema name
        email: data.email,         // ✅ FIXED: include email
        usn: data.usn,
        phone: data.phone,
        branch: data.branch,
        year: data.year,
        motivation: data.interest, // ✅ maps form interest → schema motivation
        verticals: data.verticals,
        questionTypes: [
          ...data.questionTypes,
          ...(data.questionTypeOther ? [data.questionTypeOther] : []),
        ],
        residenceType: data.residence,
        experience: data.experience,
        links: data.links,
        gdprConsent: data.consentGDPR,
        termsConsent: data.consentTerms,
        resumeUrl: null,           // placeholder until file upload is added
      },
    });

    return NextResponse.json({ success: true, regNo: application.regNo });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
