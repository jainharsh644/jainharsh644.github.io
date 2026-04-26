// Single source of truth for resume content. Replace placeholders when full resume is provided.

export const profile = {
  name: "Harsh Jain",
  title: "Data Scientist",
  tagline: "I build data systems that turn messy reality into clear decisions.",
  location: "United States",
  email: "jainharsh644@gmail.com",
  github: "https://github.com/jainharsh644",
  linkedin: "https://www.linkedin.com/in/jainharsh644/",
  blurb:
    "Data Scientist at H2O.ai working on AI platforms across predictive, generative and agentic domains. Previously built forecasting and analytics systems at Arch and The Mosaic Company.",
};

export type Experience = {
  company: string;
  role: string;
  start: string;
  end: string;
  location: string;
  blurb: string;
  highlights: string[];
  stack: string[];
};

export const experiences: Experience[] = [
  {
    company: "H2O.ai",
    role: "Data Scientist",
    start: "Dec 2025",
    end: "Present",
    location: "Remote, USA",
    blurb:
      "Building synthetic data, predictive AI, generative AI and agentic AI systems on H2O's platform — from tabular foundation models to LLM-powered customer workflows.",
    highlights: [
      "[Placeholder] Designed end-to-end synthetic data generation platform combining TabH2O, h2oGPTe and Wave UI",
      "[Placeholder] Built domain-specialized agentic workflows with custom tool-use and retrieval",
      "[Placeholder] Owned model evaluation, drift monitoring and A/B harness for production deployments",
    ],
    stack: ["Python", "H2O AutoML", "TabH2O", "h2oGPTe", "Wave", "Driverless AI", "PyTorch"],
  },
  {
    company: "Arch",
    role: "Data Scientist",
    start: "Mar 2024",
    end: "Dec 2025",
    location: "USA",
    blurb:
      "Manufacturing analytics — forecasting demand, optimizing supply chain decisions and shipping ML models that operations teams used daily.",
    highlights: [
      "[Placeholder] Built demand-forecasting pipeline that improved forecast accuracy by N% across N product lines",
      "[Placeholder] Productionized anomaly detection on factory sensor streams, reducing unplanned downtime",
      "[Placeholder] Stood up the team's MLOps stack and model-monitoring dashboards",
    ],
    stack: ["Python", "SQL", "Snowflake", "Airflow", "MLflow", "scikit-learn", "XGBoost"],
  },
  {
    company: "The Mosaic Company",
    role: "Data Science Intern",
    start: "May 2023",
    end: "Aug 2023",
    location: "USA",
    blurb:
      "Summer internship in agribusiness analytics — applied ML to fertilizer demand and supply-chain optimization problems.",
    highlights: [
      "[Placeholder] Modeled regional fertilizer demand from weather, crop and pricing signals",
      "[Placeholder] Delivered Tableau analysis that informed a downstream procurement decision",
    ],
    stack: ["Python", "SQL", "Tableau", "scikit-learn"],
  },
  {
    company: "Texas State University",
    role: "Graduate Assistant — Data Analyst",
    start: "Oct 2022",
    end: "Dec 2023",
    location: "San Marcos, TX",
    blurb:
      "Worked alongside the masters program — built dashboards and analyses for a university research/operations team while completing my degree.",
    highlights: [
      "[Placeholder] Built reporting pipelines and dashboards for departmental decision-making",
      "[Placeholder] Mentored undergraduates on SQL and Python for analytics coursework",
    ],
    stack: ["SQL", "Python", "Tableau", "Excel"],
  },
  {
    company: "VKore Solutions",
    role: "Data Scientist",
    start: "Jan 2021",
    end: "Jul 2022",
    location: "India",
    blurb:
      "First full-time data role — built supervised models and analytics for client problems across industries.",
    highlights: [
      "[Placeholder] Shipped classification and regression models for client analytics use cases",
      "[Placeholder] Owned data engineering, modeling and stakeholder communication end-to-end",
    ],
    stack: ["Python", "SQL", "scikit-learn", "Pandas"],
  },
];

export type Education = {
  school: string;
  degree: string;
  field: string;
  start: string;
  end: string;
  location: string;
};

export const education: Education[] = [
  {
    school: "Texas State University",
    degree: "M.S.",
    field: "Data Analytics and Information Systems",
    start: "Aug 2022",
    end: "Dec 2023",
    location: "San Marcos, TX",
  },
  {
    school: "Anna University",
    degree: "B.E.",
    field: "Computer Science",
    start: "",
    end: "",
    location: "Chennai, India",
  },
];

export type Project = {
  slug: string;
  title: string;
  oneLiner: string;
  problem: string;
  approach: string;
  outcome: string;
  stack: string[];
  link?: string;
};

export const projects: Project[] = [
  {
    slug: "finsynth-pro",
    title: "FinSynth Pro",
    oneLiner: "Synthetic financial data generation platform built on H2O's stack.",
    problem:
      "[Placeholder] Fintech teams need realistic, privacy-safe synthetic data for model training and testing without exposing PII.",
    approach:
      "[Placeholder] Combined TabH2O for tabular generation, h2oGPTe for narrative augmentation, and a Wave UI front-end with quality and privacy metrics.",
    outcome:
      "[Placeholder] Demoed end-to-end pipeline that generates compliant tabular + textual data with measurable utility-vs-privacy tradeoff curves.",
    stack: ["TabH2O", "h2oGPTe", "Wave", "Python"],
  },
  {
    slug: "dole-banana-forecasting",
    title: "Dole Production Forecasting",
    oneLiner: "Forecasting banana, pineapple and fertilizer requirements for Dole.",
    problem:
      "[Placeholder] Dole needed multi-horizon forecasts across crops and inputs to drive procurement and field-ops decisions.",
    approach:
      "[Placeholder] Built feature pipelines from weather, yield and market data; used Driverless AI for model search; surfaced results in a Wave app.",
    outcome:
      "[Placeholder] Delivered a production-ready forecasting app the operations team can interrogate without writing code.",
    stack: ["Driverless AI", "Wave", "Python", "Time Series"],
  },
  {
    slug: "anomaly-factory-floor",
    title: "Factory-Floor Anomaly Detection",
    oneLiner: "Real-time anomaly detection on manufacturing sensor streams (Arch).",
    problem:
      "[Placeholder] Unplanned downtime on critical machines was costing meaningful dollars per hour.",
    approach:
      "[Placeholder] Built a streaming anomaly detector on multivariate sensor data with adaptive thresholds and alerting.",
    outcome:
      "[Placeholder] Reduced mean-time-to-detect for emerging faults; integrated with maintenance ticketing.",
    stack: ["Python", "scikit-learn", "Kafka", "Grafana"],
  },
];

export const skills = {
  Languages: ["Python", "SQL", "R"],
  "ML & Stats": ["scikit-learn", "XGBoost", "PyTorch", "Statsmodels", "H2O AutoML"],
  "GenAI / Agentic": ["LangGraph", "LangChain", "h2oGPTe", "RAG", "Tool-use Agents"],
  "Data & MLOps": ["Snowflake", "Airflow", "MLflow", "Docker", "Git"],
  "Apps & BI": ["Wave", "Streamlit", "Tableau", "Power BI"],
};
