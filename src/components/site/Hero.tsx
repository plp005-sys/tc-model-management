import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import heroImg from "@/assets/hero-model.jpg";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const typeY = useTransform(scrollYProgress, [0, 1], ["0%", "-45%"]);
  const veil = useTransform(scrollYProgress, [0, 1], [0.25, 0.85]);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    const onMove = (e: PointerEvent) => {
      setTilt({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section
      id="hero"
      ref={ref}
      data-atmos-room="hero"
      className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-32 sm:pb-20"
    >
      {/* 2.5D plate — the model sits between two moving light planes */}
      <motion.div
        className="absolute inset-0 grain"
        style={{ y: imgY, scale: imgScale }}
        aria-hidden="true"
      >
        <motion.div
          className="absolute inset-0"
          animate={{ x: tilt.x * -22, y: tilt.y * -14 }}
          transition={{ type: "spring", stiffness: 40, damping: 20, mass: 1.2 }}
        >
          <img
            src={heroImg}
            alt="Model in gold and violet light, Top Model Zimbabwe campaign"
            width={1280}
            height={1600}
            fetchPriority="high"
            className="h-full w-full object-cover object-[52%_28%]"
          />
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-ink"
          style={{ opacity: veil }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, var(--ink) 4%, color-mix(in oklab, var(--ink) 40%, transparent) 42%, transparent 78%)",
          }}
        />
      </motion.div>

      {/* floating glass caption */}
      <motion.div
        className="glass absolute right-4 top-28 hidden max-w-[15rem] rounded-sm px-5 py-4 lg:block"
        animate={{ x: tilt.x * 14, y: tilt.y * 10 }}
        transition={{ type: "spring", stiffness: 60, damping: 18 }}
      >
        <p className="label text-champagne">Season 04</p>
        <p className="mt-2 text-sm leading-relaxed text-foreground/80">
          Colour, movement and presence — photographed in the Harare studio, February 2026.
        </p>
      </motion.div>

      <motion.div style={{ y: typeY }} className="relative z-10 w-full px-5 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end gap-6">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="display iridescent-text text-[17vw] leading-[0.8] sm:text-[15vw] lg:text-[11.5vw]"
            >
              TOP MODEL
              <span className="block pl-[6vw] italic">Zimbabwe</span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.3, duration: 1 }}
            className="mt-8 flex flex-col gap-6 border-t border-border pt-6 sm:flex-row sm:items-end sm:justify-between"
          >
            <div className="space-y-2">
              <p className="label text-foreground/70">Model Management · Creative Talent</p>
              <p className="label text-muted-foreground">Fashion / Beauty / Culture</p>
            </div>

            <a
              href="#models"
              data-cursor="ENTER"
              className="glass group inline-flex items-center gap-4 self-start rounded-full px-7 py-4 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 sm:self-auto"
            >
              <span className="label">Explore the talent</span>
              <span className="h-px w-10 bg-current transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-16" />
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
