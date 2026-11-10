import { z } from "zod";

export const applicationKinds = ["register", "waitlist"] as const;
export type ApplicationKind = (typeof applicationKinds)[number];

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : undefined));

export const applicationSchema = z
  .object({
    kind: z.enum(applicationKinds),
    fullName: z.string().trim().min(1, "Please tell us your name").max(120),
    email: z.string().trim().email("Please enter a valid email").max(255),
    phone: optionalText(40),
    building: optionalText(1500),
    link: optionalText(300),
  })
  .superRefine((data, ctx) => {
    // Registering for LOCK IN needs to say what you'll build; the waitlist doesn't.
    if (data.kind === "register" && !data.building) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["building"],
        message: "Tell us what you'll build during LOCK IN",
      });
    }
  });

export type ApplicationInput = z.input<typeof applicationSchema>;
