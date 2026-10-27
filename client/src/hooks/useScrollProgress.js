import { useEffect } from "react";

// Scrive sulla sezione --p (avanzamento lineare 0-1 lungo lo spaziatore)
// ed --e (avanzamento con ease-in-out cubica, che parte dopo il primo 10%).
// Aggiorna le variabili CSS direttamente, senza re-render.
export const useScrollProgress = (sectionRef, spacerRef) => {
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const len = spacerRef.current?.offsetHeight || 1;
      const p = Math.min(1, Math.max(0, -el.getBoundingClientRect().top / len));
      const t = Math.min(1, Math.max(0, (p - 0.1) / 0.9));
      const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      el.style.setProperty("--p", p.toFixed(4));
      el.style.setProperty("--e", e.toFixed(4));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [sectionRef, spacerRef]);
};
