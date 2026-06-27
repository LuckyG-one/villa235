import { useI18n } from "../i18n/LanguageContext.jsx";
import { IMG } from "../data/villa.js";

export default function Story() {
  const { t } = useI18n();

  return (
    <section className="story section" id="story">
      <div className="wrap story-grid">
        <div className="story-text">
          <p className="eyebrow reveal">{t("story.eyebrow")}</p>
          <h2 className="story-title reveal">{t("story.title")}</h2>
          <p className="story-lead reveal">{t("story.lead")}</p>

          <div className="story-block reveal">
            <h3>{t("story.villa.t")}</h3>
            <p>{t("story.villa.d")}</p>
          </div>
          <div className="story-block reveal">
            <h3>{t("story.ligging.t")}</h3>
            <p>{t("story.ligging.d")}</p>
          </div>
        </div>

        <figure className="story-media reveal">
          <img src={`${IMG}/woonkamer-avond.jpg`} alt="" loading="lazy" />
          <img className="story-media-inset" src={`${IMG}/aankomst.jpg`} alt="" loading="lazy" />
        </figure>
      </div>
    </section>
  );
}
