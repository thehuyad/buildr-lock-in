import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CallToAction } from "@/components/site/CallToAction";
import { BrandWord } from "@/components/site/BrandWord";
import { photos } from "@/lib/photos";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BUILDR — A community for founders, entrepreneurs and builders" },
      {
        name: "description",
        content:
          "BUILDR is a community for people who build. Twice a year, 15 members are selected for LOCK IN — two free weeks of nothing but building.",
      },
      { property: "og:title", content: "BUILDR — A community for builders" },
      {
        property: "og:description",
        content:
          "Twice a year, 15 BUILDR members leave home for LOCK IN: two weeks, everything provided, nothing but building.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const stats = [
  { value: "15", label: "Builders selected" },
  { value: "14", label: "Days, uninterrupted" },
  { value: "2×", label: "Cohorts every year" },
  { value: "0", label: "Cost to attend" },
];

const provided = ["Accommodation", "Meals, every day", "Electricity", "Internet", "Everything else"];

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-24 md:px-12 md:pb-40 md:pt-44">
        <p className="eyebrow animate-rise">A community for builders</p>
        <h1 className="headline mt-10 max-w-5xl animate-rise text-[2.75rem] [animation-delay:120ms] sm:text-6xl md:text-[6.5rem]">
          For the ones who actually build<span className="text-brand">.</span>
        </h1>
        <div className="mt-14 grid animate-rise gap-14 [animation-delay:240ms] md:mt-20 md:grid-cols-12">
          <p className="max-w-md text-base leading-relaxed text-muted-foreground md:col-span-5 md:text-lg">
            <BrandWord>BUILDR</BrandWord> brings founders, entrepreneurs and builders together.
            Twice a year, fifteen of us leave everything behind to <BrandWord>lock in</BrandWord>.
          </p>
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-10 md:col-span-7 md:justify-end">
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

      {/* Wide image */}
      <section className="mx-auto max-w-7xl animate-fade px-6 [animation-delay:400ms] md:px-12">
        <div className="photo aspect-[4/5] sm:aspect-[16/9]">
          <img
            src={photos.teamArmsOut}
            alt="Four BUILDR members standing with arms outstretched in front of a red-striped wall"
            className="h-full w-full object-cover object-[42%_50%]"
          />
        </div>
      </section>

      {/* Community */}
      <section className="mx-auto max-w-7xl px-6 pt-32 md:px-12 md:pt-56">
        <div className="grid gap-10 md:grid-cols-12">
          <p className="eyebrow md:col-span-4">01 — The community</p>
          <div className="md:col-span-8">
            <p className="display text-3xl leading-[1.2] md:text-5xl md:leading-[1.15]">
              A quiet room full of people making things. Founders, entrepreneurs and builders who
              would rather ship than talk about shipping.
            </p>
            <p className="mt-12 max-w-lg text-base leading-relaxed text-muted-foreground">
              <BrandWord>BUILDR</BrandWord> is where we learn from each other, hold each other accountable and keep moving.
              No noise. Just the work, and the people doing it with you.
            </p>
          </div>
        </div>
      </section>

      {/* Lock In intro */}
      <section className="mx-auto max-w-7xl px-6 pt-32 md:px-12 md:pt-56">
        <div className="grid gap-10 md:grid-cols-12">
          <p className="eyebrow md:col-span-4">02 — The bootcamp</p>
          <div className="md:col-span-8">
            <h2 className="logotype text-6xl md:text-9xl">
              Lock <span className="text-brand">In</span>
            </h2>
            <p className="mt-10 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Twice a year, fifteen members of the community are selected. They leave their homes,
              move into the camp and spend two weeks doing nothing but building.
            </p>
            <Link
              to="/lock-in"
              className="eyebrow mt-12 inline-flex items-center gap-3 text-foreground transition-colors duration-500 hover:text-brand"
            >
              How <BrandWord>Lock In</BrandWord> works <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        <dl className="mt-24 grid grid-cols-2 border-t md:mt-40 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse border-b py-12 pr-6 md:border-b-0 md:py-16">
              <dt className="eyebrow mt-6">{s.label}</dt>
              <dd className="display text-5xl md:text-7xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Taken care of */}
      <section className="mx-auto max-w-7xl px-6 pt-32 md:px-12 md:pt-56">
        <div className="grid items-center gap-16 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <p className="eyebrow">03 — Provided</p>
            <h2 className="display mt-8 text-4xl md:text-6xl">
              Everything else is taken care of<span className="text-brand">.</span>
            </h2>
            <p className="mt-8 max-w-sm text-base leading-relaxed text-muted-foreground">
              For two weeks, it's all free. Your only job is the thing you're building.
            </p>
            <ul className="mt-14 border-t">
              {provided.map((item, i) => (
                <li key={item} className="flex items-baseline gap-6 border-b py-5">
                  <span className="eyebrow w-6">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-base md:text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <div className="photo aspect-[4/5]">
              <img
                src={photos.speakerFromBehind}
                alt="A BUILDR member presenting, seen from the audience"
                className="h-full w-full object-cover object-[62%_50%]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-7xl px-6 pt-32 md:px-12 md:pt-56">
        <p className="eyebrow">04 — Moments</p>
        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-12 md:gap-8">
          <div className="photo aspect-[4/3] md:col-span-7">
            <img
              src={photos.audienceColour}
              alt="BUILDR members seated in rows, listening closely"
              className="h-full w-full object-cover object-center"
              loading="lazy"
            />
          </div>
          <div className="photo aspect-[4/3] md:col-span-5 md:mt-32 md:aspect-[4/5]">
            <img
              src={photos.speakerGesture}
              alt="A speaker presenting at BUILDR"
              className="h-full w-full object-cover object-[48%_40%]"
              loading="lazy"
            />
          </div>
          <div className="photo aspect-[4/3] md:col-span-6 md:col-start-4 md:mt-8 md:aspect-[16/10]">
            <img
              src={photos.audienceMono}
              alt="BUILDR members listening attentively, in black and white"
              className="h-full w-full object-cover object-center"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
