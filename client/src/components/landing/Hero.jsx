import { Link } from "react-router-dom";
import { ArrowRight, Check, CirclePlay } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingPanel } from "./BookingPanel";
import { BookingToast } from "./BookingToast";
import { hero } from "./content";
import { grid, wrap } from "./layout";

// Linee di un campo da calcio e di un campo da tennis, solo decorative
const HeroLines = () => (
  <svg
    className="pointer-events-none absolute inset-0 size-full"
    viewBox="0 0 1440 900"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    <g transform="translate(1030 470) rotate(-12)" fill="none" stroke="rgba(230,229,220,0.34)" strokeWidth="2">
      <rect x="-340" y="-520" width="680" height="1040" rx="4" />
      <line x1="-340" y1="0" x2="340" y2="0" />
      <circle cx="0" cy="0" r="96" />
      <circle cx="0" cy="0" r="4" fill="rgba(230,229,220,0.4)" />
      <rect x="-170" y="-520" width="340" height="150" />
      <rect x="-80" y="-520" width="160" height="60" />
      <path d="M -70 -370 A 80 80 0 0 0 70 -370" />
      <rect x="-170" y="370" width="340" height="150" />
      <rect x="-80" y="460" width="160" height="60" />
      <path d="M -70 370 A 80 80 0 0 1 70 370" />
    </g>
    <g transform="translate(150 820) rotate(-12)" fill="none" stroke="rgba(230,229,220,0.18)" strokeWidth="2">
      <rect x="-230" y="-120" width="460" height="240" fill="rgba(18,32,32,0.18)" />
      <line x1="0" y1="-120" x2="0" y2="120" />
      <line x1="-230" y1="-90" x2="230" y2="-90" />
      <line x1="-230" y1="90" x2="230" y2="90" />
      <line x1="-120" y1="-90" x2="-120" y2="90" />
      <line x1="120" y1="-90" x2="120" y2="90" />
      <line x1="-120" y1="0" x2="120" y2="0" />
    </g>
    <g>
      <circle cx="770" cy="150" r="7" fill="#E6E5DC" opacity="0.75" />
      <circle cx="1330" cy="190" r="7" fill="#E6E5DC" opacity="0.75" />
      <circle cx="700" cy="610" r="7" fill="#B9CF9A" opacity="0.85" />
      <circle cx="1360" cy="700" r="7" fill="#B9CF9A" opacity="0.85" />
      <circle cx="1120" cy="815" r="7" fill="#E6E5DC" opacity="0.75" />
      <circle cx="1210" cy="790" r="4" fill="#FFFFFF" />
    </g>
  </svg>
);

export const Hero = () => (
  <section className="kick-on-dark px-2.5 pt-2.5 md:px-3.5 md:pt-3.5">
    <div className="relative flex flex-col kick-turf overflow-hidden rounded-t-lg text-cream md:min-h-[880px]">
      <HeroLines />

      <div className="relative flex-1 pt-[120px] pb-14 md:flex md:items-center md:pt-[150px] md:pb-[72px]">
        <div className={wrap}>
          <div className={`${grid} items-center`}>
            <div className="col-span-full md:col-span-6">
              <h1 className="kick-fade font-serif text-[clamp(46px,7vw,92px)] leading-none tracking-[-0.02em]">
                {hero.titleLines[0]}
                <br />
                {hero.titleLines[1]}
              </h1>
              <p className="kick-fade kick-fade-2 mt-7 max-w-[470px] text-[clamp(17px,1.5vw,20px)] leading-[1.55] text-cream/80">
                {hero.lead}
              </p>
              <div className="kick-fade kick-fade-3 mt-10 flex flex-wrap gap-3">
                <Button asChild variant="light" className="text-base">
                  <Link to="/register">
                    {hero.primaryCta}
                    <ArrowRight data-icon="inline-end" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="text-base">
                  <a href="#come-funziona">
                    <CirclePlay data-icon="inline-start" strokeWidth={1.75} aria-hidden="true" />
                    {hero.secondaryCta}
                  </a>
                </Button>
              </div>
            </div>

            <div className="kick-fade kick-fade-2 col-span-full md:col-start-8 md:col-end-13">
              <div className="relative">
                <BookingPanel />
                <BookingToast />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ul className="relative grid border-t border-cream/12 md:grid-cols-3">
        {hero.strip.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2.5 px-5 py-[18px] text-[15px] text-cream/86 not-first:border-t not-first:border-cream/12 md:justify-center md:px-6 md:py-[22px] md:not-first:border-t-0 md:not-first:border-l"
          >
            <Check size={18} className="text-sage" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  </section>
);
