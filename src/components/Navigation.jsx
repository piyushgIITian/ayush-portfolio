import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { Anchor, Menu, X } from "lucide-react";

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
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 80);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          scrolled ? "py-2 sm:py-3" : "py-3 sm:py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-6 md:px-12">
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
              <span className="ml-1 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-ink-soft">
                Logbook
              </span>
            </span>
          </a>

          {/* Desktop link pill */}
          <div className="hidden items-center gap-1 rounded-full border border-ink/10 bg-midnight-deep/60 px-2 py-1 backdrop-blur-md lg:flex">
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

          {/* Desktop "Hail" CTA */}
          <a
            href="mailto:ayushkapil7542@gmail.com"
            data-cursor="hover"
            className="hidden lg:inline-flex items-center gap-2 rounded-full border border-brass/40 bg-brass/[0.06] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-brass-bright transition-colors hover:bg-brass/15"
          >
            Hail
            <span className="h-1 w-1 rounded-full bg-brass-bright animate-pulse" />
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(true)}
            data-cursor="hover"
            aria-label="Open menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-brass/40 bg-midnight-deep/60 text-brass-bright backdrop-blur-md transition-colors hover:bg-brass/15 lg:hidden"
          >
            <Menu className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-midnight-deep/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex items-center justify-between px-5 py-3 sm:px-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-brass">
                Logbook · Index
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-brass/40 text-brass-bright"
              >
                <X className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
            <div className="rule mx-5 sm:mx-6" />
            <motion.nav
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05 } } }}
              className="flex flex-col gap-1 px-5 py-8 sm:px-6"
            >
              {LINKS.map((l) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    show: { opacity: 1, x: 0 },
                  }}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline justify-between border-b border-ink/5 py-4 transition-colors hover:border-brass/30"
                >
                  <span className="font-display text-3xl sm:text-4xl font-light text-ink transition-colors group-hover:text-brass-bright">
                    {l.label}
                  </span>
                  <span className="font-editorial italic text-brass">→</span>
                </motion.a>
              ))}
              <motion.a
                href="mailto:ayushkapil7542@gmail.com"
                variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}
                onClick={() => setOpen(false)}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-brass/40 bg-brass/[0.06] px-4 py-3 font-mono text-[11px] uppercase tracking-[0.3em] text-brass-bright"
              >
                Hail the vessel
                <span className="h-1 w-1 rounded-full bg-brass-bright animate-pulse" />
              </motion.a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
