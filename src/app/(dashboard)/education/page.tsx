import { getUser } from "@/lib/user";

export default async function EducationPage({ searchParams }: { searchParams: { userId?: string } }) {
  const user = await getUser(searchParams.userId);
  if (!user) return <p>Please log in first.</p>;

  const skills = (user.skills as string[]) ?? [];
  const roadmap = [
    `Foundation for ${user.goal}`,
    "Core domain theory",
    "Hands-on projects",
    "Portfolio and interview prep"
  ];

  return (
    <div className="panel">
      <h2>Education Roadmap</h2>
      <p>Generated from resume analysis + user goal.</p>
      <div className="mindmap">
        {roadmap.map((step, i) => (
          <div key={step} className="mind-node">{i + 1}. {step}</div>
        ))}
      </div>
      <h3>Detected skills</h3>
      <p>{skills.length ? skills.join(", ") : "No detected skills yet."}</p>
    </div>
  );
}
