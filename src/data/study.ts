// Study tab navigation + content registry. Real content lives in MDX-style strings here for now;
// move to /content/*.mdx later when it grows.

export type StudySection = {
  slug: string;
  title: string;
  blurb: string;
  emoji: string;
  pages: { slug: string; title: string }[];
};

export const studySections: StudySection[] = [
  {
    slug: "resume-scripts",
    title: "Resume Scripts",
    blurb: "Spoken-word answers to every common interview question about my resume.",
    emoji: "🎙",
    pages: [
      { slug: "tell-me-about-yourself", title: "Tell me about yourself" },
      { slug: "why-data-science", title: "Why data science?" },
      { slug: "h2oai-projects", title: "Walk me through your H2O.ai work" },
      { slug: "arch-projects", title: "Walk me through your Arch work" },
      { slug: "mosaic-internship", title: "Mosaic Company internship" },
      { slug: "vkore-experience", title: "VKore Solutions experience" },
      { slug: "strengths-weaknesses", title: "Strengths and weaknesses" },
      { slug: "why-this-company", title: "Why this company?" },
    ],
  },
  {
    slug: "sql",
    title: "SQL",
    blurb: "From core concepts to the queries that show up in every DS interview.",
    emoji: "🗄",
    pages: [
      { slug: "concepts", title: "Concepts" },
      { slug: "top-questions", title: "Top Interview Questions" },
      { slug: "window-functions", title: "Window Functions Deep Dive" },
      { slug: "joins", title: "Joins Mastery" },
    ],
  },
  {
    slug: "statistics",
    title: "Statistics",
    blurb: "The probability and inference questions that separate the offers from the rejections.",
    emoji: "📊",
    pages: [
      { slug: "concepts", title: "Concepts" },
      { slug: "top-questions", title: "Top Interview Questions" },
      { slug: "ab-testing", title: "A/B Testing" },
      { slug: "hypothesis-testing", title: "Hypothesis Testing" },
    ],
  },
  {
    slug: "machine-learning",
    title: "Machine Learning",
    blurb: "Classical ML — bias-variance, regularization, ensembles, evaluation.",
    emoji: "🤖",
    pages: [
      { slug: "concepts", title: "Concepts" },
      { slug: "top-questions", title: "Top Interview Questions" },
      { slug: "tree-ensembles", title: "Tree Ensembles" },
      { slug: "model-evaluation", title: "Model Evaluation" },
    ],
  },
  {
    slug: "predictive-ai",
    title: "Predictive AI",
    blurb: "Time-series, forecasting, demand modeling — production patterns.",
    emoji: "📈",
    pages: [
      { slug: "concepts", title: "Concepts" },
      { slug: "top-questions", title: "Top Interview Questions" },
      { slug: "forecasting", title: "Forecasting Methods" },
    ],
  },
  {
    slug: "gen-ai",
    title: "Generative AI",
    blurb: "LLMs, RAG, prompting, fine-tuning, evaluation — what interviewers actually ask.",
    emoji: "✨",
    pages: [
      { slug: "concepts", title: "Concepts" },
      { slug: "top-questions", title: "Top Interview Questions" },
      { slug: "rag", title: "Retrieval-Augmented Generation" },
      { slug: "prompting", title: "Prompting Patterns" },
    ],
  },
  {
    slug: "agentic-ai",
    title: "Agentic AI",
    blurb: "Tool-use, multi-agent orchestration, planning, evaluation of autonomous systems.",
    emoji: "🧠",
    pages: [
      { slug: "concepts", title: "Concepts" },
      { slug: "top-questions", title: "Top Interview Questions" },
      { slug: "frameworks", title: "Frameworks: LangGraph, AutoGen, CrewAI" },
    ],
  },
];

export function findSection(slug: string) {
  return studySections.find((s) => s.slug === slug);
}

export function findPage(sectionSlug: string, pageSlug: string) {
  const section = findSection(sectionSlug);
  if (!section) return null;
  const page = section.pages.find((p) => p.slug === pageSlug);
  return page ? { section, page } : null;
}
