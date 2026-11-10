import { describe, expect, it } from "vitest";
import { applicationSchema } from "@/lib/application-schema";

const base = { fullName: "Ada Obi", email: "ada@example.com" };

describe("LOCK IN application rules", () => {
  it("requires registrants to say what they'll build", () => {
    const result = applicationSchema.safeParse({ ...base, kind: "register" });
    expect(result.success).toBe(false);
  });

  it("lets waitlist sign-ups skip what they're building", () => {
    const result = applicationSchema.safeParse({ ...base, kind: "waitlist" });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = applicationSchema.safeParse({ ...base, email: "nope", kind: "waitlist" });
    expect(result.success).toBe(false);
  });
});
