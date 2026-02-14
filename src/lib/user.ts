import { prisma } from "@/lib/db";

export async function getUser(userId?: string | null) {
  if (userId) {
    const existing = await prisma.user.findUnique({ where: { id: userId } });
    if (existing) return existing;
  }

  return prisma.user.findFirst({ orderBy: { createdAt: "desc" } });
}
