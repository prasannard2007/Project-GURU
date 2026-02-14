import { AgentGuruChat } from '@/components/agent-guru-chat';
import { Navbar } from '@/components/navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
      <AgentGuruChat />
    </>
  );
}
