import { Reveal } from "./ui/Reveal";
import SectionHeader from "./ui/SectionHeader";
import { Anchor, Briefcase, Compass, Sparkles } from "lucide-react";

const STATS = [
  { k: "9.37", l: "Master's CGPA — VIT", icon: Sparkles },
  { k: "06+", l: "Years across Maritime → Finance", icon: Compass },
  { k: "04", l: "Roles in Banking & Insurance", icon: Briefcase },
  { k: "01", l: "Course set — North by North-East", icon: Anchor },
];

export default function Provenance() {
  return (
    <section id="provenance" className="relative px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index={1}
          eyebrow="Provenance"
          title="A navigator who"
          italic="learned to read markets"
          sub="The chart in the wheelhouse and the dashboard in the boardroom share the same purpose — finding the safest, most profitable course through uncertain waters."
        />

        <div className="grid grid-cols-12 gap-8">
          {/* Left: large editorial paragraph */}
          <div className="col-span-12 lg:col-span-7 space-y-6">
            <Reveal>
              <p className="font-display text-2xl md:text-[28px] leading-[1.45] text-ink/95 font-light first-letter:font-editorial first-letter:italic first-letter:text-7xl first-letter:text-brass first-letter:float-left first-letter:mr-3 first-letter:leading-[0.85] first-letter:mt-2">
                Trained at <em className="font-editorial italic text-brass-bright">T.S. Chanakya</em>,
                one of India's most prestigious maritime academies, Ayush completed
                a B.Sc. in Nautical Science before pivoting into a Master's in
                Operations and Supply Chain Management.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-base md:text-lg leading-relaxed text-ink-soft max-w-2xl">
                Today he leads regional sales at <span className="text-ink">Axis Max Life Insurance</span> —
                building teams, hitting targets, and translating the discipline of the
                bridge into the rhythm of high-stakes financial services.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="rule my-8" />
            </Reveal>

            <Reveal delay={0.25}>
              <blockquote className="border-l border-brass/40 pl-6">
                <p className="font-editorial italic text-xl md:text-2xl leading-relaxed text-ink">
                  "Adaptability in strange environments — that's the
                  one lesson the sea teaches first, and the office never stops asking for."
                </p>
              </blockquote>
            </Reveal>
          </div>

          {/* Right: stats card stack */}
          <div className="col-span-12 lg:col-span-5 space-y-3 lg:pl-6">
            {STATS.map((s, i) => (
              <Reveal key={s.l} delay={0.05 + i * 0.07}>
                <div className="glass corner-frame group relative flex items-center justify-between gap-6 p-6 transition-all duration-500 hover:bg-brass/[0.04]">
                  <div>
                    <div className="font-display text-5xl md:text-6xl font-light text-brass-bright tracking-tight tabular-nums">
                      {s.k}
                    </div>
                    <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.25em] text-ink-soft">
                      {s.l}
                    </div>
                  </div>
                  <s.icon
                    className="h-7 w-7 text-ink/30 transition-colors group-hover:text-brass"
                    strokeWidth={1.2}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
