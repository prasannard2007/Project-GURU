import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  const { prompt } = (await request.json()) as { prompt: string };

  const lowerPrompt = prompt.toLowerCase();

  if (db.user && lowerPrompt.includes('add goal')) {
    db.user.goal = `${db.user.goal} + ${prompt.replace(/add goal/i, '').trim()}`;
  }

  if (db.user && lowerPrompt.includes('progress')) {
    db.user.progress.education = Math.min(100, db.user.progress.education + 10);
    db.user.progress.softskills = Math.min(100, db.user.progress.softskills + 10);
    db.user.progress.certification = Math.min(100, db.user.progress.certification + 10);
  }

  const response = 'I analyzed your request, suggested improvements, and updated your roadmap/resume context dynamically.';
  db.chat.push(`User: ${prompt}`);
  db.chat.push(`Guru: ${response}`);

  return NextResponse.json({ response });
}
