"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, BookOpen, Briefcase } from "lucide-react";
import { Reveal } from "./Reveal";
import { experiences, projects } from "@/data/profile";
import { studySections } from "@/data/study";

export function FeaturedWork() {
  return (
    <section className="border-t border-cream-deep">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-24 md:py-32">
        <div className="flex items-end justify-between mb-12 md:mb-16">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-ink-mute mb-3">Featured Work</p>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight font-medium max-w-xl leading-tight">
              Projects shipped to production.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="hidden md:block">
            <Link href="/work" className="group inline-flex items-center gap-2 text-sm border-b border-ink pb-1 hover:text-terracotta hover:border-terracotta transition-colors">
              All work <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-4 md:gap-6">
          {projects.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <motion.div
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <Link
                  href={`/work#${p.slug}`}
                  className="group block bg-cream-soft border border-cream-deep rounded-2xl p-6 md:p-10 hover:border-terracotta transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 md:gap-6">
                    <div className="flex-1">
                      <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight group-hover:text-terracotta transition-colors">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-ink-soft max-w-2xl">{p.oneLiner}</p>
                    </div>
                    <ArrowUpRight size={20} className="text-ink-mute group-hover:text-terracotta group-hover:rotate-45 transition-all flex-shrink-0" />
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span key={s} className="text-xs px-3 py-1 bg-cream rounded-full border border-cream-deep">
                        {s}
                      </span>
                    ))}
                  </div>
                </Link>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal className="md:hidden mt-8">
          <Link href="/work" className="inline-flex items-center gap-2 text-sm border-b border-ink pb-1">
            All work <ArrowUpRight size={14} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export function ExperienceTimeline() {
  return (
    <section className="border-t border-cream-deep bg-cream-soft/40">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-24 md:py-32">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-ink-mute mb-3">Experience</p>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight font-medium max-w-xl leading-tight">
            Five years across fintech, manufacturing and agribusiness.
          </h2>
        </Reveal>

        <div className="mt-12 md:mt-16 grid gap-0">
          {experiences.map((e, i) => (
            <Reveal key={e.company} delay={i * 0.05}>
              <div className="grid grid-cols-[80px_1fr] md:grid-cols-[160px_1fr] gap-4 md:gap-10 py-6 md:py-8 border-b border-cream-deep last:border-0">
                <div className="text-xs md:text-sm text-ink-mute pt-1 leading-relaxed">
                  <span className="block">{e.start}</span>
                  <span className="block">— {e.end}</span>
                </div>
                <div>
                  <div className="flex flex-col md:flex-row md:items-baseline md:gap-3">
                    <h3 className="font-display text-xl md:text-2xl font-medium">{e.company}</h3>
                    <span className="text-sm text-terracotta">{e.role}</span>
                  </div>
                  <p className="mt-2 text-ink-soft text-sm md:text-base max-w-2xl leading-relaxed">{e.blurb}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StudyTeaser() {
  return (
    <section className="border-t border-cream-deep">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-24 md:py-32">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 md:gap-20 items-start">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-ink-mute mb-3 inline-flex items-center gap-2">
              <Sparkles size={12} /> Study Guide
            </p>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight font-medium leading-tight">
              An interview-prep guide built for myself — and shared with you.
            </h2>
            <p className="mt-6 text-ink-soft leading-relaxed">
              Concepts, top interview questions and worked solutions across SQL, Statistics, Machine
              Learning, Predictive AI, Generative AI and Agentic AI. Plus full spoken-word scripts
              for every common resume question.
            </p>
            <Link
              href="/study"
              className="mt-8 group inline-flex items-center gap-2 bg-ink text-cream px-6 py-3.5 rounded-full text-sm font-medium hover:bg-terracotta transition-colors"
            >
              Open the guide
              <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid sm:grid-cols-2 gap-3">
              {studySections.map((s) => (
                <Link
                  key={s.slug}
                  href={`/study/${s.slug}`}
                  className="group bg-cream-soft border border-cream-deep rounded-xl p-5 hover:border-terracotta hover:bg-cream transition-all"
                >
                  <div className="text-2xl mb-2">{s.emoji}</div>
                  <p className="font-medium text-sm group-hover:text-terracotta transition-colors">{s.title}</p>
                  <p className="text-xs text-ink-mute mt-1 line-clamp-2">{s.blurb}</p>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section className="border-t border-cream-deep bg-ink text-cream">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-24 md:py-32 text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-cream/60 mb-4">Let's talk</p>
          <h2 className="font-display text-5xl md:text-7xl font-medium tracking-tight leading-[0.95]">
            Have a problem worth <span className="italic text-terracotta">solving with data</span>?
          </h2>
          <a
            href="mailto:jainharsh644@gmail.com"
            className="mt-10 inline-flex items-center gap-2 bg-cream text-ink px-7 py-4 rounded-full text-sm font-medium hover:bg-terracotta hover:text-cream transition-colors"
          >
            jainharsh644@gmail.com
            <ArrowUpRight size={16} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export const HomeIcons = { Briefcase, BookOpen, Sparkles };
