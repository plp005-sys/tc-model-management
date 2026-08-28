import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { imagery } from "@/data/models";

const PLATES = [
  { src: imagery.c01, title: "Chrome Season", kind: "Campaign", ratio: "4/5", widthClass: "w-[76vw] sm:w-[32vw] md:w-[28vw]" },
  { src: imagery.c02, title: "Backstage 04", kind: "Runway", ratio: "3/2", widthClass: "w-[82vw] sm:w-[40vw] md:w-[34vw]" },
  { src: imagery.c03, title: "Material Study", kind: "Art Direction", ratio: "4/5", widthClass: "w-[72vw] sm:w-[30vw] md:w-[26vw]" },
  { src: imagery.c04, title: "Glass Portrait", kind: "Beauty", ratio: "4/5", widthClass: "w-[76vw] sm:w-[32vw] md:w-[28vw]" },
  { src: imagery.wide, title: "Hall of Light", kind: "Film", ratio: "16/9", widthClass: "w-[88vw] sm:w-[48vw] md:w-[42vw]" },
];

export function Creative() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    const updateMaxScroll = () => {
      if (trackRef.current) {
        // Measure exact overflow so the entire track is traversed regardless of screen resolution
        const trackWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const overflow = Math.max(0, trackWidth - viewportWidth + 40);
        setMaxScroll(overflow);
      }
    };

    // Calculate on mount and after images load
    updateMaxScroll();
    const timer = setTimeout(updateMaxScroll, 300);
    window.addEventListener("resize", updateMaxScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateMaxScroll);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  // Pixel-accurate translation: smoothly traverses all cards and rests on the final view before downward scrolling
  const x = useTransform(scrollYProgress, [0, 0.88, 1], [0, -maxScroll, -maxScroll]);

  return (
    <section id="creative" ref={sectionRef} data-atmos-room="creative" className="relative h-[480svh]">
      <div className="sticky top-0 flex h-[100dvh] flex-col justify-between overflow-hidden pt-16 pb-4 sm:pt-24 sm:pb-8 md:pt-28 md:pb-10">
        <div className="px-5 sm:px-8">
          <div className="mx-auto flex max-w-7xl items-end justify-between">
            <div>
              <p className="label text-coral">Creative Division</p>
              <h2 className="display mt-1 pt-1 text-[8.5vw] leading-[0.92] sm:text-[5vw] md:text-[4vw]">
                Campaigns <span className="italic text-champagne">&amp; film</span>
              </h2>
            </div>
            <p className="label hidden text-muted-foreground sm:block">Scroll · Drag the room sideways</p>
          </div>
        </div>

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="my-auto flex items-end gap-5 pl-5 sm:gap-10 sm:pl-8"
        >
          {PLATES.map((p) => (
            <figure
              key={p.title}
              data-cursor="EXPLORE"
              className={`group relative shrink-0 ${p.widthClass} flex flex-col justify-end`}
            >
              <div className="overflow-hidden grain rounded-sm bg-ink/50 shadow-xl border border-white/5">
                <img
                  src={p.src}
                  alt={`${p.title} — ${p.kind}`}
                  loading="lazy"
                  className="max-h-[38vh] sm:max-h-[48vh] md:max-h-[50vh] w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  style={{ aspectRatio: p.ratio }}
                />
              </div>
              <figcaption className="mt-2.5 flex items-baseline justify-between border-b border-border/40 pb-1.5 sm:mt-3 sm:pb-2">
                <span className="display text-lg text-foreground font-normal sm:text-2xl">{p.title}</span>
                <span className="label text-champagne/90 text-[0.6rem] sm:text-[0.65rem]">{p.kind}</span>
              </figcaption>
            </figure>
          ))}

          <div className="shrink-0 self-center pr-[12vw] pl-4 sm:pr-[16vw] sm:pl-6">
            <p className="display max-w-[14ch] text-2xl sm:text-4xl italic text-champagne leading-tight">
              Presence is the only currency.
            </p>
            <p className="label mt-2 text-muted-foreground text-[0.6rem] sm:text-xs">Harare · International</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
