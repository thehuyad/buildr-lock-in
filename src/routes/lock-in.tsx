import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CallToAction } from "@/components/site/CallToAction";
import { photos } from "@/lib/photos";

export const Route = createFileRoute("/lock-in")({
  head: () => ({
    meta: [
      { title: "LOCK IN — Two weeks of nothing but building | BUILDR" },
      {
        name: "description",
        content:
          "LOCK IN is BUILDR's bootcamp. Twice a year, 15 members move into camp for two weeks with accommodation, meals, power and internet provided free.",
      },
      { property: "og:title", content: "LOCK IN by BUILDR" },
      {
        property: "og:description",
        content: "15 builders. 14 days. Everything provided. Nothing but building.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LockIn,
});

const steps = [
  {
    title: "Register",
    body: "Tell us who you are and what you want to build. Registration opens ahead of each cohort.",
  },
  {
    title: "Get selected",
    body: "Fifteen members of the BUILDR community are chosen for each LOCK IN.",
  },
  {
    title: "Move in",
    body: "Leave home behind. Arrive at the camp with your laptop and your idea.",
  },
  {
    title: "Build",
    body: "Fourteen days. No distractions, no chores, no excuses. Just the work.",
  },
];

const covered = [
  { title: "Accommodation", body: "A place to sleep and work, for the full two weeks." },
  { title: "Feeding", body: "Meals are handled, every day, so you never have to stop." },
  { title: "Electricity", body: "Steady power, so your work never waits." },
  { title: "Internet", body: "Reliable connection for shipping, deploying and learning." },
];

const faqs = [
  {
    q: "Who can join LOCK IN?",
    a: "LOCK IN is for members of the BUILDR community — founders, entrepreneurs and builders with something real to work on.",
  },
  {
    q: "How much does it cost?",
    a: "Nothing. Accommodation, feeding, electricity, internet and other necessities are provided for free.",
  },
  {
    q: "How long is it, and how often does it happen?",
    a: "Each LOCK IN runs for two weeks, and there are two cohorts every year.",
  },
  {
    q: "How many people are selected?",
    a: "Fifteen members per cohort. Keeping it small keeps it focused.",
  },
  {
    q: "What if registration is closed?",
    a: "Join the waitlist and you'll be among the first to know when the next cohort opens.",
  },
];

function LockIn() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-24 md:px-12 md:pb-40 md:pt-44">
        <p className="eyebrow animate-rise">The BUILDR bootcamp</p>
        <h1 className="logotype mt-10 animate-rise text-7xl [animation-delay:120ms] sm:text-8xl md:text-[11rem]">
          Lock <span className="text-brand">In</span>
        </h1>
        <div className="mt-14 grid animate-rise gap-12 [animation-delay:240ms] md:mt-20 md:grid-cols-12">
          <p className="display text-2xl leading-snug md:col-span-7 md:text-4xl">
            Two weeks. Fifteen builders. Nothing but building<span className="text-brand">.</span>
          </p>
          <div className="flex flex-col items-start gap-6 md:col-span-4 md:col-start-9 md:items-end md:justify-end">
            <Button asChild size="lg">
              <Link to="/apply" search={{ type: "register" }}>
                Register <ArrowRight />
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

      <section className="mx-auto max-w-7xl animate-fade px-6 [animation-delay:400ms] md:px-12">
        <div className="aspect-[4/5] overflow-hidden bg-ash sm:aspect-[16/8]">
          <img
            src={photos.speakerTalk}
            alt="A BUILDR member speaking to the room"
            className="h-full w-full object-cover object-[45%_30%]"
          />
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-6 pt-32 md:px-12 md:pt-56">
        <div className="grid gap-10 md:grid-cols-12">
          <p className="eyebrow md:col-span-4">How it works</p>
          <h2 className="display text-4xl md:col-span-8 md:text-6xl">
            Leave home. Lock in. Come back with something built
            <span className="text-brand">.</span>
          </h2>
        </div>
        <ol className="mt-20 grid border-t md:mt-32 md:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="border-b py-12 md:border-b-0 md:border-r md:px-8 md:py-16 md:first:pl-0 md:last:border-r-0">
              <span className="eyebrow text-brand">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-8 text-xl font-normal md:text-2xl">{step.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* What's covered */}
      <section className="mx-auto max-w-7xl px-6 pt-32 md:px-12 md:pt-56">
        <div className="grid gap-16 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <div className="aspect-[4/5] overflow-hidden bg-ash">
              <img
                src={photos.membersSeated}
                alt="BUILDR members seated during a session"
                className="h-full w-full object-cover object-[50%_30%]"
                loading="lazy"
              />
            </div>
          </div>
          <div className="md:col-span-6 md:col-start-7 md:pt-16">
            <p className="eyebrow">What's covered</p>
            <h2 className="display mt-8 text-4xl md:text-6xl">
              Free, for all two weeks<span className="text-brand">.</span>
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
              Feeding and every other necessity is taken care of, so the only thing on your mind is
              the thing you're building.
            </p>
            <dl className="mt-16 grid gap-x-10 sm:grid-cols-2">
              {covered.map((c) => (
                <div key={c.title} className="border-t py-8">
                  <dt className="text-lg">{c.title}</dt>
                  <dd className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-6 pt-32 md:px-12 md:pt-56">
        <div className="grid gap-10 md:grid-cols-12">
          <p className="eyebrow md:col-span-4">Questions</p>
          <Accordion type="single" collapsible className="border-t md:col-span-8">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`q-${i}`}>
                <AccordionTrigger className="py-8 text-left text-lg font-normal hover:no-underline md:text-xl">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="max-w-xl pb-8 text-base leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
