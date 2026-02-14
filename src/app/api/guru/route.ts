import { badRequest, isNonEmptyString, notFound } from "@/lib/api";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

type GuruRequest = {
  userId: string;
  prompt: string;
};

function inferAction(prompt: string) {
  const normalized = prompt.toLowerCase();

  if (normalized.includes("add") && normalized.includes("goal")) return "add_goal" as const;
  if (normalized.includes("remove") || normalized.includes("irrelevant")) return "simplify" as const;
  if (normalized.includes("update roadmap") || normalized.includes("progress")) return "progress" as const;
  if (normalized.includes("resume")) return "resume" as const;

  return "advice" as const;
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<GuruRequest>;

  if (!isNonEmptyString(body.userId) || !isNonEmptyString(body.prompt)) {
    return badRequest("userId and prompt are required.");
  }

  const user = await prisma.user.findUnique({ where: { id: body.userId } });
  if (!user) return notFound("User not found.");

  const action = inferAction(body.prompt);
  let reply = "I reviewed your roadmap and suggested next actions.";

  if (action === "add_goal") {
    const updatedGoal = `${user.goal} + mentorship impact`;
    await prisma.user.update({ where: { id: body.userId }, data: { goal: updatedGoal } });
    reply = `Added a mentorship-focused goal. New goal: ${updatedGoal}.`;
  }

  if (action === "simplify") {
    reply = "Removed redundant modules and simplified your roadmap path into core milestones.";
  }

  if (action === "progress") {
    const updated = await prisma.user.update({
      where: { id: body.userId },
      data: {
        educationProgress: Math.min(user.educationProgress + 10, 100),
        certificationProgress: Math.min(user.certificationProgress + 10, 100),
        softskillsProgress: Math.min(user.softskillsProgress + 10, 100)
      }
    });

    reply = `Updated progress to Education ${updated.educationProgress}%, Certifications ${updated.certificationProgress}%, Softskills ${updated.softskillsProgress}%.`;
  }

  if (action === "resume") {
    const skills = Array.isArray(user.skills) ? (user.skills as string[]) : [];
    const summary = skills.length
      ? `Highlight these skills in your next resume draft: ${skills.slice(0, 6).join(", ")}.`
      : "Start by adding key skills and quantified achievements to your resume draft.";

    reply = `I can generate an updated resume summary and draft. ${summary}`;
  }

  return NextResponse.json({ reply, action });
}
