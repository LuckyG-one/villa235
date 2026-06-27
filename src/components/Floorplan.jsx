import { useState } from "react";
import { useI18n } from "../i18n/LanguageContext.jsx";
import { floors } from "../data/villa.js";

export default function Floorplan() {
  const { t } = useI18n();
  const [floorIdx, setFloorIdx] = useState(0);
  const floor = floors[floorIdx];
  const [activeId, setActiveId] = useState(floor.rooms[0].id);

  const active = floor.rooms.find((r) => r.id === activeId) || floor.rooms[0];

  const selectFloor = (i) => {
    setFloorIdx(i);
    setActiveId(floors[i].rooms[0].id);
  };

  return (
    <section className="plan section" id="plan">
      <div className="wrap plan-head reveal">
        <p className="eyebrow">{t("plan.eyebrow")}</p>
        <h2 className="plan-title">{t("plan.title")}</h2>
        <p className="plan-hint">{t("plan.hint")}</p>
      </div>

      <div className="wrap plan-grid reveal">
        <div className="plan-left">
          <div className="plan-floors" role="tablist">
            {floors.map((f, i) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={floorIdx === i}
                className={floorIdx === i ? "is-active" : ""}
                onClick={() => selectFloor(i)}
              >
                {t(`plan.floor.${f.id}`)}
              </button>
            ))}
          </div>

          <svg className="plan-svg" viewBox="0 0 100 64" role="group" aria-label={t("plan.title")}>
            <rect x="3" y="3" width="94" height="58" rx="2" className="plan-outline" />
            {floor.rooms.map((r) => (
              <g key={r.id}>
                <polygon
                  points={r.shape}
                  className={`plan-room ${activeId === r.id ? "is-active" : ""}`}
                  onClick={() => setActiveId(r.id)}
                  tabIndex={0}
                  role="button"
                  aria-label={t(`plan.room.${r.id}`)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveId(r.id);
                    }
                  }}
                />
                <text
                  className="plan-room-label"
                  x={labelX(r.shape)}
                  y={labelY(r.shape)}
                >
                  {t(`plan.room.${r.id}`)}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <aside className="plan-detail">
          <div className="plan-detail-media">
            <img src={active.img} alt={t(`plan.room.${active.id}`)} key={active.id} />
          </div>
          <div className="plan-detail-body">
            <span className="plan-detail-floor">{t(`plan.floor.${floor.id}`)}</span>
            <h3 className="plan-detail-title">{t(`plan.room.${active.id}`)}</h3>
          </div>
        </aside>
      </div>
    </section>
  );
}

function centroid(shape) {
  const pts = shape.split(" ").map((p) => p.split(",").map(Number));
  const x = pts.reduce((s, p) => s + p[0], 0) / pts.length;
  const y = pts.reduce((s, p) => s + p[1], 0) / pts.length;
  return [x, y];
}
const labelX = (s) => centroid(s)[0];
const labelY = (s) => centroid(s)[1];
