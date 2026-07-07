import { useI18n } from "../i18n/LanguageContext.jsx";
import { BedIcon, BathIcon, RulerIcon, SnowflakeIcon, CalendarIcon, FileIcon } from "./icons.jsx";

const DPE_LETTERS = ["A", "B", "C", "D", "E", "F", "G"];
const ENERGY_COLORS = ["#2e7d46", "#4caf50", "#8bc34a", "#ffeb3b", "#ffa726", "#f4511e", "#e53935"];
const CLIMATE_COLORS = ["#bcdcf2", "#95bedd", "#71a1c8", "#5486b4", "#3a6c9c", "#245384", "#0f3b6c"];

function DpeBar({ colors, letter }) {
  const activeIndex = DPE_LETTERS.indexOf(letter);
  return (
    <div className="dpe-bar">
      {DPE_LETTERS.map((l, i) => (
        <div key={l} className={`dpe-seg${i === activeIndex ? " is-active" : ""}`} style={{ background: colors[i] }}>
          {i === activeIndex && letter}
        </div>
      ))}
    </div>
  );
}

export default function Details() {
  const { t } = useI18n();

  const rows = [
    { Icon: BedIcon, label: t("details.bedrooms.l"), value: "4" },
    { Icon: BathIcon, label: t("details.bathrooms.l"), value: t("details.bathrooms.v") },
    { Icon: RulerIcon, label: t("details.size.l"), value: "160 m²" },
    { Icon: SnowflakeIcon, label: t("details.cooling.l"), value: t("details.cooling.v") },
    { Icon: CalendarIcon, label: t("details.year.l"), value: "2009" },
    { Icon: FileIcon, label: t("details.registration.l"), value: "R33-021743-004" },
  ];

  return (
    <section className="details section" id="details">
      <div className="wrap">
        <header className="details-head reveal">
          <p className="eyebrow">{t("details.eyebrow")}</p>
          <h2 className="details-title">{t("details.title")}</h2>
        </header>

        <div className="details-panel reveal">
          <ul className="details-grid">
            {rows.map((r) => (
              <li key={r.label} className="details-row">
                <r.Icon className="details-icon" aria-hidden="true" />
                <span className="details-label">{r.label}</span>
                <span className="details-value">{r.value}</span>
              </li>
            ))}
          </ul>

          <div className="details-tags">
            <div className="details-tag-group">
              <span className="details-tag-label">{t("details.exterior.l")}</span>
              <span className="details-tag">{t("details.exterior.pool")}</span>
            </div>
            <div className="details-tag-group">
              <span className="details-tag-label">{t("details.interior.l")}</span>
              <span className="details-tag">{t("details.interior.furnished")}</span>
              <span className="details-tag">{t("details.interior.storage")}</span>
            </div>
          </div>

          <div className="dpe-block">
            <div className="dpe-col">
              <span className="dpe-label">{t("details.energy.l")}</span>
              <DpeBar colors={ENERGY_COLORS} letter="B" />
            </div>
            <div className="dpe-col">
              <span className="dpe-label">{t("details.climate.l")}</span>
              <DpeBar colors={CLIMATE_COLORS} letter="A" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
