'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/education', label: 'Education' },
  { href: '/certifications', label: 'Certification Programs' },
  { href: '/softskills', label: 'Softskills' }
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <h1 className="text-lg font-bold text-guru-500">AGENTIC GURU Career Platform</h1>
        <ul className="flex flex-wrap items-center gap-2">
          {links.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={clsx(
                  'rounded-full px-4 py-2 text-sm transition',
                  pathname === item.href ? 'bg-guru-500 text-white shadow-glow' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
