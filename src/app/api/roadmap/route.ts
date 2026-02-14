import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const body = (await request.json()) as {
    userId: string;
    educationProgress?: number;
    certificationProgress?: number;
    softskillsProgress?: number;
    goal?: string;
  };

  const user = await prisma.user.update({
    where: { id: body.userId },
    data: {
      educationProgress: body.educationProgress,
      certificationProgress: body.certificationProgress,
      softskillsProgress: body.softskillsProgress,
      goal: body.goal
    }
  });

  return NextResponse.json({ user });
}
