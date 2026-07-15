import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { HudOverlay } from "./HudOverlay";
import { LetterboxBars } from "../common/LetterboxBars";
import { heroImage } from "../../data/media";

// three.js + r3f adalah bagian terberat dari bundle — dimuat belakangan
// supaya headline & CTA hero tetap render instan di koneksi lambat.
const HeroScene = lazy(() =>
  import("./HeroScene").then((m) => ({ default: m.HeroScene }))
);

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const headlineContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.5 },
  },
};

const headlineLine = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.9, ease: EASE_OUT_EXPO },
  },
};

export function Hero() {
  return (
    <section className="relative h-svh w-full overflow-hidden bg-ink">
      {/* background: still hasil generate Higgsfield — representasi latent space */}
      <div
        className="hero-bg-image absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      {/* vignette + gradient bawah supaya teks tetap kontras di atas foto */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--color-ink)_95%)]" />

      {/* medan partikel three.js — ditumpuk di atas foto dengan blend "screen" */}
      <div className="absolute inset-0 mix-blend-screen">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      {/* letterbox bars — reveal ala shutter kamera saat load */}
      <LetterboxBars />

      <HudOverlay />

      {/* headline */}
      <div className="absolute inset-0 z-10 flex flex-col items-start justify-center gap-6 px-6 sm:px-10">
        <motion.h1
          variants={headlineContainer}
          initial="hidden"
          animate="show"
          className="font-display text-[13vw] leading-[0.85] tracking-tight text-film sm:text-[8.5vw]"
        >
          <span className="block overflow-hidden">
            <motion.span variants={headlineLine} className="block">
              CAMPAIGNS DIRECTED,
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span variants={headlineLine} className="block text-grade-amber-bright">
              NEVER FILMED.
            </motion.span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7, ease: EASE_OUT_EXPO }}
          className="max-w-md font-body text-film-dim sm:text-lg"
        >
          Ads by Dian — cinematic AI ads director. Crafting ads that
          convert, generated frame by frame: same craft as set and lens,
          new camera.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.7, ease: EASE_OUT_EXPO }}
          className="flex items-center gap-6 pt-2 font-mono text-sm tracking-wider"
        >
          <a
            href="#works"
            className="border-b border-film/40 pb-1 transition-colors duration-150 hover:border-grade-amber-bright hover:text-grade-amber-bright"
          >
            VIEW REEL ↓
          </a>
          <a
            href="#contact"
            className="border-b border-transparent pb-1 text-film-dim transition-colors duration-150 hover:border-grade-teal-bright hover:text-grade-teal-bright"
          >
            BOOK A CALL
          </a>
        </motion.div>
      </div>
    </section>
  );
}
