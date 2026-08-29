import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import type { Model } from "@/data/models";

export function ModelProfile({ model }: { model: Model }) {
  return (
    <article className="mx-auto max-w-7xl px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
      <div className="flex items-center justify-between">
        <span className="label text-champagne">{model.division} division</span>
        <Link to="/models" className="label magnetic-link" data-cursor="BACK">
          All models
        </Link>
      </div>

      <motion.h1
        className="display mt-10 text-[13vw] leading-[0.85] sm:text-[9vw]"
        initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {model.name}
      </motion.h1>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <motion.img
          src={model.gallery[0]}
          alt={`${model.name} editorial portrait`}
          className="h-[70vh] w-full object-cover object-[50%_20%]"
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />

        <div className="glass flex flex-col gap-6 p-6">
          <dl className="grid grid-cols-2 gap-y-4">
            {[
              ["Age", String(model.age)],
              ["Location", model.location],
              ["Height", model.height],
              ...(model.bust ? [["Bust", model.bust]] : []),
              ["Waist", model.waist],
              ["Hips", model.hips],
              ["Shoe", model.shoe],
              ["Hair", model.hair],
              ["Eyes", model.eyes],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="label text-muted-foreground">{k}</dt>
                <dd className="mt-1 font-display text-lg">{v}</dd>
              </div>
            ))}
          </dl>

          <div>
            <h2 className="label text-muted-foreground">Specialties</h2>
            <p className="mt-2 text-sm text-foreground/80">{model.specialties.join(" · ")}</p>
          </div>

          <div>
            <h2 className="label text-muted-foreground">Selected work</h2>
            <ul className="mt-2 space-y-1 text-sm text-foreground/80">
              {model.campaigns.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>

          <div className="mt-auto flex flex-wrap items-center gap-4">
            <a
              href="/#contact"
              data-cursor="BOOK"
              className="label rounded-full border border-champagne/50 px-6 py-3 text-champagne transition-colors duration-500 hover:bg-champagne/10"
            >
              Book {model.name.split(" ")[0]}
            </a>
            <span className="label text-muted-foreground">{model.instagram}</span>
          </div>
        </div>
      </div>

      <h2 className="sr-only">{model.name} portfolio gallery</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {model.gallery.slice(1).map((src, i) => (
          <motion.img
            key={src + i}
            src={src}
            alt={`${model.name} portfolio image ${i + 2}`}
            loading="lazy"
            className="h-[60vh] w-full object-cover"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </div>
    </article>
  );
}
