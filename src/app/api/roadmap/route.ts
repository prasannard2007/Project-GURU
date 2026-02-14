import { badRequest, clampProgress, isNonEmptyString, notFound } from "@/lib/api";
import { prisma } from "@/lib/db";
import { generateRoadmap } from "@/lib/roadmap";
import { NextRequest, NextResponse } from "next/server";

type RoadmapPatchRequest = {
  userId: string;
  educationProgress?: number;
  certificationProgress?: number;
  softskillsProgress?: number;
  goal?: string;
};

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  if (!isNonEmptyString(userId)) return badRequest("userId query param is required.");

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return notFound("User not found.");

  const skills = Array.isArray(user.skills) ? (user.skills as string[]) : [];
  const roadmap = generateRoadmap(user.goal, skills);

  return NextResponse.json({
    userId: user.id,
    progress: {
      education: user.educationProgress,
      certifications: user.certificationProgress,
      softskills: user.softskillsProgress
    },
    roadmap
  });
}

export async function PATCH(request: Request) {
  const body = (await request.json()) as Partial<RoadmapPatchRequest>;

  if (!isNonEmptyString(body.userId)) {
    return badRequest("userId is required.");
  }

  const existing = await prisma.user.findUnique({ where: { id: body.userId } });
  if (!existing) return notFound("User not found.");

  const user = await prisma.user.update({
    where: { id: body.userId },
    data: {
      educationProgress: clampProgress(body.educationProgress) ?? existing.educationProgress,
      certificationProgress: clampProgress(body.certificationProgress) ?? existing.certificationProgress,
      softskillsProgress: clampProgress(body.softskillsProgress) ?? existing.softskillsProgress,
      goal: isNonEmptyString(body.goal) ? body.goal : existing.goal
    }
  });

  return NextResponse.json({ user });
}
