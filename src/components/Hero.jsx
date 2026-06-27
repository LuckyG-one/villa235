import { useRef, useEffect } from "react";
import { useI18n } from "../i18n/LanguageContext.jsx";
import { IMG, VIDEO } from "../data/villa.js";

export default function Hero() {
  const { t } = useI18n();
  const videoRef = useRef(null);

  // React doesn't reliably set the `muted` DOM property, which makes browsers
  // (notably Safari) block autoplay. Force it and nudge play() once ready.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    const play = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };
    play();
    v.addEventListener("canplay", play, { once: true });
    v.addEventListener("loadeddata", play, { once: true });

    // iOS fallback: if autoplay is blocked, start on the first user gesture.
    const onGesture = () => {
      play();
      if (!v.paused) removeGestures();
    };
    const removeGestures = () => {
      ["touchstart", "pointerdown", "scroll"].forEach((e) =>
        window.removeEventListener(e, onGesture)
      );
    };
    ["touchstart", "pointerdown", "scroll"].forEach((e) =>
      window.addEventListener(e, onGesture, { passive: true })
    );

    return () => {
      v.removeEventListener("canplay", play);
      v.removeEventListener("loadeddata", play);
      removeGestures();
    };
  }, []);

  return (
    <section className="hero" id="top">
      <div className="hero-media">
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
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
