import { cn } from "@/lib/utils";
import { bookingPanel } from "./content";

// Aspetto di ogni stato: b = prenotato, f = libero, n = appena prenotato
const slotClasses = {
  b: "bg-cream/86",
  f: "border border-dashed border-cream/26",
  n: "kick-pulse bg-signal",
};

const legendClasses = {
  f: "border border-dashed border-cream/45",
  b: "bg-cream/86",
  n: "bg-signal",
};

const row = "grid grid-cols-[70px_repeat(6,minmax(0,1fr))] items-center gap-1.5 md:grid-cols-[92px_repeat(6,minmax(0,1fr))] md:gap-2";

export const BookingPanel = () => (
  <div className="relative rounded-lg border border-cream/10 bg-ink p-4.5 shadow-[0_30px_60px_rgba(0,0,0,.28)] md:p-6">
    <div className="mb-4.5 flex items-baseline justify-between">
      <span className="font-serif text-[26px] leading-[1.2]">{bookingPanel.title}</span>
      <span className="text-sm text-cream/72">{bookingPanel.meta}</span>
    </div>

    <div className={cn(row, "mb-2.5 text-xs text-cream/62")} aria-hidden="true">
      <span />
      {bookingPanel.hours.map((hour) => (
        <span key={hour} className="text-center">{hour}</span>
      ))}
    </div>

    <div className="flex flex-col gap-2">
      {bookingPanel.rows.map(({ field, slots }) => (
        <div key={field} className={row}>
          <span className="text-sm font-medium">{field}</span>
          {slots.map((state, i) => (
            <span
              key={i}
              className={cn("h-8 rounded-md md:h-9.5", slotClasses[state])}
              aria-label={`${bookingPanel.hours[i]}:00, ${bookingPanel.legend[state].toLowerCase()}`}
              role="img"
            />
          ))}
        </div>
      ))}
    </div>

    <div className="mt-5 flex flex-wrap justify-end gap-x-5 gap-y-2 text-[13px] text-cream/72">
      {Object.entries(bookingPanel.legend).map(([state, label]) => (
        <span key={state} className="inline-flex items-center gap-2">
          <span className={cn("inline-block size-2.5 rounded-[3px]", legendClasses[state])} />
          {label}
        </span>
      ))}
    </div>
  </div>
);
