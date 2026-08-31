import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import logoImg from "@/assets/top-model-zimbabwe-logo.jpg";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/models", label: "Models" },
  { href: "/#editorial", label: "Editorial" },
  { href: "/#creative", label: "Creative" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [lifted, setLifted] = useState(false);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center gap-2 px-4 pt-4 sm:gap-4 sm:px-6">
        <a
          href="/"
          aria-label="Top Model Zimbabwe home"
          className="glass group flex h-14 w-auto shrink-0 items-center justify-center overflow-hidden rounded-full border border-champagne/30 px-4 py-2 shadow-lg backdrop-blur-xl transition-all duration-500 hover:border-champagne hover:shadow-[0_0_30px_rgba(224,195,142,0.3)] sm:h-16 sm:px-5 md:h-20 md:px-7"
          data-cursor="HOME"
        >
          <img
            src={logoImg}
            alt="Top Model Zimbabwe Logo"
            width={1920}
            height={644}
            className="h-full w-auto max-w-[9rem] object-contain brightness-105 transition-transform duration-500 group-hover:scale-105 sm:max-w-[13rem] md:max-w-[17rem]"
          />
        </a>

        <nav
          aria-label="Primary"
          className="glass flex flex-1 items-center justify-between rounded-full px-5 py-3 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-7"
          style={{ opacity: lifted ? 1 : 0.92 }}
        >
          <a href="/" className="label text-foreground" data-cursor="HOME">
            TOP MODEL <span className="text-champagne">ZW</span>
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {LINKS.slice(1).map((l) => (
              <li key={l.href}>
                <a href={l.href} className="label magnetic-link text-foreground/70 hover:text-foreground">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="/#contact"
            data-cursor="BOOK"
            className="label hidden rounded-full border border-champagne/40 px-5 py-2 text-champagne transition-colors duration-500 hover:bg-champagne/10 md:inline-block"
          >
            Booking
          </a>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="label flex items-center gap-2 text-foreground md:hidden"
          >
            Menu
            <span className="flex h-3 w-4 flex-col justify-between">
              <span className="h-px w-full bg-current" />
              <span className="h-px w-full bg-current" />
              <span className="h-px w-2/3 bg-current" />
            </span>
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col justify-between bg-ink/90 px-6 py-8 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center justify-between">
              <img
                src={logoImg}
                alt="Top Model Zimbabwe"
                width={1920}
                height={644}
                className="h-10 w-auto max-w-[12rem] object-contain brightness-105"
              />
              <button type="button" onClick={() => setOpen(false)} className="label text-champagne" aria-label="Close menu">
                Close
              </button>
            </div>
            <ul className="flex flex-col gap-1">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="display block py-2 text-[13vw] text-foreground"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <p className="label text-muted-foreground">Harare · Zimbabwe</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
