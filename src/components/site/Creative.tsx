import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { imagery } from "@/data/models";

const PLATES = [
  { src: imagery.c01, title: "Chrome Season", kind: "Campaign", ratio: "4/5", w: "w-[78vw] sm:w-[38vw]" },
  { src: imagery.c02, title: "Backstage 04", kind: "Runway", ratio: "3/2", w: "w-[85vw] sm:w-[46vw]" },
  { src: imagery.c03, title: "Material Study", kind: "Art Direction", ratio: "4/5", w: "w-[70vw] sm:w-[30vw]" },
  { src: imagery.c04, title: "Glass Portrait", kind: "Beauty", ratio: "4/5", w: "w-[78vw] sm:w-[36vw]" },
  { src: imagery.wide, title: "Hall of Light", kind: "Film", ratio: "16/9", w: "w-[90vw] sm:w-[52vw]" },
];

export function Creative() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-72%"]);

  return (
    <section id="creative" ref={ref} data-atmos-room="creative" className="relative h-[340svh]">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="px-5 sm:px-8">
          <div className="mx-auto flex max-w-7xl items-end justify-between">
            <div>
              <p className="label text-coral">Creative Division</p>
              <h2 className="display mt-3 text-[11vw] leading-[0.85] sm:text-[6vw]">
                Campaigns <span className="italic">&amp; film</span>
              </h2>
            </div>
            <p className="label hidden text-muted-foreground sm:block">Scroll · Drag the room sideways</p>
          </div>
        </div>

        <motion.div style={{ x }} className="mt-12 flex items-center gap-6 pl-5 sm:gap-12 sm:pl-8">
          {PLATES.map((p, i) => (
            <figure
              key={p.title}
              data-cursor="EXPLORE"
              className={`group relative shrink-0 ${p.w} ${i % 2 ? "sm:translate-y-16" : "sm:-translate-y-10"}`}
            >
              <div className="overflow-hidden grain">
                <img
                  src={p.src}
                  alt={`${p.title} — ${p.kind}`}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  style={{ aspectRatio: p.ratio }}
                />
              </div>
              <figcaption className="mt-3 flex items-baseline justify-between">
                <span className="display text-xl sm:text-2xl">{p.title}</span>
                <span className="label text-muted-foreground">{p.kind}</span>
              </figcaption>
            </figure>
          ))}
          <div className="shrink-0 pr-[20vw]">
            <p className="display max-w-[16ch] text-4xl italic text-champagne">
              Presence is the only currency.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
