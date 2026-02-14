import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PATCH(request: Request) {
  if (!db.user) return NextResponse.json({ error: 'No user' }, { status: 404 });

  const patch = (await request.json()) as Partial<typeof db.user.progress>;
  db.user.progress = {
    ...db.user.progress,
    ...patch
  };

  return NextResponse.json({ ok: true, progress: db.user.progress });
}
