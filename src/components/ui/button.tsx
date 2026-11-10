import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-none text-[0.6875rem] font-medium uppercase tracking-[0.28em] cursor-pointer transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-brand hover:text-brand-foreground",
        brand: "bg-brand text-brand-foreground hover:bg-ink hover:text-ink-foreground",
        outline:
          "border border-foreground/80 bg-transparent text-foreground hover:bg-foreground hover:text-background",
        secondary: "bg-secondary text-secondary-foreground hover:bg-ash-deep",
        ghost: "text-foreground hover:text-brand",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link: "h-auto px-0 text-foreground underline-offset-8 decoration-brand hover:underline",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4",
        lg: "h-14 px-10",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
