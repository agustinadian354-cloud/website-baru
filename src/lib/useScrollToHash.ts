import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Setelah route berubah, kalau ada hash (#works, #studio) di URL,
 * scroll ke elemen tersebut. Diberi delay singkat supaya konten
 * halaman (dan Lenis) sempat mount dulu.
 */
export function useScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");
    const timeout = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 120);
    return () => clearTimeout(timeout);
  }, [location.pathname, location.hash]);
}
