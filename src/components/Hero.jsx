import { lazy, Suspense, useEffect, useRef } from "react";
import anime from "animejs";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Mail, MapPin, Phone } from "lucide-react";
import { basics } from "../data/resume.js";

const OceanScene = lazy(() => import("./scene/OceanScene.jsx"));

export default function Hero() {
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const { scrollY } = useScroll();
  const titleY = useTransform(scrollY, [0, 600], [0, 120]);
  const titleOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    if (titleRef.current) {
      // wrap each letter in span for letter animation
      const text = titleRef.current.textContent;
      titleRef.current.innerHTML = text
        .split("")
        .map((c) =>
          c === " "
            ? `<span class="inline-block w-[0.3em]"> </span>`
            : `<span class="inline-block opacity-0 translate-y-[120%] will-change-transform">${c}</span>`
        )
        .join("");

      anime
        .timeline({ easing: "cubicBezier(0.22,1,0.36,1)" })
        .add({
          targets: titleRef.current.querySelectorAll("span"),
          translateY: ["120%", "0%"],
          opacity: [0, 1],
          duration: 1100,
          delay: anime.stagger(35, { start: 350 }),
        });
    }

    if (subRef.current) {
      anime({
        targets: subRef.current.querySelectorAll("[data-anime-line]"),
        opacity: [0, 1],
        translateY: [16, 0],
        filter: ["blur(6px)", "blur(0px)"],
        duration: 900,
        delay: anime.stagger(120, { start: 1100 }),
        easing: "cubicBezier(0.22,1,0.36,1)",
      });
    }
  }, []);

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      {/* 3D layer */}
      <div className="absolute inset-0">
        <Suspense fallback={<div className="absolute inset-0 bg-midnight-deep" />}>
          <OceanScene />
        </Suspense>
        {/* vignette + horizon gradient */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,11,20,0.85)_85%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-midnight-deep via-midnight-deep/60 to-transparent" />
      </div>

      {/* Title block */}
      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="relative z-10 flex min-h-[100svh] flex-col justify-between gap-10 px-6 pt-24 pb-8 md:px-12 md:pt-32 md:pb-10"
      >
        {/* spacer to push title toward middle on tall screens */}
        <div className="hidden md:block flex-1" />

        <div className="max-w-7xl" ref={subRef}>
          <p data-anime-line className="label mb-5 flex items-center gap-3 text-[10px] sm:text-[11px]">
            <span className="h-px w-8 sm:w-10 bg-brass" />
            <span>Mariner ✦ Strategist ✦ Manager</span>
          </p>
          <h1
            ref={titleRef}
            className="font-display text-[16vw] sm:text-[14vw] md:text-[12vw] lg:text-[180px] leading-[0.85] font-light tracking-tight text-ink break-words"
            style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 30, 'WONK' 1" }}
          >
            AYUSH KAPIL
          </h1>
          <div className="mt-4 max-w-xl" data-anime-line>
            <p className="font-editorial text-xl sm:text-2xl md:text-3xl italic leading-snug text-brass-bright">
              From the bridge of a ship — to the boardroom.
            </p>
          </div>
        </div>

        {/* Bottom info block (flows inline, no absolute) */}
        <div className="space-y-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            {/* Caption */}
            <div className="max-w-md">
              <div className="rule mb-3" />
              <p className="font-editorial italic text-ink-soft text-sm sm:text-base md:text-lg">
                A nautical-science graduate turned business operator —
                <span className="text-brass"> charting growth </span>
                through banking, bancassurance, and B2B sales.
              </p>
            </div>

            {/* Contact chips */}
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 md:gap-3">
              <ContactChip icon={MapPin} text="Mumbai, India" />
              <ContactChip icon={Phone} text={basics.phone} href={`tel:${basics.phone}`} />
              <ContactChip icon={Mail} text={basics.email} href={`mailto:${basics.email}`} />
            </div>
          </div>

          {/* Coordinates + scroll cue */}
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <div className="hidden md:flex items-center gap-6">
              <CoordPair label="Lat" value="19°12′N" />
              <CoordPair label="Long" value="72°51′E" />
              <CoordPair label="Course" value="N–N·E" />
            </div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center gap-3 text-ink-soft/70"
            >
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase">
                Set Course
              </span>
              <ArrowDown className="h-3 w-3" strokeWidth={1.5} />
            </motion.div>
            <div className="hidden md:block w-[180px]" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function CoordPair({ label, value }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-dim">
        {label}
      </span>
      <span className="font-mono text-xs text-ink">{value}</span>
    </div>
  );
}

function ContactChip({ icon: Icon, text, href }) {
  const Tag = href ? "a" : "div";
  return (
    <Tag
      href={href}
      className="glass corner-frame group flex min-w-0 items-center gap-3 px-3 py-2.5 transition-colors hover:bg-brass/5 sm:px-4"
    >
      <Icon className="h-3.5 w-3.5 shrink-0 text-brass" strokeWidth={1.5} />
      <span className="truncate font-mono text-[10px] sm:text-[11px] tracking-wider text-ink/80 group-hover:text-ink">
        {text}
      </span>
    </Tag>
  );
}
