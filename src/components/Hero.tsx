"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-6 md:px-10 pt-20 md:pt-32 pb-24 md:pb-40">
        <motion.p
          variants={fade}
          initial="hidden"
          animate="show"
          custom={0}
          className="text-xs md:text-sm uppercase tracking-[0.25em] text-ink-mute mb-6"
        >
          Data Scientist · H2O.ai
        </motion.p>

        <motion.h1
          variants={fade}
          initial="hidden"
          animate="show"
          custom={1}
          className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight font-medium max-w-4xl"
        >
          Building AI systems that{" "}
          <span className="italic shimmer">turn data into decisions</span>.
        </motion.h1>

        <motion.p
          variants={fade}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-8 max-w-2xl text-lg md:text-xl text-ink-soft leading-relaxed"
        >
          {profile.blurb}
        </motion.p>

        <motion.div
          variants={fade}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-10 flex flex-col sm:flex-row gap-3"
        >
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 bg-ink text-cream px-6 py-3.5 rounded-full text-sm font-medium hover:bg-terracotta transition-colors"
          >
            See my work
            <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
          </Link>
          <Link
            href="/study"
            className="group inline-flex items-center gap-2 border border-ink/20 px-6 py-3.5 rounded-full text-sm font-medium hover:border-terracotta hover:text-terracotta transition-colors"
          >
            Open my study guide
            <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
          </Link>
        </motion.div>

        <motion.div
          variants={fade}
          initial="hidden"
          animate="show"
          custom={4}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 max-w-3xl"
        >
          <Stat label="Years in Data Science" value="5+" />
          <Stat label="Production ML systems" value="10+" />
          <Stat label="Domains shipped to" value="4" />
          <Stat label="Currently building" value="Agentic AI" />
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-display text-3xl md:text-4xl font-medium tracking-tight">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-widest text-ink-mute">{label}</p>
    </div>
  );
}
