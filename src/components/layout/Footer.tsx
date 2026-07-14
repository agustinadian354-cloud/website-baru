export function Footer() {
  return (
    <footer
      id="contact"
      className="relative border-t border-film/10 px-6 py-16 sm:px-10"
    >
      <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs tracking-wider text-film-dim">
            ( CUT TO )
          </p>
          <h2 className="mt-3 max-w-lg font-display text-4xl leading-[0.95] tracking-tight sm:text-6xl">
            LET&apos;S DIRECT
            <br />
            YOUR NEXT SPOT.
          </h2>
        </div>

        <div className="flex flex-col gap-2 font-mono text-sm text-film-dim">
          <a
            href="mailto:hello@example.com"
            className="transition-colors duration-150 hover:text-grade-amber-bright"
          >
            hello@example.com
          </a>
          <a
            href="#"
            className="transition-colors duration-150 hover:text-grade-teal-bright"
          >
            Instagram
          </a>
          <a
            href="#"
            className="transition-colors duration-150 hover:text-grade-teal-bright"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <p className="mt-16 font-mono text-xs text-film-dim/60">
        © 2026 — built with React, Three.js &amp; Framer Motion.
      </p>
    </footer>
  );
}
