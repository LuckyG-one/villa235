import { useI18n } from "../i18n/LanguageContext.jsx";
import { ClockIcon, ClockOutIcon, WaveIcon, WifiIcon, BoltIcon, ShieldIcon, PawIcon, FileIcon } from "./icons.jsx";

const ITEMS = [
  { key: "checkin", Icon: ClockIcon },
  { key: "checkout", Icon: ClockOutIcon },
  { key: "pool", Icon: WaveIcon },
  { key: "comfort", Icon: WifiIcon },
  { key: "ev", Icon: BoltIcon },
  { key: "deposit", Icon: ShieldIcon },
  { key: "pets", Icon: PawIcon },
  { key: "reg", Icon: FileIcon },
];

export default function Practical() {
  const { t } = useI18n();

  return (
    <section className="practical section" id="practical">
      <div className="wrap practical-head reveal">
        <p className="eyebrow">{t("practical.eyebrow")}</p>
        <h2 className="practical-title">{t("practical.title")}</h2>
      </div>

      <div className="wrap practical-panel reveal">
        <dl className="practical-grid">
          {ITEMS.map(({ key, Icon }) => (
            <div className="practical-row" key={key}>
              <Icon className="practical-icon" aria-hidden="true" />
              <div className="practical-row-text">
                <dt>{t(`practical.${key}.l`)}</dt>
                <dd>{t(`practical.${key}.d`)}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
