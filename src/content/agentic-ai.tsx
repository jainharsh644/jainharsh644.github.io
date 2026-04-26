import { C, Note, type StudyPageContent, placeholderConcepts, placeholderQs } from "./_shared";

const concepts: StudyPageContent = {
  intro: <p>An agent is an LLM in a loop that can take actions in the world. The key word is &quot;loop&quot; — autonomy creates new failure modes.</p>,
  body: (
    <div className="prose-study space-y-10">
      <section>
        <h2>What makes something an agent</h2>
        <ul>
          <li>It has access to <strong>tools</strong> (functions, APIs, other agents)</li>
          <li>It runs in a <strong>loop</strong>: observe → reason → act → repeat</li>
          <li>It maintains <strong>state / memory</strong> across the loop</li>
          <li>It can <strong>plan</strong> multi-step actions, not just respond</li>
          <li>It has a <strong>termination condition</strong> (task complete, max steps, cost limit)</li>
        </ul>
      </section>
      <section>
        <h2>The autonomy spectrum</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong>LLM call</strong> — single prompt, single response. Not an agent.</li>
          <li><strong>Tool-use</strong> — model picks which tool to call. One-shot.</li>
          <li><strong>Loop with tools</strong> — model can call tools repeatedly until done. Basic agent.</li>
          <li><strong>Planning agent</strong> — generates a plan, executes it, replans on failure.</li>
          <li><strong>Multi-agent</strong> — multiple specialized agents coordinate.</li>
          <li><strong>Autonomous agent</strong> — long-running, self-directed, persistent memory.</li>
        </ol>
        <Note>
          Senior framing: don&apos;t reach for multi-agent until you&apos;ve exhausted the simpler options. Most &quot;agentic&quot; problems are single-agent loops with good tools.
        </Note>
      </section>
      <section>
        <h2>Where agents shine vs where they fail</h2>
        <ul>
          <li><strong>Shine:</strong> tasks with clear success criteria, high tool-call payoff (research, coding, data analysis), high tolerance for cost/latency</li>
          <li><strong>Fail:</strong> tasks needing real-time response, low tolerance for hallucination, ambiguous goals, requiring physical world reasoning beyond model&apos;s capabilities</li>
        </ul>
      </section>
    </div>
  ),
};

const toolUse: StudyPageContent = {
  intro: <p>Tool use is the foundation. A model that can&apos;t reliably pick the right tool with the right arguments isn&apos;t useful as an agent.</p>,
  body: (
    <div className="prose-study space-y-8">
      <section>
        <h2>How modern function calling works</h2>
        <ol className="list-decimal pl-6 space-y-1">
          <li>You define tools with name, description, JSON schema for parameters</li>
          <li>You pass tools alongside the user message</li>
          <li>Model returns either a text response OR a structured tool call</li>
          <li>You execute the tool, return the result as a tool message</li>
          <li>Model continues with the result in context</li>
        </ol>
      </section>
      <section>
        <h2>Designing good tools</h2>
        <ul>
          <li><strong>Names and descriptions matter most</strong> — the model picks tools by reading them like documentation. Be ruthless about clarity.</li>
          <li><strong>Few wide tools beat many narrow tools</strong> for shallow agents</li>
          <li><strong>Many specific tools beat few general tools</strong> when the agent loop is long; reduces error per step</li>
          <li><strong>Parameter validation</strong> — JSON schema constraints (enum, regex) reduce malformed calls</li>
          <li><strong>Idempotent + reversible</strong> when possible; avoid &quot;send-email&quot; without confirmation</li>
        </ul>
      </section>
      <section>
        <h2>Common failure modes</h2>
        <ul>
          <li>Hallucinated arguments (made-up IDs, dates)</li>
          <li>Calling the wrong tool when descriptions overlap</li>
          <li>Infinite tool-call loops</li>
          <li>Forgetting to call a tool when one was needed</li>
        </ul>
        <p>Mitigations: structured output validation, max-step limit, evaluator after each step (&quot;was this the right tool?&quot;), better tool descriptions.</p>
      </section>
    </div>
  ),
};

const reactPlanning: StudyPageContent = {
  intro: <p>The named patterns interviewers expect you to know — and which actually move metrics.</p>,
  body: (
    <div className="prose-study space-y-6">
      <h2>ReAct (Reason + Act)</h2>
      <p>Interleave Thought / Action / Observation steps. Forces the model to verbalize reasoning before each action — improves accuracy on complex tasks. Most agent frameworks default to a ReAct-shaped loop.</p>
      <pre><code>{`Thought: I need to find the user's recent transactions
Action: get_transactions(user_id="...", days=30)
Observation: [{...}, {...}]
Thought: Now I'll compute the average...
Action: ...`}</code></pre>
      <h2>Plan-and-Execute</h2>
      <p>First call generates a multi-step plan. Subsequent calls execute steps. Replan when steps fail. Better than ReAct for tasks with many steps where local greedy choices lose context.</p>
      <h2>Reflexion / Self-refine</h2>
      <p>After an attempt, the agent critiques its own trajectory and tries again. Big gains on coding tasks. Cost: 2–4x more tokens.</p>
      <h2>Tree of Thoughts (ToT)</h2>
      <p>Explore multiple reasoning branches; backtrack from dead ends. Worth it for puzzle-like tasks; usually overkill in production.</p>
    </div>
  ),
};

const memory: StudyPageContent = {
  intro: <p>Memory is what turns a chatbot into an agent. Three flavors, three purposes.</p>,
  body: (
    <div className="prose-study space-y-6">
      <h2>The three memories</h2>
      <ul>
        <li><strong>Working memory</strong> — the prompt itself: tools, system prompt, recent messages, scratch pad</li>
        <li><strong>Short-term (session) memory</strong> — summarized history of the current task. Often a rolling summary or sliding window.</li>
        <li><strong>Long-term memory</strong> — persistent across sessions. User facts, past preferences, learned patterns. Stored in a vector DB or structured DB; retrieved as needed.</li>
      </ul>
      <h2>Patterns</h2>
      <ul>
        <li><strong>Conversation buffer</strong> — keep last N turns. Simple, breaks at long sessions.</li>
        <li><strong>Conversation summary</strong> — periodically summarize old turns. Lossy but bounded.</li>
        <li><strong>Episodic memory</strong> — extract structured facts after each session, store in DB. Retrieve relevant ones for new sessions.</li>
        <li><strong>Semantic memory</strong> — vector store of past insights, RAG over them at start of each session</li>
      </ul>
    </div>
  ),
};

const frameworks: StudyPageContent = {
  intro: <p>The framework matters less than people think — pick what your team can ship with.</p>,
  body: (
    <div className="prose-study space-y-6">
      <h2>The big four</h2>
      <ul>
        <li><strong>LangGraph</strong> — graph-based agent runtime from LangChain team. Best when you want explicit state machines and control over the loop. Production-friendly.</li>
        <li><strong>OpenAI Agents SDK</strong> — official, polished, great defaults. Recommended for OpenAI-stack teams.</li>
        <li><strong>AutoGen (Microsoft)</strong> — strong multi-agent patterns, good for research/experimentation</li>
        <li><strong>CrewAI</strong> — opinionated multi-agent role abstraction. Easy to start, harder to customize.</li>
      </ul>
      <h2>Build vs buy</h2>
      <p>For simple agents, raw API + a tool-call loop is often cleanest. Frameworks add value when you need: streaming UIs, durable execution, observability, multi-agent coordination, structured state. Senior answer: don&apos;t adopt LangGraph for a 100-line script.</p>
    </div>
  ),
};

const evalAgent: StudyPageContent = {
  intro: <p>Evaluating agents is harder than evaluating LLMs. The whole trajectory matters.</p>,
  body: (
    <div className="prose-study space-y-6">
      <h2>What to measure</h2>
      <ul>
        <li><strong>Outcome correctness</strong> — did the agent achieve the goal? Hardest to automate.</li>
        <li><strong>Trajectory quality</strong> — were the steps reasonable? Was the right tool called at the right time?</li>
        <li><strong>Efficiency</strong> — number of steps, total tokens, total cost, total latency</li>
        <li><strong>Failure modes</strong> — did it loop? Hallucinate? Use the wrong tool?</li>
      </ul>
      <h2>How to build the eval set</h2>
      <ul>
        <li>Curate 50–200 representative tasks with verifiable success criteria</li>
        <li>Run the agent on each, log full trajectories</li>
        <li>Score with a mix of programmatic checks (final state matches expected) + LLM-judge on trajectory quality</li>
        <li>Track per-tool success rate to spot weak tools</li>
      </ul>
    </div>
  ),
};

const safety: StudyPageContent = {
  intro: <p>Safety becomes load-bearing the moment your agent can take real actions.</p>,
  body: (
    <div className="prose-study space-y-6">
      <h2>Threat model</h2>
      <ul>
        <li><strong>Prompt injection</strong> — content the agent reads contains instructions that hijack it. Today&apos;s biggest unsolved problem in agent security.</li>
        <li><strong>Tool misuse</strong> — agent calls dangerous tools with bad arguments</li>
        <li><strong>Cost / runaway loops</strong> — infinite tool calling, runaway token spend</li>
        <li><strong>Data exfiltration</strong> — agent leaks confidential context to external tools or URLs</li>
        <li><strong>Permission scope creep</strong> — agent has more credentials than the task needs</li>
      </ul>
      <h2>Defenses</h2>
      <ul>
        <li>Treat tool inputs from untrusted sources as untrusted; never blindly execute instructions inside retrieved content</li>
        <li>Step / cost / latency limits on every loop</li>
        <li>Whitelisted tools with narrow permissions per agent role</li>
        <li>Human-in-the-loop confirmations for irreversible actions</li>
        <li>Output filters / classifiers before final response</li>
        <li>Logging and auditing of every tool call</li>
      </ul>
    </div>
  ),
};

const topQuestions: StudyPageContent = {
  intro: <p>The agentic AI questions starting to appear in DS interviews at AI-forward companies.</p>,
  qa: [
    { q: "When would you use an agent vs a fixed pipeline?", a: <p>Fixed pipeline when the steps are well-known and ordering is fixed (cheap, deterministic, reliable). Agent when the path depends on intermediate observations, when the user&apos;s intent isn&apos;t known up front, or when tool selection is itself the hard part. Senior tip: most production &quot;agents&quot; are 80% pipeline and 20% agent loop.</p> },
    { q: "Walk me through the ReAct loop.", a: <p>The model interleaves Thought / Action / Observation steps. It reasons about what to do, picks a tool, gets back a result, reasons again. Each iteration the prompt grows with the trajectory until the model emits a final answer or hits a step limit. The verbalized reasoning step measurably improves tool selection accuracy.</p> },
    { q: "How would you evaluate an agent that books restaurant reservations?", a: <p>Build a labeled set of (request, expected outcome) pairs. Programmatic checks: was a reservation made? At the right restaurant, time, party size? Trajectory checks (LLM-judge): did it use search and reservation tools sensibly? Did it confirm with the user before booking? Track failure rate by category (no available slot, wrong date inference, multiple bookings, etc.) and iterate on the most common.</p> },
    { q: "Multi-agent — when is it worth the complexity?", a: <p>When agents have genuinely different roles with non-overlapping context (e.g. researcher + writer + critic), where keeping them separate prevents context contamination. Avoid when a single agent with the right tools could do it — coordination overhead and latency add up fast.</p> },
    { q: "Prompt injection — how do you defend against it?", a: <p>Treat any content the agent reads as untrusted input, not instructions. Use structured output (the model returns parsed JSON, not free text). Constrain tools to least-privilege. Run output through a classifier before acting. For high-risk actions, require human confirmation. There&apos;s no silver bullet — defense in depth is the answer.</p> },
    { q: "[Placeholder] How does memory work in long-running agents?", a: <p>Answer being drafted.</p> },
    { q: "[Placeholder] LangGraph vs OpenAI Agents SDK — which would you pick?", a: <p>Answer being drafted.</p> },
    { q: "[Placeholder] How do you reduce token cost in agent loops?", a: <p>Answer being drafted.</p> },
  ],
};

export const agenticAiContent: Record<string, StudyPageContent> = {
  concepts,
  "tool-use": toolUse,
  "react-planning": reactPlanning,
  memory,
  frameworks,
  evaluation: evalAgent,
  safety,
  "top-questions": topQuestions,
};
