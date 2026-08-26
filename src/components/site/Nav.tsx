import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "#hero", label: "Home" },
  { href: "#models", label: "Models" },
  { href: "#editorial", label: "Editorial" },
  { href: "#creative", label: "Creative" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
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
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:px-6">
        <nav
          aria-label="Primary"
          className="glass flex w-full max-w-6xl items-center justify-between rounded-full px-5 py-3 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-7"
          style={{ opacity: lifted ? 1 : 0.92 }}
        >
          <a href="#hero" className="label text-foreground" data-cursor="HOME">
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
            href="#contact"
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
            Index
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
            className="fixed inset-0 z-[60] flex flex-col justify-between bg-ink/80 px-6 py-8 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center justify-between">
              <span className="label text-champagne">Index</span>
              <button type="button" onClick={() => setOpen(false)} className="label" aria-label="Close menu">
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
            <p className="label text-muted-foreground">Harare · Johannesburg · Paris</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
