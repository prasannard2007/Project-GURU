import { db } from '@/lib/db';

export default function EducationPage() {
  const user = db.user;
  if (!user) return <p>Please login first.</p>;

  const roadmap = [
    'Foundations from your current education background',
    ...user.resumeData.skills.slice(0, 3).map((skill) => `Advance ${skill} with project-based modules`),
    `Capstone aligned to: ${user.goal}`
  ];

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold text-guru-500">Education Roadmap</h1>
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <h2 className="mb-3 font-semibold">Mini Mindmap</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {roadmap.map((item, idx) => (
            <div key={item} className="rounded-xl border border-slate-700 bg-slate-800 p-3 text-sm">
              <p className="text-xs text-guru-500">Stage {idx + 1}</p>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
