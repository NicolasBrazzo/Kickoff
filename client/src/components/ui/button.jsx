import * as React from "react"
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-[10px] border border-transparent bg-clip-padding text-sm font-semibold whitespace-nowrap transition-all duration-200 ease-in-out outline-none select-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-danger [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-200 [&_svg:not([class*='size-'])]:size-[18px]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:-translate-y-px hover:bg-ink hover:shadow-[0_8px_20px_rgba(18,32,32,.10)] group-hover/button:*:data-[icon=inline-end]:translate-x-[3px]",
        light: "bg-cream text-ink hover:bg-white",
        ghost: "border-current/30 bg-transparent hover:border-current aria-expanded:border-current",
        // Senza bordo, per azioni con sola icona dentro card e modal
        quiet: "bg-transparent text-stone hover:bg-ink/5 hover:text-ink",
        destructive:
          "border-danger bg-transparent text-danger hover:bg-danger/8 focus-visible:ring-danger/30",
        link: "h-auto px-0 text-forest underline-offset-4 hover:text-leaf hover:underline",
      },
      size: {
        default:
          "h-13 gap-2 px-6 has-data-[icon=inline-end]:pr-5 has-data-[icon=inline-start]:pl-5",
        sm: "h-11 gap-1.5 px-4 has-data-[icon=inline-end]:pr-3.5 has-data-[icon=inline-start]:pl-3.5",
        icon: "size-11",
        "icon-sm": "size-9 [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} />
  );
}

export { Button, buttonVariants }
