import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { parseResume } from '@/lib/resume-parser';
import { UserProfile } from '@/lib/types';

export async function POST(request: Request) {
  const { goal, resumeText } = (await request.json()) as { goal: string; resumeText: string };
  const parsed = parseResume(resumeText || 'skills\nCommunication, TypeScript');

  const user: UserProfile = {
    id: 'u-1',
    name: 'Resume User',
    email: 'resume@guru.app',
    provider: 'resume-upload',
    goal,
    resumeRawText: resumeText,
    resumeData: parsed,
    progress: {
      education: parsed.education.length ? 55 : 40,
      softskills: parsed.skills.length ? 60 : 45,
      certification: parsed.projects.length ? 50 : 35
    }
  };

  db.user = user;

  return NextResponse.json({ ok: true, user });
}
