import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import wide from "@/assets/editorial-wide.jpg";

export function Editorial() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const wordA = useTransform(scrollYProgress, [0, 1], ["12%", "-24%"]);
  const wordB = useTransform(scrollYProgress, [0, 1], ["-14%", "22%"]);
  const blur = useTransform(scrollYProgress, [0, 0.5, 1], ["blur(12px)", "blur(0px)", "blur(10px)"]);

  return (
    <section
      id="editorial"
      ref={ref}
      data-atmos-room="editorial"
      className="relative h-[130svh] overflow-hidden"
    >
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden grain">
        <motion.img
          src={wide}
          alt="Two models in couture inside an architectural hall lit violet and emerald"
          loading="lazy"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ scale, y }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, var(--ink), color-mix(in oklab, var(--ink) 25%, transparent) 35%, color-mix(in oklab, var(--ink) 30%, transparent) 60%, var(--ink))",
          }}
        />

        <div className="relative w-full">
          <motion.p
            style={{ x: wordA }}
            className="display whitespace-nowrap text-[19vw] leading-[0.8] text-foreground/95"
          >
            BEAUTY IN
          </motion.p>
          <motion.p
            style={{ x: wordB, filter: blur }}
            className="display whitespace-nowrap pl-[20vw] text-[19vw] italic leading-[0.8] text-champagne"
          >
            MOTION
          </motion.p>
        </div>

        <div className="glass absolute bottom-10 left-1/2 hidden -translate-x-1/2 rounded-full px-6 py-3 md:block">
          <p className="label text-foreground/80">
            Editorial 04 — Chrome Season · Photographed in Harare
          </p>
        </div>
      </div>
    </section>
  );
}
