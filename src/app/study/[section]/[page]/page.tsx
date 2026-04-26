import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { studySections } from "@/data/study";
import { studyContent } from "@/data/study-content";
import { CodeBlock } from "@/components/CodeBlock";
import { QAItem } from "@/components/QAItem";

export function generateStaticParams() {
  return studySections.flatMap((s) =>
    s.pages.map((p) => ({ section: s.slug, page: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string; page: string }>;
}) {
  const { section, page } = await params;
  const sec = studySections.find((s) => s.slug === section);
  const pg = sec?.pages.find((p) => p.slug === page);
  if (!sec || !pg) return {};
  return {
    title: `${pg.title} — ${sec.title} — Harsh Jain`,
  };
}

export default async function PageDetail({
  params,
}: {
  params: Promise<{ section: string; page: string }>;
}) {
  const { section, page } = await params;
  const sec = studySections.find((s) => s.slug === section);
  const pg = sec?.pages.find((p) => p.slug === page);
  if (!sec || !pg) notFound();

  const content = studyContent[section]?.[page];
  const pageIndex = sec.pages.findIndex((p) => p.slug === page);
  const prevPage = pageIndex > 0 ? sec.pages[pageIndex - 1] : null;
  const nextPage = pageIndex < sec.pages.length - 1 ? sec.pages[pageIndex + 1] : null;

  return (
    <article className="max-w-3xl">
      <Reveal>
        <Link
          href={`/study/${sec.slug}`}
          className="text-xs uppercase tracking-[0.25em] text-ink-mute hover:text-terracotta transition-colors"
        >
          ← {sec.title}
        </Link>
        <h1 className="mt-4 font-display text-4xl md:text-5xl tracking-tight font-medium leading-tight">
          {pg.title}
        </h1>
        {content?.intro && (
          <div className="mt-6 text-ink-soft text-lg leading-relaxed">{content.intro}</div>
        )}
      </Reveal>

      {content?.body && (
        <Reveal delay={0.05}>
          <div className="mt-12">{content.body}</div>
        </Reveal>
      )}

      {content?.qa && (
        <div className="mt-12 space-y-4">
          {content.qa.map((item, i) => (
            <Reveal key={i} delay={i * 0.03}>
              <QAItem index={i + 1} q={item.q} a={item.a} code={item.code} />
            </Reveal>
          ))}
        </div>
      )}

      {!content && (
        <Reveal delay={0.05}>
          <div className="mt-12 bg-cream-soft border border-cream-deep rounded-xl p-8 text-center">
            <p className="text-ink-soft">Content for this page is being written.</p>
          </div>
        </Reveal>
      )}

      <nav className="mt-20 pt-8 border-t border-cream-deep grid grid-cols-2 gap-4">
        {prevPage ? (
          <Link
            href={`/study/${sec.slug}/${prevPage.slug}`}
            className="group flex items-center gap-3 text-sm hover:text-terracotta transition-colors"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <div>
              <p className="text-xs text-ink-mute uppercase tracking-widest">Previous</p>
              <p>{prevPage.title}</p>
            </div>
          </Link>
        ) : <span />}
        {nextPage ? (
          <Link
            href={`/study/${sec.slug}/${nextPage.slug}`}
            className="group flex items-center justify-end gap-3 text-sm hover:text-terracotta transition-colors text-right"
          >
            <div>
              <p className="text-xs text-ink-mute uppercase tracking-widest">Next</p>
              <p>{nextPage.title}</p>
            </div>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        ) : <span />}
      </nav>
    </article>
  );
}
