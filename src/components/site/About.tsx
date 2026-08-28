import { motion } from "motion/react";
import manifestoImg from "@/assets/manifesto-studio.jpg";

const LINES = ["WE DON'T", "DISCOVER", "FACES.", "WE DISCOVER", "PRESENCE."];

const STATS = [
  { value: "56", label: "Represented talent" },
  { value: "09", label: "Countries booked" },
  { value: "2014", label: "Founded in Harare" },
];

export function About() {
  return (
    <section id="about" data-atmos-room="about" className="relative px-5 py-32 sm:px-8 sm:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <p className="label text-emerald">Manifesto</p>
          <h2 className="mt-6">
            {LINES.map((line, i) => (
              <motion.span
                key={line}
                className={`display block text-[13vw] leading-[0.84] sm:text-[7vw] ${
                  i === 4 ? "italic text-champagne" : ""
                }`}
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: i * 0.08, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                {line}
              </motion.span>
            ))}
          </h2>

          <p className="mt-10 max-w-xl text-base leading-relaxed text-foreground/75">
            Top Model Zimbabwe is a management house built between Harare and the international
            circuit. We develop talent slowly and place it precisely — couture, beauty, campaign and
            film — with a creative division that art-directs the work our models appear in. With a
            strong focus on excellence, diversity, and professionalism, Top Model Zimbabwe provides
            the guidance and opportunities needed for models to thrive in the competitive worlds of
            fashion, commercial, and editorial work. From runway shows to high-profile campaigns, the
            agency is a trusted partner for talent and clients alike.
          </p>

          <dl className="mt-12 flex flex-wrap gap-10">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="display text-5xl text-foreground">{s.value}</dt>
                <dd className="label mt-2 text-muted-foreground">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative grain"
        >
          <img
            src={manifestoImg}
            alt="Top Model Zimbabwe Director & Studio, Emerald Hill Harare"
            loading="lazy"
            className="h-[70vh] w-full object-cover object-[50%_35%] shadow-2xl"
          />
          <div className="glass absolute -left-4 bottom-8 max-w-[19rem] px-5 py-4">
            <p className="label text-champagne">Studio</p>
            <p className="mt-2 text-sm text-foreground/80 leading-relaxed">
              5b Bronte Close, Off Broadlands Road, Emerald Hill, Harare, Zimbabwe — by appointment.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 border-t border-champagne/20 pt-3">
              <a
                href="https://www.instagram.com/topmodelzimbabwe/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="label magnetic-link text-champagne hover:text-foreground"
              >
                Instagram →
              </a>
              <a
                href="https://www.facebook.com/Topmodelzim"
                target="_blank"
                rel="noopener noreferrer"
                className="label magnetic-link text-champagne hover:text-foreground"
              >
                Facebook →
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
