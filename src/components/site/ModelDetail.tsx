import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import type { Model } from "@/data/models";

export function ModelDetail({ model, onClose }: { model: Model | null; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (model) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [model, onClose]);

  return (
    <AnimatePresence>
      {model && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${model.name} portfolio`}
          className="fixed inset-0 z-[80] overflow-y-auto bg-ink/85 backdrop-blur-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto min-h-full max-w-7xl px-5 py-8 sm:px-8">
            <div className="flex items-center justify-between">
              <span className="label text-champagne">{model.division} division</span>
              <button type="button" onClick={onClose} className="label magnetic-link" data-cursor="CLOSE">
                Close
              </button>
            </div>

            <motion.h2
              className="display mt-10 text-[13vw] leading-[0.85] sm:text-[9vw]"
              initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              {model.name}
            </motion.h2>

            <div className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
              <motion.img
                layoutId={`cover-${model.id}`}
                src={model.gallery[0]}
                alt={`${model.name} editorial portrait`}
                className="h-[70vh] w-full object-cover"
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
                  <p className="label text-muted-foreground">Specialties</p>
                  <p className="mt-2 text-sm text-foreground/80">{model.specialties.join(" · ")}</p>
                </div>

                <div>
                  <p className="label text-muted-foreground">Selected work</p>
                  <ul className="mt-2 space-y-1 text-sm text-foreground/80">
                    {model.campaigns.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto flex flex-wrap items-center gap-4">
                  <a
                    href="#contact"
                    onClick={onClose}
                    data-cursor="BOOK"
                    className="label rounded-full border border-champagne/50 px-6 py-3 text-champagne transition-colors duration-500 hover:bg-champagne/10"
                  >
                    Book {model.name.split(" ")[0]}
                  </a>
                  <span className="label text-muted-foreground">{model.instagram}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-6 pb-16 sm:grid-cols-2">
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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
