import { useI18n } from "../i18n/LanguageContext.jsx";
import { park } from "../data/villa.js";

export default function Park() {
  const { t } = useI18n();

  return (
    <section className="park section" id="park">
      <div className="wrap park-grid">
        <div className="park-intro reveal">
          <p className="eyebrow eyebrow--light">{t("park.eyebrow")}</p>
          <h2 className="park-title">{t("park.title")}</h2>
          <p className="park-text">{t("park.intro")}</p>
        </div>

        <ul className="park-features">
          {park.map((f, i) => (
            <li
              className="park-feature reveal"
              key={f.key}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="park-feature-num">0{i + 1}</span>
              <h3>{t(`park.${f.key}.t`)}</h3>
              <p>{t(`park.${f.key}.d`)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
