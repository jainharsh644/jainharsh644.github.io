import { C, Note, type StudyPageContent } from "./_shared";

const star: StudyPageContent = {
  intro: (
    <p>
      Behavioral rounds are deceptively heavy — at senior levels they often decide the offer. STAR is the standard
      structure, but the real trick is picking the right stories and not over-rehearsing them.
    </p>
  ),
  body: (
    <div className="prose-study space-y-8">
      <section>
        <h2>The framework</h2>
        <ul>
          <li><strong>Situation</strong> — context. Who, where, what was the state of things? Keep it under 30s.</li>
          <li><strong>Task</strong> — your specific responsibility / what you owned. &quot;The team had to X; my piece was Y.&quot;</li>
          <li><strong>Action</strong> — what <em>you</em> did. Use &quot;I&quot; not &quot;we.&quot; This is 60% of the answer.</li>
          <li><strong>Result</strong> — quantified outcome. Numbers, business impact, what changed because of you.</li>
        </ul>
      </section>

      <section>
        <h2>Build a story bank</h2>
        <p>Pre-write 8–10 stories that cover the common axes. Each should map to multiple questions. Tag every story with what it demonstrates: ownership, technical depth, conflict, ambiguity, mentoring, failure, prioritization.</p>
        <table className="w-full text-sm border border-cream-deep">
          <thead className="bg-cream-soft">
            <tr><th className="border p-2 text-left border-cream-deep">Story</th><th className="border p-2 text-left border-cream-deep">Demonstrates</th><th className="border p-2 text-left border-cream-deep">Maps to</th></tr>
          </thead>
          <tbody>
            <tr><td className="border p-2 border-cream-deep">[Placeholder — H2O.ai project that shipped]</td><td className="border p-2 border-cream-deep">Ownership, technical depth</td><td className="border p-2 border-cream-deep">&quot;Most impactful project,&quot; &quot;tell me about a complex problem&quot;</td></tr>
            <tr><td className="border p-2 border-cream-deep">[Placeholder — disagreement with stakeholder]</td><td className="border p-2 border-cream-deep">Conflict, influence</td><td className="border p-2 border-cream-deep">&quot;Tell me about a disagreement,&quot; &quot;influencing without authority&quot;</td></tr>
            <tr><td className="border p-2 border-cream-deep">[Placeholder — Arch project that failed]</td><td className="border p-2 border-cream-deep">Failure, learning</td><td className="border p-2 border-cream-deep">&quot;Tell me about a failure,&quot; &quot;biggest mistake&quot;</td></tr>
            <tr><td className="border p-2 border-cream-deep">[Placeholder — vague stakeholder ask you scoped]</td><td className="border p-2 border-cream-deep">Handling ambiguity</td><td className="border p-2 border-cream-deep">&quot;Ambiguous problem,&quot; &quot;define your own scope&quot;</td></tr>
            <tr><td className="border p-2 border-cream-deep">[Placeholder — mentoring intern / junior]</td><td className="border p-2 border-cream-deep">Mentoring</td><td className="border p-2 border-cream-deep">&quot;Helping someone grow,&quot; &quot;leadership without title&quot;</td></tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>What goes wrong with STAR</h2>
        <ul>
          <li><strong>Too much Situation, no Action.</strong> Most candidates over-explain context.</li>
          <li><strong>&quot;We&quot; instead of &quot;I.&quot;</strong> Interviewer can&apos;t tell what you actually did.</li>
          <li><strong>No metric in the Result.</strong> &quot;It went well&quot; is dead on arrival.</li>
          <li><strong>Sounds rehearsed.</strong> Pause. Think. Vary words. Conversation, not recitation.</li>
        </ul>
      </section>
    </div>
  ),
};

const topQuestions: StudyPageContent = {
  intro: <p>The thirty behavioral questions that show up across DS interviews. Plug in stories from the bank.</p>,
  qa: [
    { q: "Tell me about a time you had to make a decision with incomplete information.", a: <p>STAR. Senior signal: you frame the decision under uncertainty, identify the smallest experiment that would resolve the biggest unknown, and proceed with explicit assumptions.</p> },
    { q: "Tell me about a project that failed.", a: <p>Pick a real failure with real lessons. Don&apos;t pick a fake-failure (&quot;we shipped it 2 weeks late&quot;). Lead with the lesson, then the story.</p> },
    { q: "Describe a disagreement with a stakeholder. How did you resolve it?", a: <p>Senior signal: you didn&apos;t &quot;win&quot; — you found data that resolved the disagreement, or you committed to disagree-and-commit, or you escalated cleanly.</p> },
    { q: "How do you prioritize when everything is urgent?", a: <p>Cost-of-delay framing. Quantify expected impact × probability of success / effort. Propose a forcing function with the stakeholder.</p> },
    { q: "Tell me about a time you mentored someone.", a: <p>Specific person, specific growth, what <em>you</em> did differently from default. Bonus for &quot;they&apos;re now [doing X impressive thing].&quot;</p> },
    { q: "Describe the most complex technical problem you&apos;ve solved.", a: <p>Pick something where the complexity was real and varied (data, modeling, deployment, stakeholder). Show how you decomposed it. Include where you got stuck and how you got unstuck.</p> },
    { q: "How do you handle situations where you don&apos;t know the answer?", a: <p>The honest answer: you ask, search, prototype, and timebox. Senior twist: you also know which kinds of questions to send up the chain vs solve solo.</p> },
    { q: "What&apos;s the feedback you&apos;ve received that hit hardest?", a: <p>This is the tell-me-a-weakness question, dressed up. Pick something real that you&apos;ve worked on. Show the change.</p> },
    { q: "Tell me about a time you had to influence without authority.", a: <p>Senior question. Frame it around earning trust, sharing data / artifacts, finding the smallest reversible commitment that builds momentum.</p> },
    { q: "Why are you leaving your current role?", a: <p>Forward-looking, not bitter. &quot;I&apos;ve grown a lot at H2O.ai and what excites me next is X — and X is exactly what this role offers.&quot;</p> },
    { q: "[Placeholder] What are you most proud of?", a: <p>Pick a story with personal stake.</p> },
    { q: "[Placeholder] How do you measure your own performance?", a: <p>Self-aware metrics; tie to outcomes.</p> },
    { q: "[Placeholder] Tell me about a time you had to learn something new fast.", a: <p>Specific tech / domain.</p> },
    { q: "[Placeholder] What&apos;s the biggest mistake you&apos;ve made at work?", a: <p>Real mistake, real cost, what changed.</p> },
    { q: "[Placeholder] How do you collaborate with engineers / PMs / designers?", a: <p>Concrete examples per role.</p> },
  ],
};

const conflict: StudyPageContent = {
  intro: <p>Almost guaranteed at senior level. Interviewers want to see you&apos;re not the source of conflict and that you can absorb friction.</p>,
  body: (
    <div className="prose-study space-y-6">
      <h2>What good answers do</h2>
      <ul>
        <li>Show you separated the issue from the person</li>
        <li>Lean on data and explicit tradeoffs</li>
        <li>Acknowledge the other side&apos;s legitimate concern before pushing yours</li>
        <li>End with disagree-and-commit when consensus didn&apos;t happen — and what came of it</li>
      </ul>
      <h2>What bad answers do</h2>
      <ul>
        <li>Frame the other person as obstinate / stupid / political</li>
        <li>End with &quot;and they finally agreed I was right&quot;</li>
        <li>No real disagreement — &quot;we just hadn&apos;t communicated&quot;</li>
      </ul>
    </div>
  ),
};

const ambiguity: StudyPageContent = {
  intro: <p>Senior DS work is mostly ambiguity reduction. Interviewers test whether you can move forward without a perfectly defined problem.</p>,
  body: (
    <div className="prose-study space-y-6">
      <h2>Pattern</h2>
      <ol className="list-decimal pl-6 space-y-2">
        <li>State the goal in your own words back to the stakeholder</li>
        <li>Enumerate possible interpretations and pick one with explicit reasoning</li>
        <li>Identify the cheapest investigation that would change your interpretation</li>
        <li>Commit to a 1-week / 2-week deliverable, then iterate</li>
      </ol>
    </div>
  ),
};

const mentoring: StudyPageContent = {
  intro: <p>Mentoring stories matter at senior level. Don&apos;t fake them.</p>,
  body: (
    <div className="prose-study space-y-6">
      <h2>What to highlight</h2>
      <ul>
        <li>Specific person, specific growth area, specific actions you took</li>
        <li>How you adjusted your approach to their style (some need code review, some need pairing, some need career framing)</li>
        <li>Their outcome — what they shipped, where they are now, what they say about you</li>
      </ul>
    </div>
  ),
};

const seniorSignals: StudyPageContent = {
  intro: <p>The differences between DS and Senior DS in how interviewers score you.</p>,
  body: (
    <div className="prose-study space-y-6">
      <h2>What gets you the senior tag</h2>
      <ul>
        <li><strong>Scope.</strong> You owned an outcome, not a task. You influenced peers&apos; work. You drove cross-team alignment.</li>
        <li><strong>Judgment.</strong> You make calls under uncertainty and explain them. You prioritize ruthlessly.</li>
        <li><strong>Tradeoffs.</strong> Every answer comes with a tradeoff you volunteered.</li>
        <li><strong>Mentoring.</strong> Real stories of growing other people.</li>
        <li><strong>Business framing.</strong> You don&apos;t just talk modeling — you talk what the model is for and what it costs to run.</li>
        <li><strong>Failure modes.</strong> You volunteer how things break, not just how they work.</li>
      </ul>
      <h2>What pulls you back to mid-level</h2>
      <ul>
        <li>Talking only about your code, not your team</li>
        <li>Letting interviewer drive — passive answers</li>
        <li>No quantified business impact in any story</li>
        <li>Avoiding tradeoffs (&quot;X is just better&quot;)</li>
      </ul>
    </div>
  ),
};

export const behavioralContent: Record<string, StudyPageContent> = {
  "star-framework": star,
  "top-questions": topQuestions,
  conflict,
  ambiguity,
  mentoring,
  "senior-signals": seniorSignals,
};
