import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { Eyebrow } from "./Eyebrow";
import { PlayerCard } from "./PlayerCard";
import { formation, problem } from "./content";
import { grid, h2, wrap } from "./layout";

// Linee di metà campo viste dall'alto, solo decorative
const FieldLines = () => (
  <svg className="absolute inset-0 size-full" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice">
    <g fill="none" stroke="rgba(230,229,220,0.32)" strokeWidth="2" vectorEffect="non-scaling-stroke">
      <rect x="40" y="40" width="920" height="620" rx="3" vectorEffect="non-scaling-stroke" />
      <path d="M390 40 A110 110 0 0 0 610 40" vectorEffect="non-scaling-stroke" />
      <rect x="227.5" y="465" width="545" height="195" vectorEffect="non-scaling-stroke" />
      <rect x="376" y="595" width="248" height="65" vectorEffect="non-scaling-stroke" />
      <path d="M413.75 465 A108 108 0 0 1 586.25 465" vectorEffect="non-scaling-stroke" />
    </g>
    <circle cx="500" cy="40" r="4" fill="rgba(230,229,220,0.4)" />
    <circle cx="500" cy="530" r="4" fill="rgba(230,229,220,0.4)" />
  </svg>
);

// "Il problema" sta sotto un campo che continua la hero: scorrendo, tessere e giocatori volano via
export const FormationReveal = () => {
  const sectionRef = useRef(null);
  const spacerRef = useRef(null);
  useScrollProgress(sectionRef, spacerRef);

  return (
    <section ref={sectionRef} className="relative">
      <div className="sticky top-0">
        <div className="kick-xp-content flex min-h-[min(100vh,1200px)] items-center pt-28 pb-20">
          <div className={wrap}>
            <div className={grid}>
              <div className="col-span-full md:col-span-6">
                <Eyebrow>{problem.eyebrow}</Eyebrow>
                <h2 className={h2}>{problem.title}</h2>
              </div>

              <ul className={cn(grid, "col-span-full")}>
                {problem.items.map(({ icon, title, text }, i) => {
                  const Icon = icon;

                  return (
                    <li key={title} className="col-span-full flex flex-col gap-3.5 border-t border-ink/16 pt-7 md:col-span-4">
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-xl text-stone">{String(i + 1).padStart(2, "0")}</span>
                        <Icon size={24} strokeWidth={1.5} className="text-forest" aria-hidden="true" />
                      </div>
                      <h3 className="mt-3 font-serif text-[26px] leading-[1.2]">{title}</h3>
                      <p className="text-[17px] leading-[1.6] text-stone">{text}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        <div
          className="kick-xp-overlay pointer-events-none absolute inset-x-0 top-0 h-[min(100vh,1200px)] overflow-hidden"
          aria-hidden="true"
        >
          <div className="kick-xp-panel absolute inset-x-2.5 top-0 bottom-2.5 md:inset-x-3.5 md:bottom-3.5">
            {formation.tiles.map(({ ux, uy, s }, i) => (
              <div
                key={i}
                className={cn("kick-tile absolute bg-turf", i === 8 && "rounded-bl-lg", i === 11 && "rounded-br-lg")}
                style={{ left: `${(i % 4) * 25}%`, top: `${Math.floor(i / 4) * 33.333}%`, "--ux": ux, "--uy": uy, "--s": s }}
              />
            ))}

            <div className="kick-xp-lines kick-turf absolute inset-0 overflow-hidden rounded-b-lg text-cream">
              <FieldLines />
              <div className="absolute bottom-5 left-[22px] flex flex-col gap-0.5 md:bottom-7 md:left-8">
                <span className="font-serif text-[22px] leading-[1.2]">{formation.label}</span>
                <span className="text-sm text-cream/78">{formation.meta}</span>
              </div>
              <div className="absolute right-[22px] bottom-[22px] flex items-center gap-2 text-sm text-cream/80 md:right-8 md:bottom-[30px]">
                {formation.hint}
                <ArrowDown size={18} className="kick-hint-icon" />
              </div>
            </div>

            {formation.players.map((player) => (
              <PlayerCard key={player.name} {...player} />
            ))}
          </div>
        </div>
      </div>

      <div ref={spacerRef} className="h-[1100px]" />
    </section>
  );
};
