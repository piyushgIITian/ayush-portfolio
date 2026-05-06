import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import anime from "animejs";
import { Reveal } from "./ui/Reveal";
import { ArrowUpRight, Mail, MapPin, Phone, Send } from "lucide-react";
import { basics } from "../data/resume.js";

export default function Contact() {
  const headlineRef = useRef(null);

  useEffect(() => {
    if (!headlineRef.current) return;
    const text = headlineRef.current.textContent;
    headlineRef.current.innerHTML = text
      .split(/(\s+)/)
      .map((w) =>
        w.match(/\s+/)
          ? w
          : `<span class="inline-block overflow-hidden align-bottom"><span class="inline-block translate-y-full opacity-0">${w}</span></span>`
      )
      .join("");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            anime({
              targets: headlineRef.current.querySelectorAll("span > span"),
              translateY: ["100%", "0%"],
              opacity: [0, 1],
              duration: 1100,
              delay: anime.stagger(60),
              easing: "cubicBezier(0.22,1,0.36,1)",
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(headlineRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="relative px-6 py-32 md:px-12">
      {/* horizon glow */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-0 h-[1px] -translate-y-1/2 bg-gradient-to-r from-transparent via-brass/40 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass/[0.03] blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-10 flex items-center justify-center gap-4">
            <span className="h-px w-16 bg-brass/50" />
            <span className="label">VII. Hail the Vessel</span>
            <span className="h-px w-16 bg-brass/50" />
          </div>
        </Reveal>

        <h2
          ref={headlineRef}
          className="text-balance text-center font-display text-5xl md:text-7xl lg:text-8xl font-light leading-[0.95] tracking-tight text-ink"
        >
          Open to charters,
          collaborations &
          <span className="font-editorial italic text-brass-bright"> good company.</span>
        </h2>

        <Reveal delay={0.4}>
          <p className="mx-auto mt-8 max-w-xl text-center font-editorial italic text-lg leading-relaxed text-ink-soft">
            For roles in sales leadership, banking, insurance, or maritime
            advisory — the wheelhouse is open.
          </p>
        </Reveal>

        <Reveal delay={0.6}>
          <div className="mt-14 flex flex-col items-center gap-6">
            <a
              href={`mailto:${basics.email}`}
              data-cursor="hover"
              className="group relative inline-flex items-center gap-4 rounded-full border border-brass/40 bg-brass/[0.06] px-8 py-4 transition-all duration-500 hover:border-brass hover:bg-brass/15"
            >
              <Send className="h-4 w-4 text-brass-bright" strokeWidth={1.5} />
              <span className="font-mono text-sm tracking-wider text-ink">
                {basics.email}
              </span>
              <ArrowUpRight className="h-4 w-4 text-brass-bright transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
              <span className="pointer-events-none absolute inset-0 rounded-full border border-brass/0 transition-all duration-500 group-hover:scale-110 group-hover:border-brass/20" />
            </a>

            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-ink-soft">
              <a href={`tel:${basics.phone}`} className="editorial-link inline-flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-brass" strokeWidth={1.5} />
                <span className="font-mono text-sm">{basics.phone}</span>
              </a>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-brass" strokeWidth={1.5} />
                <span className="font-mono text-sm">Kandivali W, Mumbai</span>
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
