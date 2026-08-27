import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { imagery } from "@/data/models";

const PLATES = [
  { src: imagery.c01, title: "Chrome Season", kind: "Campaign", ratio: "4/5", maxW: "max-w-[75vw] sm:max-w-[34vw]" },
  { src: imagery.c02, title: "Backstage 04", kind: "Runway", ratio: "3/2", maxW: "max-w-[80vw] sm:max-w-[44vw]" },
  { src: imagery.c03, title: "Material Study", kind: "Art Direction", ratio: "4/5", maxW: "max-w-[70vw] sm:max-w-[30vw]" },
  { src: imagery.c04, title: "Glass Portrait", kind: "Beauty", ratio: "4/5", maxW: "max-w-[75vw] sm:max-w-[34vw]" },
  { src: imagery.wide, title: "Hall of Light", kind: "Film", ratio: "16/9", maxW: "max-w-[90vw] sm:max-w-[50vw]" },
];

export function Creative() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Translates all the way to -88% by 82% scroll progress so the statement is fully centered and visible before scrolling down
  const x = useTransform(scrollYProgress, [0, 0.82, 1], ["0%", "-88%", "-88%"]);

  return (
    <section id="creative" ref={ref} data-atmos-room="creative" className="relative h-[520svh]">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-between overflow-hidden pt-20 pb-6 sm:pt-24 sm:pb-8 md:pt-28 md:pb-10">
        <div className="px-5 sm:px-8">
          <div className="mx-auto flex max-w-7xl items-end justify-between">
            <div>
              <p className="label text-coral">Creative Division</p>
              <h2 className="display mt-2 pt-1 text-[9vw] leading-[0.92] sm:text-[5vw] md:text-[4vw]">
                Campaigns <span className="italic text-champagne">&amp; film</span>
              </h2>
            </div>
            <p className="label hidden text-muted-foreground sm:block">Scroll · Drag the room sideways</p>
          </div>
        </div>

        <motion.div style={{ x }} className="my-auto flex items-end gap-6 pl-5 sm:gap-10 sm:pl-8">
          {PLATES.map((p, i) => (
            <figure
              key={p.title}
              data-cursor="EXPLORE"
              className={`group relative shrink-0 ${p.maxW} flex flex-col justify-end`}
            >
              <div className="overflow-hidden grain rounded-sm bg-ink/50 shadow-xl border border-white/5">
                <img
                  src={p.src}
                  alt={`${p.title} — ${p.kind}`}
                  loading="lazy"
                  className="max-h-[46vh] sm:max-h-[48vh] md:max-h-[50vh] w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  style={{ aspectRatio: p.ratio }}
                />
              </div>
              <figcaption className="mt-3 flex items-baseline justify-between border-b border-border/40 pb-2">
                <span className="display text-xl text-foreground font-normal sm:text-2xl">{p.title}</span>
                <span className="label text-champagne/90 sm:text-[0.65rem]">{p.kind}</span>
              </figcaption>
            </figure>
          ))}

          <div className="shrink-0 self-center pr-[20vw] pl-4">
            <p className="display max-w-[16ch] text-3xl sm:text-4xl italic text-champagne">
              Presence is the only currency.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
