import { useState, type FormEvent, type ReactNode } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { applicationSchema, type ApplicationKind } from "@/lib/application-schema";
import { submitApplication } from "@/lib/applications.functions";
import { REGISTRATION_FEE_LABEL, REGISTRATION_PAYMENT_URL } from "@/lib/lock-in";
import { BrandWord } from "@/components/site/BrandWord";

type ApplySearch = { type?: ApplicationKind };

export const Route = createFileRoute("/apply")({
  validateSearch: (search: Record<string, unknown>): ApplySearch => {
    const t = search["type"];
    return t === "waitlist" || t === "register" ? { type: t } : {};
  },
  head: () => ({
    meta: [
      { title: "Register for LOCK IN or join the waitlist | BUILDR" },
      {
        name: "description",
        content:
          "Register for the next BUILDR LOCK IN cohort, or join the waitlist to hear first when applications open.",
      },
      { property: "og:title", content: "Register for LOCK IN | BUILDR" },
      {
        property: "og:description",
        content: "Fifteen seats. Two weeks. Register for the next LOCK IN or join the waitlist.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Apply,
});

const options: { kind: ApplicationKind; title: ReactNode; body: string }[] = [
  {
    kind: "register",
    title: (
      <>
        Register for the next <BrandWord>Lock In</BrandWord>
      </>
    ),
    body: `Put yourself forward for one of fifteen seats. ${REGISTRATION_FEE_LABEL} registration fee.`,
  },
  {
    kind: "waitlist",
    title: "Join the waitlist",
    body: "Free. Hear first when the next cohort opens.",
  },
];

type Errors = Partial<Record<"fullName" | "email" | "phone" | "building" | "link", string>>;

function Apply() {
  const { type } = Route.useSearch();
  const navigate = useNavigate({ from: "/apply" });
  const kind: ApplicationKind = type ?? "register";
  const submit = useServerFn(submitApplication);

  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [doneKind, setDoneKind] = useState<ApplicationKind>(kind);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    const fd = new FormData(e.currentTarget);
    const raw = {
      kind,
      fullName: String(fd.get("fullName") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      building: String(fd.get("building") ?? ""),
      link: String(fd.get("link") ?? ""),
    };
    const parsed = applicationSchema.safeParse(raw);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      await submit({ data: raw });
      setDoneKind(kind);
      setStatus("done");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("idle");
    }
  }

  if (status === "done") {
    const registered = doneKind === "register";
    return (
      <section className="mx-auto max-w-3xl px-6 pb-16 pt-32 text-center md:pt-48">
        <div className="mx-auto flex size-14 animate-rise items-center justify-center rounded-full bg-brand text-brand-foreground">
          <Check className="size-6" />
        </div>
        <h1 className="headline mt-12 animate-rise text-4xl [animation-delay:120ms] md:text-6xl">
          {registered ? "One last step" : "You're on the list"}
          <span className="text-brand">.</span>
        </h1>
        <p className="mx-auto mt-8 max-w-md animate-rise text-base leading-relaxed text-muted-foreground [animation-delay:240ms]">
          {registered ? (
            <>
              Your details are saved. Pay the {REGISTRATION_FEE_LABEL} registration fee on Paystack
              to complete your registration for the next <BrandWord>LOCK IN</BrandWord>.
            </>
          ) : (
            <>
              Thank you for joining the waitlist. You'll hear from us when the next{" "}
              <BrandWord>LOCK IN</BrandWord> opens.
            </>
          )}
        </p>
        <div className="mt-14 flex animate-rise flex-col items-center justify-center gap-6 [animation-delay:320ms] sm:flex-row sm:gap-10">
          {registered && (
            <Button asChild size="lg">
              <a href={REGISTRATION_PAYMENT_URL} target="_blank" rel="noopener noreferrer">
                Pay {REGISTRATION_FEE_LABEL} on Paystack <ArrowUpRight />
              </a>
            </Button>
          )}
          <Button asChild variant="link">
            <Link to="/">
              Back to <BrandWord>BUILDR</BrandWord>
            </Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 pt-24 md:px-12 md:pt-44">
      <div className="grid gap-20 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5">
          <p className="eyebrow animate-rise">
            <BrandWord>Lock In</BrandWord>
          </p>
          <h1 className="headline mt-10 animate-rise text-5xl [animation-delay:120ms] md:text-7xl">
            Claim your two weeks<span className="text-brand">.</span>
          </h1>
          <p className="mt-10 max-w-sm animate-rise text-base leading-relaxed text-muted-foreground [animation-delay:240ms]">
            Fifteen members are selected for each <BrandWord>LOCK IN</BrandWord>. Register for the next
            cohort for {REGISTRATION_FEE_LABEL}, or join the waitlist for free and we'll let you know
            when it opens.
          </p>
        </div>

        <div className="animate-rise [animation-delay:300ms] md:col-span-6 md:col-start-7">
          <div role="radiogroup" aria-label="Choose an option" className="grid gap-px border bg-border sm:grid-cols-2">
            {options.map((o) => {
              const active = o.kind === kind;
              return (
                <button
                  key={o.kind}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => {
                    setErrors({});
                    navigate({ search: { type: o.kind }, replace: true, resetScroll: false });
                  }}
                  className={cn(
                    "flex flex-col items-start gap-3 p-6 text-left transition-colors duration-500 md:p-8",
                    active ? "bg-ink text-ink-foreground" : "bg-background hover:bg-ash",
                  )}
                >
                  <span
                    className={cn(
                      "size-2 rounded-full transition-colors duration-500",
                      active ? "bg-brand" : "bg-ash-deep",
                    )}
                  />
                  <span className="mt-2 text-base">{o.title}</span>
                  <span className={cn("text-sm", active ? "opacity-70" : "text-muted-foreground")}>
                    {o.body}
                  </span>
                </button>
              );
            })}
          </div>

          <form onSubmit={onSubmit} noValidate className="mt-16 space-y-10">
            <Field label="Full name" name="fullName" error={errors.fullName}>
              <Input id="fullName" name="fullName" autoComplete="name" maxLength={120} aria-invalid={!!errors.fullName} />
            </Field>
            <Field label="Email" name="email" error={errors.email}>
              <Input id="email" name="email" type="email" autoComplete="email" maxLength={255} aria-invalid={!!errors.email} />
            </Field>
            <Field label="Phone / WhatsApp" name="phone" optional error={errors.phone}>
              <Input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={40} />
            </Field>
            <Field
              label={
                kind === "register" ? (
                  <>
                    What will you build during <BrandWord>Lock In</BrandWord>?
                  </>
                ) : (
                  "What are you building?"
                )
              }
              name="building"
              optional={kind === "waitlist"}
              error={errors.building}
            >
              <Textarea
                id="building"
                name="building"
                maxLength={1500}
                placeholder="A sentence or two is enough."
                aria-invalid={!!errors.building}
              />
            </Field>
            <Field label="Link to your work" name="link" optional error={errors.link}>
              <Input id="link" name="link" type="url" placeholder="https://" maxLength={300} />
            </Field>

            {formError && <p className="text-sm text-brand">{formError}</p>}

            {kind === "register" && (
              <p className="text-sm leading-relaxed text-muted-foreground">
                Registration costs {REGISTRATION_FEE_LABEL}. After you submit, you'll pay it securely
                on Paystack to complete your registration.
              </p>
            )}

            <div className="pt-6">
              <Button type="submit" size="lg" disabled={status === "sending"} className="w-full sm:w-auto">
                {status === "sending"
                  ? "Sending…"
                  : kind === "register"
                    ? (
                      <>
                        Register for <BrandWord>Lock In</BrandWord>
                      </>
                    )
                    : "Join the waitlist"}
                {status !== "sending" && <ArrowRight />}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  optional,
  error,
  children,
}: {
  label: ReactNode;
  name: string;
  optional?: boolean | undefined;
  error?: string | undefined;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow flex items-baseline justify-between">
        <span>{label}</span>
        {optional && <span className="tracking-[0.2em] normal-case opacity-60">Optional</span>}
      </label>
      {children}
      {error && <p className="mt-3 text-sm text-brand">{error}</p>}
    </div>
  );
}
