import { cn } from "@/lib/utils";

/** Typeset BUILDR logotype: black BUILD, red R, small TM. */
export function Logo({ className, showMark = true }: { className?: string; showMark?: boolean }) {
  return (
    <span className={cn("logotype inline-flex items-start text-foreground", className)}>
      <span>BUILD</span>
      <span className="text-brand">R</span>
      {showMark && (
        <span aria-hidden className="ml-[0.25em] text-[0.28em] tracking-normal">
          TM
        </span>
      )}
    </span>
  );
}
