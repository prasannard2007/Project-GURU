import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { UserProfile } from '@/lib/types';

export async function POST(request: Request) {
  const { provider, goal } = (await request.json()) as { provider: 'linkedin' | 'github'; goal: string };

  const user: UserProfile = {
    id: 'u-1',
    name: provider === 'linkedin' ? 'LinkedIn User' : 'GitHub User',
    email: `${provider}@guru.app`,
    provider,
    goal,
    resumeRawText: '',
    resumeData: { skills: ['JavaScript', 'Communication'], education: [], experience: [], projects: [], achievements: [] },
    progress: { education: 35, softskills: 30, certification: 25 }
  };

  db.user = user;
  return NextResponse.json({ ok: true, user });
}
