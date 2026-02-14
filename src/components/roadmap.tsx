import type { ReactNode } from 'react';
import { ProgressData } from '@/lib/types';
import { GraduationCap, HeartHandshake, Award, Target, Stars } from 'lucide-react';

export function Roadmap({ progress, goal }: { progress: ProgressData; goal: string }) {
  const complete = progress.education >= 100 && progress.softskills >= 100 && progress.certification >= 100;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 500" preserveAspectRatio="none">
        <path d="M200,120 C350,180 430,230 500,250" className="roadmap-line" stroke="#4f7bff" strokeWidth="5" fill="none" />
        <path d="M200,380 C370,320 430,280 500,250" className="roadmap-line" stroke="#7c3aed" strokeWidth="5" fill="none" />
        <path d="M780,250 C660,250 600,250 500,250" className="roadmap-line" stroke="#14b8a6" strokeWidth="5" fill="none" />
      </svg>

      <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
        <Module title="Education" icon={<GraduationCap />} value={progress.education} />
        <GoalNode goal={goal} complete={complete} />
        <Module title="Certification" icon={<Award />} value={progress.certification} align="right" />
      </div>

      <div className="relative mt-10 max-w-xs">
        <Module title="Softskills" icon={<HeartHandshake />} value={progress.softskills} />
      </div>
    </div>
  );
}

function Module({ title, icon, value, align = 'left' }: { title: string; icon: ReactNode; value: number; align?: 'left' | 'right' }) {
  return (
    <div className={`rounded-2xl border border-slate-700 bg-slate-900/80 p-4 ${align === 'right' ? 'md:ml-auto' : ''}`}>
      <div className="mb-2 flex items-center gap-2 text-guru-500">{icon}<span>{title}</span></div>
      <div className="h-2 rounded-full bg-slate-700">
        <div className="h-2 rounded-full bg-guru-500" style={{ width: `${value}%` }} />
      </div>
      <p className="mt-2 text-xs text-slate-300">{value}% completed</p>
    </div>
  );
}

function GoalNode({ goal, complete }: { goal: string; complete: boolean }) {
  return (
    <div className="mx-auto flex w-full max-w-xs flex-col items-center justify-center rounded-2xl border border-guru-500 bg-slate-950/80 p-6 shadow-glow">
      <Target className="text-guru-500" />
      <p className="mt-2 text-center text-sm font-semibold">{goal}</p>
      <p className="mt-1 text-xs text-slate-400">Central Career Goal</p>
      {complete && (
        <div className="mt-2 flex items-center gap-1 text-yellow-400">
          <Stars className="animate-pulseStar" size={16} />
          <Stars className="animate-pulseStar" size={12} />
          <span className="text-xs">Goal achieved!</span>
        </div>
      )}
    </div>
  );
}
