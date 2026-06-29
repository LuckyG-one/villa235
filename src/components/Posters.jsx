import { useState, useEffect } from "react";
import { useI18n } from "../i18n/LanguageContext.jsx";
import { posters } from "../data/villa.js";

export default function Posters() {
  const { t } = useI18n();
  const [open, setOpen] = useState(null);
  const active = posters.find((p) => p.id === open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section className="posters section" id="posters">
      <div className="wrap posters-head reveal">
        <p className="eyebrow">{t("posters.eyebrow")}</p>
        <h2 className="posters-title">{t("posters.title")}</h2>
      </div>

      <div className="wrap posters-grid reveal">
        {posters.map((p) => (
          <button
            className="poster-btn"
            key={p.id}
            onClick={() => setOpen(p.id)}
            aria-label={p.name}
          >
            <img src={p.img} alt={p.name} loading="lazy" />
            {p.km != null && <span className="poster-btn-km">{p.km} {t("loc.km")}</span>}
          </button>
        ))}
      </div>

      {active && (
        <div
          className="poster-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={active.name}
          onClick={() => setOpen(null)}
        >
          <button className="poster-lightbox-close" aria-label="Sluiten" onClick={() => setOpen(null)}>
            ×
          </button>
          <img src={active.img} alt={active.name} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}
