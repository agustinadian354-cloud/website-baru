import { motion } from "framer-motion";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
};

const process = [
  { n: "01", label: "Treatment" },
  { n: "02", label: "Prompt design" },
  { n: "03", label: "Generation" },
  { n: "04", label: "Edit" },
  { n: "05", label: "Grade" },
];

const capabilities = [
  { label: "Direction", value: "Concept, treatment, shot list" },
  { label: "Prompt engineering", value: "Model-specific, reproducible" },
  { label: "Color grade", value: "Diffusion output → broadcast-ready" },
  { label: "Sound design", value: "Score, foley, mix" },
  { label: "Delivery", value: "All aspect ratios, all platforms" },
];

export function Studio() {
  return (
    <section
      id="studio"
      className="relative border-t border-film/10 px-6 py-24 sm:px-10 sm:py-32"
    >
      <motion.p
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="mb-10 font-mono text-xs tracking-wider text-film-dim sm:mb-16"
      >
        ( THE DIRECTOR )
      </motion.p>

      <div className="grid gap-16 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
        <div>
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="font-display text-[11vw] leading-[0.9] tracking-tight sm:text-6xl"
          >
            SHOT ON 35MM.
            <br />
            <span className="text-grade-amber-bright">RENDERED IN LATENT SPACE.</span>
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ delay: 0.1 }}
            className="mt-8 max-w-xl font-body text-film-dim sm:text-lg"
          >
            I spent years directing commercials the traditional way — call
            sheets, lighting rigs, wrap parties. Now I direct the same way,
            except the camera is a diffusion model and the studio is a
            prompt. The craft doesn&apos;t change: composition, pacing,
            performance. Only the gear does.
          </motion.p>

          <motion.a
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ delay: 0.2 }}
            href="#contact"
            className="mt-8 inline-block border-b border-film/40 pb-1 font-mono text-sm tracking-wider transition-colors duration-150 hover:border-grade-amber-bright hover:text-grade-amber-bright"
          >
            BOOK A CALL ↗
          </motion.a>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          transition={{ delay: 0.15 }}
          className="h-fit border border-film/10 p-6 font-mono text-xs tracking-wider sm:p-8"
        >
          <p className="mb-6 text-film-dim">SPEC SHEET</p>
          <dl className="flex flex-col gap-4">
            {capabilities.map((c) => (
              <div key={c.label} className="flex flex-col gap-1">
                <dt className="text-film">{c.label}</dt>
                <dd className="text-film-dim">{c.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>

      {/* process — pipeline produksi nyata, urutan ini memang berarti */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        transition={{ delay: 0.1 }}
        className="mt-20 flex flex-wrap gap-x-10 gap-y-6 border-t border-film/10 pt-10 sm:mt-28"
      >
        {process.map((p) => (
          <div key={p.n} className="flex items-baseline gap-3">
            <span className="font-mono text-xs text-grade-teal-bright">
              {p.n}
            </span>
            <span className="font-mono text-xs tracking-wider text-film-dim">
              {p.label}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
