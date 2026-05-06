import { useEffect, useRef, useState } from "react";

/**
 * Custom compass-needle cursor.
 * The needle rotates toward the cursor's direction of travel.
 */
export default function Cursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const needleRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    let rx = 0, ry = 0; // ring (lerped)
    let dx = 0, dy = 0; // dot (precise)
    let lastX = 0, lastY = 0;
    let angle = 0;
    let raf;

    const onMove = (e) => {
      dx = e.clientX;
      dy = e.clientY;
      const vx = dx - lastX;
      const vy = dy - lastY;
      if (Math.hypot(vx, vy) > 1.2) {
        angle = (Math.atan2(vy, vx) * 180) / Math.PI + 90;
      }
      lastX = dx;
      lastY = dy;

      const t = e.target;
      const interactive =
        t?.closest?.("a, button, [data-cursor='hover'], input, textarea, [role='button']");
      setHovering(!!interactive);
    };

    const tick = () => {
      rx += (dx - rx) * 0.18;
      ry += (dy - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dx - 2}px, ${dy - 2}px, 0)`;
      }
      if (needleRef.current) {
        needleRef.current.style.transform = `rotate(${angle}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[9999] h-9 w-9 transition-[width,height,opacity] duration-300"
        style={{ mixBlendMode: "difference" }}
      >
        <div
          className={`relative h-full w-full rounded-full border transition-all duration-300 ${
            hovering ? "scale-150 border-brass-bright" : "scale-100 border-ink/70"
          }`}
        >
          {/* compass tick marks */}
          <div className="absolute inset-0">
            {[0, 90, 180, 270].map((d) => (
              <div
                key={d}
                className="absolute left-1/2 top-1/2 h-1 w-px -translate-x-1/2 origin-top bg-ink/60"
                style={{ transform: `translate(-50%, -50%) rotate(${d}deg) translateY(-14px)` }}
              />
            ))}
          </div>
          {/* needle */}
          <div
            ref={needleRef}
            className="absolute left-1/2 top-1/2 h-7 w-px -translate-x-1/2 -translate-y-1/2 origin-center transition-transform duration-200 ease-out"
          >
            <div className="absolute left-1/2 top-0 h-3.5 w-px -translate-x-1/2 bg-brass-bright" />
            <div className="absolute left-1/2 bottom-0 h-3.5 w-px -translate-x-1/2 bg-ink/40" />
          </div>
        </div>
      </div>
      <div
        ref={dotRef}
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[9999] h-1 w-1 rounded-full bg-brass-bright"
        style={{ mixBlendMode: "difference" }}
      />
    </>
  );
}
