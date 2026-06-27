import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import { useI18n } from "../i18n/LanguageContext.jsx";
import { destinations, SALLES } from "../data/villa.js";

const MAP_STYLE = {
  version: 8,
  sources: {
    carto: {
      type: "raster",
      tiles: [
        "https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        "https://b.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        "https://c.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      ],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors © CARTO",
    },
  },
  layers: [{ id: "carto", type: "raster", source: "carto" }],
};

export default function Area() {
  const { t } = useI18n();
  const mapEl = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const [active, setActive] = useState("capferret");

  useEffect(() => {
    if (mapRef.current || !mapEl.current) return;

    const map = new maplibregl.Map({
      container: mapEl.current,
      style: MAP_STYLE,
      center: [SALLES.lng + 0.1, SALLES.lat],
      zoom: 7.4,
      attributionControl: { compact: true },
      cooperativeGestures: true,
    });
    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

    map.on("load", () => {
      // Home marker (villa).
      const home = document.createElement("div");
      home.className = "map-home";
      home.innerHTML = `<span></span>`;
      new maplibregl.Marker({ element: home })
        .setLngLat([SALLES.lng, SALLES.lat])
        .setPopup(new maplibregl.Popup({ offset: 16, closeButton: false }).setText("VILLA235"))
        .addTo(map);

      destinations.forEach((d) => {
        if (d.id === "salles") return;
        const elm = document.createElement("button");
        elm.className = `map-pin ${d.hero ? "map-pin--hero" : ""}`;
        elm.type = "button";
        elm.setAttribute("aria-label", t(`loc.dest.${d.id}.t`));
        elm.innerHTML = `<span class="map-pin-dot"></span><span class="map-pin-km">${d.km} km</span>`;
        elm.addEventListener("click", () => focus(d.id));
        const marker = new maplibregl.Marker({ element: elm, anchor: "bottom" })
          .setLngLat([d.lng, d.lat])
          .addTo(map);
        markersRef.current[d.id] = marker;
      });

      const bounds = new maplibregl.LngLatBounds();
      destinations.forEach((d) => bounds.extend([d.lng, d.lat]));
      bounds.extend([SALLES.lng, SALLES.lat]);
      map.fitBounds(bounds, { padding: 70, maxZoom: 8, duration: 0 });
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const focus = (id) => {
    setActive(id);
    const d = destinations.find((x) => x.id === id);
    const map = mapRef.current;
    if (d && map) {
      map.flyTo({ center: [d.lng, d.lat], zoom: 9, duration: 900, essential: true });
    }
    Object.entries(markersRef.current).forEach(([key, m]) => {
      m.getElement().classList.toggle("is-active", key === id);
    });
  };

  const activeDest = destinations.find((d) => d.id === active) || destinations[1];

  return (
    <section className="area section" id="location">
      <div className="wrap area-head reveal">
        <p className="eyebrow">{t("loc.eyebrow")}</p>
        <h2 className="area-title">{t("loc.title")}</h2>
        <p className="area-intro">{t("loc.intro")}</p>
        <p className="area-close">{t("loc.close")}</p>
      </div>

      <div className="wrap area-grid reveal">
        <div className="area-map-col">
          <div className="area-map" ref={mapEl} />
          <p className="area-map-hint">{t("loc.hint")}</p>
        </div>

        <div className="area-side">
          <figure className="area-feature">
            <img src={activeDest.img} alt={t(`loc.dest.${activeDest.id}.t`)} key={activeDest.id} />
            <figcaption>
              <span className="area-feature-km">{activeDest.km} {t("loc.km")}</span>
              <h3>{t(`loc.dest.${activeDest.id}.t`)}</h3>
              <p>{t(`loc.dest.${activeDest.id}.d`)}</p>
            </figcaption>
          </figure>

          <ul className="area-list">
            {destinations
              .filter((d) => d.id !== "salles")
              .map((d) => (
                <li key={d.id}>
                  <button
                    className={active === d.id ? "is-active" : ""}
                    onClick={() => focus(d.id)}
                  >
                    <span className="area-list-name">{t(`loc.dest.${d.id}.t`)}</span>
                    <span className="area-list-km">{d.km} {t("loc.km")}</span>
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
