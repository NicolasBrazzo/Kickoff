import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { faq } from "./content";
import { grid, h2, section, wrap } from "./layout";

export const Faq = () => (
  <section id="faq" className={`${section} scroll-mt-28 border-t border-ink/10`}>
    <div className={wrap}>
      <div className={grid}>
        <div className="kick-reveal col-span-full md:col-span-4">
          <h2 className={cn(h2, "mt-0")}>{faq.title}</h2>
          <p className="mt-5 text-[17px] leading-[1.6] text-stone">
            {faq.contactPrefix}{" "}
            <a href={faq.contactHref} className="text-ink underline underline-offset-[3px] hover:text-leaf">
              {faq.contactLabel}
            </a>
            .
          </p>
        </div>

        <div className="kick-reveal kick-faq col-span-full border-t border-ink/16 md:col-start-6 md:col-end-13">
          {faq.items.map(({ question, answer }, i) => (
            <details key={question} open={i === 0} className="group border-b border-ink/16">
              <summary className="group/summary flex min-h-11 cursor-pointer items-center justify-between gap-6 py-6 text-[clamp(18px,1.6vw,21px)] leading-[1.2] font-medium">
                {question}
                <span className="flex size-9 flex-none items-center justify-center rounded-full border border-ink/20 transition-[rotate,background-color,color,border-color] duration-300 group-open:rotate-180 group-hover/summary:border-forest group-hover/summary:bg-forest group-hover/summary:text-cream">
                  <ChevronDown size={18} aria-hidden="true" />
                </span>
              </summary>
              <p className="pr-14 pb-7 text-[17px] leading-[1.6] text-stone">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  </section>
);
