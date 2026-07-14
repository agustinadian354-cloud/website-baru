import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Menyalakan momentum-scroll halus di seluruh halaman.
 * Dipasang sekali di root App — jangan dipasang ulang per section.
 * Otomatis nonaktif kalau user minta reduced motion.
 */
export function useLenis() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3), // ease-out-cubic, senada dgn --ease-out-expo
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const raf_id = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(raf_id);
      lenis.destroy();
    };
  }, []);
}
