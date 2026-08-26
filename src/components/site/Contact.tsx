import { motion } from "motion/react";
import { useState } from "react";

const INTENTS = ["Book a model", "Become a model", "Collaborate"];

export function Contact() {
  const [intent, setIntent] = useState(INTENTS[0]);
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" data-atmos-room="contact" className="relative px-5 py-32 sm:px-8 sm:py-40">
      <div className="mx-auto max-w-7xl">
        <h2 className="display text-[17vw] leading-[0.82] sm:text-[11vw]">
          <span className="block">LET&apos;S</span>
          <span className="block pl-[8vw]">CREATE</span>
          <span className="block italic iridescent-text">SOMETHING ICONIC.</span>
        </h2>

        <div className="mt-20 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-8">
            <div>
              <p className="label text-muted-foreground">Bookings</p>
              <a href="mailto:bookings@topmodel.co.zw" className="display magnetic-link mt-2 inline-block text-3xl">
                bookings@topmodel.co.zw
              </a>
            </div>
            <div>
              <p className="label text-muted-foreground">Studio</p>
              <p className="mt-2 text-base text-foreground/80">
                21 Josiah Chinamano Avenue
                <br />
                Harare, Zimbabwe
              </p>
            </div>
            <div className="flex gap-6">
              {["Instagram", "TikTok", "LinkedIn"].map((s) => (
                <a key={s} href="#contact" className="label magnetic-link text-foreground/70 hover:text-foreground">
                  {s}
                </a>
              ))}
            </div>
          </div>

          <form
            className="glass space-y-6 p-6 sm:p-8"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <div className="flex flex-wrap gap-2">
              {INTENTS.map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIntent(i)}
                  aria-pressed={intent === i}
                  className={`label rounded-full border px-5 py-2.5 transition-colors duration-500 ${
                    intent === i
                      ? "border-transparent bg-foreground text-primary-foreground"
                      : "border-border text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block">
                <span className="label text-muted-foreground">Name</span>
                <input
                  required
                  name="name"
                  className="mt-2 w-full border-b border-border bg-transparent pb-2 font-display text-lg outline-none transition-colors focus:border-champagne"
                />
              </label>
              <label className="block">
                <span className="label text-muted-foreground">Email</span>
                <input
                  required
                  type="email"
                  name="email"
                  className="mt-2 w-full border-b border-border bg-transparent pb-2 font-display text-lg outline-none transition-colors focus:border-champagne"
                />
              </label>
            </div>

            <label className="block">
              <span className="label text-muted-foreground">Project</span>
              <textarea
                rows={3}
                name="project"
                className="mt-2 w-full resize-none border-b border-border bg-transparent pb-2 font-display text-lg outline-none transition-colors focus:border-champagne"
              />
            </label>

            <button
              type="submit"
              data-cursor="SEND"
              className="label group inline-flex items-center gap-4 rounded-full border border-champagne/50 px-7 py-4 text-champagne transition-colors duration-500 hover:bg-champagne/10"
            >
              {sent ? "Enquiry received" : `Send — ${intent}`}
              <span className="h-px w-8 bg-current transition-all duration-700 group-hover:w-14" />
            </button>

            <motion.p
              className="label text-emerald"
              initial={false}
              animate={{ opacity: sent ? 1 : 0 }}
            >
              We reply within two working days.
            </motion.p>
          </form>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden px-5 pb-10 pt-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="edge-line w-full" />
        <p className="display mt-8 text-[13vw] leading-[0.8] text-foreground/90 sm:text-[9vw]">
          TOP MODEL <span className="italic text-champagne">ZIMBABWE</span>
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <p className="label text-muted-foreground">Harare · Johannesburg · Paris</p>
          <p className="label text-muted-foreground">© 2026 Top Model Zimbabwe</p>
        </div>
      </div>
    </footer>
  );
}
