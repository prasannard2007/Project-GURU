'use client';

import { useState } from 'react';
import { Bot, Send } from 'lucide-react';

export function AgentGuruChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const send = async () => {
    if (!input.trim()) return;
    const userMessage = `You: ${input}`;
    const response = await fetch('/api/agent', {
      method: 'POST',
      body: JSON.stringify({ prompt: input })
    });
    const data = (await response.json()) as { response: string };
    setMessages((prev) => [...prev, userMessage, `AGENT GURU: ${data.response}`]);
    setInput('');
  };

  return (
    <>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-guru-500 text-white shadow-glow"
        aria-label="Open AGENT GURU"
      >
        <Bot />
      </button>
      {open && (
        <div className="fixed bottom-24 right-6 z-50 h-[28rem] w-80 rounded-2xl border border-slate-700 bg-slate-900 p-4 shadow-2xl">
          <h3 className="mb-2 text-sm font-semibold text-guru-500">AGENT GURU</h3>
          <div className="mb-2 h-80 overflow-auto rounded-lg bg-slate-950 p-2 text-xs text-slate-200">
            {messages.length === 0 ? 'Ask to add goals, remove modules, improve roadmap, or generate resume.' : messages.map((msg, i) => <p key={i}>{msg}</p>)}
          </div>
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 rounded-lg bg-slate-800 p-2 text-xs"
              placeholder="Type request..."
            />
            <button onClick={send} className="rounded-lg bg-guru-500 px-3">
              <Send size={14} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
