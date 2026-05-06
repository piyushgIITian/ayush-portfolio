import { Reveal, StaggerChildren, StaggerItem } from "./ui/Reveal";
import SectionHeader from "./ui/SectionHeader";
import {
  Award as AwardIcon, Drum, Hand, Medal, Trophy, Waves
} from "lucide-react";
import { awards } from "../data/resume.js";

const ICONS = [Trophy, Drum, Waves, Medal, AwardIcon, Hand];

export default function Awards() {
  return (
    <section id="awards" className="relative px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index={6}
          eyebrow="Honors & Distinctions"
          title="Citations earned —"
          italic="ashore & afloat"
          sub="From classroom science olympiads to the prestigious T.S. Chanakya Band, a varied collection of recognitions."
        />

        <StaggerChildren className="grid grid-cols-12 gap-4">
          {awards.map((a, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <StaggerItem key={i} className="col-span-12 sm:col-span-6 lg:col-span-4">
                <div className="glass corner-frame group relative h-full overflow-hidden p-6 transition-all duration-500 hover:-translate-y-1 hover:border-brass/30">
                  {/* watermark seal */}
                  <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full border border-brass/15" />
                  <div className="pointer-events-none absolute -right-3 -top-3 h-20 w-20 rounded-full border border-brass/10" />

                  <div className="relative">
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-brass/40 bg-brass/[0.06] text-brass-bright transition-all duration-500 group-hover:rotate-12">
                      <Icon className="h-4 w-4" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-display text-xl font-light leading-snug text-ink mb-2">
                      {a.title}
                    </h3>
                    <p className="font-editorial italic text-sm text-brass-bright mb-3">
                      {a.awarder} {a.date && <span className="text-ink-dim not-italic font-mono text-[10px]">· {a.date}</span>}
                    </p>
                    <p className="text-sm leading-relaxed text-ink-soft">{a.summary}</p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
