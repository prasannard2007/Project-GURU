"use client";

import { CSSProperties } from "react";

type ProgressProps = {
  education: number;
  certifications: number;
  softskills: number;
  goal: string;
};

export function Roadmap({ education, certifications, softskills, goal }: ProgressProps) {
  const goalDone = education >= 100 && certifications >= 100 && softskills >= 100;

  return (
    <div className="roadmap">
      <div className="node education" style={{ "--progress": `${education}%` } as CSSProperties}>
        Education {education}%
      </div>
      <div className="node softskills" style={{ "--progress": `${softskills}%` } as CSSProperties}>
        Softskills {softskills}%
      </div>
      <div className="node certifications" style={{ "--progress": `${certifications}%` } as CSSProperties}>
        Certification {certifications}%
      </div>
      <div className={`goal ${goalDone ? "goal-glow" : ""}`}>
        🎯 {goal}
        {goalDone && <span className="stars">✨⭐✨</span>}
      </div>
      <svg className="paths" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M15,20 C35,35 35,50 50,50" />
        <path d="M15,80 C35,70 35,60 50,50" />
        <path d="M85,50 C70,50 60,50 50,50" />
      </svg>
    </div>
  );
}
