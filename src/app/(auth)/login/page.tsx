"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { aiResumeBuilderUrl } from "@/lib/defaultData";

export default function LoginPage() {
  const [provider, setProvider] = useState<"linkedin" | "github">("linkedin");
  const [fileContent, setFileContent] = useState("");
  const [email, setEmail] = useState("student@example.com");
  const [name, setName] = useState("Student User");
  const router = useRouter();

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const authRes = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider, email, name })
    });
    const authData = await authRes.json();

    if (fileContent.trim()) {
      await fetch("/api/resume/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: authData.user.id, rawText: fileContent })
      });
    }

    router.push(`/dashboard?userId=${authData.user.id}`);
  };

  return (
    <div className="login-page">
      <form className="card" onSubmit={submit}>
        <h2>Welcome to Project GURU</h2>
        <p>Unify LinkedIn, GitHub, and resume intelligence into one account.</p>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <div className="provider-buttons">
          <button type="button" onClick={() => setProvider("linkedin")} className={provider === "linkedin" ? "active" : ""}>Sign in with LinkedIn</button>
          <button type="button" onClick={() => setProvider("github")} className={provider === "github" ? "active" : ""}>Sign in with GitHub</button>
        </div>
        <label>Upload Resume (PDF/DOCX parsed text demo)</label>
        <textarea placeholder="Paste resume content for NLP parsing" value={fileContent} onChange={(e) => setFileContent(e.target.value)} rows={7} />
        <button type="submit">Continue to Dashboard</button>
        <a href={aiResumeBuilderUrl} target="_blank">No resume? Create one with AI Resume Builder →</a>
      </form>
    </div>
  );
}
