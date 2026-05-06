import { Reveal } from "./Reveal";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

export default function SectionHeader({ index, eyebrow, title, italic, sub }) {
  return (
    <header className="mb-14 grid grid-cols-12 items-end gap-6">
      <div className="col-span-12 md:col-span-7">
        <Reveal>
          <div className="flex items-center gap-4 text-brass">
            <span className="font-mono text-[11px] tracking-[0.36em]">
              {ROMAN[index - 1]}.
            </span>
            <span className="h-px flex-1 max-w-[80px] bg-brass/45" />
            <span className="label">{eyebrow}</span>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-5 font-display text-5xl md:text-7xl font-light leading-[0.95] tracking-tight text-ink">
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
          <p className="font-editorial italic text-lg leading-snug text-ink-soft">
            {sub}
          </p>
        </Reveal>
      )}
    </header>
  );
}
