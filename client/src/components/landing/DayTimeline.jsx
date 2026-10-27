import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";
import { timeline } from "./content";
import { grid, h2, section, wrap } from "./layout";

export const DayTimeline = () => (
  <section id="come-funziona" className={`${section} scroll-mt-28 border-t border-ink/10`}>
    <div className={wrap}>
      <div className={grid}>
        <div className="col-span-full self-start md:sticky md:top-[130px] md:col-span-5">
          <Eyebrow>{timeline.eyebrow}</Eyebrow>
          <h2 className={h2}>{timeline.title}</h2>
        </div>

        <ol className="col-span-full md:col-start-7 md:col-end-13">
          {timeline.steps.map(({ icon, time, text, highlight }, i) => {
            const Icon = icon;

            return (
              <li
                key={i}
                className="group relative grid grid-cols-[44px_minmax(0,1fr)] gap-x-5 pb-10 last:pb-0 before:absolute before:top-12 before:bottom-1 before:left-[21px] before:w-px before:bg-ink/18 last:before:hidden"
              >
                <span
                  className={cn(
                    "flex size-11 items-center justify-center rounded-full border transition-colors duration-300",
                    highlight
                      ? "border-forest bg-forest text-sage"
                      : "border-ink/20 bg-cream text-ink group-hover:border-leaf group-hover:text-leaf"
                  )}
                >
                  <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <div className="pt-1">
                  <span className="font-serif text-[30px] leading-none">{time}</span>
                  <p className="mt-2.5 text-lg leading-[1.55] text-stone">{text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  </section>
);
