import { Logo } from "@/components/Logo";
import { footer } from "./content";
import { grid, wrap } from "./layout";

export const LandingFooter = () => (
  <footer className="border-t border-ink/12 pt-[72px] pb-10">
    <div className={wrap}>
      <div className={grid}>
        <div className="col-span-full md:col-span-4">
          <a href="#top" aria-label="Kickoff, torna all'inizio" className="inline-block py-2 text-ink">
            <Logo className="text-[30px]" />
          </a>
          <p className="mt-3.5 max-w-[260px] text-[15px] leading-[1.6] text-stone">{footer.tagline}</p>
        </div>

        <div className="col-span-full grid grid-cols-3 gap-x-4 gap-y-8 md:col-start-6 md:col-end-13 md:gap-x-6">
          {footer.columns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em]">{column.title}</h3>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="-my-[5px] inline-block py-[5px] text-[15px] text-stone transition-colors hover:text-ink">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="col-span-full border-t border-ink/12 pt-6 text-sm text-stone">{footer.copyright}</div>
      </div>
    </div>
  </footer>
);
