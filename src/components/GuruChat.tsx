"use client";

import { useState } from "react";

type Message = { role: "user" | "guru"; text: string };

export function GuruChat({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "guru", text: "Hi, I'm AGENT GURU. I can upgrade your roadmap and resume." }
  ]);

  const send = async () => {
    if (!prompt.trim()) return;
    const newMessages = [...messages, { role: "user", text: prompt } as Message];
    setMessages(newMessages);
    const current = prompt;
    setPrompt("");
    const res = await fetch("/api/guru", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, prompt: current })
    });
    const data = await res.json();
    setMessages((prev) => [...prev, { role: "guru", text: data.reply }]);
  };

  return (
    <>
      <button className="guru-fab" onClick={() => setOpen((v) => !v)}>🌟 AGENT GURU</button>
      {open && (
        <div className="guru-chat">
          <h3>AGENT GURU</h3>
          <div className="messages">
            {messages.map((message, i) => (
              <p key={`${message.role}-${i}`} className={message.role}>
                <strong>{message.role === "guru" ? "GURU" : "You"}:</strong> {message.text}
              </p>
            ))}
          </div>
          <div className="composer">
            <input value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="add new goals, update roadmap..." />
            <button onClick={send}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}
