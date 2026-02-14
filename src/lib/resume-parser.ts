import { ResumeData } from './types';

const sectionHeaders = ['skills', 'education', 'experience', 'projects', 'achievements'];

export function parseResume(rawText: string): ResumeData {
  const lines = rawText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const parsed: ResumeData = {
    skills: [],
    education: [],
    experience: [],
    projects: [],
    achievements: []
  };

  let currentSection: keyof ResumeData | null = null;

  for (const line of lines) {
    const lower = line.toLowerCase().replace(':', '');
    const match = sectionHeaders.find((header) => lower === header);

    if (match) {
      currentSection = match as keyof ResumeData;
      continue;
    }

    if (currentSection) {
      parsed[currentSection].push(line.replace(/^[•\-]\s*/, ''));
    } else {
      if (line.includes(',')) {
        parsed.skills.push(...line.split(',').map((item) => item.trim()));
      }
    }
  }

  return {
    skills: parsed.skills.slice(0, 12),
    education: parsed.education,
    experience: parsed.experience,
    projects: parsed.projects,
    achievements: parsed.achievements
  };
}
