import { useI18n } from "../i18n/LanguageContext.jsx";

const ITEMS = ["checkin", "checkout", "pool", "comfort", "deposit", "pets", "reg"];

export default function Practical() {
  const { t } = useI18n();

  return (
    <section className="practical section" id="practical">
      <div className="wrap practical-head reveal">
        <p className="eyebrow">{t("practical.eyebrow")}</p>
        <h2 className="practical-title">{t("practical.title")}</h2>
      </div>

      <dl className="wrap practical-grid reveal">
        {ITEMS.map((key) => (
          <div className="practical-row" key={key}>
            <dt>{t(`practical.${key}.l`)}</dt>
            <dd>{t(`practical.${key}.d`)}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
