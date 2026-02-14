import { NextRequest, NextResponse } from "next/server";

const map = [
  { title: "Google Career Certificate", provider: "Coursera", stage: "Stage 1 - Foundations" },
  { title: "Professional Skills for the Workplace", provider: "Coursera", stage: "Stage 2 - Communication" },
  { title: "Advanced Role Specialization", provider: "Udemy", stage: "Stage 3 - Advanced" }
];

export async function GET(request: NextRequest) {
  const goal = request.nextUrl.searchParams.get("goal") ?? "Career Growth";
  return NextResponse.json(map.map((m) => ({ ...m, title: `${m.title} (${goal})` })));
}
