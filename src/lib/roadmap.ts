export type RoadmapTrack = "education" | "certifications" | "softskills";

export type RoadmapStep = {
  id: string;
  title: string;
  description: string;
  track: RoadmapTrack;
  stage: number;
};

const educationTemplates = [
  { title: "Foundational Concepts", description: "Strengthen fundamentals through structured coursework and active recall." },
  { title: "Role-specific Learning", description: "Focus on the technologies and methods required for your target role." },
  { title: "Portfolio Projects", description: "Build practical projects that prove end-to-end problem solving." },
  { title: "Interview Readiness", description: "Prepare behavioral and technical narratives from your project history." }
];

const certificationTemplates = [
  { title: "Industry Certificate", description: "Complete an entry certificate aligned to your chosen career path." },
  { title: "Applied Professional Certificate", description: "Earn an intermediate certificate with case-study driven assignments." },
  { title: "Advanced Specialization", description: "Take an advanced specialization demonstrating domain depth." }
];

const softSkillTemplates = [
  { title: "Communication Practice", description: "Practice concise communication in demos, standups, and reviews." },
  { title: "Leadership Habits", description: "Own planning and stakeholder alignment for one scoped initiative." },
  { title: "Collaboration and Feedback", description: "Use structured feedback loops with peers and mentors." },
  { title: "Conflict Resolution", description: "Apply techniques to resolve ambiguity and unblock team delivery." }
];

function slugify(input: string): string {
  return input.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function generateRoadmap(goal: string, skills: string[]) {
  const normalizedGoal = goal.trim() || "Career Growth";
  const topSkills = skills.slice(0, 4);

  const education = educationTemplates.map((item, index) => ({
    id: `edu-${index + 1}`,
    track: "education" as const,
    stage: index + 1,
    title: `${item.title} for ${normalizedGoal}`,
    description:
      index === 1 && topSkills.length
        ? `${item.description} Prioritize: ${topSkills.join(", ")}.`
        : item.description
  }));

  const certifications = certificationTemplates.map((item, index) => ({
    id: `cert-${index + 1}`,
    track: "certifications" as const,
    stage: index + 1,
    title: `${item.title} · ${normalizedGoal}`,
    description: item.description
  }));

  const softskills = softSkillTemplates.map((item, index) => ({
    id: `soft-${index + 1}`,
    track: "softskills" as const,
    stage: index + 1,
    title: item.title,
    description: item.description
  }));

  return {
    roadmapId: `roadmap-${slugify(normalizedGoal)}`,
    goal: normalizedGoal,
    tracks: { education, certifications, softskills }
  };
}
