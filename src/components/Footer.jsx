import { useI18n } from "../i18n/LanguageContext.jsx";
import { CONTACT_EMAIL } from "../data/villa.js";

const LINKS = [
  ["experience", "#experience"],
  ["journey", "#journey"],
  ["plan", "#plan"],
  ["location", "#location"],
  ["park", "#park"],
  ["rental", "#rental"],
  ["contact", "#contact"],
];

export default function Footer() {
  const { t } = useI18n();
  const year = 2026;

  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <span className="footer-mark">Villa 235</span>
          <span className="footer-sub">Résidence du Château de Salles, Gironde</span>
          <p className="footer-tag">{t("footer.tag")}</p>
        </div>

        <nav className="footer-nav" aria-label={t("footer.nav")}>
          <span className="footer-col-title">{t("footer.nav")}</span>
          {LINKS.map(([key, href]) => (
            <a key={key} href={href}>{t(`nav.${key}`)}</a>
          ))}
        </nav>

        <div className="footer-contact">
          <span className="footer-col-title">{t("nav.contact")}</span>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <a href="https://villa235.com">villa235.com</a>
          <span className="footer-rental">{t("footer.rental")}</span>
          <span className="footer-rental">{t("footer.reg")}</span>
        </div>
      </div>

      <div className="wrap footer-base">
        <span>© {year} Villa 235</span>
        <span>{t("footer.rights")}</span>
      </div>
    </footer>
  );
}
