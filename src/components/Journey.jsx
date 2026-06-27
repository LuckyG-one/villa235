import { useEffect, useRef, useState } from "react";
import { useI18n } from "../i18n/LanguageContext.jsx";
import { journey } from "../data/villa.js";

// Digitale rondleiding: sticky beeldkolom die meewisselt met de actieve stap.
export default function Journey() {
  const { t } = useI18n();
  const [active, setActive] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.idx);
            setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    stepRefs.current.forEach((n) => n && io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <section className="journey section" id="journey">
      <div className="wrap journey-head reveal">
        <p className="eyebrow">{t("journey.eyebrow")}</p>
        <h2 className="journey-title">{t("journey.title")}</h2>
        <p className="journey-hint">{t("journey.hint")}</p>
      </div>

      <div className="wrap journey-grid">
        <div className="journey-media">
          <div className="journey-media-inner">
            {journey.map((r, i) => (
              <img
                key={r.key}
                src={r.img}
                alt={t(`journey.${r.key}.t`)}
                className={`journey-img ${active === i ? "is-active" : ""}`}
                loading="lazy"
              />
            ))}
            <span className="journey-counter">
              0{active + 1} <i>/ 0{journey.length}</i>
            </span>
          </div>
        </div>

        <ol className="journey-steps">
          {journey.map((r, i) => (
            <li
              key={r.key}
              data-idx={i}
              ref={(el) => (stepRefs.current[i] = el)}
              className={`journey-step ${active === i ? "is-active" : ""}`}
            >
              <span className="journey-step-num">0{i + 1}</span>
              <h3 className="journey-step-title">{t(`journey.${r.key}.t`)}</h3>
              <p className="journey-step-desc">{t(`journey.${r.key}.d`)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
