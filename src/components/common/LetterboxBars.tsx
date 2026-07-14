import { motion } from "framer-motion";

const EASE_SHUTTER = [0.65, 0, 0.35, 1] as const;

const barTopVariants = {
  closed: { height: "50%" },
  open: {
    height: "9%",
    transition: { duration: 1.1, ease: EASE_SHUTTER },
  },
};
const barBottomVariants = {
  closed: { height: "50%" },
  open: {
    height: "9%",
    transition: { duration: 1.1, ease: EASE_SHUTTER },
  },
};

/**
 * Bar hitam atas/bawah yang membuka seperti shutter kamera saat konten
 * dimuat. Taruh di dalam container `relative overflow-hidden`.
 */
export function LetterboxBars() {
  return (
    <>
      <motion.div
        variants={barTopVariants}
        initial="closed"
        animate="open"
        className="letterbox-top top-0"
      />
      <motion.div
        variants={barBottomVariants}
        initial="closed"
        animate="open"
        className="letterbox-bottom bottom-0"
      />
    </>
  );
}
