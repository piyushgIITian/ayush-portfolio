import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal, StaggerChildren, StaggerItem } from "./ui/Reveal";
import SectionHeader from "./ui/SectionHeader";
import { ArrowUpRight, Building2 } from "lucide-react";
import { work } from "../data/resume.js";

export default function Timeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 30%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index={2}
          eyebrow="Chartered Course"
          title="Professional"
          italic="logbook"
          sub="Each entry — a port called, a portfolio managed, a target met. In chronological reverse, as captains keep their books."
        />

        <div ref={containerRef} className="relative">
          {/* center spine */}
          <div className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-px -translate-x-px md:-translate-x-1/2">
            <div className="h-full w-px bg-ink/10" />
            <motion.div
              style={{ height: lineHeight }}
              className="absolute top-0 w-px bg-gradient-to-b from-brass-bright via-brass to-brass/0"
            />
          </div>

          <div className="space-y-16 md:space-y-24">
            {work.map((entry, i) => (
              <Entry key={entry.company + i} entry={entry} index={i} side={i % 2 === 0 ? "left" : "right"} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Entry({ entry, index, side }) {
  const isLeft = side === "left";
  return (
    <div className="relative grid grid-cols-12 items-start gap-6">
      {/* node */}
      <div className="absolute left-[18px] md:left-1/2 top-2 -translate-x-1/2 z-10">
        <Reveal delay={0.1}>
          <div className="relative">
            <div className="h-3 w-3 rounded-full bg-brass-bright shadow-[0_0_22px_rgba(227,184,99,0.7)]" />
            <div className="absolute inset-0 h-3 w-3 rounded-full bg-brass-bright animate-ping opacity-40" />
          </div>
        </Reveal>
      </div>

      {/* date column (mobile: full width) */}
      <div
        className={`col-span-12 pl-12 md:pl-0 ${
          isLeft ? "md:col-span-5 md:text-right md:pr-12" : "md:col-span-5 md:col-start-8 md:pl-12"
        }`}
      >
        <Reveal>
          <div className="flex flex-col gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.36em] text-brass">
              Entry № {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-display text-2xl md:text-3xl text-ink font-light">
              {entry.startDate}
              <span className="text-ink-dim font-editorial italic"> → </span>
              <span className="text-brass-bright">{entry.endDate}</span>
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-dim">
              {entry.location}
            </span>
          </div>
        </Reveal>
      </div>

      {/* content card */}
      <div
        className={`col-span-12 pl-12 md:pl-0 ${
          isLeft ? "md:col-span-5 md:col-start-8 md:pl-12" : "md:col-span-5 md:text-right md:pr-12"
        }`}
      >
        <Reveal delay={0.1}>
          <div className="glass corner-frame group relative p-7 md:p-8 transition-all duration-500 hover:-translate-y-1 hover:border-brass/30">
            {/* watermark icon */}
            <Building2
              className="pointer-events-none absolute right-5 top-5 h-12 w-12 text-ink/[0.05]"
              strokeWidth={1}
            />
            <div className={`flex items-start ${isLeft ? "md:justify-end" : ""}`}>
              <h3 className="font-display text-2xl md:text-[26px] leading-tight font-light tracking-tight text-ink">
                {entry.position}
              </h3>
            </div>
            <div className={`mt-1.5 flex items-center gap-2 ${isLeft ? "md:justify-end" : ""}`}>
              <span className="font-editorial italic text-lg text-brass-bright">
                {entry.company}
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 text-brass/60" strokeWidth={1.5} />
            </div>

            <div className={`mt-4 ${isLeft ? "md:flex md:justify-end" : ""}`}>
              <div className={`h-px w-12 bg-brass/40 ${isLeft ? "md:ml-auto" : ""}`} />
            </div>

            <StaggerChildren className={`mt-5 space-y-2.5 ${isLeft ? "md:text-right" : ""}`}>
              {entry.highlights.map((h, hi) => (
                <StaggerItem key={hi}>
                  <p className="text-[15px] leading-relaxed text-ink-soft">
                    <span className="text-brass mr-2 font-mono text-xs">→</span>
                    {h}
                  </p>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
