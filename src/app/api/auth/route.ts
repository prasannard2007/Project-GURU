import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as { provider: string; email: string; name: string };

  const user = await prisma.user.upsert({
    where: { email: body.email },
    update: { provider: body.provider, name: body.name },
    create: {
      email: body.email,
      name: body.name,
      provider: body.provider,
      skills: [],
      education: [],
      experiences: [],
      projects: [],
      achievements: []
    }
  });

  return NextResponse.json({ user });
}
