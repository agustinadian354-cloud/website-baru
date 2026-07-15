import { Outlet } from "react-router-dom";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { useLenis } from "../../lib/useLenis";
import { CutTransition } from "../common/CutTransition";

export function Layout() {
  useLenis();

  return (
    <div className="relative min-h-svh bg-ink text-film">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div className="grain" />
      <CutTransition />
      <Nav />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
