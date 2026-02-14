import { getCertificationsForGoal } from "@/lib/certifications";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const goal = request.nextUrl.searchParams.get("goal")?.trim() || "Career Growth";
  const recommendations = getCertificationsForGoal(goal);

  return NextResponse.json(recommendations);
}
