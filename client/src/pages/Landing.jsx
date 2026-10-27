import { useRef } from "react";
import "@/components/landing/landing.css";
import { useReveal } from "@/hooks/useReveal";
import { LandingNav } from "@/components/landing/LandingNav";
import { Hero } from "@/components/landing/Hero";
import { FormationReveal } from "@/components/landing/FormationReveal";
import { Solution } from "@/components/landing/Solution";
import { DayTimeline } from "@/components/landing/DayTimeline";
import { Faq } from "@/components/landing/Faq";
import { CtaBand } from "@/components/landing/CtaBand";
import { LandingFooter } from "@/components/landing/LandingFooter";

export const Landing = () => {
  const rootRef = useRef(null);
  useReveal(rootRef);

  return (
    <div ref={rootRef} className="kick-landing min-h-screen bg-cream text-ink">
      <LandingNav />
      <main id="top">
        <Hero />
        <FormationReveal />
        <Solution />
        <DayTimeline />
        <Faq />
        <CtaBand />
      </main>
      <LandingFooter />
    </div>
  );
};
