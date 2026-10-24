import * as React from "react"

import { cn } from "@/lib/utils"
import { inputClasses } from "@/components/ui/input-classes"

function Input({
  className,
  type,
  ...props
}) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        inputClasses,
        "h-11 file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        className
      )}
      {...props} />
  );
}

export { Input }
