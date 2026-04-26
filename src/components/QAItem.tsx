"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { CodeBlock } from "./CodeBlock";
import type { ReactNode } from "react";

export function QAItem({
  index,
  q,
  a,
  code,
}: {
  index: number;
  q: string;
  a: ReactNode;
  code?: { lang: string; src: string };
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-cream-deep rounded-xl overflow-hidden bg-cream-soft/50">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start gap-4 px-6 py-5 text-left hover:bg-cream-soft transition-colors"
      >
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center font-mono text-sm font-medium">
          {index}
        </span>
        <span className="flex-1 font-medium leading-snug pt-1">{q}</span>
        <ChevronDown
          size={18}
          className={`flex-shrink-0 mt-1.5 text-ink-mute transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pl-[72px] text-ink-soft leading-relaxed">
              {a}
              {code && <CodeBlock lang={code.lang} src={code.src} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
