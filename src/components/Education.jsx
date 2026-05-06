import { Reveal } from "./ui/Reveal";
import SectionHeader from "./ui/SectionHeader";
import { GraduationCap, MapPin } from "lucide-react";
import { education } from "../data/resume.js";

export default function Education() {
  return (
    <section id="education" className="relative px-6 py-20 md:px-12 md:py-32">
      {/* dot grid backdrop */}
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-midnight-deep via-transparent to-midnight-deep" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          index={3}
          eyebrow="Ports of Call"
          title="Academic"
          italic="formation"
          sub="Four institutions, two disciplines — the sea and the spreadsheet — bound by a single appetite for first-principles thinking."
        />

        <div className="grid grid-cols-12 gap-5">
          {education.map((edu, i) => (
            <Reveal key={i} delay={i * 0.08} className={cardSpan(i)}>
              <article className="glass corner-frame group relative h-full p-5 transition-all duration-500 hover:bg-brass/[0.04] sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.32em] text-brass">
                      {edu.startDate ? `${edu.startDate} — ${edu.endDate}` : edu.endDate}
                    </div>
                    <h3 className="font-display text-xl leading-tight font-light text-ink sm:text-2xl md:text-3xl">
                      {edu.studyType}
                    </h3>
                    <p className="mt-2 font-editorial italic text-base text-brass-bright sm:text-lg">
                      {edu.institution}
                    </p>
                    <p className="mt-1 text-sm text-ink-soft">{edu.area}</p>
                  </div>
                  <GraduationCap
                    className="h-6 w-6 shrink-0 text-ink/15 transition-colors group-hover:text-brass sm:h-7 sm:w-7"
                    strokeWidth={1.2}
                  />
                </div>

                <div className="rule my-5 opacity-50" />

                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2 text-ink-soft">
                    <MapPin className="h-3 w-3 shrink-0 text-brass" strokeWidth={1.5} />
                    <span className="truncate font-mono text-[10px] tracking-wide sm:text-[11px]">
                      {edu.location}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-ink-dim">
                      Result
                    </div>
                    <div className="font-display text-base font-light text-ink leading-tight sm:text-lg">
                      {shortenGpa(edu.gpa)}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function cardSpan(i) {
  // First two cards span larger, rest smaller — editorial mosaic
  if (i === 0) return "col-span-12 md:col-span-7";
  if (i === 1) return "col-span-12 md:col-span-5";
  return "col-span-12 md:col-span-6";
}

function shortenGpa(g) {
  if (!g) return "—";
  if (g.length > 28) return g.split("(")[0].trim();
  return g;
}
