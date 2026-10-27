import { Bell } from "lucide-react";
import { bookingToast } from "./content";

export const BookingToast = () => (
  <div className="relative mt-3.5 flex max-w-[330px] items-center gap-3 rounded-[10px] bg-cream py-3 pr-4 pl-3 text-ink shadow-[0_16px_36px_rgba(0,0,0,.24)] md:absolute md:-bottom-[34px] md:-left-10 md:m-0">
    <span className="flex size-10 flex-none items-center justify-center rounded-full bg-forest text-cream">
      <Bell size={18} strokeWidth={1.75} aria-hidden="true" />
    </span>
    <span className="flex min-w-0 flex-col gap-0.5">
      <span className="text-sm font-semibold">{bookingToast.title}</span>
      <span className="text-[13px] text-stone">{bookingToast.detail}</span>
    </span>
    <span className="ml-2 text-xs text-stone">{bookingToast.time}</span>
  </div>
);
