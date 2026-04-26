import { Note, Script, type StudyPageContent } from "./_shared";

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
        <strong>Why this works:</strong> recruiters hear &quot;tell me about yourself&quot; as <em>can you give me a clean narrative I can pitch to the hiring manager?</em>
        Lead with present, anchor in past, end with intent. Don&apos;t list every job — pick the throughline.
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
      <Script title="Project 1 — [name]" body={`[Placeholder STAR: Situation: ... | Task: ... | Action: I did X, Y, Z using TabH2O / h2oGPTe / Wave ... | Result: ...]`} />
      <Script title="Project 2 — [name]" body={`[Placeholder]`} />
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
  intro: <p>Be specific. &quot;Perfectionist&quot; is dead on arrival.</p>,
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

export const resumeScriptsContent: Record<string, StudyPageContent> = {
  "tell-me-about-yourself": tellMeAboutYourself,
  "why-data-science": whyDataScience,
  "h2oai-projects": h2oaiProjects,
  "arch-projects": archProjects,
  "mosaic-internship": mosaicInternship,
  "vkore-experience": vkoreExperience,
  "strengths-weaknesses": strengthsWeaknesses,
  "why-this-company": whyThisCompany,
};
