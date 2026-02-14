import { CertificationItem, UserProfile } from './types';

type DBShape = {
  user: UserProfile | null;
  certifications: CertificationItem[];
  chat: string[];
};

const seedCertifications: CertificationItem[] = [
  { id: '1', title: 'Google Project Management', provider: 'Coursera', level: 'Beginner', stage: 'Foundation' },
  { id: '2', title: 'Advanced React and Redux', provider: 'Udemy', level: 'Intermediate', stage: 'Skill Deepening' },
  { id: '3', title: 'Generative AI Engineering', provider: 'Coursera', level: 'Advanced', stage: 'Goal Acceleration' }
];

const globalRef = globalThis as typeof globalThis & { __guruDB?: DBShape };

if (!globalRef.__guruDB) {
  globalRef.__guruDB = {
    user: null,
    certifications: seedCertifications,
    chat: []
  };
}

export const db = globalRef.__guruDB;
