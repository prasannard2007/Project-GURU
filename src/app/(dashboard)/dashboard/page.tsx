import { Sidebar } from '@/components/sidebar';
import { Roadmap } from '@/components/roadmap';
import { db } from '@/lib/db';

export default function DashboardPage() {
  const user = db.user;

  if (!user) {
    return <p className="rounded-xl bg-slate-900 p-4">No user session found. Please login.</p>;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <Sidebar />
      <section className="space-y-6">
        <Roadmap progress={user.progress} goal={user.goal} />
        <div className="grid gap-4 md:grid-cols-2">
          <InfoCard title="Career Guidance Resources" items={[...user.resumeData.skills.slice(0, 4).map((skill) => `Master ${skill}`), 'Weekly mentor review']} />
          <InfoCard title="Goal Tracking" items={[`Current goal: ${user.goal}`, 'Progress updates are dynamic', 'Use AGENT GURU for modifications']} />
        </div>
      </section>
    </div>
  );
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <h2 className="mb-3 font-semibold text-guru-500">{title}</h2>
      <ul className="space-y-2 text-sm text-slate-300">
        {items.map((item) => (
          <li key={item} className="rounded-lg bg-slate-800 p-2">{item}</li>
        ))}
      </ul>
    </article>
  );
}
