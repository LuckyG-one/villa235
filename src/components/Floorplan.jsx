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
            <rect x="3" y="3" width="94" height="58" rx="1.5" className="plan-outline" />

            {floor.rooms.map((r) => {
              const [cx, cy] = centroid(r.shape);
              const hasDim = !!r.dim;
              return (
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
                  <text className="plan-room-label" x={cx} y={hasDim ? cy - 1.2 : cy}>
                    {t(`plan.room.${r.id}`)}
                  </text>
                  {hasDim && (
                    <text className="plan-room-dim" x={cx} y={cy + 2.2}>
                      {r.dim}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Sliding doors (terrace) */}
            {(floor.sliders || []).map((sl, i) => (
              <g key={`sl${i}`} className="plan-slider">
                <line x1={sl.x} y1={sl.y1} x2={sl.x} y2={sl.y2} />
                <line x1={sl.x - 1.4} y1={(sl.y1 + sl.y2) / 2} x2={sl.x - 1.4} y2={sl.y2} />
              </g>
            ))}

            {/* Door swings */}
            {(floor.doors || []).map((d, i) => {
              const p = doorPath(d);
              return (
                <g key={`d${i}`} className="plan-door">
                  <path d={p.leaf} />
                  <path d={p.arc} fill="none" />
                </g>
              );
            })}

            {/* Staircase */}
            {floor.stairs && <Stairs s={floor.stairs} />}
          </svg>
          <p className="plan-disclaimer">{t("plan.disclaimer")}</p>
        </div>

        <aside className="plan-detail">
          <div className="plan-detail-media">
            <img src={active.img} alt={t(`plan.room.${active.id}`)} key={active.id} />
          </div>
          <div className="plan-detail-body">
            <span className="plan-detail-floor">{t(`plan.floor.${floor.id}`)}</span>
            <h3 className="plan-detail-title">{t(`plan.room.${active.id}`)}</h3>
            {active.dim && <span className="plan-detail-dim">{active.dim}</span>}
          </div>
        </aside>
      </div>
    </section>
  );
}

function Stairs({ s }) {
  const treads = [];
  for (let i = 1; i < s.n; i++) {
    const yy = s.y + (s.h / s.n) * i;
    treads.push(<line key={i} x1={s.x} y1={yy} x2={s.x + s.w} y2={yy} />);
  }
  const cxs = s.x + s.w / 2;
  const arrow =
    s.dir === "up"
      ? { y1: s.y + s.h - 1, y2: s.y + 1, tip: s.y + 1 }
      : { y1: s.y + 1, y2: s.y + s.h - 1, tip: s.y + s.h - 1 };
  const head = s.dir === "up" ? 2 : -2;
  return (
    <g className="plan-stairs">
      <rect x={s.x} y={s.y} width={s.w} height={s.h} />
      {treads}
      <line x1={cxs} y1={arrow.y1} x2={cxs} y2={arrow.y2} className="plan-stair-arrow" />
      <path
        d={`M ${cxs - 1.4} ${arrow.tip + head} L ${cxs} ${arrow.tip} L ${cxs + 1.4} ${arrow.tip + head}`}
        className="plan-stair-arrow"
        fill="none"
      />
    </g>
  );
}

function doorPath(d) {
  const rad = (deg) => (deg * Math.PI) / 180;
  const lx = d.x + d.w * Math.cos(rad(d.a));
  const ly = d.y + d.w * Math.sin(rad(d.a));
  const a2 = d.a + d.s * 90;
  const ax = d.x + d.w * Math.cos(rad(a2));
  const ay = d.y + d.w * Math.sin(rad(a2));
  const sweep = d.s > 0 ? 1 : 0;
  return {
    leaf: `M ${d.x} ${d.y} L ${lx.toFixed(2)} ${ly.toFixed(2)}`,
    arc: `M ${lx.toFixed(2)} ${ly.toFixed(2)} A ${d.w} ${d.w} 0 0 ${sweep} ${ax.toFixed(2)} ${ay.toFixed(2)}`,
  };
}

function centroid(shape) {
  const pts = shape.split(" ").map((p) => p.split(",").map(Number));
  const x = pts.reduce((s, p) => s + p[0], 0) / pts.length;
  const y = pts.reduce((s, p) => s + p[1], 0) / pts.length;
  return [x, y];
}
