import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { profile, education, skills } from "@/data/profile";

export const metadata = {
  title: "About — Harsh Jain",
  description: "About Harsh Jain — Data Scientist at H2O.ai.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-4xl px-6 md:px-10 pt-16 md:pt-24 pb-24">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-ink-mute mb-4">About</p>
          <h1 className="font-display text-5xl md:text-7xl tracking-tight font-medium leading-[0.95]">
            Hi, I'm <span className="italic">Harsh</span>.
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 space-y-6 text-lg text-ink-soft leading-relaxed max-w-2xl">
            <p>{profile.blurb}</p>
            <p>
              [Placeholder] I care about taking an idea from messy data to a system someone trusts —
              not just a notebook, but a real product. I work across predictive AI, generative AI
              and agentic AI; what unites the work is shipping things that actually get used.
            </p>
            <p>
              [Placeholder] Outside of work I'm into options trading, follow markets closely, and
              spend way too much time tinkering with new model APIs.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <section className="mt-20">
            <h2 className="font-display text-3xl font-medium mb-6">Education</h2>
            <div className="space-y-6">
              {education.map((ed) => (
                <div key={ed.school} className="border-b border-cream-deep pb-6">
                  <p className="font-display text-xl">{ed.school}</p>
                  <p className="text-ink-soft mt-1">{ed.degree} · {ed.field}</p>
                  {ed.start && (
                    <p className="text-sm text-ink-mute mt-1">{ed.start} — {ed.end} · {ed.location}</p>
                  )}
                  {!ed.start && <p className="text-sm text-ink-mute mt-1">{ed.location}</p>}
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.2}>
          <section className="mt-20">
            <h2 className="font-display text-3xl font-medium mb-6">Skills</h2>
            <div className="space-y-5">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className="grid md:grid-cols-[200px_1fr] gap-2 md:gap-6 py-3 border-b border-cream-deep">
                  <p className="text-sm uppercase tracking-widest text-terracotta">{category}</p>
                  <div className="flex flex-wrap gap-2">
                    {items.map((s) => (
                      <span key={s} className="text-sm">{s}</span>
                    )).reduce<React.ReactNode[]>((acc, el, i) => {
                      if (i > 0) acc.push(<span key={`sep-${i}`} className="text-ink-mute">·</span>);
                      acc.push(el);
                      return acc;
                    }, [])}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.25}>
          <section className="mt-20 bg-cream-soft border border-cream-deep rounded-2xl p-8">
            <h2 className="font-display text-2xl font-medium mb-4">Get in touch</h2>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <a href={`mailto:${profile.email}`} className="hover:text-terracotta transition-colors">
                <p className="text-xs uppercase tracking-widest text-ink-mute mb-1">Email</p>
                <p>{profile.email}</p>
              </a>
              <a href={profile.github} className="hover:text-terracotta transition-colors" target="_blank" rel="noopener noreferrer">
                <p className="text-xs uppercase tracking-widest text-ink-mute mb-1">GitHub</p>
                <p>jainharsh644</p>
              </a>
              <a href={profile.linkedin} className="hover:text-terracotta transition-colors" target="_blank" rel="noopener noreferrer">
                <p className="text-xs uppercase tracking-widest text-ink-mute mb-1">LinkedIn</p>
                <p>jainharsh644</p>
              </a>
            </div>
          </section>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
