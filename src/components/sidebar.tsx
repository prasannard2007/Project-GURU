import type { ReactNode } from 'react';
import { Target, Trophy, BookMarked, Sparkles } from 'lucide-react';

export function Sidebar() {
  return (
    <aside className="hidden rounded-2xl border border-slate-800 bg-slate-900/70 p-4 lg:block">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-300">Roadmap Modules</h2>
      <div className="space-y-3 text-sm text-slate-300">
        <Module icon={<BookMarked size={16} />} label="Education Roadmap" />
        <Module icon={<Sparkles size={16} />} label="Softskills Growth" />
        <Module icon={<Trophy size={16} />} label="Certifications" />
        <Module icon={<Target size={16} />} label="Career Goal Tracking" />
      </div>
    </aside>
  );
}

function Module({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-slate-800/80 p-3">
      <span className="text-guru-500">{icon}</span>
      <span>{label}</span>
    </div>
  );
}
