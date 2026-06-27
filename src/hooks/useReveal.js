import { useEffect } from "react";

// Voegt .is-in toe aan elementen met [data-reveal] zodra ze in beeld komen.
// Respecteert prefers-reduced-motion (CSS toont ze dan direct).
export function useReveal(deps = []) {
  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal:not(.is-in)");
    if (!nodes.length) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      nodes.forEach((n) => n.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      // threshold 0: reveal as soon as the element's edge enters view. A
      // percentage threshold breaks for tall stacked blocks on mobile (their
      // top stays blank until a large share is visible).
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );

    nodes.forEach((n) => io.observe(n));

    // Safety net: anything already within the viewport that the observer
    // hasn't flipped shortly after mount gets revealed (covers reloads
    // mid-page and any iOS timing quirks).
    const settle = setTimeout(() => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      document.querySelectorAll(".reveal:not(.is-in)").forEach((n) => {
        const r = n.getBoundingClientRect();
        if (r.top < vh && r.bottom > 0) n.classList.add("is-in");
      });
    }, 600);

    return () => {
      clearTimeout(settle);
      io.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
