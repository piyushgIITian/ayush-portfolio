import { Compass } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t hairline px-6 py-8 md:px-12 md:py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center md:flex-row md:gap-6 md:text-left">
        <div className="flex items-center gap-3 text-ink-soft">
          <Compass className="h-3.5 w-3.5 text-brass animate-spin-slow" strokeWidth={1.4} />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
            Logbook closed — Anno {new Date().getFullYear()}
          </span>
        </div>
        <p className="font-editorial italic text-sm text-ink-dim">
          "Fair winds and following seas."
        </p>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-dim">
          Ayush Kapil · MMXXVI
        </span>
      </div>
    </footer>
  );
}
