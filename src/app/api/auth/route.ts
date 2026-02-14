import { badRequest, isNonEmptyString } from "@/lib/api";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

type AuthRequest = {
  provider: string;
  email: string;
  name: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<AuthRequest>;

  if (!isNonEmptyString(body.provider) || !isNonEmptyString(body.email) || !isNonEmptyString(body.name)) {
    return badRequest("provider, email and name are required.");
  }

  const user = await prisma.user.upsert({
    where: { email: body.email },
    update: {
      provider: body.provider,
      name: body.name
    },
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
