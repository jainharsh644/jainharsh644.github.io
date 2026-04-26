// Registry — pulls content from per-section files in src/content/

import type { StudyPageContent, QA } from "@/content/_shared";
import { resumeScriptsContent } from "@/content/resume-scripts";
import { sqlContent } from "@/content/sql";
import { pythonDsaContent } from "@/content/python-dsa";
import { statisticsContent } from "@/content/statistics";
import { mlContent } from "@/content/machine-learning";
import { deepLearningContent } from "@/content/deep-learning";
import { genAiContent } from "@/content/gen-ai";
import { agenticAiContent } from "@/content/agentic-ai";
import { predictiveAiContent } from "@/content/predictive-ai";
import { systemDesignContent } from "@/content/system-design";
import { behavioralContent } from "@/content/behavioral";
import { domainContent } from "@/content/domain";

export type { StudyPageContent, QA };

export const studyContent: Record<string, Record<string, StudyPageContent>> = {
  "resume-scripts": resumeScriptsContent,
  sql: sqlContent,
  "python-dsa": pythonDsaContent,
  statistics: statisticsContent,
  "machine-learning": mlContent,
  "deep-learning": deepLearningContent,
  "gen-ai": genAiContent,
  "agentic-ai": agenticAiContent,
  "predictive-ai": predictiveAiContent,
  "ml-system-design": systemDesignContent,
  behavioral: behavioralContent,
  domain: domainContent,
};
