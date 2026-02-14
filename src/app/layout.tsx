import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project GURU",
  description: "Agentic AI Career Guidance Platform"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
