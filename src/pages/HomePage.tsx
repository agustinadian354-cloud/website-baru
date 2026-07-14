import { Hero } from "../components/hero/Hero";
import { WorksList } from "../components/works/WorksList";
import { Studio } from "../components/studio/Studio";
import { useScrollToHash } from "../lib/useScrollToHash";

export function HomePage() {
  useScrollToHash();

  return (
    <>
      <Hero />
      <WorksList />
      <Studio />
    </>
  );
}
