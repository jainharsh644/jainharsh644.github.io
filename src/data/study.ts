// Study tab navigation tree. Sections + sub-pages for end-to-end DS / Senior DS interview prep.

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
      { slug: "top-questions", title: "Top 60+ Interview Questions" },
      { slug: "window-functions", title: "Window Functions Deep Dive" },
      { slug: "joins", title: "Joins Mastery" },
      { slug: "null-handling", title: "NULL Handling Traps" },
      { slug: "performance", title: "Performance & Optimization" },
    ],
  },
  {
    slug: "python-dsa",
    title: "Python & DSA",
    blurb: "Pandas patterns, NumPy, DS-flavored Python questions, and the DSA you actually need.",
    emoji: "🐍",
    pages: [
      { slug: "pandas-patterns", title: "Pandas Patterns" },
      { slug: "numpy", title: "NumPy Essentials" },
      { slug: "ds-python-qs", title: "DS Python Coding Questions" },
      { slug: "dsa-essentials", title: "DSA Essentials" },
      { slug: "oop-design", title: "OOP & Design Patterns" },
    ],
  },
  {
    slug: "statistics",
    title: "Probability & Statistics",
    blurb: "The probability and inference questions that separate offers from rejections.",
    emoji: "📊",
    pages: [
      { slug: "concepts", title: "Concepts" },
      { slug: "distributions", title: "Distributions Cheat Sheet" },
      { slug: "clt-lln", title: "CLT, LLN & Sampling" },
      { slug: "hypothesis-testing", title: "Hypothesis Testing" },
      { slug: "ab-testing", title: "A/B Testing — Deep Dive" },
      { slug: "causal-inference", title: "Causal Inference" },
      { slug: "bayesian", title: "Bayesian Thinking" },
      { slug: "top-questions", title: "Top 50 Interview Questions" },
    ],
  },
  {
    slug: "machine-learning",
    title: "Classical ML",
    blurb: "Bias-variance, regularization, ensembles, evaluation — the bread-and-butter of every round.",
    emoji: "🤖",
    pages: [
      { slug: "concepts", title: "Concepts (deep)" },
      { slug: "linear-models", title: "Linear & Logistic Regression" },
      { slug: "tree-ensembles", title: "Trees, RF, GBM, XGBoost" },
      { slug: "loss-functions", title: "Loss Functions" },
      { slug: "model-evaluation", title: "Model Evaluation Metrics" },
      { slug: "feature-engineering", title: "Feature Engineering" },
      { slug: "imbalanced", title: "Imbalanced Classification" },
      { slug: "cross-validation", title: "Cross-Validation Strategies" },
      { slug: "hyperparam-tuning", title: "Hyperparameter Tuning" },
      { slug: "top-questions", title: "Top 50 Interview Questions" },
    ],
  },
  {
    slug: "deep-learning",
    title: "Deep Learning",
    blurb: "Backprop, CNNs, RNNs, transformers — what senior DS interviews probe.",
    emoji: "🧠",
    pages: [
      { slug: "concepts", title: "Concepts" },
      { slug: "backprop-optimizers", title: "Backprop & Optimizers" },
      { slug: "cnns", title: "CNNs" },
      { slug: "rnns-lstm", title: "RNNs & LSTM" },
      { slug: "transformers", title: "Transformers & Attention" },
      { slug: "regularization", title: "Regularization in DL" },
    ],
  },
  {
    slug: "gen-ai",
    title: "Generative AI / LLMs",
    blurb: "LLMs, RAG, prompting, fine-tuning, evaluation — current state-of-the-art.",
    emoji: "✨",
    pages: [
      { slug: "concepts", title: "LLM Architecture & Internals" },
      { slug: "pretraining", title: "Pretraining vs SFT vs RLHF/DPO" },
      { slug: "prompting", title: "Prompting Patterns" },
      { slug: "rag", title: "RAG — Deep Dive" },
      { slug: "fine-tuning", title: "Fine-tuning: LoRA, QLoRA, PEFT" },
      { slug: "embeddings", title: "Embeddings & Vector Search" },
      { slug: "evaluation", title: "LLM Evaluation" },
      { slug: "hallucinations", title: "Hallucinations & Mitigation" },
      { slug: "top-questions", title: "Top GenAI Interview Questions" },
    ],
  },
  {
    slug: "agentic-ai",
    title: "Agentic AI",
    blurb: "Tool use, planning, multi-agent orchestration — the cutting edge.",
    emoji: "🦾",
    pages: [
      { slug: "concepts", title: "Agent Concepts" },
      { slug: "tool-use", title: "Tool Use & Function Calling" },
      { slug: "react-planning", title: "ReAct, Plan-Execute, Reflexion" },
      { slug: "memory", title: "Memory: Short, Long, Semantic" },
      { slug: "frameworks", title: "Frameworks: LangGraph, AutoGen, CrewAI" },
      { slug: "evaluation", title: "Evaluating Agents" },
      { slug: "safety", title: "Safety, Guardrails, Prompt Injection" },
      { slug: "top-questions", title: "Top Agentic Interview Questions" },
    ],
  },
  {
    slug: "predictive-ai",
    title: "Time Series / Predictive AI",
    blurb: "Forecasting at scale — classical and modern approaches.",
    emoji: "📈",
    pages: [
      { slug: "concepts", title: "Time Series Concepts" },
      { slug: "stationarity", title: "Stationarity & Differencing" },
      { slug: "arima-family", title: "ARIMA, SARIMA, ETS" },
      { slug: "prophet-modern", title: "Prophet & ML Forecasting" },
      { slug: "evaluation", title: "Time Series Evaluation" },
      { slug: "top-questions", title: "Top Forecasting Questions" },
    ],
  },
  {
    slug: "ml-system-design",
    title: "ML System Design",
    blurb: "End-to-end ML system design — recommender, fraud, A/B platform, feature store.",
    emoji: "🏗",
    pages: [
      { slug: "framework", title: "How to Approach ML Design" },
      { slug: "recommender", title: "Design: Recommender System" },
      { slug: "fraud", title: "Design: Fraud Detection" },
      { slug: "ab-platform", title: "Design: A/B Testing Platform" },
      { slug: "feature-store", title: "Design: Feature Store" },
      { slug: "serving", title: "Design: ML Serving Infra" },
    ],
  },
  {
    slug: "behavioral",
    title: "Behavioral & Leadership",
    blurb: "STAR-formatted answers and the senior-level signals interviewers listen for.",
    emoji: "💬",
    pages: [
      { slug: "star-framework", title: "STAR Framework" },
      { slug: "top-questions", title: "Top 30 Behavioral Questions" },
      { slug: "conflict", title: "Conflict & Disagreement" },
      { slug: "ambiguity", title: "Handling Ambiguity" },
      { slug: "mentoring", title: "Mentoring & Influence" },
      { slug: "senior-signals", title: "Senior-Level Signals" },
    ],
  },
  {
    slug: "domain",
    title: "Domain Deep Dives",
    blurb: "Industry-specific context I lean on in interviews.",
    emoji: "🎯",
    pages: [
      { slug: "fintech", title: "Fintech & H2O.ai Work" },
      { slug: "manufacturing", title: "Manufacturing (Arch)" },
      { slug: "agribusiness", title: "Agribusiness (Mosaic)" },
      { slug: "h2o-stack", title: "H2O Stack: TabH2O, h2oGPTe, DAI, Wave" },
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
