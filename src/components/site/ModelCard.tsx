import { motion } from "motion/react";
import type { Model } from "@/data/models";

interface Props {
  model: Model;
  index: number;
  className?: string | undefined;
  onOpen: (m: Model) => void;
}

export function ModelCard({ model, index, className = "", onOpen }: Props) {
  return (
    <motion.article
      className={`group relative isolate ${className}`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        type="button"
        onClick={() => onOpen(model)}
        data-cursor="VIEW MODEL"
        aria-label={`View ${model.name}`}
        className="relative block w-full overflow-hidden text-left"
      >
        {/* colored light that blooms behind the plate */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-4 -z-10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-70"
          style={{ background: "radial-gradient(circle at 50% 60%, var(--atm-1), transparent 70%)" }}
        />
        <div className="relative overflow-hidden">
          <img
            src={model.cover}
            alt={`${model.name} — ${model.division} division`}
            loading="lazy"
            width={900}
            height={1300}
            className="w-full object-cover object-[50%_18%] grayscale-[0.35] transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] group-hover:grayscale-0 sm:object-center"
            style={{ aspectRatio: "var(--card-mobile-ratio, var(--card-ratio, 3 / 4))" }}
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-ink/25 transition-opacity duration-700 group-hover:opacity-0"
          />
          {/* glass slab reveals on hover */}
          <span className="glass-quiet absolute inset-x-3 bottom-3 flex translate-y-3 items-end justify-between px-4 py-3 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
            <span className="label">{model.location}</span>
            <span className="label text-champagne">{model.height}</span>
          </span>
        </div>
      </button>

      <div className="relative z-20 mt-3 flex items-baseline justify-between gap-4">
        <h3 className="display text-2xl sm:text-3xl">{model.name}</h3>
        <span className="label text-muted-foreground">
          {String(index + 1).padStart(2, "0")} / {model.division}
        </span>
      </div>
    </motion.article>
  );
}
