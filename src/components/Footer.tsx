import Link from "next/link";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-cream-deep mt-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl">Harsh Jain</p>
          <p className="text-sm text-ink-mute mt-1">{profile.title}</p>
        </div>
        <div className="text-sm space-y-2">
          <p className="text-ink-mute uppercase tracking-widest text-xs mb-2">Elsewhere</p>
          <a className="block hover:text-terracotta transition-colors" href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="block hover:text-terracotta transition-colors" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="block hover:text-terracotta transition-colors" href={`mailto:${profile.email}`}>Email</a>
        </div>
        <div className="text-sm space-y-2">
          <p className="text-ink-mute uppercase tracking-widest text-xs mb-2">Site</p>
          <Link className="block hover:text-terracotta transition-colors" href="/work">Work</Link>
          <Link className="block hover:text-terracotta transition-colors" href="/study">Study</Link>
          <Link className="block hover:text-terracotta transition-colors" href="/about">About</Link>
        </div>
      </div>
      <div className="border-t border-cream-deep">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-ink-mute">
          <p>© {new Date().getFullYear()} Harsh Jain. Built with care.</p>
          <p>Designed and coded from scratch — Next.js, Tailwind, Framer Motion.</p>
        </div>
      </div>
    </footer>
  );
}
