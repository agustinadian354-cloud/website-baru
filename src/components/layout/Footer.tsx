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
          <p className="mt-4 max-w-md font-body text-sm text-film-dim">
            Ads by Dian — cinematic AI ads director, crafting ads that
            convert.
          </p>
        </div>

        <div className="flex flex-col gap-2 font-mono text-sm text-film-dim">
          <a
            href="mailto:adsbydian@gmail.com"
            className="transition-colors duration-150 hover:text-grade-amber-bright"
          >
            adsbydian@gmail.com
          </a>
          <a
            href="https://www.instagram.com/adsby.dian"
            target="_blank"
            rel="noreferrer"
            className="transition-colors duration-150 hover:text-grade-teal-bright"
          >
            Instagram
          </a>
          <a
            href="https://www.tiktok.com/@adsby.dian"
            target="_blank"
            rel="noreferrer"
            className="transition-colors duration-150 hover:text-grade-teal-bright"
          >
            TikTok
          </a>
          <a
            href="https://www.linkedin.com/in/adsby-dian-6489a541b/"
            target="_blank"
            rel="noreferrer"
            className="transition-colors duration-150 hover:text-grade-teal-bright"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <p className="mt-16 font-mono text-xs text-film-dim/60">
        © 2026 Ads by Dian — built with React, Three.js &amp; Framer Motion.
      </p>
    </footer>
  );
}
