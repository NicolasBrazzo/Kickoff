import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ctaBand } from "./content";
import { h2, wrap } from "./layout";

// Strisce dell'erba (rettangoli in un pattern, non un gradiente) e linee del campo
const CourtLines = () => (
  <svg
    className="pointer-events-none absolute inset-0 size-full"
    viewBox="0 0 1200 500"
    preserveAspectRatio="xMaxYMid slice"
    aria-hidden="true"
  >
    <defs>
      <pattern id="kick-mow" width="160" height="160" patternUnits="userSpaceOnUse" patternTransform="rotate(-12)">
        <rect width="80" height="160" fill="#21402F" />
      </pattern>
    </defs>
    <rect width="1200" height="500" fill="url(#kick-mow)" />
    <g transform="translate(900 250) rotate(-12)" fill="none" stroke="rgba(230,229,220,0.22)" strokeWidth="1.5">
      <rect x="-280" y="-220" width="560" height="440" rx="4" />
      <line x1="0" y1="-220" x2="0" y2="220" />
      <circle cx="0" cy="0" r="72" />
      <rect x="-280" y="-95" width="90" height="190" />
      <rect x="190" y="-95" width="90" height="190" />
    </g>
  </svg>
);

export const CtaBand = () => (
  <section id="registrati" className="scroll-mt-28 pb-24">
    <div className={wrap}>
      <div className="relative overflow-hidden rounded-lg bg-turf px-6 py-14 text-cream md:px-[72px] md:py-24">
        <CourtLines />
        <div className="relative max-w-[640px]">
          <h2 className={cn(h2, "mt-0")}>{ctaBand.title}</h2>
          <p className="mt-6 max-w-[480px] text-[clamp(17px,1.5vw,20px)] leading-[1.55] text-cream/80">
            {ctaBand.text}
          </p>
          <div className="mt-10">
            <Button asChild variant="light" className="text-base">
              <Link to="/register">
                {ctaBand.cta}
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
);
