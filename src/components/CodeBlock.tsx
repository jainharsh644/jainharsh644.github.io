"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CodeBlock({ lang, src }: { lang: string; src: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="relative group rounded-lg overflow-hidden bg-ink text-cream my-3">
      <div className="flex items-center justify-between px-4 py-2 border-b border-cream/10 text-xs">
        <span className="text-cream/60 font-mono uppercase tracking-widest">{lang}</span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(src);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          className="flex items-center gap-1.5 text-cream/60 hover:text-terracotta transition-colors"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed font-mono"><code>{src}</code></pre>
    </div>
  );
}
