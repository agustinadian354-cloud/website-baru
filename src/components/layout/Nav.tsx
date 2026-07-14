import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const links = [
  { label: "Works", to: "/#works" },
  { label: "Studio", to: "/#studio" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-4 font-mono text-xs tracking-wider transition-colors duration-300 sm:px-10 ${
        scrolled ? "bg-ink/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <Link to="/" className="font-display text-lg tracking-widest text-film">
        REEL&nbsp;DIRECTOR
      </Link>

      <nav className="hidden items-center gap-8 text-film-dim sm:flex">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="transition-colors duration-150 hover:text-grade-amber-bright"
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <a
        href="#contact"
        className="hidden border border-film/30 px-3 py-1.5 text-film transition-colors duration-150 hover:border-grade-amber-bright hover:text-grade-amber-bright sm:inline-block"
      >
        Let&apos;s talk
      </a>

      <button
        type="button"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
        className="relative z-50 flex h-8 w-8 flex-col items-center justify-center gap-[5px] sm:hidden"
      >
        <span
          className={`h-px w-5 bg-film transition-transform duration-300 ${
            menuOpen ? "translate-y-[3px] rotate-45" : ""
          }`}
        />
        <span
          className={`h-px w-5 bg-film transition-transform duration-300 ${
            menuOpen ? "-translate-y-[3px] -rotate-45" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            className="fixed inset-0 z-40 flex flex-col justify-center gap-8 bg-ink px-8 sm:hidden"
          >
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMenuOpen(false)}
                className="font-display text-5xl tracking-tight text-film transition-colors duration-150 hover:text-grade-amber-bright"
              >
                {l.label}
              </Link>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="font-display text-5xl tracking-tight text-film transition-colors duration-150 hover:text-grade-amber-bright"
            >
              Contact
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
