import { Reveal } from "./ui/Reveal";
import SectionHeader from "./ui/SectionHeader";
import { GraduationCap, MapPin } from "lucide-react";
import { education } from "../data/resume.js";

export default function Education() {
  return (
    <section id="education" className="relative px-6 py-32 md:px-12">
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
              <article className="glass corner-frame group relative h-full p-7 transition-all duration-500 hover:bg-brass/[0.04]">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-brass mb-3">
                      {edu.startDate ? `${edu.startDate} — ${edu.endDate}` : edu.endDate}
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl leading-tight font-light text-ink">
                      {edu.studyType}
                    </h3>
                    <p className="mt-2 font-editorial italic text-lg text-brass-bright">
                      {edu.institution}
                    </p>
                    <p className="mt-1 text-sm text-ink-soft">{edu.area}</p>
                  </div>
                  <GraduationCap
                    className="h-7 w-7 text-ink/15 transition-colors group-hover:text-brass"
                    strokeWidth={1.2}
                  />
                </div>

                <div className="rule my-5 opacity-50" />

                <div className="flex items-end justify-between gap-3">
                  <div className="flex items-center gap-2 text-ink-soft">
                    <MapPin className="h-3 w-3 text-brass" strokeWidth={1.5} />
                    <span className="font-mono text-[11px] tracking-wide">
                      {edu.location}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-ink-dim">
                      Result
                    </div>
                    <div className="font-display text-lg font-light text-ink leading-tight">
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
