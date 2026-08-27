import { useEffect, useRef } from "react";

/**
 * Living background: three light sources drifting in a dark room.
 * They lerp toward the pointer with different inertia, and each section
 * swaps the palette via the [data-atmos] tokens in styles.css.
 */
export function Atmosphere() {
  const layerRef = useRef<HTMLDivElement>(null);
  const blobs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const target = { x: 0.5, y: 0.4 };
    const pos = [
      { x: 0.5, y: 0.4 },
      { x: 0.5, y: 0.4 },
      { x: 0.5, y: 0.4 },
    ];
    const ease = [0.035, 0.02, 0.055];
    const amp = [1, 0.62, 1.35];
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX / window.innerWidth;
      target.y = e.clientY / window.innerHeight;
    };

    const tick = () => {
      pos.forEach((p, i) => {
        p.x += (target.x - p.x) * (ease[i] ?? 0.03);
        p.y += (target.y - p.y) * (ease[i] ?? 0.03);
        const el = blobs[i]?.current;
        if (el) {
          const dx = (p.x - 0.5) * 34 * (amp[i] ?? 1);
          const dy = (p.y - 0.5) * 30 * (amp[i] ?? 1);
          el.style.translate = `${dx}vw ${dy}vh`;
        }
      });
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background grain"
    >
      <div
        ref={blobs[0]}
        className="absolute left-[-10%] top-[-15%] h-[80vh] w-[80vw] rounded-full opacity-[0.55] blur-[110px] will-change-transform"
        style={{
          background: "radial-gradient(circle at 50% 50%, var(--atm-1), transparent 68%)",
          animation: "drift 34s var(--ease-glass) infinite",
          transition: "background 1.6s var(--ease-silk)",
        }}
      />
      <div
        ref={blobs[1]}
        className="absolute right-[-15%] top-[20%] h-[70vh] w-[65vw] rounded-full opacity-[0.4] blur-[130px] will-change-transform"
        style={{
          background: "radial-gradient(circle at 50% 50%, var(--atm-2), transparent 66%)",
          animation: "drift 46s var(--ease-glass) infinite reverse",
          transition: "background 1.6s var(--ease-silk)",
        }}
      />
      <div
        ref={blobs[2]}
        className="absolute bottom-[-20%] left-[20%] h-[75vh] w-[70vw] rounded-full opacity-[0.45] blur-[120px] will-change-transform"
        style={{
          background: "radial-gradient(circle at 50% 50%, var(--atm-3), transparent 70%)",
          animation: "drift 28s var(--ease-glass) infinite",
          transition: "background 1.6s var(--ease-silk)",
        }}
      />
      {/* veil keeps the room deep and the type legible */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 30%, transparent 0%, color-mix(in oklab, var(--ink) 72%, transparent) 60%, var(--ink) 100%)",
        }}
      />
    </div>
  );
}
