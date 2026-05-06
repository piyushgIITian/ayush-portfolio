import { motion } from "framer-motion";
import { Reveal } from "./ui/Reveal";
import SectionHeader from "./ui/SectionHeader";
import { Sparkles, Star, Zap } from "lucide-react";
import { projects } from "../data/resume.js";

export default function Projects() {
  return (
    <section id="projects" className="relative px-6 py-20 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index={5}
          eyebrow="Makers' Bench"
          title="Hands-on"
          italic="works"
          sub="Built with hand and intent — long before it was fashionable to ship side-projects."
        />

        <div className="grid grid-cols-12 gap-8">
          {projects.map((p, i) => (
            <Reveal key={i} delay={i * 0.1} className="col-span-12 lg:col-span-8 lg:col-start-3">
              <article className="glass corner-frame group relative overflow-hidden p-7 sm:p-10 md:p-14">
                {/* Animated star backdrop */}
                <ConstellationBackdrop />

                <div className="relative z-10">
                  <div className="mb-6 flex items-center gap-3">
                    <Star className="h-4 w-4 text-brass-bright" strokeWidth={1.5} fill="currentColor" />
                    <span className="label">Project № {String(i + 1).padStart(2, "0")}</span>
                  </div>

                  <h3 className="mb-6 font-display text-3xl font-light leading-[0.95] tracking-tight text-ink sm:text-4xl md:text-6xl">
                    {p.name.split(" ").map((w, wi) => (
                      <span key={wi}>
                        {wi === 1 ? (
                          <span className="font-editorial italic text-brass-bright">{w}</span>
                        ) : (
                          w
                        )}{" "}
                      </span>
                    ))}
                  </h3>

                  <div className="rule mb-6 max-w-[120px]" />

                  <p className="max-w-2xl font-editorial italic text-base leading-relaxed text-ink-soft sm:text-xl md:text-2xl">
                    {p.description}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    {["Solar Charger", "Star Constellation", "Engineering Model"].map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-brass/30 bg-brass/[0.04] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-brass-bright"
                      >
                        {t}
                      </span>
                    ))}
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

function ConstellationBackdrop() {
  // Decorative animated stars within the project card
  const stars = [
    { x: 8, y: 12, s: 1, d: 0 },
    { x: 88, y: 18, s: 1.5, d: 0.4 },
    { x: 22, y: 78, s: 1, d: 0.8 },
    { x: 70, y: 65, s: 2, d: 1.1 },
    { x: 92, y: 82, s: 1, d: 0.3 },
    { x: 45, y: 22, s: 1.2, d: 0.7 },
    { x: 60, y: 88, s: 0.8, d: 0.5 },
    { x: 12, y: 45, s: 1.4, d: 0.2 },
  ];
  return (
    <>
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-30" />
      {stars.map((s, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0.2, scale: 0.6 }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.6, 1.2, 0.6] }}
          transition={{ duration: 3 + s.d, repeat: Infinity, delay: s.d, ease: "easeInOut" }}
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.s * 4}px`,
            height: `${s.s * 4}px`,
          }}
          className="pointer-events-none absolute rounded-full bg-brass-bright shadow-[0_0_12px_rgba(227,184,99,0.7)]"
        />
      ))}
      {/* faint constellation lines */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <line x1="8" y1="12" x2="22" y2="78" stroke="#c89b3c" strokeWidth="0.1" strokeDasharray="0.5,0.5" />
        <line x1="22" y1="78" x2="60" y2="88" stroke="#c89b3c" strokeWidth="0.1" strokeDasharray="0.5,0.5" />
        <line x1="45" y1="22" x2="70" y2="65" stroke="#c89b3c" strokeWidth="0.1" strokeDasharray="0.5,0.5" />
        <line x1="88" y1="18" x2="92" y2="82" stroke="#c89b3c" strokeWidth="0.1" strokeDasharray="0.5,0.5" />
      </svg>
    </>
  );
}
