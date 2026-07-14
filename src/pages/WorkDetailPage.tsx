import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getAdjacentWork, getWorkBySlug } from "../data/works";
import { LetterboxBars } from "../components/common/LetterboxBars";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
};

export function WorkDetailPage() {
  const { slug } = useParams();
  const work = getWorkBySlug(slug);
  const next = getAdjacentWork(slug);
  const [videoFailed, setVideoFailed] = useState(false);

  // reset saat pindah proyek, supaya proyek berikutnya tetap coba load videonya
  useEffect(() => {
    setVideoFailed(false);
  }, [slug]);

  // pindah proyek → mulai dari atas, bukan posisi scroll proyek sebelumnya
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [slug]);

  if (!work) {
    return (
      <div className="flex min-h-[60svh] flex-col items-center justify-center gap-4 px-6 pt-32 text-center">
        <p className="font-mono text-xs tracking-wider text-film-dim">
          SC.404 — SCENE NOT FOUND
        </p>
        <Link
          to="/#works"
          className="border-b border-film/40 pb-1 font-mono text-sm tracking-wider hover:border-grade-amber-bright hover:text-grade-amber-bright"
        >
          ← BACK TO REEL
        </Link>
      </div>
    );
  }

  return (
    <article>
      {/* header */}
      <div className="px-6 pb-10 pt-28 sm:px-10 sm:pt-36">
        <Link
          to="/#works"
          className="font-mono text-xs tracking-wider text-film-dim transition-colors duration-150 hover:text-grade-amber-bright"
        >
          ← REEL
        </Link>

        <motion.div initial="hidden" animate="show" variants={fadeUp} className="mt-6">
          <p className="font-mono text-xs tracking-wider text-grade-teal-bright">
            {work.scene}
          </p>
          <h1 className="mt-3 font-display text-[13vw] leading-[0.9] tracking-tight sm:text-7xl">
            {work.title}
          </h1>
        </motion.div>
      </div>

      {/* reel utama, framing letterbox konsisten dengan hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="relative aspect-video w-full overflow-hidden bg-ink-raised"
      >
        {work.video && !videoFailed ? (
          <video
            src={work.video}
            poster={work.thumbnail}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            onError={() => setVideoFailed(true)}
          />
        ) : (
          <div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${work.thumbnail})`,
              backgroundColor: "var(--color-ink-raised)",
            }}
          />
        )}
        <LetterboxBars />
      </motion.div>

      {/* kredit + sinopsis */}
      <div className="grid gap-12 px-6 py-16 sm:grid-cols-[1fr_1.4fr] sm:gap-16 sm:px-10 sm:py-24">
        <motion.dl
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="flex h-fit flex-col gap-4 border border-film/10 p-6 font-mono text-xs tracking-wider sm:p-8"
        >
          <p className="mb-2 text-film-dim">CREDITS</p>
          {work.credits.map((c) => (
            <div key={c.label} className="flex flex-col gap-1">
              <dt className="text-film-dim">{c.label}</dt>
              <dd className="text-film">{c.value}</dd>
            </div>
          ))}
          <div className="flex flex-col gap-1 pt-2">
            <dt className="text-film-dim">Client</dt>
            <dd className="text-film">{work.client}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-film-dim">Year</dt>
            <dd className="text-film">{work.year}</dd>
          </div>
        </motion.dl>

        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          transition={{ delay: 0.1 }}
          className="max-w-xl font-body text-lg leading-relaxed text-film-dim"
        >
          {work.synopsis}
        </motion.p>
      </div>

      {/* galeri still */}
      {work.stills.length > 0 && (
        <div className="grid grid-cols-1 gap-2 px-6 pb-16 sm:grid-cols-2 sm:px-10 sm:pb-24">
          {work.stills.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: i * 0.05 }}
              className="aspect-[4/3] bg-cover bg-center bg-ink-raised"
              style={{ backgroundImage: `url(${src})` }}
            />
          ))}
        </div>
      )}

      {/* next scene */}
      <Link
        to={`/works/${next.slug}`}
        className="group flex items-center justify-between border-t border-film/10 px-6 py-10 transition-colors duration-300 hover:bg-ink-raised sm:px-10 sm:py-14"
      >
        <span className="font-mono text-xs tracking-wider text-film-dim">
          NEXT — {next.scene}
        </span>
        <span className="font-display text-[8vw] leading-none tracking-tight text-film-dim transition-colors duration-300 group-hover:text-grade-amber-bright sm:text-4xl">
          {next.title} →
        </span>
      </Link>
    </article>
  );
}
