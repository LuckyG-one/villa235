import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "../i18n/LanguageContext.jsx";
import { experience } from "../data/villa.js";
import { prefersReducedMotion } from "../hooks/useReveal.js";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const { t, lang } = useI18n();
  const root = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    // Mobile/tablet: skip the pinned scrollytelling, use the stacked CSS fallback.
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray(".exp-slide");
      const n = slides.length;

      // Pin the stage and step through the day.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${n * 90}%`,
          scrub: 0.6,
          pin: ".exp-stage",
          anticipatePin: 1,
        },
      });

      slides.forEach((slide, i) => {
        const img = slide.querySelector(".exp-img");
        const text = slide.querySelector(".exp-text");
        if (i > 0) {
          tl.fromTo(
            slide,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.6 },
            ">"
          );
          tl.fromTo(
            img,
            { scale: 1.12 },
            { scale: 1, duration: 1 },
            "<"
          );
          tl.fromTo(
            text,
            { autoAlpha: 0, y: 30 },
            { autoAlpha: 1, y: 0, duration: 0.5 },
            "<0.15"
          );
        } else {
          gsap.set(slide, { autoAlpha: 1 });
        }
        if (i < n - 1) tl.to({}, { duration: 0.5 });
      });

      ScrollTrigger.refresh();
    }, el);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section className="exp" id="experience" ref={root}>
      <div className="exp-stage">
        {experience.map((m, i) => (
          <div className="exp-slide" key={m.key} style={{ zIndex: i + 1 }}>
            <img className="exp-img" src={m.img} alt="" loading="lazy" />
            <div className="exp-shade" />
            <div className="exp-text wrap">
              {i === 0 && <p className="eyebrow exp-eyebrow">{t("exp.eyebrow")}</p>}
              <p className="exp-step">
                0{i + 1} <span>/ 0{experience.length}</span>
              </p>
              <h2 className="exp-heading">{t(`exp.${m.key}.t`)}</h2>
              <p className="exp-desc">{t(`exp.${m.key}.d`)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
