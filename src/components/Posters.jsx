import { useI18n } from "../i18n/LanguageContext.jsx";
import { posters } from "../data/villa.js";

export default function Posters() {
  const { t } = useI18n();

  return (
    <section className="posters section" id="posters">
      <div className="wrap posters-head reveal">
        <p className="eyebrow">{t("posters.eyebrow")}</p>
        <h2 className="posters-title">{t("posters.title")}</h2>
        <p className="posters-hint">{t("posters.hint")}</p>
      </div>

      <div className="posters-row">
        {posters.map((p) => (
          <figure className="poster-card" key={p.id}>
            <img src={p.img} alt={p.name} loading="lazy" />
            {p.km != null && (
              <figcaption className="poster-km">
                {p.km} {t("loc.km")}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}
