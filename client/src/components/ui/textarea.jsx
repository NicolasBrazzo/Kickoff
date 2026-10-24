import * as React from "react"

import { cn } from "@/lib/utils"
import { inputClasses } from "@/components/ui/input-classes"

function Textarea({
  className,
  ...props
}) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(inputClasses, "flex field-sizing-content min-h-24 py-2.5", className)}
      {...props} />
  );
}

export { Textarea }
