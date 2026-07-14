import { useEffect, useState } from "react";

/**
 * Menghasilkan string timecode HH:MM:SS:FF yang terus berjalan,
 * meniru readout kamera sinema di monitor on-set.
 * fps menentukan kecepatan digit terakhir (frame count).
 */
export function useTimecode(fps = 24) {
  const [tc, setTc] = useState("00:00:00:00");

  useEffect(() => {
    const start = performance.now();
    let frameId: number;

    const tick = (now: number) => {
      const elapsedSec = (now - start) / 1000;
      const totalFrames = Math.floor(elapsedSec * fps);
      const ff = totalFrames % fps;
      const totalSec = Math.floor(totalFrames / fps);
      const ss = totalSec % 60;
      const mm = Math.floor(totalSec / 60) % 60;
      const hh = Math.floor(totalSec / 3600);

      const pad = (n: number) => n.toString().padStart(2, "0");
      setTc(`${pad(hh)}:${pad(mm)}:${pad(ss)}:${pad(ff)}`);
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [fps]);

  return tc;
}
