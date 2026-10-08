import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MdHome, MdFullscreen, MdFullscreenExit } from "react-icons/md";
import { BBMP_CENTER, BBMP_BOUNDS } from "@/data/mapLayers";
import ControlPane from "./controls/ControlPane";
import "./map.css";

export interface LegendItem {
  label: string;
  color: string;
}

interface ZoneMapProps {
  /** URL of the vectorised zone polygons (each feature carries properties.color). */
  zonesUrl: string;
  legend: LegendItem[];
  /** Legend heading, Title Case. */
  legendTitle?: string;
  /** Builds popup HTML for a ward from its GeoJSON properties. */
  wardPopup: (props: any) => string;
  zoneOpacity?: number;
  className?: string;
}

/**
 * Thematic zone polygons. Rendered through the SVG renderer for clean
 * anti-aliased edges, with a hairline stroke in each polygon's own colour so
 * adjacent classes meet without dark sliver gaps.
 */
function ZonesLayer({ url, opacity }: { url: string; opacity: number }) {
  const map = useMap();
  const ref = useRef<L.GeoJSON | null>(null);
  useEffect(() => {
    let cancelled = false;
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        ref.current?.remove();
        const renderer = L.svg({ padding: 0.5 });
        ref.current = L.geoJSON(data, {
          style: (f) => ({
            renderer,
            smoothFactor: 1.2,
            fillColor: f?.properties.color ?? "#2563EB",
            fillOpacity: opacity,
            color: f?.properties.color ?? "#2563EB",
            weight: 1,
            opacity: opacity,
            lineJoin: "round",
          }),
          interactive: false,
        }).addTo(map);
        ref.current.bringToBack();
      });
    return () => {
      cancelled = true;
      ref.current?.remove();
    };
  }, [url, opacity, map]);
  return null;
}

/** Ward boundaries: dark, soft, and clickable. */
function WardOutline({ popup }: { popup: (props: any) => string }) {
  const map = useMap();
  const ref = useRef<L.GeoJSON | null>(null);
  useEffect(() => {
    let cancelled = false;
    fetch("/assets/geo/ward-analysis.geojson")
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        const renderer = L.svg({ padding: 0.5 });
        const base: L.PathOptions = {
          renderer,
          color: "#0B1220",
          weight: 1.1,
          opacity: 0.55,
          fillColor: "#000000",
          fillOpacity: 0.001,
          lineJoin: "round",
        };
        const layer = L.geoJSON(data, {
          style: base,
          onEachFeature: (f, lyr) => {
            lyr.bindPopup(popup(f.properties), { className: "map-popup-wrapper", maxWidth: 280 });
            lyr.on({
              mouseover: (e) => {
                const t = e.target as L.Path;
                t.setStyle({ color: "#F8FAFC", weight: 2.2, opacity: 1, fillOpacity: 0.12, fillColor: "#F8FAFC" });
                t.bringToFront();
              },
              mouseout: (e) => (e.target as L.Path).setStyle(base),
            });
          },
        }).addTo(map);
        ref.current = layer;
      });
    return () => {
      cancelled = true;
      ref.current?.remove();
    };
  }, [popup, map]);
  return null;
}

/** Minimal map tools: home and fullscreen, plus a metric scale bar. */
function MiniTools() {
  const map = useMap();
  const [full, setFull] = useState(false);
  useEffect(() => {
    const scale = L.control.scale({ position: "bottomleft", imperial: false }).addTo(map);
    return () => {
      scale.remove();
    };
  }, [map]);
  const home = () => map.fitBounds(BBMP_BOUNDS, { padding: [24, 24] });
  const fs = () => {
    const el = map.getContainer().parentElement ?? map.getContainer();
    if (!document.fullscreenElement) el.requestFullscreen?.().then(() => setFull(true));
    else document.exitFullscreen?.().then(() => setFull(false));
    setTimeout(() => map.invalidateSize(), 250);
  };
  const btn =
    "glass grid h-10 w-10 place-items-center rounded-xl text-ink-primary transition-all duration-200 hover:text-primary hover:border-primary/40";
  return (
    <ControlPane className="left-3 top-3 flex flex-col gap-2">
      <button className={btn} onClick={home} title="Reset View" aria-label="Reset view">
        <MdHome size={19} />
      </button>
      <button className={btn} onClick={fs} title="Fullscreen" aria-label="Toggle fullscreen">
        {full ? <MdFullscreenExit size={19} /> : <MdFullscreen size={19} />}
      </button>
    </ControlPane>
  );
}

/** Keeps the map sized correctly when its container changes (responsive). */
function ResizeHandler() {
  const map = useMap();
  useEffect(() => {
    const onResize = () => map.invalidateSize();
    window.addEventListener("resize", onResize);
    const t = setTimeout(onResize, 200);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(t);
    };
  }, [map]);
  return null;
}

/**
 * The interactive thematic map used by the Prediction and Infrastructure pages.
 * Vector zones drawn from the classified rasters, with clickable ward
 * boundaries and a professional legend.
 */
export default function ZoneMap({
  zonesUrl,
  legend,
  legendTitle = "Legend",
  wardPopup,
  zoneOpacity = 0.72,
  className = "h-[68vh]",
}: ZoneMapProps) {
  return (
    <div className={`relative w-full overflow-hidden rounded-2xl border border-hairline shadow-glass ${className}`}>
      <MapContainer
        center={BBMP_CENTER}
        zoom={11}
        bounds={BBMP_BOUNDS}
        zoomControl={true}
        className="h-full w-full bg-abyss"
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &copy; Esri &mdash; Esri, HERE, Garmin, &copy; OpenStreetMap contributors"
          maxZoom={16}
          crossOrigin=""
        />
        <ZonesLayer url={zonesUrl} opacity={zoneOpacity} />
        <WardOutline popup={wardPopup} />
        <MiniTools />
        <ResizeHandler />

        {/* Legend */}
        <ControlPane className="bottom-3 right-3 max-w-[calc(100%-1.5rem)]">
          <div className="glass rounded-xl px-4 py-3">
            <p className="mb-2.5 text-[14px] font-semibold text-ink-primary">{legendTitle}</p>
            <div className="space-y-2">
              {legend.map((l) => (
                <div key={l.label} className="flex items-center gap-2.5 text-[13px] leading-tight text-ink-muted">
                  <span
                    className="h-3.5 w-3.5 shrink-0 rounded-[4px] ring-1 ring-white/25"
                    style={{ background: l.color }}
                  />
                  <span>{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </ControlPane>
      </MapContainer>
    </div>
  );
}
