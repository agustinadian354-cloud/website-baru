import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { works, type Work } from "../../data/works";
import { WorkItem } from "./WorkItem";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function WorksList() {
  const [active, setActive] = useState<Work | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // posisi cursor mentah, lalu di-spring supaya preview terasa punya "bobot" (dolly lag)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 220, damping: 28, mass: 0.6 });
  const springY = useSpring(my, { stiffness: 220, damping: 28, mass: 0.6 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  }

  return (
    <section id="works" className="relative px-6 py-24 sm:px-10 sm:py-32">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        className="mb-10 font-mono text-xs tracking-wider text-film-dim sm:mb-16"
      >
        ( SHOT LIST — {works.length.toString().padStart(2, "0")} SCENES )
      </motion.p>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative"
      >
        {works.map((work, i) => (
          <motion.div
            key={work.scene}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: i * 0.06 }}
          >
            <WorkItem
              work={work}
              onEnter={() => setActive(work)}
              onLeave={() => setActive(null)}
            />
          </motion.div>
        ))}

        {/* preview gambar mengikuti cursor, hanya di layar besar */}
        <AnimatePresence>
          {active && (
            <motion.div
              key={active.scene}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
              style={{ left: springX, top: springY }}
              className="pointer-events-none absolute z-20 hidden h-44 w-64 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-sm border border-film/10 bg-ink-raised bg-cover bg-center sm:block"
              // fallback warna kalau thumbnail belum ada — ganti path di src/data/works.ts
            >
              <div
                className="h-full w-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${active.thumbnail})`,
                  backgroundColor: "var(--color-ink-raised)",
                }}
              />
              <div className="absolute bottom-2 left-2 font-mono text-[10px] tracking-wider text-film-dim">
                {active.role}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
