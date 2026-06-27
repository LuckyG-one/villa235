import { useI18n } from "../i18n/LanguageContext.jsx";
import { IMG } from "../data/villa.js";

export default function BrandSignature() {
  const { t } = useI18n();
  const keywords = t("brand.keywords").split("·").map((k) => k.trim());

  return (
    <section className="signature">
      <div className="wrap signature-inner reveal">
        <img
          className="signature-logo"
          src={`${IMG}/logo-villa235.png`}
          alt="Villa 235, Résidence du Château de Salles"
          width="420"
          height="283"
        />
        <ul className="signature-keywords">
          {keywords.map((k, i) => (
            <li key={i}>{k}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
