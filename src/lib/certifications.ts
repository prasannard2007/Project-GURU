export type CertificationRecommendation = {
  id: string;
  title: string;
  provider: string;
  stage: string;
  reason: string;
  url: string;
};

const certificationLibrary = [
  {
    id: "cert-google-foundations",
    title: "Google Career Certificate",
    provider: "Coursera",
    stage: "Stage 1 - Foundations",
    keywords: ["engineer", "developer", "product", "career", "growth"],
    reason: "Establishes practical baseline skills with project-based modules.",
    url: "https://www.coursera.org/professional-certificates"
  },
  {
    id: "cert-workplace-skills",
    title: "Professional Skills for the Workplace",
    provider: "Coursera",
    stage: "Stage 2 - Communication",
    keywords: ["manager", "communication", "lead", "product"],
    reason: "Strengthens communication and collaboration for cross-functional teams.",
    url: "https://www.coursera.org"
  },
  {
    id: "cert-cloud-specialization",
    title: "Cloud Engineering Specialization",
    provider: "Udemy",
    stage: "Stage 3 - Advanced",
    keywords: ["cloud", "backend", "platform", "devops"],
    reason: "Builds deployment and operations capabilities for production systems.",
    url: "https://www.udemy.com"
  },
  {
    id: "cert-data-ai",
    title: "Applied Data and AI Certificate",
    provider: "edX",
    stage: "Stage 3 - Advanced",
    keywords: ["ai", "machine learning", "data", "analytics"],
    reason: "Aligns with data-driven product development and AI workflows.",
    url: "https://www.edx.org"
  }
];

export function getCertificationsForGoal(goal: string): CertificationRecommendation[] {
  const normalizedGoal = goal.toLowerCase();

  const scored = certificationLibrary
    .map((item) => ({
      ...item,
      score: item.keywords.reduce((acc, keyword) => acc + Number(normalizedGoal.includes(keyword)), 0)
    }))
    .sort((a, b) => b.score - a.score);

  const picked = scored.slice(0, 3).map(({ keywords: _keywords, score: _score, ...rest }) => rest);

  return picked.map((item) => ({
    ...item,
    title: `${item.title} (${goal || "Career Growth"})`
  }));
}
