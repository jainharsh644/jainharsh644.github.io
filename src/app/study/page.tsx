import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { studySections } from "@/data/study";
import { ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Study — Harsh Jain",
  description: "Interview-prep study guide: SQL, Statistics, ML, GenAI, Agentic AI, plus full resume scripts.",
};

export default function StudyHome() {
  return (
    <div>
      <Reveal>
        <p className="text-xs uppercase tracking-[0.25em] text-ink-mute mb-4">Study</p>
        <h1 className="font-display text-4xl md:text-6xl tracking-tight font-medium leading-[0.95] max-w-3xl">
          A study guide built like a <span className="italic shimmer">second brain</span>.
        </h1>
        <p className="mt-6 text-ink-soft text-lg max-w-2xl leading-relaxed">
          Resume scripts, concept reference, and the interview questions that come up in nearly every
          data-science round at top companies. Continuously updated as I learn.
        </p>
      </Reveal>

      <div className="mt-16 grid sm:grid-cols-2 gap-4">
        {studySections.map((s, i) => (
          <Reveal key={s.slug} delay={i * 0.05}>
            <Link
              href={`/study/${s.slug}`}
              className="group block bg-cream-soft border border-cream-deep rounded-2xl p-6 hover:border-terracotta hover:bg-cream transition-colors h-full"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="text-3xl mb-3">{s.emoji}</div>
                  <h2 className="font-display text-2xl font-medium group-hover:text-terracotta transition-colors">
                    {s.title}
                  </h2>
                  <p className="mt-2 text-ink-soft text-sm leading-relaxed">{s.blurb}</p>
                </div>
                <ArrowUpRight size={18} className="text-ink-mute group-hover:text-terracotta group-hover:rotate-45 transition-all flex-shrink-0" />
              </div>
              <p className="mt-4 text-xs text-ink-mute">{s.pages.length} pages</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
