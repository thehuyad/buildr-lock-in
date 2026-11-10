import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full resize-none rounded-none border-0 border-b border-input bg-transparent px-0 py-4 text-base leading-relaxed transition-colors duration-500 placeholder:text-muted-foreground/60 focus-visible:border-foreground focus-visible:outline-none aria-[invalid=true]:border-brand disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
