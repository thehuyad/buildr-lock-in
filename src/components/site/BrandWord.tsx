import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Sets "BUILDR" / "LOCK IN" bolder than the text around it. */
export function BrandWord({ children, className }: { children: ReactNode; className?: string }) {
  return <strong className={cn("font-bold", className)}>{children}</strong>;
}
