import { badRequest, isNonEmptyString, notFound } from "@/lib/api";
import { prisma } from "@/lib/db";
import { parseResumeText } from "@/lib/resumeParser";
import { NextResponse } from "next/server";

type ResumeProcessRequest = {
  userId: string;
  rawText: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<ResumeProcessRequest>;

  if (!isNonEmptyString(body.userId) || !isNonEmptyString(body.rawText)) {
    return badRequest("userId and rawText are required.");
  }

  const existing = await prisma.user.findUnique({ where: { id: body.userId } });
  if (!existing) return notFound("User not found.");

  const parsed = parseResumeText(body.rawText);

  const user = await prisma.user.update({
    where: { id: body.userId },
    data: {
      resumeRaw: body.rawText,
      skills: parsed.skills,
      education: parsed.education,
      experiences: parsed.experiences,
      projects: parsed.projects,
      achievements: parsed.achievements
    }
  });

  return NextResponse.json({ user, parsed });
}
