import { GuruChat } from "@/components/GuruChat";
import { Roadmap } from "@/components/Roadmap";
import { defaultResources } from "@/lib/defaultData";
import { getUser } from "@/lib/user";

export default async function DashboardPage({ searchParams }: { searchParams: { userId?: string } }) {
  const user = await getUser(searchParams.userId);

  if (!user) {
    return <p>Please log in first.</p>;
  }

  return (
    <div className="dashboard-grid">
      <section className="panel">
        <h2>Main Roadmap Hub</h2>
        <Roadmap
          education={user.educationProgress}
          certifications={user.certificationProgress}
          softskills={user.softskillsProgress}
          goal={user.goal}
        />
      </section>
      <section className="panel">
        <h3>Career Guidance Resources</h3>
        <ul>{defaultResources.map((resource) => <li key={resource}>{resource}</li>)}</ul>
        <h3>User Goal Tracking</h3>
        <p>Goal: {user.goal}</p>
        <p>Education {user.educationProgress}% • Certification {user.certificationProgress}% • Softskills {user.softskillsProgress}%</p>
      </section>
      <GuruChat userId={user.id} />
    </div>
  );
}
