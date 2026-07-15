import { motion } from "framer-motion";
import { useTimecode } from "../../lib/useTimecode";

const hudVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { delay: 0.9, duration: 0.6, ease: "easeOut" as const },
  },
};

export function HudOverlay() {
  const tc = useTimecode(24);

  return (
    <motion.div
      variants={hudVariants}
      initial="hidden"
      animate="show"
      className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-6 font-mono text-xs tracking-wider text-film/70 sm:p-10"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rec opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-rec" />
          </span>
          <span className="text-film">REC</span>
          <span className="text-film-dim">{tc}</span>
        </div>
        <div className="hidden text-right text-film-dim sm:block">
          <div>DIR — ADS BY DIAN</div>
          <div>24 FPS · 2.39:1</div>
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div className="text-film-dim">
          <div>LENS — SYNTHETIC 35MM</div>
          <div>GRADE — TEAL / AMBER</div>
        </div>
        <div className="text-right text-film-dim">SC.00 — SHOWREEL</div>
      </div>
    </motion.div>
  );
}
