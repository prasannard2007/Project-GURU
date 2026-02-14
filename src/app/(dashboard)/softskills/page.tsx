import { db } from '@/lib/db';

const softskillsTrack = ['Communication', 'Leadership', 'Problem Solving', 'Collaboration'];

export default function SoftskillsPage() {
  const user = db.user;
  if (!user) return <p>Please login first.</p>;

  return (
    <section className="space-y-5">
      <h1 className="text-2xl font-bold text-guru-500">Softskills Roadmap</h1>
      <p className="text-slate-300">Roadmap synced with dashboard progress and target goal.</p>
      <div className="space-y-3">
        {softskillsTrack.map((skill, idx) => {
          const completion = Math.min(100, Math.max(10, user.progress.softskills - idx * 10));
          return (
            <div key={skill} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
              <div className="mb-2 flex justify-between text-sm"><span>{skill}</span><span>{completion}%</span></div>
              <div className="h-2 rounded-full bg-slate-700"><div className="h-2 rounded-full bg-purple-500" style={{ width: `${completion}%` }} /></div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
