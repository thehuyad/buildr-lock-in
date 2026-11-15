import { describe, expect, it } from "vitest";
import { REGISTRATION_FEE_LABEL, REGISTRATION_FEE_USD, REGISTRATION_PAYMENT_URL } from "@/lib/lock-in";

describe("LOCK IN registration fee", () => {
  it("costs $1", () => {
    expect(REGISTRATION_FEE_USD).toBe(1);
    expect(REGISTRATION_FEE_LABEL).toBe("$1");
  });

  it("is paid through the BUILDR Paystack page", () => {
    expect(REGISTRATION_PAYMENT_URL).toBe("https://paystack.shop/pay/lockinbybuildr");
  });
});
