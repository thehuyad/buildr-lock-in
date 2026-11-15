import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandWord } from "./BrandWord";

export function CallToAction() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-32 md:px-12 md:pt-56">
      <div className="bg-ash px-6 py-24 text-center md:px-16 md:py-40">
        <p className="eyebrow">
          <BrandWord>Lock In</BrandWord>
        </p>
        <h2 className="display mx-auto mt-8 max-w-3xl text-4xl md:text-7xl">
          The next <BrandWord>LOCK IN</BrandWord> is coming
          <span className="text-brand">.</span>
        </h2>
        <p className="mx-auto mt-8 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
          Fifteen seats. Register for the next cohort, or join the waitlist to hear the moment
          applications open.
        </p>
        <div className="mt-14 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10">
          <Button asChild size="lg">
            <Link to="/apply" search={{ type: "register" }}>
              Register for <BrandWord>Lock In</BrandWord> <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="link">
            <Link to="/apply" search={{ type: "waitlist" }}>
              Join the waitlist
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
