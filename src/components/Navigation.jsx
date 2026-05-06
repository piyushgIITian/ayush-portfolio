import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { Anchor } from "lucide-react";

const LINKS = [
  { href: "#provenance", label: "I. Provenance" },
  { href: "#experience", label: "II. Course" },
  { href: "#education", label: "III. Ports" },
  { href: "#skills", label: "IV. Instruments" },
  { href: "#projects", label: "V. Bench" },
  { href: "#awards", label: "VI. Honors" },
  { href: "#contact", label: "VII. Hail" },
];

export default function Navigation() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 80);
  });

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12 transition-all duration-500 ${
          scrolled
            ? "rounded-none"
            : ""
        }`}
      >
        <a
          href="#"
          data-cursor="hover"
          className={`group flex items-center gap-2.5 transition-all duration-500 ${
            scrolled ? "scale-90" : ""
          }`}
        >
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-brass/40 bg-midnight-deep/70 backdrop-blur-md">
            <Anchor className="h-3.5 w-3.5 text-brass-bright" strokeWidth={1.5} />
            <span className="absolute inset-0 rounded-full border border-brass/0 transition-all duration-500 group-hover:border-brass/40 group-hover:scale-125" />
          </span>
          <span className="font-display text-sm tracking-wide text-ink">
            A. Kapil
            <span className="ml-1.5 font-editorial italic text-brass-bright">·</span>
            <span className="ml-1 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-soft">
              Logbook
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-1 rounded-full border border-ink/10 bg-midnight-deep/60 px-2 py-1 backdrop-blur-md md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-cursor="hover"
              className="rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft transition-all duration-300 hover:bg-brass/10 hover:text-brass-bright"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="mailto:ayushkapil7542@gmail.com"
          data-cursor="hover"
          className="hidden md:inline-flex items-center gap-2 rounded-full border border-brass/40 bg-brass/[0.06] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-brass-bright transition-colors hover:bg-brass/15"
        >
          Hail
          <span className="h-1 w-1 rounded-full bg-brass-bright animate-pulse" />
        </a>
      </div>
    </motion.nav>
  );
}
