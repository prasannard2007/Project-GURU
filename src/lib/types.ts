export type LoginProvider = 'linkedin' | 'github' | 'resume-upload' | 'resume-builder';

export type ResumeData = {
  skills: string[];
  education: string[];
  experience: string[];
  projects: string[];
  achievements: string[];
};

export type ProgressData = {
  education: number;
  softskills: number;
  certification: number;
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  provider: LoginProvider;
  goal: string;
  resumeRawText: string;
  resumeData: ResumeData;
  progress: ProgressData;
};

export type CertificationItem = {
  id: string;
  title: string;
  provider: 'Coursera' | 'Udemy';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  stage: string;
};
