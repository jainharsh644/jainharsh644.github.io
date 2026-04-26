import type { ReactNode } from "react";

export type QA = { q: string; a: ReactNode; code?: { lang: string; src: string } };
export type StudyPageContent = {
  intro: ReactNode;
  body?: ReactNode;
  qa?: QA[];
};

export const C = ({ children }: { children: ReactNode }) => (
  <code className="px-1.5 py-0.5 bg-cream-soft rounded font-mono text-[0.85em]">{children}</code>
);

export function Script({ title, body }: { title: string; body: string }) {
  return (
    <div className="bg-cream-soft border-l-4 border-terracotta pl-6 py-4 pr-4 rounded-r-lg">
      <p className="text-xs uppercase tracking-widest text-terracotta mb-2">{title}</p>
      <p className="text-ink-soft leading-relaxed whitespace-pre-line">{body}</p>
    </div>
  );
}

export function Note({ children, tone = "forest" }: { children: ReactNode; tone?: "forest" | "terracotta" | "gold" }) {
  const tones = {
    forest: "bg-forest/5 border-forest/20 text-forest",
    terracotta: "bg-terracotta/5 border-terracotta/30 text-terracotta-deep",
    gold: "bg-gold/10 border-gold/30 text-ink",
  };
  return (
    <div className={`border rounded-lg p-5 text-sm leading-relaxed ${tones[tone]}`}>
      {children}
    </div>
  );
}

export function placeholderConcepts(topic: string, points: string[] = []): StudyPageContent {
  return {
    intro: <p>Concept reference for {topic}. Outline ready — depth fills in over time.</p>,
    body: (
      <div className="prose-study space-y-6">
        <h2>What you must know cold</h2>
        <ul>
          {(points.length
            ? points
            : [
                "Definition and intuition",
                "When to use vs not use",
                "Common pitfalls / gotchas",
                "Code-it-yourself version",
              ]
          ).map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
        <h2>Coming next</h2>
        <p>Worked examples + interviewer follow-ups added in the next iteration.</p>
      </div>
    ),
  };
}

export function placeholderQs(topic: string, questions: string[] = []): StudyPageContent {
  const defaults = [
    `Define ${topic} in one sentence.`,
    `When does ${topic} fail?`,
    `Code a basic version of ${topic}.`,
    `Compare ${topic} with the closest alternative.`,
  ];
  const list = questions.length ? questions : defaults;
  return {
    intro: <p>Top interview questions on {topic}. Question list locked in — answers being written.</p>,
    qa: list.map((q) => ({
      q,
      a: <p>Answer being drafted. Outline: intuition → mechanics → tradeoffs → when to use.</p>,
    })),
  };
}
