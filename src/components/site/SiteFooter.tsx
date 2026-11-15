import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { BrandWord } from "./BrandWord";

export function SiteFooter() {
  return (
    <footer className="mt-32 md:mt-56">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="hairline" />
        <div className="flex flex-col gap-12 py-16 md:flex-row md:items-end md:justify-between md:py-24">
          <div className="space-y-6">
            <Logo className="text-3xl md:text-4xl" />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              A community for founders, entrepreneurs and builders.
            </p>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <Link to="/lock-in" className="eyebrow transition-colors hover:text-foreground">
              <BrandWord>Lock In</BrandWord>
            </Link>
            <Link to="/apply" className="eyebrow transition-colors hover:text-foreground">
              Apply / Waitlist
            </Link>
            <p className="eyebrow pt-6">© {new Date().getFullYear()} <BrandWord>BUILDR</BrandWord>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
