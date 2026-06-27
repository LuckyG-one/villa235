import { useEffect, useState } from "react";
import { useI18n } from "../i18n/LanguageContext.jsx";

const LINKS = [
  ["experience", "#experience"],
  ["journey", "#journey"],
  ["plan", "#plan"],
  ["location", "#location"],
  ["park", "#park"],
  ["rental", "#rental"],
];

export default function Nav() {
  const { t, lang, setLang, langs } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="nav-inner wrap">
        <a href="#top" className="nav-brand" aria-label="Villa 235">
          <span className="nav-brand-mark">Villa 235</span>
          <span className="nav-brand-sub">Résidence du Château de Salles</span>
        </a>

        <nav className={`nav-links ${open ? "is-open" : ""}`} aria-label="Hoofdmenu">
          {LINKS.map(([key, href]) => (
            <a key={key} href={href} onClick={() => setOpen(false)}>
              {t(`nav.${key}`)}
            </a>
          ))}
        </nav>

        <div className="nav-right">
          <div className="lang" role="group" aria-label="Taal">
            {langs.map((l) => (
              <button
                key={l.code}
                className={lang === l.code ? "is-active" : ""}
                onClick={() => setLang(l.code)}
                aria-pressed={lang === l.code}
              >
                {l.label}
              </button>
            ))}
          </div>
          <a href="#contact" className="btn btn-primary nav-cta">
            {t("nav.cta")}
          </a>
          <button
            className={`nav-burger ${open ? "is-open" : ""}`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
