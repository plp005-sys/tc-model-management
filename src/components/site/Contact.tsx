import { motion } from "motion/react";
import { useState } from "react";
import logoImg from "@/assets/top-model-zimbabwe-logo.jpg";

const INTENTS = ["Book a model", "Become a model", "Collaborate", "Payment / Retainer"];

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
              <p className="mt-2 text-base text-foreground/80 leading-relaxed">
                5b Bronte Close, Off Broadlands Road
                <br />
                Emerald Hill, Harare, Zimbabwe
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
            {/* Prominent Logo Banner inside the Booking / Payment container */}
            <div className="flex flex-col items-center justify-center border-b border-border pb-6">
              <div className="glass flex w-full items-center justify-center rounded-2xl border border-champagne/30 bg-ink/40 p-4 shadow-lg backdrop-blur-md">
                <img
                  src={logoImg}
                  alt="Top Model Zimbabwe Official Logo"
                  className="h-14 sm:h-16 md:h-20 w-auto max-w-full object-contain brightness-105"
                />
              </div>
              <p className="label mt-3 text-center text-champagne">Official Agency Portal & Inquiries</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {INTENTS.map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIntent(i)}
                  aria-pressed={intent === i}
                  className={`label rounded-full border px-5 py-2.5 transition-colors duration-500 ${
                    intent === i
                      ? "border-transparent bg-foreground text-primary-foreground font-semibold shadow-md"
                      : "border-border text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>

            {intent === "Payment / Retainer" && (
              <div className="rounded-xl border border-champagne/30 bg-champagne/5 p-4 text-sm text-foreground/90 space-y-2">
                <p className="label text-champagne">Booking & Retainer Payments</p>
                <p className="text-xs text-foreground/80 leading-relaxed">
                  For model bookings, campaign retainers, and production deposits. Enter your invoice/booking reference below to confirm payment allocation.
                </p>
              </div>
            )}

            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block">
                <span className="label text-muted-foreground">Name / Organization</span>
                <input
                  required
                  name="name"
                  placeholder="e.g. Vogue Africa / Creative Director"
                  className="mt-2 w-full border-b border-border bg-transparent pb-2 font-display text-lg outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-champagne"
                />
              </label>
              <label className="block">
                <span className="label text-muted-foreground">Email</span>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="contact@company.com"
                  className="mt-2 w-full border-b border-border bg-transparent pb-2 font-display text-lg outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-champagne"
                />
              </label>
            </div>

            {intent === "Payment / Retainer" && (
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="label text-muted-foreground">Invoice / Booking Ref</span>
                  <input
                    name="invoiceRef"
                    placeholder="e.g. TMZW-2026-042"
                    className="mt-2 w-full border-b border-border bg-transparent pb-2 font-display text-lg outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-champagne"
                  />
                </label>
                <label className="block">
                  <span className="label text-muted-foreground">Amount (USD)</span>
                  <input
                    type="number"
                    name="amount"
                    placeholder="e.g. 1500"
                    className="mt-2 w-full border-b border-border bg-transparent pb-2 font-display text-lg outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-champagne"
                  />
                </label>
              </div>
            )}

            <label className="block">
              <span className="label text-muted-foreground">
                {intent === "Payment / Retainer" ? "Payment Details & Reference Notes" : "Project Details"}
              </span>
              <textarea
                rows={3}
                name="project"
                placeholder={
                  intent === "Payment / Retainer"
                    ? "Specify model name, shoot dates, or international wire / EcoCash reference details..."
                    : "Tell us about the project, shoot dates, or requirements..."
                }
                className="mt-2 w-full resize-none border-b border-border bg-transparent pb-2 font-display text-lg outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-champagne"
              />
            </label>

            <button
              type="submit"
              data-cursor="SEND"
              className="label group inline-flex items-center gap-4 rounded-full border border-champagne/50 px-7 py-4 text-champagne transition-colors duration-500 hover:bg-champagne/10"
            >
              {sent ? "Information received" : `Submit — ${intent}`}
              <span className="h-px w-8 bg-current transition-all duration-700 group-hover:w-14" />
            </button>

            <motion.p
              className="label text-emerald"
              initial={false}
              animate={{ opacity: sent ? 1 : 0 }}
            >
              {intent === "Payment / Retainer"
                ? "Payment inquiry received. Our accounts department will contact you with the invoice confirmation."
                : "We reply within two working days."}
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
        <div className="mt-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="space-y-4">
            <img
              src={logoImg}
              alt="Top Model Zimbabwe Logo"
              className="h-16 sm:h-20 md:h-24 w-auto max-w-[20rem] object-contain brightness-105"
            />
            <p className="display text-3xl leading-tight text-foreground/90 sm:text-4xl">
              TOP MODEL <span className="italic text-champagne">ZIMBABWE</span>
            </p>
          </div>
          <div className="space-y-2 text-right">
            <p className="label text-muted-foreground">Harare · Johannesburg · Paris</p>
            <p className="label text-muted-foreground">© 2026 Top Model Zimbabwe. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
