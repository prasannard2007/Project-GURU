import { getUser } from "@/lib/user";

async function getRecommendations(goal: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/api/certifications?goal=${encodeURIComponent(goal)}`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json() as Promise<{ title: string; provider: string; stage: string }[]>;
}

export default async function CertificationPage({ searchParams }: { searchParams: { userId?: string } }) {
  const user = await getUser(searchParams.userId);
  if (!user) return <p>Please log in first.</p>;
  const certs = await getRecommendations(user.goal);

  return (
    <div className="panel">
      <h2>Certification Programs</h2>
      <p>Curated roadmap from goal + resume profile.</p>
      <div className="timeline">
        {certs.map((cert) => (
          <article key={cert.title}>
            <h4>{cert.title}</h4>
            <p>{cert.provider}</p>
            <small>{cert.stage}</small>
          </article>
        ))}
      </div>
    </div>
  );
}
