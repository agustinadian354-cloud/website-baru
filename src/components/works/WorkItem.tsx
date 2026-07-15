import { Link } from "react-router-dom";
import type { Work } from "../../data/works";

type Props = {
  work: Work;
  onEnter: () => void;
  onLeave: () => void;
};

export function WorkItem({ work, onEnter, onLeave }: Props) {
  return (
    <Link
      to={`/works/${work.slug}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group flex items-baseline justify-between gap-6 border-b border-film/10 py-8 transition-colors duration-300 hover:border-film/40 sm:py-10"
    >
      <span className="font-mono text-xs text-film-dim sm:text-sm">
        {work.scene}
      </span>

      <span className="flex-1 font-display text-[9vw] leading-none tracking-tight text-film-dim transition-colors duration-300 group-hover:text-film sm:text-6xl">
        {work.title}
      </span>

      <span className="hidden flex-col items-end font-mono text-xs text-film-dim sm:flex">
        <span>{work.client}</span>
        <span>{work.year}</span>
      </span>
    </Link>
  );
}
