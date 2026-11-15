import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { BrandWord } from "./BrandWord";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:h-24 md:px-12">
        <Link to="/" aria-label="BUILDR home" className="text-xl md:text-2xl">
          <Logo />
        </Link>
        <nav className="flex items-center gap-6 md:gap-12">
          <Link
            to="/lock-in"
            className="eyebrow transition-colors duration-500 hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
          >
            <BrandWord>Lock In</BrandWord>
          </Link>
          <Link
            to="/apply"
            className="eyebrow text-foreground transition-colors duration-500 hover:text-brand"
            activeProps={{ className: "text-brand" }}
          >
            Apply
          </Link>
        </nav>
      </div>
    </header>
  );
}
