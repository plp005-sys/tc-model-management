import { useEffect, useRef, useState } from "react";

/** Editorial cursor: a thin ring that reads the element beneath it. */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);

    const t = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const r = { ...t };
    let raf = 0;

    const move = (e: PointerEvent) => {
      t.x = e.clientX;
      t.y = e.clientY;
      if (dot.current) dot.current.style.translate = `${t.x}px ${t.y}px`;
      const el = (e.target as HTMLElement)?.closest?.("[data-cursor]") as HTMLElement | null;
      setLabel(el?.dataset.cursor ?? "");
    };

    const tick = () => {
      r.x += (t.x - r.x) * 0.16;
      r.y += (t.y - r.y) * 0.16;
      if (ring.current) ring.current.style.translate = `${r.x}px ${r.y}px`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      <div
        ref={ring}
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border border-foreground/50 transition-[width,height,background-color,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          width: label ? 104 : 34,
          height: label ? 104 : 34,
          marginLeft: label ? -52 : -17,
          marginTop: label ? -52 : -17,
          backgroundColor: label ? "oklch(1 0 0 / 0.08)" : "transparent",
          backdropFilter: label ? "blur(6px)" : undefined,
        }}
      >
        <span
          className="label text-center text-foreground transition-opacity duration-300"
          style={{ opacity: label ? 1 : 0, fontSize: "0.5rem" }}
        >
          {label}
        </span>
      </div>
      <div
        ref={dot}
        className="absolute left-0 top-0 -ml-[2px] -mt-[2px] h-1 w-1 rounded-full bg-foreground"
      />
    </div>
  );
}
