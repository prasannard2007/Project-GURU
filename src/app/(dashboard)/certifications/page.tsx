import { db } from '@/lib/db';

export default function CertificationsPage() {
  const user = db.user;
  if (!user) return <p>Please login first.</p>;

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold text-guru-500">Certification Programs</h1>
      <p className="text-slate-300">Recommended from Coursera/Udemy style sources using your resume and goal.</p>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {db.certifications.map((item) => (
          <article key={item.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <p className="text-xs text-guru-500">{item.provider} • {item.level}</p>
            <h2 className="mt-1 font-semibold">{item.title}</h2>
            <p className="mt-3 text-sm text-slate-400">Stage: {item.stage}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
