import { prisma } from "@/lib/db";
import { parseResumeText } from "@/lib/resumeParser";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as { userId: string; rawText: string };
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
