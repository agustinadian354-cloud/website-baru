import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/**
 * Setiap kali route berubah, layar "cut to black" sekilas lalu fade in
 * ke halaman baru — meniru cut antar-scene, bukan transisi generik.
 * Tidak jalan di pemuatan pertama (hero sudah punya reveal-nya sendiri).
 */
export function CutTransition() {
  const location = useLocation();
  const [flashId, setFlashId] = useState<number | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setFlashId(Date.now());
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {flashId !== null && (
        <motion.div
          key={flashId}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          onAnimationComplete={() => setFlashId(null)}
          className="pointer-events-none fixed inset-0 z-50 bg-ink"
        />
      )}
    </AnimatePresence>
  );
}
