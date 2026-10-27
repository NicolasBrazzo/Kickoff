import { cn } from "@/lib/utils";

// "Kickoff." in serif, con il punto in signal
export const Logo = ({ className }) => (
  <span className={cn("font-serif text-[28px] leading-none tracking-[-0.02em]", className)}>
    Kickoff<span className="text-signal">.</span>
  </span>
);
