import { useI18n } from "../i18n/LanguageContext.jsx";
import { RENTAL_URL, IMG } from "../data/villa.js";

export default function Split() {
  const { t } = useI18n();

  return (
    <section className="split section" id="rental">
      <div className="wrap split-head reveal">
        <p className="eyebrow">{t("split.eyebrow")}</p>
        <h2 className="split-title">{t("split.title")}</h2>
      </div>

      <div className="wrap split-grid">
        <article className="split-card reveal" style={{ backgroundImage: `url(${IMG}/exterieur-voorgevel.jpg)` }}>
          <div className="split-card-inner">
            <h3>{t("split.koop.t")}</h3>
            <p>{t("split.koop.d")}</p>
            <a href="#contact" className="btn btn-ghost">{t("split.koop.cta")}</a>
          </div>
        </article>

        <article className="split-card reveal" style={{ backgroundImage: `url(${IMG}/zwembad-avond.jpg)`, transitionDelay: "100ms" }}>
          <div className="split-card-inner">
            <h3>{t("split.huur.t")}</h3>
            <p>{t("split.huur.d")}</p>
            <a href={RENTAL_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              {t("split.huur.cta")}
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
