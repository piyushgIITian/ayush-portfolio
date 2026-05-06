import { motion } from "framer-motion";
import { Reveal, StaggerChildren, StaggerItem } from "./ui/Reveal";
import SectionHeader from "./ui/SectionHeader";
import {
  Anchor, Award, Briefcase, Compass, Flame, HeartPulse,
  ShieldCheck, Ship, Users
} from "lucide-react";
import { skills } from "../data/resume.js";

/* Map skill keywords to icons */
const ICON_MAP = {
  "Fire Prevention and Fire Fighting": Flame,
  "Elementary First Aid": HeartPulse,
  "Personal Survival Technique": Anchor,
  "Personal Safety and Social Responsibility": ShieldCheck,
  "Security Training for Seafarers with Designated Duties": ShieldCheck,
  "Basic Training for Liquefied Gas Tanker Cargo Operations": Ship,
  "Basic Training for Oil and Chemical Tanker Cargo Operations": Ship,
  "B2B & B2C Sales": Briefcase,
  "Relationship Management": Users,
  "Supply Chain Management": Compass,
  "Leadership & Self-Motivation": Award,
  "Adaptability in Strange Environments": Compass,
};

/* Flatten all keywords with optional category */
function flatten(skills) {
  const out = [];
  let currentCategory = null;
  let currentLevel = null;
  skills.forEach((group) => {
    if (group.name) {
      currentCategory = group.name;
      currentLevel = group.level;
    }
    (group.keywords || []).forEach((k) => {
      if (k && k.trim()) out.push({ keyword: k.trim(), category: currentCategory, level: currentLevel });
    });
  });
  return out;
}

export default function Skills() {
  const flat = flatten(skills);
  const categories = [...new Set(flat.map((s) => s.category))];

  return (
    <section id="skills" className="relative px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index={4}
          eyebrow="Instruments"
          title="Certifications &"
          italic="competencies"
          sub="STCW maritime certifications carried over into a financial-services skill stack — a rare bilingual fluency."
        />

        {/* Marquee of skill keywords */}
        <Reveal>
          <div className="relative mb-20 overflow-hidden border-y hairline py-5">
            <div className="marquee-track">
              {[...Array(2)].map((_, dup) => (
                <div key={dup} className="flex shrink-0 items-center gap-8 px-4">
                  {flat.map((s, i) => (
                    <span
                      key={i + "_" + dup}
                      className="font-display text-3xl md:text-4xl font-light text-ink/70 whitespace-nowrap"
                    >
                      {s.keyword}
                      <span className="mx-8 text-brass-bright">✦</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
            {/* edge fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-midnight-deep to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-midnight-deep to-transparent" />
          </div>
        </Reveal>

        {/* Categorized grid */}
        <div className="grid grid-cols-12 gap-6">
          {categories.map((cat, ci) => {
            const items = flat.filter((s) => s.category === cat);
            const level = items[0]?.level;
            return (
              <Reveal key={cat || ci} delay={ci * 0.1} className="col-span-12 md:col-span-4">
                <div className="glass corner-frame group h-full p-7">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="label">Certificate № {String(ci + 1).padStart(2, "0")}</span>
                    {level && (
                      <span className="rounded-full border border-brass/40 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.25em] text-brass">
                        {level}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-2xl font-light leading-tight text-ink mb-5">
                    {cat}
                  </h3>
                  <StaggerChildren className="space-y-3">
                    {items.map((s, i) => {
                      const Icon = ICON_MAP[s.keyword] || Compass;
                      return (
                        <StaggerItem key={i}>
                          <div
                            data-cursor="hover"
                            className="group/item flex items-start gap-3 rounded-sm border border-transparent px-2 py-1.5 transition-colors hover:border-brass/15 hover:bg-brass/[0.03]"
                          >
                            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-brass" strokeWidth={1.4} />
                            <span className="text-sm leading-relaxed text-ink-soft transition-colors group-hover/item:text-ink">
                              {s.keyword}
                            </span>
                          </div>
                        </StaggerItem>
                      );
                    })}
                  </StaggerChildren>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
