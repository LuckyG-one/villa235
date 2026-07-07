import { useI18n } from "../i18n/LanguageContext.jsx";

const icon = (path) => (props) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    {path}
  </svg>
);

const BedIcon = icon(
  <>
    <path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" />
    <path d="M3 18h18" />
    <path d="M3 13V7a1 1 0 0 1 1-1h6v5" />
  </>
);

const BathIcon = icon(
  <>
    <path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Z" />
    <path d="M4 12V6a2 2 0 0 1 2-2c1 0 1.5.6 1.8 1.3" />
    <path d="M7 19v2M17 19v2" />
  </>
);

const RulerIcon = icon(
  <>
    <rect x="3" y="8" width="18" height="8" rx="1.5" />
    <path d="M7 8v3M11 8v3M15 8v3" />
  </>
);

const SnowflakeIcon = icon(
  <>
    <path d="M12 2v20M4.5 6.5l15 11M19.5 6.5l-15 11" />
  </>
);

const CalendarIcon = icon(
  <>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </>
);

const FileIcon = icon(
  <>
    <path d="M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
    <path d="M14 3v4h4" />
    <path d="M9 13h6M9 17h6" />
  </>
);

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
