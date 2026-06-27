import { useI18n } from "../i18n/LanguageContext.jsx";
import { IMG, VIDEO } from "../data/villa.js";

export default function Hero() {
  const { t } = useI18n();

  return (
    <section className="hero" id="top">
      <div className="hero-media">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster={`${IMG}/hero-poster.jpg`}
        >
          <source src={`${VIDEO}/hero-gevel.mp4`} type="video/mp4" />
        </video>
        <div className="hero-scrim" />
      </div>

      <div className="hero-content wrap">
        <p className="eyebrow hero-eyebrow">{t("hero.eyebrow")}</p>
        <h1 className="hero-title">
          <span>{t("hero.title1")}</span>
          <em>{t("hero.title2")}</em>
          <span>{t("hero.title3")}</span>
        </h1>
        <p className="hero-tagline">{t("hero.tagline")}</p>
        <div className="hero-actions">
          <a href="#contact" className="btn btn-primary">
            {t("hero.cta1")}
          </a>
          <a href="#rental" className="btn btn-ghost">
            {t("hero.cta2")}
          </a>
        </div>
        <p className="hero-price">{t("hero.price")}</p>
      </div>

      <a href="#experience" className="hero-scroll" aria-label={t("hero.scroll")}>
        <span>{t("hero.scroll")}</span>
        <span className="hero-scroll-line" />
      </a>
    </section>
  );
}
