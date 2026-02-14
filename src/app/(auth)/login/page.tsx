'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [goal, setGoal] = useState('Become an AI Product Engineer');
  const [resumeText, setResumeText] = useState('');

  const signIn = async (provider: 'linkedin' | 'github') => {
    await fetch('/api/auth', {
      method: 'POST',
      body: JSON.stringify({ provider, goal })
    });
    router.push('/dashboard');
  };

  const uploadResume = async () => {
    await fetch('/api/resume', {
      method: 'POST',
      body: JSON.stringify({ goal, resumeText })
    });
    router.push('/dashboard');
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-4 py-8">
      <div className="grid gap-6 rounded-3xl border border-slate-800 bg-slate-900/70 p-6 md:grid-cols-2">
        <section>
          <h1 className="text-3xl font-bold text-guru-500">Login to Career GURU</h1>
          <p className="mt-2 text-slate-300">Unified onboarding with LinkedIn, GitHub, or resume upload.</p>
          <label className="mt-4 block text-sm">Career Goal</label>
          <input value={goal} onChange={(e) => setGoal(e.target.value)} className="mt-1 w-full rounded-xl bg-slate-800 p-3" />
          <div className="mt-6 space-y-3">
            <button onClick={() => signIn('linkedin')} className="w-full rounded-xl bg-[#0a66c2] py-3 font-semibold">Sign in with LinkedIn</button>
            <button onClick={() => signIn('github')} className="w-full rounded-xl bg-slate-700 py-3 font-semibold">Sign in with GitHub</button>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
          <h2 className="text-xl font-semibold">Resume Upload (PDF/DOCX text paste)</h2>
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste parsed resume text here"
            className="mt-3 h-48 w-full rounded-xl bg-slate-800 p-3 text-sm"
          />
          <button onClick={uploadResume} className="mt-3 w-full rounded-xl bg-guru-500 py-3 font-semibold">Upload & Continue</button>
          <a
            href="https://www.kickresume.com/en/ai-resume-writer/"
            target="_blank"
            className="mt-3 block text-center text-sm text-guru-500 underline"
            rel="noreferrer"
          >
            No resume? Build one with AI Resume Builder
          </a>
        </section>
      </div>
    </main>
  );
}
