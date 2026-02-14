import { getUser } from "@/lib/user";

export default async function SoftskillsPage({ searchParams }: { searchParams: { userId?: string } }) {
  const user = await getUser(searchParams.userId);
  if (!user) return <p>Please log in first.</p>;

  const plan = [
    "Communication drills",
    "Leadership simulations",
    "Feedback and reflection",
    "Conflict resolution practice"
  ];

  return (
    <div className="panel">
      <h2>Softskills Roadmap</h2>
      <p>Progress aligned with dashboard roadmap theme.</p>
      <div className="soft-grid">
        {plan.map((item, idx) => (
          <div key={item} className="soft-card">
            <strong>Stage {idx + 1}</strong>
            <p>{item}</p>
          </div>
        ))}
      </div>
      <p>Current progress: {user.softskillsProgress}%</p>
    </div>
  );
}
