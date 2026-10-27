import { useEffect } from "react";

// Mette data-visible sugli elementi .kick-reveal dentro il contenitore
// la prima volta che entrano nella finestra. L'animazione sta nel CSS.
export const useReveal = (containerRef) => {
  useEffect(() => {
    const items = containerRef.current?.querySelectorAll(".kick-reveal");
    if (!items?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-visible", "");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [containerRef]);
};
