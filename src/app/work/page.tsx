import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { projects, experiences } from "@/data/profile";

export const metadata = {
  title: "Work — Harsh Jain",
  description: "Selected projects and experience across data science, predictive AI, generative AI and agentic AI.",
};

export default function WorkPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-6xl px-6 md:px-10 pt-16 md:pt-24 pb-24">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-ink-mute mb-4">Work</p>
          <h1 className="font-display text-5xl md:text-7xl tracking-tight font-medium leading-[0.95] max-w-3xl">
            Projects, <span className="italic shimmer">case studies</span>, and the work behind them.
          </h1>
        </Reveal>

        <div className="mt-20 md:mt-28 space-y-20 md:space-y-32">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <article id={p.slug} className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16 scroll-mt-24">
                <div className="md:sticky md:top-28 md:self-start">
                  <p className="text-xs uppercase tracking-widest text-ink-mute mb-2">Project</p>
                  <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight leading-tight">{p.title}</h2>
                  <p className="mt-3 text-ink-soft text-sm leading-relaxed">{p.oneLiner}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span key={s} className="text-xs px-2.5 py-1 bg-cream-soft border border-cream-deep rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-8">
                  <Block label="Problem" body={p.problem} />
                  <Block label="Approach" body={p.approach} />
                  <Block label="Outcome" body={p.outcome} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <section className="mt-32 md:mt-40 border-t border-cream-deep pt-16">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-ink-mute mb-3">Experience</p>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight font-medium">Roles in detail</h2>
          </Reveal>
          <div className="mt-12 space-y-12">
            {experiences.map((e, i) => (
              <Reveal key={e.company} delay={i * 0.04}>
                <div className="grid md:grid-cols-[200px_1fr] gap-4 md:gap-12 border-b border-cream-deep pb-12">
                  <div className="text-sm text-ink-mute">
                    <p>{e.start} — {e.end}</p>
                    <p className="mt-1">{e.location}</p>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-medium">{e.company}</h3>
                    <p className="text-terracotta text-sm mb-3">{e.role}</p>
                    <p className="text-ink-soft mb-4">{e.blurb}</p>
                    <ul className="space-y-2">
                      {e.highlights.map((h, j) => (
                        <li key={j} className="text-ink-soft text-sm flex gap-3">
                          <span className="text-terracotta mt-1.5 flex-shrink-0">▸</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {e.stack.map((s) => (
                        <span key={s} className="text-xs px-2 py-0.5 bg-cream-soft border border-cream-deep rounded">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Block({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-terracotta mb-2">{label}</p>
      <p className="text-ink-soft leading-relaxed">{body}</p>
    </div>
  );
}
