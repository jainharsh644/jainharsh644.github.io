// Concept and Q&A content for each study page. Markdown-ish via React.
// This file will grow — keep it organized by section/page slug.

import type { ReactNode } from "react";

export type QA = { q: string; a: ReactNode; code?: { lang: string; src: string } };
export type StudyPageContent = {
  intro: ReactNode;
  body?: ReactNode;
  qa?: QA[];
};

const C = ({ children }: { children: ReactNode }) => (
  <code className="px-1.5 py-0.5 bg-cream-soft rounded font-mono text-[0.85em]">{children}</code>
);

// ---------- Resume Scripts ----------
const tellMeAboutYourself: StudyPageContent = {
  intro: (
    <>
      <p>
        Two-minute spoken answer. Structure: <strong>present → past → why this role</strong>.
        Keep it conversational, no resume recitation.
      </p>
    </>
  ),
  body: (
    <div className="space-y-6">
      <Script
        title="60-second version"
        body={`Hi, I'm Harsh — I'm currently a Data Scientist at H2O.ai, where I work on building AI systems across predictive, generative and agentic domains. Before this, I spent close to two years at Arch, a manufacturing company, building forecasting and anomaly-detection systems. I did my Master's in Data Analytics at Texas State University, where I also worked as a Graduate Assistant, and interned at The Mosaic Company in agribusiness analytics. Earlier in my career I was a Data Scientist at VKore Solutions in India, where I really got my hands dirty with end-to-end ML. What excites me about this role is [tailor: e.g., the chance to apply agentic AI to real production problems] — that's the thread I've been pulling on for the last year.`}
      />
      <Script
        title="Two-minute version"
        body={`[Placeholder — expand each section to 30–40 seconds. Add one concrete project per role: at H2O.ai, talk about the synthetic-data platform; at Arch, the forecasting pipeline; at Mosaic, the demand modeling work. End with: "and the reason I'm interested in this role specifically is X" — match the X to the JD.]`}
      />
      <Note>
        <strong>Why this works:</strong> recruiters hear "tell me about yourself" as <em>can you give me a clean narrative I can pitch to the hiring manager?</em>
        Lead with present, anchor in past, end with intent. Don't list every job — pick the throughline.
      </Note>
    </div>
  ),
};

const whyDataScience: StudyPageContent = {
  intro: <p>Honest answer about what pulled you into the field — interviewers can smell rehearsed corporate-speak from a mile away.</p>,
  body: (
    <div className="space-y-6">
      <Script
        title="The story"
        body={`[Placeholder — share the moment the field clicked for you. Example: "In my undergrad CS program I took a stats elective and realized that the messy, ambiguous problems were way more interesting than the clean ones. The first time I shipped a model to production at VKore and watched a real business decision change because of it — that hooked me."]`}
      />
    </div>
  ),
};

const h2oaiProjects: StudyPageContent = {
  intro: <p>Walk-through of your H2O.ai work. Use STAR (Situation, Task, Action, Result) for each project.</p>,
  body: (
    <div className="space-y-6">
      <Script
        title="Project 1 — [name]"
        body={`[Placeholder STAR: Situation: ... | Task: ... | Action: I did X, Y, Z using TabH2O / h2oGPTe / Wave ... | Result: ...]`}
      />
      <Script
        title="Project 2 — [name]"
        body={`[Placeholder]`}
      />
    </div>
  ),
};

const archProjects: StudyPageContent = {
  intro: <p>Arch was manufacturing — every story should connect to a business outcome (downtime saved, forecast accuracy gained, etc.).</p>,
  body: (
    <div className="space-y-6">
      <Script title="Demand Forecasting" body={`[Placeholder STAR for the forecasting pipeline]`} />
      <Script title="Anomaly Detection" body={`[Placeholder STAR for the sensor-stream anomaly system]`} />
    </div>
  ),
};

const mosaicInternship: StudyPageContent = {
  intro: <p>Internship: keep it short. One project, what you owned, what you learned.</p>,
  body: <Script title="Mosaic — Summer 2023" body={`[Placeholder STAR]`} />,
};

const vkoreExperience: StudyPageContent = {
  intro: <p>Your first DS role. Lean into ownership and breadth — full stack of the ML lifecycle.</p>,
  body: <Script title="VKore Solutions" body={`[Placeholder STAR]`} />,
};

const strengthsWeaknesses: StudyPageContent = {
  intro: <p>Be specific. "Perfectionist" is dead on arrival.</p>,
  body: (
    <div className="space-y-6">
      <Script title="Strength" body={`[Placeholder — a real strength with a concrete example. e.g., "translating fuzzy business problems into a measurable ML formulation. At Arch I once turned a vague 'we want to know when machines are about to break' into a specific multivariate anomaly score with a labeled validation set — that reframing was 70% of the work."]`} />
      <Script title="Weakness" body={`[Placeholder — a real weakness + what you're doing about it.]`} />
    </div>
  ),
};

const whyThisCompany: StudyPageContent = {
  intro: <p>Tailor per company. Have a generic skeleton you slot specifics into.</p>,
  body: (
    <Script
      title="Skeleton"
      body={`I'm interested in [Company] for three reasons. First, [problem space they work on] is exactly the kind of problem I want to spend the next chapter on — [specific signal: a paper, a product, a podcast where their CTO said X]. Second, the team — [name a person or org structure that matters to you]. Third, [career-fit reason: scope, scale, autonomy].`}
    />
  ),
};

// ---------- SQL ----------
const sqlConcepts: StudyPageContent = {
  intro: (
    <p>
      The SQL bar in DS interviews is higher than it used to be. Expect window functions, complex joins, and tricky NULL handling.
      This page covers the concepts; the next page is the question bank.
    </p>
  ),
  body: (
    <div className="space-y-12 prose-study">
      <section>
        <h2>1. Joins</h2>
        <p>SQL has four practical joins: <C>INNER</C>, <C>LEFT</C>, <C>RIGHT</C>, <C>FULL OUTER</C>. The two you must master cold are <C>INNER</C> and <C>LEFT</C>.</p>
        <ul>
          <li><strong>INNER JOIN</strong> — only rows where the key matches in both tables.</li>
          <li><strong>LEFT JOIN</strong> — every row from left, NULL from right when no match.</li>
          <li><strong>SELF JOIN</strong> — table joined to itself, common for hierarchies.</li>
          <li><strong>CROSS JOIN</strong> — Cartesian product. Use sparingly.</li>
        </ul>
        <p><strong>Interview trap:</strong> filtering a LEFT JOIN's right-side column in the <C>WHERE</C> clause silently turns it into an INNER JOIN. Filter in the <C>ON</C> clause instead.</p>
      </section>

      <section>
        <h2>2. Window Functions</h2>
        <p>Window functions compute over a "window" of rows without collapsing them like <C>GROUP BY</C> does.</p>
        <pre><code>{`SELECT
  user_id,
  order_date,
  amount,
  ROW_NUMBER()  OVER (PARTITION BY user_id ORDER BY order_date) AS rn,
  RANK()        OVER (PARTITION BY user_id ORDER BY amount DESC) AS rk,
  SUM(amount)   OVER (PARTITION BY user_id ORDER BY order_date
                      ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total,
  LAG(amount, 1) OVER (PARTITION BY user_id ORDER BY order_date) AS prev_amount
FROM orders;`}</code></pre>
        <p><strong>Know cold:</strong> <C>ROW_NUMBER</C> vs <C>RANK</C> vs <C>DENSE_RANK</C>, <C>LAG</C>/<C>LEAD</C>, framing (<C>ROWS BETWEEN ...</C>), running totals.</p>
      </section>

      <section>
        <h2>3. CTEs and Subqueries</h2>
        <p>CTEs (<C>WITH ... AS</C>) are subqueries with names. Use them for readability and for recursive queries (org charts, paths).</p>
        <pre><code>{`WITH monthly_users AS (
  SELECT DATE_TRUNC('month', signup_date) AS month, COUNT(*) AS new_users
  FROM users GROUP BY 1
)
SELECT month, new_users,
       SUM(new_users) OVER (ORDER BY month) AS cumulative_users
FROM monthly_users;`}</code></pre>
      </section>

      <section>
        <h2>4. NULL handling</h2>
        <ul>
          <li><C>NULL = NULL</C> is <em>NULL</em>, not <em>TRUE</em>. Use <C>IS NULL</C>.</li>
          <li><C>COUNT(*)</C> counts rows. <C>COUNT(col)</C> ignores NULLs.</li>
          <li><C>SUM</C>, <C>AVG</C> ignore NULLs. <C>AVG</C> over a column with NULLs ≠ <C>SUM/COUNT(*)</C>.</li>
        </ul>
      </section>

      <section>
        <h2>5. Aggregations & GROUP BY</h2>
        <p>Every column in <C>SELECT</C> must be in <C>GROUP BY</C> or wrapped in an aggregate. <C>HAVING</C> filters groups, <C>WHERE</C> filters rows.</p>
      </section>

      <section>
        <h2>6. Performance instincts</h2>
        <ul>
          <li>Filter early (<C>WHERE</C> before joins where possible).</li>
          <li>Avoid <C>SELECT *</C>.</li>
          <li>Indexes on join keys and filter columns matter.</li>
          <li><C>EXPLAIN</C> is your friend.</li>
        </ul>
      </section>
    </div>
  ),
};

const sqlTopQuestions: StudyPageContent = {
  intro: <p>The SQL questions that come up most often in DS interviews at top tech and finance companies. Each one shows the question, the solution, and why it works.</p>,
  qa: [
    {
      q: "Find the second highest salary from an Employee table",
      a: <p>Classic warm-up. Don't reach for <C>LIMIT 1 OFFSET 1</C> unless asked — handle ties cleanly.</p>,
      code: {
        lang: "sql",
        src: `-- Robust: handles ties and missing values
SELECT MAX(salary) AS second_highest
FROM employee
WHERE salary < (SELECT MAX(salary) FROM employee);

-- With window function (preferred at scale)
SELECT DISTINCT salary AS second_highest
FROM (
  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rk
  FROM employee
) t
WHERE rk = 2;`,
      },
    },
    {
      q: "Top N per group (e.g. top 3 highest-paid employees per department)",
      a: <p>The single most asked SQL question. Window function + filter on rank.</p>,
      code: {
        lang: "sql",
        src: `WITH ranked AS (
  SELECT
    e.*,
    DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rk
  FROM employee e
)
SELECT * FROM ranked WHERE rk <= 3;`,
      },
    },
    {
      q: "Find users active on consecutive days (streaks)",
      a: <p>Tricks: subtract a row number from the date — equal results = same streak.</p>,
      code: {
        lang: "sql",
        src: `WITH t AS (
  SELECT user_id, activity_date,
         activity_date - INTERVAL '1 day' * ROW_NUMBER()
           OVER (PARTITION BY user_id ORDER BY activity_date) AS grp
  FROM activity
)
SELECT user_id, MIN(activity_date) AS streak_start,
       MAX(activity_date) AS streak_end,
       COUNT(*) AS streak_length
FROM t
GROUP BY user_id, grp
HAVING COUNT(*) >= 3;`,
      },
    },
    {
      q: "Month-over-month growth rate",
      a: <p>Self-join on month, or use <C>LAG</C>.</p>,
      code: {
        lang: "sql",
        src: `WITH monthly AS (
  SELECT DATE_TRUNC('month', order_date) AS month, SUM(amount) AS revenue
  FROM orders GROUP BY 1
)
SELECT
  month,
  revenue,
  LAG(revenue) OVER (ORDER BY month) AS prev_revenue,
  ROUND(100.0 * (revenue - LAG(revenue) OVER (ORDER BY month))
        / NULLIF(LAG(revenue) OVER (ORDER BY month), 0), 2) AS mom_pct
FROM monthly;`,
      },
    },
    {
      q: "Find duplicates",
      a: <p><C>GROUP BY</C> + <C>HAVING COUNT(*) &gt; 1</C> is the bread-and-butter answer.</p>,
      code: {
        lang: "sql",
        src: `SELECT email, COUNT(*) AS cnt
FROM users
GROUP BY email
HAVING COUNT(*) > 1;`,
      },
    },
    {
      q: "Median salary per department",
      a: <p>Most DBs have <C>PERCENTILE_CONT(0.5)</C> as a window or aggregate function.</p>,
      code: {
        lang: "sql",
        src: `SELECT department_id,
       PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY salary) AS median_salary
FROM employee
GROUP BY department_id;`,
      },
    },
    {
      q: "Cumulative count of distinct users by date",
      a: <p>Cumulative distinct count is a known hard one. Trick: only count a user on the first day they appear.</p>,
      code: {
        lang: "sql",
        src: `WITH first_seen AS (
  SELECT user_id, MIN(activity_date) AS first_date FROM activity GROUP BY user_id
)
SELECT first_date AS date,
       COUNT(*) OVER (ORDER BY first_date) AS cumulative_distinct_users
FROM first_seen;`,
      },
    },
    {
      q: "[Placeholder] Pivot rows into columns (sales by month)",
      a: <p>Use <C>CASE WHEN ... THEN ...</C> inside <C>SUM</C>.</p>,
      code: { lang: "sql", src: `-- TODO: full solution` },
    },
  ],
};

// ---------- Other pages: minimal placeholder shells ----------
const placeholderConcepts = (topic: string): StudyPageContent => ({
  intro: (
    <p>
      Concept reference for {topic}. Detailed content in progress — the structure is here, the
      depth fills in over time.
    </p>
  ),
  body: (
    <div className="prose-study space-y-6">
      <h2>Core ideas</h2>
      <p>[Placeholder] Bullet list of the foundational concepts every interviewer expects you to know cold.</p>
      <h2>Where it gets tricky</h2>
      <p>[Placeholder] The edge cases and "gotchas" that separate strong candidates from average ones.</p>
      <h2>Useful resources</h2>
      <p>[Placeholder] Books, courses, blog posts I lean on when I need a refresher.</p>
    </div>
  ),
});

const placeholderQs = (topic: string): StudyPageContent => ({
  intro: <p>Top interview questions on {topic} — being added. Each will include question, my answer, and a worked example.</p>,
  qa: [
    {
      q: `[Placeholder] First common ${topic} question`,
      a: <p>[Placeholder] Crisp answer with the intuition first, then the detail.</p>,
    },
    {
      q: `[Placeholder] Second common ${topic} question`,
      a: <p>[Placeholder] Crisp answer.</p>,
    },
  ],
});

// ---------- Registry ----------
export const studyContent: Record<string, Record<string, StudyPageContent>> = {
  "resume-scripts": {
    "tell-me-about-yourself": tellMeAboutYourself,
    "why-data-science": whyDataScience,
    "h2oai-projects": h2oaiProjects,
    "arch-projects": archProjects,
    "mosaic-internship": mosaicInternship,
    "vkore-experience": vkoreExperience,
    "strengths-weaknesses": strengthsWeaknesses,
    "why-this-company": whyThisCompany,
  },
  sql: {
    concepts: sqlConcepts,
    "top-questions": sqlTopQuestions,
    "window-functions": placeholderConcepts("Window Functions"),
    joins: placeholderConcepts("Joins"),
  },
  statistics: {
    concepts: placeholderConcepts("Statistics"),
    "top-questions": placeholderQs("Statistics"),
    "ab-testing": placeholderConcepts("A/B Testing"),
    "hypothesis-testing": placeholderConcepts("Hypothesis Testing"),
  },
  "machine-learning": {
    concepts: placeholderConcepts("Machine Learning"),
    "top-questions": placeholderQs("Machine Learning"),
    "tree-ensembles": placeholderConcepts("Tree Ensembles"),
    "model-evaluation": placeholderConcepts("Model Evaluation"),
  },
  "predictive-ai": {
    concepts: placeholderConcepts("Predictive AI"),
    "top-questions": placeholderQs("Predictive AI"),
    forecasting: placeholderConcepts("Forecasting"),
  },
  "gen-ai": {
    concepts: placeholderConcepts("Generative AI"),
    "top-questions": placeholderQs("Generative AI"),
    rag: placeholderConcepts("RAG"),
    prompting: placeholderConcepts("Prompting"),
  },
  "agentic-ai": {
    concepts: placeholderConcepts("Agentic AI"),
    "top-questions": placeholderQs("Agentic AI"),
    frameworks: placeholderConcepts("Agent Frameworks"),
  },
};

// ---------- Helpers ----------
function Script({ title, body }: { title: string; body: string }) {
  return (
    <div className="bg-cream-soft border-l-4 border-terracotta pl-6 py-4 pr-4 rounded-r-lg">
      <p className="text-xs uppercase tracking-widest text-terracotta mb-2">{title}</p>
      <p className="text-ink-soft leading-relaxed whitespace-pre-line">{body}</p>
    </div>
  );
}

function Note({ children }: { children: ReactNode }) {
  return (
    <div className="bg-forest/5 border border-forest/20 rounded-lg p-5 text-sm">
      <p className="text-forest leading-relaxed">{children}</p>
    </div>
  );
}
