import { cn } from "@/lib/utils";

// Etichetta maiuscola con il puntino leaf
export const Eyebrow = ({ children, className }) => (
  <span
    className={cn(
      "inline-flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.08em] before:size-2 before:rounded-full before:bg-leaf",
      className
    )}
  >
    {children}
  </span>
);
