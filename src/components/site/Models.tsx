import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { divisions, models, type Division } from "@/data/models";
import { ModelCard } from "./ModelCard";

/** Asymmetric editorial rhythm: column span, ratio, vertical offset. */
const RHYTHM = [
  "col-span-12 sm:col-span-7 lg:col-span-6 [--card-ratio:4/5]",
  "col-span-12 sm:col-span-5 lg:col-span-3 lg:mt-40 [--card-ratio:2/3]",
  "col-span-12 sm:col-span-6 lg:col-span-3 lg:mt-16 [--card-ratio:3/4]",
  "col-span-12 sm:col-span-6 lg:col-span-4 lg:mt-8 [--card-ratio:3/4]",
  "col-span-12 sm:col-span-7 lg:col-span-5 lg:mt-24 [--card-ratio:16/11]",
  "col-span-12 sm:col-span-5 lg:col-span-3 [--card-ratio:2/3]",
];

export function ModelGrid({ list }: { list: typeof models }) {
  return (
    <motion.div layout className="grid grid-cols-12 gap-x-5 gap-y-20 sm:gap-x-8">
      {list.map((m, i) => (
        <ModelCard key={m.id} model={m} index={i} className={RHYTHM[i % RHYTHM.length]} />
      ))}
    </motion.div>
  );
}

export function DivisionFilter({
  filter,
  onChange,
}: {
  filter: Division | "all";
  onChange: (d: Division | "all") => void;
}) {
  return (
    <div className="glass flex flex-wrap gap-1 self-start rounded-full p-1">
      {divisions.map((d) => (
        <button
          key={d.key}
          type="button"
          onClick={() => onChange(d.key)}
          data-cursor="FILTER"
          aria-pressed={filter === d.key}
          className={`label rounded-full px-5 py-2.5 transition-colors duration-500 ${
            filter === d.key
              ? "bg-foreground text-primary-foreground"
              : "text-foreground/70 hover:text-foreground"
          }`}
        >
          {d.label}
        </button>
      ))}
    </div>
  );
}

export function Models() {
  const [filter, setFilter] = useState<Division | "all">("all");

  const list = useMemo(
    () => (filter === "all" ? models : models.filter((m) => m.division === filter)),
    [filter],
  );

  return (
    <section id="models" data-atmos-room="models" className="relative px-5 py-32 sm:px-8 sm:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="label text-champagne">The Board</p>
            <h2 className="display mt-4 text-[16vw] leading-[0.82] sm:text-[10vw] lg:text-[7.5vw]">
              Faces of the
              <span className="block italic">house</span>
            </h2>
          </div>

          <div className="flex flex-col items-start gap-4">
            <DivisionFilter filter={filter} onChange={setFilter} />
            <Link to="/models" className="label magnetic-link text-champagne" data-cursor="ALL">
              View the full board →
            </Link>
          </div>
        </div>

        <div className="mt-20">
          <ModelGrid list={list.slice(0, 9)} />
        </div>
      </div>
    </section>
  );
}
