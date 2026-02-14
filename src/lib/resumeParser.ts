export type ParsedResume = {
  skills: string[];
  education: string[];
  experiences: string[];
  projects: string[];
  achievements: string[];
};

const skillsKeywords = [
  "javascript", "typescript", "python", "react", "next.js", "node", "sql", "machine learning", "communication", "leadership"
];

export function parseResumeText(rawText: string): ParsedResume {
  const normalized = rawText.toLowerCase();
  const skills = skillsKeywords.filter((skill) => normalized.includes(skill));

  const splitByLine = rawText
    .split(/\n|\./)
    .map((line) => line.trim())
    .filter(Boolean);

  const pickByTerms = (terms: string[]) =>
    splitByLine.filter((line) => terms.some((term) => line.toLowerCase().includes(term))).slice(0, 8);

  return {
    skills,
    education: pickByTerms(["bachelor", "master", "university", "course", "education"]),
    experiences: pickByTerms(["experience", "worked", "intern", "engineer", "developer"]),
    projects: pickByTerms(["project", "built", "developed", "launched"]),
    achievements: pickByTerms(["award", "achievement", "won", "improved", "%", "reduced", "increased"])
  };
}
