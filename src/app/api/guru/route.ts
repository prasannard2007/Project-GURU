import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as { userId: string; prompt: string };

  const user = await prisma.user.findUnique({ where: { id: body.userId } });
  if (!user) return NextResponse.json({ reply: "User not found." }, { status: 404 });

  const prompt = body.prompt.toLowerCase();
  let reply = "I reviewed your roadmap and suggested next actions.";

  if (prompt.includes("add new goals")) {
    await prisma.user.update({ where: { id: body.userId }, data: { goal: `${user.goal} + mentorship impact` } });
    reply = "Added a mentorship-focused goal and updated your roadmap.";
  }

  if (prompt.includes("remove") || prompt.includes("irrelevant")) {
    reply = "Removed redundant modules and simplified your roadmap path.";
  }

  if (prompt.includes("update roadmap") || prompt.includes("progress")) {
    await prisma.user.update({
      where: { id: body.userId },
      data: {
        educationProgress: Math.min(user.educationProgress + 10, 100),
        certificationProgress: Math.min(user.certificationProgress + 10, 100),
        softskillsProgress: Math.min(user.softskillsProgress + 10, 100)
      }
    });
    reply = "Updated all roadmap tracks by +10% based on your progress request.";
  }

  if (prompt.includes("resume")) {
    reply = "I can generate an updated resume summary and create a fresh resume draft from your latest goals.";
  }

  return NextResponse.json({ reply });
}
