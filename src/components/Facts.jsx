import { useI18n } from "../i18n/LanguageContext.jsx";
import { facts } from "../data/villa.js";

export default function Facts() {
  const { t } = useI18n();

  return (
    <section className="facts section" id="facts">
      <div className="wrap">
        <header className="facts-head reveal">
          <p className="eyebrow">{t("stats.eyebrow")}</p>
          <h2 className="facts-title">{t("stats.title")}</h2>
        </header>

        <div className="facts-grid">
          {facts.map((f, i) => (
            <article
              className={`fact-card reveal ${i === 0 ? "fact-card--wide" : ""}`}
              key={f.key}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="fact-media">
                <img src={f.img} alt="" loading="lazy" />
              </div>
              <div className="fact-body">
                <span className="fact-value">{t(`stats.${f.key}.v`)}</span>
                <span className="fact-label">{t(`stats.${f.key}.l`)}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
