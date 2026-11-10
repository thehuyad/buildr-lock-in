import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { applicationSchema } from "./application-schema";

export const submitApplication = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => applicationSchema.parse(input))
  .handler(async ({ data }) => {
    const url = process.env["SUPABASE_URL"]!;
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
    const supabase = createClient<Database>(url, key, {
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
            h.delete("Authorization");
          }
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });

    const { error } = await supabase.from("lockin_applications").insert({
      kind: data.kind,
      full_name: data.fullName,
      email: data.email.toLowerCase(),
      phone: data.phone ?? null,
      building: data.building ?? null,
      link: data.link ?? null,
    });

    if (error) {
      console.error("Failed to save application", error.message);
      throw new Error("We couldn't save your details. Please try again.");
    }

    return { ok: true as const, kind: data.kind };
  });
