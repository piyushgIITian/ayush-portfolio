import { Reveal } from "./Reveal";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

export default function SectionHeader({ index, eyebrow, title, italic, sub }) {
  return (
    <header className="mb-10 grid grid-cols-12 items-end gap-6 md:mb-14">
      <div className="col-span-12 md:col-span-7">
        <Reveal>
          <div className="flex items-center gap-3 text-brass sm:gap-4">
            <span className="font-mono text-[10px] tracking-[0.36em] sm:text-[11px]">
              {ROMAN[index - 1]}.
            </span>
            <span className="h-px flex-1 max-w-[60px] bg-brass/45 sm:max-w-[80px]" />
            <span className="label">{eyebrow}</span>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-4 font-display text-4xl font-light leading-[0.95] tracking-tight text-ink sm:mt-5 sm:text-5xl md:text-7xl">
            {title}
            {italic && (
              <>
                {" "}
                <span className="font-editorial italic text-brass-bright">
                  {italic}
                </span>
              </>
            )}
          </h2>
        </Reveal>
      </div>
      {sub && (
        <Reveal delay={0.18} className="col-span-12 md:col-span-4 md:col-start-9">
          <p className="font-editorial italic text-base leading-snug text-ink-soft sm:text-lg">
            {sub}
          </p>
        </Reveal>
      )}
    </header>
  );
}
