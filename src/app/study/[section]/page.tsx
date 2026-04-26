import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { studySections } from "@/data/study";

export function generateStaticParams() {
  return studySections.map((s) => ({ section: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const found = studySections.find((s) => s.slug === section);
  if (!found) return {};
  return {
    title: `${found.title} — Study — Harsh Jain`,
    description: found.blurb,
  };
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const found = studySections.find((s) => s.slug === section);
  if (!found) notFound();

  return (
    <div>
      <Reveal>
        <Link href="/study" className="text-xs uppercase tracking-[0.25em] text-ink-mute hover:text-terracotta transition-colors">
          ← Study
        </Link>
        <div className="mt-4 flex items-baseline gap-3 flex-wrap">
          <span className="text-4xl md:text-5xl">{found.emoji}</span>
          <h1 className="font-display text-4xl md:text-6xl tracking-tight font-medium leading-[0.95]">
            {found.title}
          </h1>
        </div>
        <p className="mt-6 text-ink-soft text-lg max-w-2xl leading-relaxed">{found.blurb}</p>
      </Reveal>

      <div className="mt-16 grid gap-3">
        {found.pages.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.04}>
            <Link
              href={`/study/${found.slug}/${p.slug}`}
              className="group flex items-center justify-between gap-4 bg-cream-soft border border-cream-deep rounded-xl px-6 py-5 hover:border-terracotta hover:bg-cream transition-colors"
            >
              <div className="flex items-center gap-4">
                <BookOpen size={18} className="text-ink-mute group-hover:text-terracotta transition-colors flex-shrink-0" />
                <div>
                  <p className="font-medium group-hover:text-terracotta transition-colors">{p.title}</p>
                </div>
              </div>
              <ArrowUpRight size={16} className="text-ink-mute group-hover:text-terracotta group-hover:rotate-45 transition-all flex-shrink-0" />
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
